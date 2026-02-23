import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
import { createProduct } from '../store/slices/productSlice';
import CustomDropdown from '../components/CustomDropdown';

const ProductAddScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    originalPrice: '',
    mainCategory: '',
    category: '',
    images: [''],
    sizes: [{ size: '', stock: '' }],
    colors: [''],
    inStock: true,
    featured: false,
    rating: 0,
    numReviews: 0,
    tags: ['']
  });

  const { loading } = useSelector((state) => state.product);

  const mainCategories = ['MEN', 'LADIES', 'KIDS', 'SPORTS', 'OTHER'];

  const categoryMapping = {
    'MEN': ['tshirt', 'shirt', 'cargo', 'jeans', 'trousers', 'hoodies-sweaters', 'flipflop', 'sneakers', 'men-clothing', 'men-accessories', 'men-sport'],
    'LADIES': ['ladies-tshirt', 'ladies-shirt', 'ladies-cargo', 'ladies-jeans', 'ladies-trousers', 'ladies-hoodies', 'ladies-shorts', 'coord-set', 'ladies-clothing', 'ladies-shoes', 'ladies-accessories', 'lingerie', 'ladies-sport'],
    'KIDS': ['kids-clothing', 'kids-shoes', 'kids-accessories', 'boys', 'girls', 'infants'],
    'SPORTS': ['activewear', 'performance', 'gym-gear', 'running', 'training', 'men-sport', 'ladies-sport'],
    'OTHER': ['sneakers', 'shirts', 'pants', 'mobile', 'watches', 'bags', 'apparel', 'accessories', 'collectibles']
  };

  const getSubCategories = () => {
    if (!formData.mainCategory) return [];
    return categoryMapping[formData.mainCategory] || [];
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSizeItem = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', stock: '' }]
    }));
  };

  const removeSizeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const handleSizeChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.map((size, i) =>
        i === index ? { ...size, [field]: value } : size
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clean up form data
    const cleanedData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice) || undefined,
      images: formData.images.filter(img => img.trim() !== ''),
      colors: formData.colors.filter(color => color.trim() !== ''),
      tags: formData.tags.filter(tag => tag.trim() !== ''),
      sizes: formData.sizes
        .filter(size => size.size.trim() !== '' && size.stock !== '')
        .map(size => ({
          size: size.size.trim(),
          stock: parseInt(size.stock)
        }))
    };

    try {
      await dispatch(createProduct(cleanedData)).unwrap();
      toast.success('Product created successfully!');
      navigate('/admin/productlist');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error?.message || 'Error creating product');
    }
  };

  return (
    <>
      <Meta title="Create Masterpiece | Mearn Admin" />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-dark/40 uppercase">Inventory Management</span>
            </div>
            <h1 className="text-5xl font-black text-slate-dark tracking-tighter uppercase leading-none">Add New Product</h1>
          </div>
          <button
            onClick={() => navigate('/admin/productlist')}
            className="group flex items-center gap-3 text-slate-dark/40 hover:text-slate-dark transition-all duration-300"
          >
            <span className="font-black text-[10px] uppercase tracking-[0.3em]">Back to Archive</span>
            <div className="w-10 h-10 rounded-full border border-slate-dark/10 flex items-center justify-center group-hover:border-slate-dark transition-colors">
              <span className="text-lg">✕</span>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Attributes - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Identity Card */}
            <div className="bg-white rounded-3xl border border-slate-dark/5 p-8 shadow-sm">
              <h3 className="text-xs font-black tracking-[0.3em] text-slate-dark/30 uppercase mb-8">Identity & Story</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-dark/60 ml-4">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark focus:bg-white focus:ring-2 focus:ring-slate-dark/10 transition-all outline-none border-none"
                      placeholder="e.g. Urban Classic Tee"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-dark/60 ml-4">Brand Signature</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark focus:bg-white focus:ring-2 focus:ring-slate-dark/10 transition-all outline-none border-none"
                      placeholder="Brand name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-dark/60 ml-4">Product Narrative</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark focus:bg-white focus:ring-2 focus:ring-slate-dark/10 transition-all outline-none border-none resize-none"
                    placeholder="Describe the aesthetic and material quality..."
                  />
                </div>
              </div>
            </div>

            {/* Media Card */}
            <div className="bg-white rounded-3xl border border-slate-dark/5 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8 text-xs font-black tracking-[0.3em] text-slate-dark/30 uppercase">
                <h3>Visual Portfolio</h3>
                <span>{formData.images.filter(img => img).length} Assets</span>
              </div>
              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-3 group">
                    <div className="flex-grow space-y-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleArrayInputChange('images', index, e.target.value)}
                        className="w-full bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark focus:bg-white focus:ring-2 focus:ring-slate-dark/10 transition-all outline-none border-none"
                        placeholder="Image URL (Unsplash or CDN)"
                      />
                    </div>
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('images', index)}
                        className="w-14 h-14 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('images')}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-dark/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-dark/40 hover:border-slate-dark/30 hover:text-slate-dark transition-all"
                >
                  + Add Visual Asset
                </button>
              </div>
            </div>

            {/* Inventory Card */}
            <div className="bg-white rounded-3xl border border-slate-dark/5 p-8 shadow-sm">
              <h3 className="text-xs font-black tracking-[0.3em] text-slate-dark/30 uppercase mb-8">Stock & Sizing</h3>
              <div className="space-y-4">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 group">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      className="bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark outline-none border-none"
                      placeholder="Size (e.g. L)"
                    />
                    <input
                      type="number"
                      value={size.stock}
                      onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
                      className="bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark outline-none border-none"
                      placeholder="Quantity"
                    />
                    <div className="flex gap-2">
                      <div className="flex-grow"></div>
                      {formData.sizes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSizeItem(index)}
                          className="w-14 h-14 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSizeItem}
                  className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-dark/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-dark/40 hover:border-slate-dark/30 hover:text-slate-dark transition-all"
                >
                  + Add Size Variant
                </button>
              </div>
            </div>
          </div>

          {/* Classification & Pricing - Right Column */}
          <div className="space-y-8">
            {/* Classification Card */}
            <div className="bg-slate-dark rounded-3xl p-8 shadow-xl text-white">
              <h3 className="text-[10px] font-black tracking-[0.3em] text-white/40 uppercase mb-8">Classification</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-4">Main Division</label>
                  <CustomDropdown
                    options={[
                      { label: 'Select Division', value: '' },
                      ...mainCategories.map(cat => ({ label: cat, value: cat }))
                    ]}
                    value={formData.mainCategory}
                    onChange={(val) => {
                      setFormData(prev => ({
                        ...prev,
                        mainCategory: val,
                        category: ''
                      }));
                    }}
                    className="w-full !p-0 !bg-transparent !border-none !shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/60 ml-4">Sub Category</label>
                  <CustomDropdown
                    options={[
                      { label: 'Select Category', value: '' },
                      ...getSubCategories().map(cat => ({
                        label: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                        value: cat
                      }))
                    ]}
                    value={formData.category}
                    onChange={(val) => {
                      setFormData(prev => ({
                        ...prev,
                        category: val
                      }));
                    }}
                    className={`w-full !p-0 !bg-transparent !border-none !shadow-none ${!formData.mainCategory ? 'opacity-30 pointer-events-none' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-3xl border border-slate-dark/5 p-8 shadow-sm">
              <h3 className="text-xs font-black tracking-[0.3em] text-slate-dark/30 uppercase mb-8">Pricing Intelligence</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-dark/60 ml-4">Retail Price (INR)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-dark/5 px-6 py-4 rounded-2xl font-black text-xl text-slate-dark outline-none border-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-dark/60 ml-4">Compare At Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="w-full bg-slate-dark/5 px-6 py-4 rounded-2xl font-bold text-slate-dark/40 outline-none border-none"
                    placeholder="MRP"
                  />
                </div>
              </div>
            </div>

            {/* Promotion Card */}
            <div className="bg-white rounded-3xl border border-slate-dark/5 p-8 shadow-sm">
              <h3 className="text-xs font-black tracking-[0.3em] text-slate-dark/30 uppercase mb-8">Visibility</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-off-white-warm rounded-2xl cursor-pointer group hover:bg-slate-dark/5 transition-all">
                  <span className="text-[11px] font-black text-slate-dark uppercase tracking-widest">Featured Active</span>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-slate-dark"
                  />
                </label>
                <label className="flex items-center justify-between p-4 bg-off-white-warm rounded-2xl cursor-pointer group hover:bg-slate-dark/5 transition-all">
                  <span className="text-[11px] font-black text-slate-dark uppercase tracking-widest">In Stock Status</span>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-slate-dark"
                  />
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-dark text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-xs hover:bg-black transition-all shadow-2xl disabled:bg-slate-dark/60"
              >
                {loading ? 'Processing...' : 'Publish to Store'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/productlist')}
                className="w-full mt-4 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-dark/30 hover:text-slate-dark transition-all"
              >
                Discard Draft
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductAddScreen;
