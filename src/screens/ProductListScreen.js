import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { fetchProducts, deleteProduct } from '../store/slices/productSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './ProductListScreen.css';
import CustomDropdown from '../components/CustomDropdown';

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error, total } = useSelector((state) => state.product);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const mainCategories = ['MEN', 'LADIES', 'KIDS', 'SPORTS', 'OTHER'];

  const categoryMapping = {
    'MEN': ['tshirt', 'shirt', 'cargo', 'jeans', 'trousers', 'hoodies-sweaters', 'flipflop', 'sneakers', 'men-clothing', 'men-accessories', 'men-sport'],
    'LADIES': ['ladies-tshirt', 'ladies-shirt', 'ladies-cargo', 'ladies-jeans', 'ladies-trousers', 'ladies-hoodies', 'ladies-shorts', 'coord-set', 'ladies-clothing', 'ladies-shoes', 'ladies-accessories', 'lingerie', 'ladies-sport'],
    'KIDS': ['kids-clothing', 'kids-shoes', 'kids-accessories', 'boys', 'girls', 'infants'],
    'SPORTS': ['activewear', 'performance', 'gym-gear', 'running', 'training', 'men-sport', 'ladies-sport'],
    'OTHER': ['sneakers', 'shirts', 'pants', 'mobile', 'watches', 'bags', 'apparel', 'accessories', 'collectibles']
  };

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 500); // 500ms delay

      return () => clearTimeout(timer);
    }
  }, [searchTerm, debouncedSearchTerm]);

  // Fetch products on component mount and when filters change
  useEffect(() => {
    const params = {
      pageNumber: currentPage,
      pageSize: pageSize
    };

    if (debouncedSearchTerm) {
      params.keyword = debouncedSearchTerm;
    }

    if (selectedMainCategory) {
      params.mainCategory = selectedMainCategory;
    }

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    dispatch(fetchProducts(params));
  }, [dispatch, currentPage, debouncedSearchTerm, selectedMainCategory, selectedCategory, pageSize]);

  const handleAddProduct = () => {
    navigate('/admin/product/add');
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/product/${productId}/edit`);
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        toast.success('Product deleted successfully!');
        // Refresh the product list
        dispatch(fetchProducts({ pageNumber: currentPage, pageSize }));
      } catch (error) {
        toast.error(error?.message || 'Failed to delete product');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Calculate total pages
  const totalPages = Math.ceil(total / pageSize);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getTotalStock = (sizes) => {
    if (!sizes || !Array.isArray(sizes)) return 0;
    return sizes.reduce((total, size) => total + (size.stock || 0), 0);
  };

  const getAvailableSubCategories = () => {
    if (!selectedMainCategory) return [];
    return categoryMapping[selectedMainCategory] || [];
  };

  return (
    <>
      <Meta title="Archive Management | Mearn Admin" />
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">Global Digital Archive</span>
            </div>
            <h1 className="text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
              Stock <span className="text-slate-dark/20">Registry</span>
            </h1>
            <p className="text-xs font-bold text-slate-dark/50 tracking-widest uppercase">
              {loading ? 'Synchronizing Archive...' : `Currently Managing ${total} Masterpieces`}
            </p>
          </div>

          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="relative group">
              <input
                type="text"
                placeholder="Find in Registry..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-off-white-warm px-8 py-5 rounded-full w-96 font-bold text-slate-dark focus:bg-white focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none border-none placeholder:text-slate-dark/20"
              />
              <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-dark/20 group-focus-within:text-slate-dark transition-colors" />
            </div>
            <button
              onClick={handleAddProduct}
              className="bg-slate-dark text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl flex items-center gap-3 active:scale-95"
            >
              <FaPlus className="text-xs" />
              Ingest New Asset
            </button>
          </div>
        </div>

        {/* Filters Registry */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <CustomDropdown
            label="Division"
            options={[
              { label: 'All Divisions', value: '' },
              ...mainCategories.map(cat => ({ label: cat, value: cat }))
            ]}
            value={selectedMainCategory}
            onChange={(val) => {
              setSelectedMainCategory(val);
              setSelectedCategory('');
              setCurrentPage(1);
            }}
          />

          {selectedMainCategory && (
            <CustomDropdown
              label="Category"
              options={[
                { label: 'All Categories', value: '' },
                ...getAvailableSubCategories().map(cat => ({
                  label: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                  value: cat
                }))
              ]}
              value={selectedCategory}
              onChange={(val) => {
                setSelectedCategory(val);
                setCurrentPage(1);
              }}
              className="animate-in fade-in slide-in-from-left-4 duration-500"
            />
          )}
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center opacity-40">
            <div className="w-16 h-16 border-4 border-slate-dark border-t-transparent rounded-full animate-spin mb-6"></div>
            <span className="font-black text-[10px] uppercase tracking-[0.5em]">Fetching Registry Data</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-8 rounded-3xl font-bold text-center">
            {error}
          </div>
        ) : (
          <div className="bg-white border-t border-b border-slate-dark/10">
            <div className="overflow-visible">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-dark/10">
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Asset Portfolio</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Classification</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Signature</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Valuation</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Inventory</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Visibility</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-dark/5">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <tr key={product._id} className="hover:bg-off-white-warm/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-16 flex-shrink-0 bg-off-white-warm border border-slate-dark/5 overflow-hidden">
                              {product.images && product.images.length > 0 ? (
                                <img
                                  className="w-full h-full object-cover"
                                  src={product.images[0]}
                                  alt={product.name}
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-slate-dark/20 uppercase tracking-tighter text-center">No DNA</div>
                              )}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-black text-slate-dark uppercase tracking-tighter leading-tight">{product.name}</span>
                              <span className="text-[9px] font-bold text-slate-dark/20 uppercase tracking-widest italic tracking-tighter">{product._id.toString().slice(-8)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-dark tracking-widest leading-none">{product.mainCategory || 'OTHER'}</span>
                            <span className="text-[8px] font-bold text-slate-dark/30 uppercase tracking-widest italic">
                              {product.category?.replace('-', ' ')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[9px] font-black text-slate-dark/40 tracking-widest uppercase italic">{product.brand}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black text-slate-dark">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice > product.price && (
                              <span className="text-[8px] font-bold text-slate-dark/20 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${getTotalStock(product.sizes) > 20 ? 'bg-green-400' :
                              getTotalStock(product.sizes) > 0 ? 'bg-orange-400' : 'bg-red-400'
                              }`}></div>
                            <span className="text-[10px] font-black text-slate-dark/60 italic">{getTotalStock(product.sizes)} <span className="opacity-30">UNIT</span></span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 border ${product.inStock ? 'border-slate-dark text-slate-dark' : 'border-slate-dark/10 text-slate-dark/20'}`}>
                            {product.inStock ? 'Active' : 'Archived'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1.5 ">
                            <button
                              onClick={() => handleEditProduct(product._id)}
                              className="w-8 h-8 bg-slate-dark text-white flex items-center justify-center hover:bg-black transition-colors"
                              title="Refine Asset"
                            >
                              <FaEdit className="text-[10px]" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id, product.name)}
                              className="w-8 h-8 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                              title="Expunge Asset"
                            >
                              <FaTrash className="text-[10px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-8 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="space-y-1">
                            <h3 className="text-lg font-black text-slate-dark uppercase tracking-wider">No Records</h3>
                            <p className="text-[9px] font-bold text-slate-dark/40 uppercase tracking-widest">Query returned null.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Premium Pagination */}
            {totalPages > 1 && (
              <div className="px-12 py-10 bg-off-white-warm/30 border-t border-slate-dark/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.2em]">
                  Showing Page <span className="text-slate-dark">{currentPage}</span> of <span className="text-slate-dark">{totalPages}</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-full border border-slate-dark/10 flex items-center justify-center text-slate-dark disabled:opacity-20 hover:border-slate-dark transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-full border border-slate-dark/10 flex items-center justify-center text-slate-dark disabled:opacity-20 hover:border-slate-dark transition-all"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
