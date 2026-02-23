import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { FaFilter, FaSort } from 'react-icons/fa';
import { fetchProducts, fetchFilterOptions } from '../store/slices/productSlice';
import Product from '../components/Product';
import ProductCarousel from '../components/ProductCarousel';
import HeroSlider from '../components/HeroSlider';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { keyword, pageNumber, category } = useParams();

  const { products, loading, error, page, pages, filterOptions } = useSelector((state) => state.product);
  console.log('Products from Redux**************************************:', products);
  console.log('Products count:', products ? products.length : 0);
  if (products && products.length > 0) {
    console.log('First product:', products[0]);
    console.log('First product images:', products[0].images);
    console.log('Product categories:', [...new Set(products.map(p => p.category))]);
    console.log('Products per category:');
    const categoryCounts = {};
    products.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
    console.log(categoryCounts);

    // Check for invalid products
    const invalidProducts = products.filter(p => !p._id || !p.name || !p.category || !p.images || p.images.length === 0);
    if (invalidProducts.length > 0) {
      console.log('Invalid products found:', invalidProducts.length);
      console.log('Invalid products:', invalidProducts);
    }
  }
  // Filter states
  const [filters, setFilters] = useState({
    category: category || '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    featured: false,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    color: '',
    size: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  // Fetch filter options on component mount
  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  useEffect(() => {
    const params = {
      pageNumber: pageNumber || 1
    };

    // Only add non-empty filter values
    if (filters.category) params.category = filters.category;
    if (filters.brand) params.brand = filters.brand;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.color) params.color = filters.color;
    if (filters.size) params.size = filters.size;
    if (filters.inStock) params.inStock = filters.inStock;
    if (filters.featured) params.featured = filters.featured;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.sortOrder) params.sortOrder = filters.sortOrder;

    if (keyword) {
      params.keyword = keyword;
    }

    if (category) {
      params.category = category;
    }

    // For homepage, fetch more products to show in carousels
    if (!keyword && !category) {
      params.pageSize = 200; // Fetch all products for homepage to ensure all categories are represented
    }

    dispatch(fetchProducts(params));
  }, [dispatch, keyword, pageNumber, category, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: category || '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      inStock: false,
      featured: false,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      color: '',
      size: ''
    });
  };

  // Get category display name
  const getCategoryDisplayName = (cat) => {
    const categoryNames = {
      // Men's Categories
      'tshirt': 'Men\'s T-Shirts',
      'shirt': 'Men\'s Shirts',
      'jeans': 'Men\'s Jeans',
      'sneakers': 'Men\'s Sneakers',
      'cargo': 'Men\'s Cargo',
      'trousers': 'Men\'s Trousers',
      'hoodies-sweaters': 'Men\'s Hoodies & Sweaters',
      'flipflop': 'Men\'s Flip Flops',
      'men-sport': 'Men\'s Sport',
      'men-accessories': 'Men\'s Accessories',

      // Ladies' Categories
      'ladies-tshirt': 'Ladies\' T-Shirts',
      'ladies-shirt': 'Ladies\' Shirts',
      'ladies-jeans': 'Ladies\' Jeans',
      'ladies-shorts': 'Ladies\' Shorts',
      'coord-set': 'Ladies\' Co-ord Sets',
      'ladies-cargo': 'Ladies\' Cargo',
      'ladies-trousers': 'Ladies\' Trousers',
      'ladies-hoodies': 'Ladies\' Hoodies',
      'ladies-sport': 'Ladies\' Sport',
      'ladies-clothing': 'Ladies\' Clothing',
      'ladies-accessories': 'Ladies\' Accessories',
      'lingerie': 'Ladies\' Lingerie',

      // Legacy categories (if still needed)
      'mobile': 'Mobile Phones',
      'watches': 'Watches',
      'bags': 'Bags',
      'ladies': 'Ladies\' Collection',

      // Kids' Categories
      'kids-clothing': 'Kids\' Clothing',
      'kids-shoes': 'Kids\' Shoes',
      'kids-accessories': 'Kids\' Accessories',
      'boys': 'Boys Collection',
      'girls': 'Girls Collection',
      'infants': 'Infants',

      // Sports Categories
      'activewear': 'Activewear',
      'performance': 'Performance gear',
      'gym-gear': 'Gym Essentials',
      'running': 'Running Gear',
      'training': 'Training Wear'
    };
    return categoryNames[cat] || cat;
  };

  // If it's homepage (no keyword or category), show carousels
  if (!keyword && !category) {
    return (
      <>
        <Meta />

        {/* Hero Image Slider */}
        <HeroSlider />

        {/* Featured Products Section Redesign */}
        <div className="relative py-24 bg-white overflow-hidden">
          {/* Decorative background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full overflow-hidden">
            <h2 className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-black text-slate-dark/[0.05] leading-none text-center italic">FEATURED</h2>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-slate-dark"></div>
                  <span className="text-slate-dark/50 font-black tracking-widest text-xs uppercase">Curated Selection</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-dark tracking-tighter leading-[0.9]">
                  CURATED <br />
                  <span>EXCELLENCE.</span>
                </h2>
                <p className="text-slate-dark/50 text-lg font-medium">
                  Handpicked pieces that represent the intersection of luxury and street culture.
                </p>
              </div>

              <Link to="/category/sneakers" className="group flex items-center gap-4 text-slate-dark font-black uppercase tracking-widest text-sm hover:opacity-70 transition-all">
                View Entire Gallery
                <div className="w-12 h-12 rounded-full border border-slate-dark/20 flex items-center justify-center group-hover:bg-slate-dark group-hover:text-white transition-all duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>

            {products && products.filter(p => p.featured).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {products.filter(p => p.featured).slice(0, 8).map((product, idx) => (
                  <div
                    key={product._id}
                    className={`animate-fade-in`}
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="relative group mb-6">
                      <div className="absolute -inset-4 bg-slate-dark/[0.03] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 rounded-2xl -z-10"></div>
                      <Product product={product} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-dark/[0.03] rounded-3xl border-2 border-dashed border-slate-dark/10">
                <p className="text-slate-dark/40 font-bold italic">Gathering our most exclusive pieces...</p>
              </div>
            )}
          </div>
        </div>

        {/* Product Carousels */}
        <div className="space-y-8">
          {/* Men's Categories */}
          <div className="space-y-6">
            {/* Men's Collection Header Redesign */}
            <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-dark overflow-hidden rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 mb-8 md:mb-12 min-w-0 group hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] transition-all duration-700">
              {/* Background Watermark */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-20 overflow-hidden">
                <h2 className="text-[80px] sm:text-[120px] md:text-[150px] lg:text-[180px] font-black text-white leading-none ml-[-30px] sm:ml-[-50px] italic">GENTS</h2>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-slate-dark/20"></div>
                    <span className="text-slate-dark/60 font-black tracking-widest text-xs uppercase">Men's Wardrobe</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-white tracking-tighter leading-[0.85]">
                    MODERN <br />
                    <span>ESSENTIALS.</span>
                  </h2>
                  <p className="text-white/80 text-xl font-medium max-w-md leading-relaxed">
                    Premium craftsmanship for the contemporary man. Defined by quality, designed for life.
                  </p>
                </div>

                {/* Right Visual for Men */}
                <div className="hidden lg:block relative group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl relative border-4 border-white/5">
                    <img
                      src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop"
                      alt="Modern Men's Fashion"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl z-20">
                    <p className="text-slate-dark font-black text-2xl">2024</p>
                    <p className="text-slate-dark/40 text-[10px] font-bold uppercase tracking-widest">Collection</p>
                  </div>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 right-0 w-1/3 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
            </div>

            {/* Men's T-Shirts */}
            <ProductCarousel
              title="MEN'S T-SHIRTS"
              products={products.filter(p => p.category === 'tshirt')}
              category="tshirt"
              theme="mens"
            />

            {/* Men's Shirts */}
            <ProductCarousel
              title="MEN'S SHIRTS"
              products={products.filter(p => p.category === 'shirt')}
              category="shirt"
              theme="mens"
            />

            {/* Men's Jeans */}
            <ProductCarousel
              title="MEN'S JEANS"
              products={products.filter(p => p.category === 'jeans')}
              category="jeans"
              theme="mens"
            />

            {/* Men's Sneakers */}
            <ProductCarousel
              title="MEN'S SNEAKERS"
              products={products.filter(p => p.category === 'sneakers')}
              category="sneakers"
              theme="mens"
            />

            {/* Men's Cargo */}
            <ProductCarousel
              title="MEN'S CARGO"
              products={products.filter(p => p.category === 'cargo')}
              category="cargo"
              theme="mens"
            />

            {/* Men's Trousers */}
            <ProductCarousel
              title="MEN'S TROUSERS"
              products={products.filter(p => p.category === 'trousers')}
              category="trousers"
              theme="mens"
            />

            {/* Men's Hoodies & Sweaters */}
            <ProductCarousel
              title="MEN'S HOODIES & SWEATERS"
              products={products.filter(p => p.category === 'hoodies-sweaters')}
              category="hoodies-sweaters"
              theme="mens"
            />

            {/* Men's Flip Flops */}
            <ProductCarousel
              title="MEN'S FLIP FLOPS"
              products={products.filter(p => p.category === 'flipflop')}
              category="flipflop"
              theme="mens"
            />

            {/* Men's Sport */}
            <ProductCarousel
              title="MEN'S SPORT"
              products={products.filter(p => p.category === 'men-sport')}
              category="men-sport"
              theme="mens"
            />

            {/* Men's Accessories */}
            <ProductCarousel
              title="MEN'S ACCESSORIES"
              products={products.filter(p => p.category === 'men-accessories')}
              category="men-accessories"
              theme="mens"
            />
          </div>

          {/* Ladies' Categories */}
          <div className="space-y-6">
            {/* Ladies' Collection Header Redesign */}
            <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 mb-8 md:mb-12 border border-slate-dark/10 shadow-sm min-w-0 group hover:shadow-xl transition-all duration-700">
              {/* Background Watermark */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.08] overflow-hidden">
                <h2 className="text-[80px] sm:text-[120px] md:text-[150px] lg:text-[180px] font-black text-slate-dark leading-none mr-[-30px] sm:mr-[-50px] italic">WOMEN</h2>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 lg:grid lg:grid-cols-2 lg:gap-12 items-center">
                {/* Left Visual for Ladies */}
                <div className="hidden lg:block relative group-hover:scale-[1.02] transition-transform duration-700">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl relative border-4 border-slate-dark/5">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop"
                      alt="Timeless Ladies' Fashion"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-slate-dark text-white p-6 rounded-xl shadow-2xl z-20">
                    <p className="font-black text-2xl italic tracking-tighter">PREMIUM</p>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Quality Only</p>
                  </div>
                </div>

                <div className="space-y-6 max-w-2xl text-right flex flex-col items-end">
                  <div className="flex items-center gap-3 justify-end">
                    <span className="text-slate-dark/70 font-black tracking-widest text-xs uppercase">Elegance Redefined</span>
                    <div className="w-12 h-[2px] bg-slate-dark/40"></div>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-slate-dark tracking-tighter leading-[0.85]">
                    TIMELESS <br />
                    <span>ELEGANCE.</span>
                  </h2>
                  <p className="text-slate-dark/80 text-xl font-medium max-w-md ml-auto leading-relaxed">
                    Curated pieces for the bold and sophisticated. Explore the latest in feminine fashion.
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute top-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-slate-dark/10 to-transparent"></div>
            </div>

            {/* Ladies' T-Shirts */}
            <ProductCarousel
              title="LADIES' T-SHIRTS"
              products={products.filter(p => p.category === 'ladies-tshirt')}
              category="ladies-tshirt"
              theme="ladies"
            />

            {/* Ladies' Shirts */}
            <ProductCarousel
              title="LADIES' SHIRTS"
              products={products.filter(p => p.category === 'ladies-shirt')}
              category="ladies-shirt"
              theme="ladies"
            />

            {/* Ladies' Jeans */}
            <ProductCarousel
              title="LADIES' JEANS"
              products={products.filter(p => p.category === 'ladies-jeans')}
              category="ladies-jeans"
              theme="ladies"
            />

            {/* Ladies' Shorts */}
            <ProductCarousel
              title="LADIES' SHORTS"
              products={products.filter(p => p.category === 'ladies-shorts')}
              category="ladies-shorts"
              theme="ladies"
            />

            {/* Ladies' Co-ord Sets */}
            <ProductCarousel
              title="LADIES' CO-ORD SETS"
              products={products.filter(p => p.category === 'coord-set')}
              category="coord-set"
              theme="ladies"
            />

            {/* Ladies' Cargo */}
            <ProductCarousel
              title="LADIES' CARGO"
              products={products.filter(p => p.category === 'ladies-cargo')}
              category="ladies-cargo"
              theme="ladies"
            />

            {/* Ladies' Trousers */}
            <ProductCarousel
              title="LADIES' TROUSERS"
              products={products.filter(p => p.category === 'ladies-trousers')}
              category="ladies-trousers"
              theme="ladies"
            />

            {/* Ladies' Hoodies */}
            <ProductCarousel
              title="LADIES' HOODIES"
              products={products.filter(p => p.category === 'ladies-hoodies')}
              category="ladies-hoodies"
              theme="ladies"
            />

            {/* Ladies' Sport */}
            <ProductCarousel
              title="LADIES' SPORT"
              products={products.filter(p => p.category === 'ladies-sport')}
              category="ladies-sport"
              theme="ladies"
            />

            {/* Ladies' Clothing */}
            <ProductCarousel
              title="LADIES' CLOTHING"
              products={products.filter(p => p.category === 'ladies-clothing')}
              category="ladies-clothing"
              theme="ladies"
            />

            {/* Ladies' Accessories */}
            <ProductCarousel
              title="LADIES' ACCESSORIES"
              products={products.filter(p => p.category === 'ladies-accessories')}
              category="ladies-accessories"
              theme="ladies"
            />

            {/* Ladies' Lingerie */}
            <ProductCarousel
              title="LADIES' LINGERIE"
              products={products.filter(p => p.category === 'lingerie')}
              category="lingerie"
              theme="ladies"
            />

            {/* Kids Section Heading */}
            <div className="pt-12 sm:pt-16 md:pt-20 pb-6 md:pb-10">
              <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-dark tracking-tighter uppercase whitespace-nowrap">KIDS ARCHIVE</h2>
                <div className="w-full h-[1px] bg-slate-dark/10"></div>
              </div>
            </div>

            {/* Kids' Clothing */}
            <ProductCarousel
              title="KIDS' SELECTION"
              products={products.filter(p => ['kids-clothing', 'boys', 'girls', 'infants'].includes(p.category))}
              category="kids-clothing"
              theme="men"
            />

            {/* Sports Section Heading */}
            <div className="pt-12 sm:pt-16 md:pt-20 pb-6 md:pb-10">
              <div className="flex items-center gap-3 sm:gap-4 text-right flex-row-reverse overflow-hidden">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-dark tracking-tighter uppercase whitespace-nowrap">PERFORMANCE HUB</h2>
                <div className="w-full h-[1px] bg-slate-dark/10"></div>
              </div>
            </div>

            {/* Sports Activewear */}
            <ProductCarousel
              title="ELITE PERFORMANCE"
              products={products.filter(p => ['activewear', 'performance', 'gym-gear', 'running', 'training', 'men-sport', 'ladies-sport'].includes(p.category))}
              category="activewear"
              theme="men"
            />
          </div>
        </div>

      </>
    );
  }

  // For search/category pages, show the original layout
  return (
    <>
      <Meta />

      {/* Premium Minimalist Category Header */}
      <div className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden border-b border-slate-dark/5">
        {/* Decorative Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] w-full text-center overflow-hidden">
          <h2 className="text-[100px] sm:text-[160px] md:text-[200px] lg:text-[240px] font-black text-slate-dark leading-none tracking-tighter">
            {category ? category.split('-')[0].toUpperCase() : 'STORE'}
          </h2>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-slate-dark/20"></div>
              <span className="text-[10px] font-black tracking-[0.4em] text-slate-dark/40 uppercase">
                {keyword ? 'Search Results' : category ? 'Curated Collection' : 'Premium Selection'}
              </span>
              <div className="w-12 h-[1px] bg-slate-dark/20"></div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black text-slate-dark tracking-tighter leading-none uppercase break-words">
              {keyword ? keyword : category ? getCategoryDisplayName(category).split("'s ")[1] || getCategoryDisplayName(category) : 'All Essentials'}
            </h1>

            <p className="text-slate-dark/60 text-xl font-medium max-w-2xl leading-relaxed">
              {keyword ? `Exploring the best matches for "${keyword}" in our premium vault.` :
                category ? `Discover the pinnacle of ${getCategoryDisplayName(category).toLowerCase()} designed for modern living.` :
                  'Explore our complete archive of timeless designs and exclusive seasonal releases.'}
            </p>
          </div>
        </div>

        {/* Floating Accent */}
        <div className="absolute bottom-0 left-0 w-1/4 h-[2px] bg-gradient-to-r from-slate-dark/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Refined Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-slate-dark/5 overflow-hidden lg:sticky lg:top-24">
              <div className="bg-slate-dark p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-white">
                  <FaFilter className="text-xs" />
                  <span className="font-black text-[10px] uppercase tracking-[0.3em]">Refine By</span>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  {showFilters ? 'Hide' : 'Show'}
                </button>
              </div>

              {showFilters && (
                <div className="p-6 space-y-8">
                  {/* Category Filter */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-dark/40">Collection</span>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full bg-off-white-warm px-4 py-3 rounded-xl font-bold text-[11px] text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">All Essentials</option>
                      {filterOptions.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Size Filter - Pill Style */}
                  <div className="space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-dark/40">Fits</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleFilterChange('size', '')}
                        className={`px-3 py-2 rounded-lg text-[10px] font-black transition-all duration-300 border ${!filters.size
                          ? 'bg-slate-dark text-white border-slate-dark'
                          : 'bg-white text-slate-dark border-slate-dark/5 hover:border-slate-dark/20'
                          }`}
                      >
                        ALL
                      </button>
                      {filterOptions.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleFilterChange('size', size)}
                          className={`px-3 py-2 rounded-lg text-[10px] font-black transition-all duration-300 border ${filters.size === size
                            ? 'bg-slate-dark text-white border-slate-dark shadow-lg'
                            : 'bg-white text-slate-dark border-slate-dark/5 hover:border-slate-dark/20'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-dark/40">Price Range</span>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full bg-off-white-warm px-4 py-3 rounded-xl font-bold text-[11px] text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all placeholder:text-slate-dark/20"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full bg-off-white-warm px-4 py-3 rounded-xl font-bold text-[11px] text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all placeholder:text-slate-dark/20"
                      />
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-dark/40">Makers</span>
                    <select
                      value={filters.brand || ''}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="w-full bg-off-white-warm px-4 py-3 rounded-xl font-bold text-[11px] text-slate-dark border border-slate-dark/5 focus:border-slate-dark/20 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Legacy Brands</option>
                      {filterOptions.brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Color Filter */}
                  <div className="space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-dark/40">Colours</span>
                    <div className="flex flex-wrap gap-2">
                      {filterOptions.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => handleFilterChange('color', color)}
                          className={`px-3 py-2 rounded-lg text-[10px] font-black transition-all duration-300 border uppercase tracking-tighter ${filters.color === color
                            ? 'bg-slate-dark text-white border-slate-dark shadow-lg'
                            : 'bg-white text-slate-dark border-slate-dark/5 hover:border-slate-dark/20'
                            }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* In Stock Only */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-dark/5">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-dark/40">Ready to Ship</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-slate-dark/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-dark/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-dark"></div>
                    </label>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="w-full px-6 py-4 bg-slate-dark text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Archive */}
          <div className="lg:col-span-3 space-y-12">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-off-white-warm/50 p-4 rounded-2xl sm:rounded-3xl border border-slate-dark/5">
              <div className="flex items-center space-x-3">
                <FaSort className="text-slate-dark/30 text-xs" />
                <span className="font-black text-[9px] uppercase tracking-widest text-slate-dark/40">Perspective</span>
              </div>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="bg-transparent font-black text-[10px] uppercase tracking-widest text-slate-dark focus:outline-none cursor-pointer"
              >
                <option value="createdAt-desc">Recommended</option>
                <option value="rating-desc">Best Rated</option>
                <option value="price-asc">Price Ascending</option>
                <option value="price-desc">Price Descending</option>
              </select>
            </div>

            {/* Products Grid Archive */}
            <div className="min-h-[600px] relative">
              {loading && (
                <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-3xl transition-all duration-300">
                  <div className="flex flex-col items-center gap-4">
                    <Loader />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-dark/40 animate-pulse">Refreshing Archive</span>
                  </div>
                </div>
              )}

              {error ? (
                <div className="py-12">
                  <Message variant="danger">{error}</Message>
                </div>
              ) : (
                <div className={`transition-all duration-700 ${loading ? 'opacity-20 blur-[2px] scale-[0.98]' : 'opacity-100 scale-100'}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {products.map((product) => (
                      <div key={product._id} className="group">
                        <Product product={product} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-16">
                    <Paginate
                      pages={pages}
                      page={page}
                      keyword={keyword ? keyword : ''}
                      category={category ? category : ''}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
