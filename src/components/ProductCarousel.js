import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

const ProductCarousel = ({ title, products, category, theme = 'default' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const productsPerView = 5;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + productsPerView >= products.length ? 0 : prevIndex + productsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - productsPerView < 0 ? Math.max(0, products.length - productsPerView) : prevIndex - productsPerView
    );
  };

  // Auto-scroll effect (desktop only)
  useEffect(() => {
    if (!isAutoScrolling || !products || products.length <= productsPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + productsPerView >= products.length ? 0 : prevIndex + productsPerView
      );
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, products, productsPerView]);

  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  // Filter out invalid products
  const validProducts = products.filter(product =>
    product &&
    product._id &&
    product.name &&
    product.category &&
    product.images &&
    product.images.length > 0
  );

  if (validProducts.length === 0) {
    console.log('No valid products found for category:', title);
    return null;
  }

  // Show all valid products for scrolling effect
  const visibleProducts = validProducts;

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - Category title + VIEW ALL (like image) */}
        <div className="flex items-center justify-between mb-6 md:mb-8 px-1">
          <h2 className="text-xl md:text-2xl font-black text-slate-dark uppercase tracking-tighter">
            {title}
          </h2>
          <Link
            to={category ? `/category/${category}` : '/'}
            className="bg-slate-dark text-white px-6 py-2 md:px-8 md:py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-slate-dark border-2 border-slate-dark transition-all duration-500 shadow-md shrink-0"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Mobile: Horizontal scroll slider (movie-style) */}
        <div className="md:hidden overflow-x-auto overflow-y-hidden pb-4 -mx-4 px-4 scroll-smooth custom-scrollbar">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {visibleProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 w-[160px] snap-start">
                <ProductCard product={product} imageErrors={imageErrors} setImageErrors={setImageErrors} isMobile />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Carousel with arrows */}
        <div
          className="hidden md:block relative overflow-hidden"
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
        >
          {/* Navigation Arrows */}
          {visibleProducts.length > productsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              >
                <FaChevronLeft className="text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            </>
          )}

          {/* Products Container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / productsPerView)}%)`,
              width: `${(visibleProducts.length / productsPerView) * 100}%`
            }}
          >
            {visibleProducts.map((product) => (
              <div key={product._id} className="flex-shrink-0 px-3" style={{ width: `${100 / visibleProducts.length}%` }}>
                <ProductCard product={product} imageErrors={imageErrors} setImageErrors={setImageErrors} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual Product Card Component with Multiple Images
const ProductCard = ({ product, imageErrors, setImageErrors, isMobile = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Get all available images for this product
  const getAllImages = () => {
    let images = [];

    // Add main product images
    if (product.images && product.images.length > 0) {
      images = [...product.images];
    }

    // Add color variant images
    if (product.colorVariants) {
      Object.values(product.colorVariants).forEach(variant => {
        if (variant.images && variant.images.length > 0) {
          images = [...images, ...variant.images];
        }
      });
    }

    // Remove duplicates and limit to 5 images
    const uniqueImages = [...new Set(images)].slice(0, 5);
    return uniqueImages.length > 0 ? uniqueImages : ['https://via.placeholder.com/300x300?text=No+Image'];
  };

  const productImages = getAllImages();

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Mobile compact card (movie-style slider)
  if (isMobile) {
    return (
      <div className="group h-full">
        <div className="product-card bg-white/90 rounded-xl h-full flex flex-col overflow-hidden shadow-sm border border-beige-soft/30">
          <div className="relative overflow-hidden rounded-t-lg aspect-[3/4]">
            <Link to={`/product/${product._id}`}>
              {imageErrors[product._id] ? (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500 text-xs">
                    <div className="text-2xl mb-1">📷</div>
                    <div>Image Not Available</div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={productImages[0] || product.images?.[0] || ''}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageErrors(prev => ({ ...prev, [product._id]: true }))}
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="absolute top-1.5 right-1.5 bg-white/80 text-gray-600 p-1.5 rounded-full"
                  >
                    <FaHeart className="text-xs" />
                  </button>
                </div>
              )}
            </Link>
          </div>
          <div className="p-2.5 flex flex-col flex-grow min-h-0">
            <Link to={`/product/${product._id}`} className="no-underline">
              <h5 className="text-slate-dark font-bold line-clamp-1 text-xs tracking-tight capitalize">
                {product.name?.toLowerCase()}
              </h5>
            </Link>
            <p className="text-slate-dark/40 font-bold text-[9px] uppercase tracking-widest leading-none mt-0.5">{product.brand}</p>
            {product.colors && product.colors.length > 0 && (
              <div className="mt-1.5 flex items-center gap-1">
                <span className="text-[9px] text-gray-500">Avail. Colors:</span>
                <div className="flex gap-0.5">
                  {product.colors.slice(0, 4).map((color, idx) => (
                    <div key={idx} className="w-3 h-3 rounded-full border border-gray-300 shrink-0" style={{ backgroundColor: getColorCode(color) }} />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-auto pt-2 border-t border-beige-soft/30">
              <span className="text-sm font-black text-slate-dark">₹{product.price?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop card
  return (
    <div className="group h-full">
      <div className="product-card bg-white rounded-2xl h-full flex flex-col transform hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-2xl border border-beige-soft/20">
        <div
          className="relative overflow-hidden rounded-t-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to={`/product/${product._id}`}>
            {imageErrors[product._id] ? (
              <div className="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm">Image Not Available</div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={productImages[currentImageIndex] || product.images[0] || ''}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  style={{ minHeight: '256px' }}
                  onError={(e) => {
                    console.log('Image failed to load:', productImages[currentImageIndex], 'Product:', product.name);
                    setImageErrors(prev => ({ ...prev, [product._id]: true }));
                  }}
                />

                {/* Image Navigation Arrows */}
                {productImages.length > 1 && isHovered && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {productImages.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex
                          ? 'bg-white'
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                          }`}
                      />
                    ))}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Add to wishlist functionality
                  }}
                  className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-600 p-2 rounded-full hover:bg-opacity-100 hover:text-red-500 transition-all"
                >
                  <FaHeart className="text-sm" />
                </button>
              </div>
            )}
          </Link>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          {/* Product Name */}
          <Link to={`/product/${product._id}`} className="no-underline">
            <h5 className="text-slate-dark font-bold mb-1 line-clamp-1 hover:text-blue-grey-muted transition-colors text-sm tracking-tight capitalize">
              {product.name.toLowerCase()}
            </h5>
          </Link>

          {/* Brand */}
          <p className="text-slate-dark/40 font-bold text-[10px] mb-3 uppercase tracking-widest leading-none">{product.brand}</p>

          {/* Colors Available */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Available Colors:</p>
              <div className="flex space-x-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: getColorCode(color),
                      backgroundImage: getColorPattern(color)
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <div className="w-4 h-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Price - MRP Format */}
          <div className="mt-auto pt-4 border-t border-beige-soft/30">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-black text-slate-dark">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-slate-dark/30 line-through text-[10px]">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get color codes
const getColorCode = (colorName) => {
  const colorMap = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Red': '#FF0000',
    'Blue': '#0000FF',
    'Navy': '#000080',
    'Gray': '#808080',
    'Green': '#008000',
    'Brown': '#A52A2A',
    'Pink': '#FFC0CB',
    'Lavender': '#E6E6FA',
    'Mint': '#98FB98',
    'Cream': '#F5F5DC',
    'Coral': '#FF7F50',
    'Sage': '#9CAF88',
    'Blush': '#DE5D83',
    'Burgundy': '#800020',
    'Emerald': '#50C878',
    'Olive': '#808000',
    'Camel': '#C19A6B',
    'Khaki': '#F0E68C',
    'Light Blue': '#ADD8E6',
    'Dark Blue': '#00008B'
  };
  return colorMap[colorName] || '#CCCCCC';
};

// Helper function to get color patterns for complex colors
const getColorPattern = (colorName) => {
  const patternMap = {
    'White': 'linear-gradient(45deg, #ffffff 25%, transparent 25%), linear-gradient(-45deg, #ffffff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ffffff 75%), linear-gradient(-45deg, transparent 75%, #ffffff 75%)',
    'Cream': 'linear-gradient(45deg, #F5F5DC 25%, transparent 25%), linear-gradient(-45deg, #F5F5DC 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #F5F5DC 75%), linear-gradient(-45deg, transparent 75%, #F5F5DC 75%)'
  };
  return patternMap[colorName] || 'none';
};

export default ProductCarousel;
