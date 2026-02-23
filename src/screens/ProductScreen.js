import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Product from '../components/Product';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/related/${id}`);
        setRelatedProducts(data);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    if (id) {
      fetchRelatedProducts();
    }
  }, [id]);

  // Reset selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize('');
      setCurrentImageIndex(0);
    }
  }, [product]);

  // Reset image index when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  const addToCartHandler = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    // Get size data from color variant or default sizes
    let sizeData;
    if (product.colorVariants && product.colorVariants[selectedColor]) {
      sizeData = product.colorVariants[selectedColor].sizes.find(s => s.size === selectedSize);
    } else {
      sizeData = product.sizes.find(s => s.size === selectedSize);
    }

    if (!sizeData || sizeData.stock === 0) {
      toast.error('Selected size is out of stock');
      return;
    }

    // Get image from color variant or default images
    let productImage;
    if (product.colorVariants && product.colorVariants[selectedColor]) {
      productImage = product.colorVariants[selectedColor].images[currentImageIndex] || product.colorVariants[selectedColor].images[0];
    } else {
      productImage = product.images[currentImageIndex] || product.images[0];
    }

    dispatch(addToCart({
      _id: product._id,
      name: product.name,
      image: productImage,
      price: product.price,
      countInStock: sizeData.stock,
      size: selectedSize,
      color: selectedColor,
      qty: Number(qty)
    }));

    toast.success('Added to cart!');
  };

  const toggleWishlist = () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };


  // Use useMemo to recalculate when selectedColor or product changes
  const currentImages = useMemo(() => {
    if (product?.colorVariants && selectedColor && product.colorVariants[selectedColor]) {
      return product.colorVariants[selectedColor].images || [];
    }
    return product?.images || [];
  }, [product, selectedColor]);

  const availableSizes = useMemo(() => {
    if (product?.colorVariants && selectedColor && product.colorVariants[selectedColor]) {
      return product.colorVariants[selectedColor].sizes.filter(size => size.stock > 0);
    }
    return product?.sizes?.filter(size => size.stock > 0) || [];
  }, [product, selectedColor]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!product) return <Message variant="danger">Product not found</Message>;

  return (
    <>
      <Meta title={product.name} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <Link className="inline-flex items-center mb-6 text-slate-dark/40 hover:text-slate-dark transition-all duration-300 font-black text-[9px] uppercase tracking-[0.3em]" to="/">
          <span className="mr-2 text-base">←</span> BACK
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Product Image Gallery */}
          <div className="space-y-3">
            <div className="relative group overflow-hidden rounded-[1.5rem] bg-off-white-warm aspect-[1/1] shadow-xl">
              {currentImages.length > 0 ? (
                <img
                  src={currentImages[currentImageIndex] || currentImages[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-300 font-black tracking-widest uppercase text-[10px]">No Visual</span>
                </div>
              )}

              {/* Image Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {currentImages.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                  {currentImages.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1 transition-all duration-500 rounded-full ${index === currentImageIndex
                        ? 'w-12 bg-white'
                        : 'w-4 bg-white/30 hover:bg-white/60'
                        }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {currentImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {currentImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex ? 'border-slate-dark scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:pl-8 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/30">
                  {product.brand || 'Premium'}
                </span>
                <div className="flex items-center bg-yellow-400/10 px-2 py-0.5 rounded-full">
                  <FaStar className="text-yellow-400 mr-1.5" size={10} />
                  <span className="text-[10px] font-black text-slate-dark">{product.rating}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-dark tracking-tighter leading-tight uppercase break-words">
                {product.name}
              </h1>

              {/* Price Display */}
              <div className="flex items-center gap-4 py-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-dark">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-[10px] font-bold text-red-500">
                      SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="h-8 w-[1px] bg-slate-dark/10"></div>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg text-slate-dark/20 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              <p className="text-slate-dark/50 text-sm leading-relaxed font-medium border-l-2 border-slate-dark/10 pl-4 py-1">
                {product.description}
              </p>
            </div>

            {/* Refined Selection Controls */}
            <div className="space-y-6 pt-2">
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-dark/40">Variation</span>
                    <span className="text-[10px] font-bold text-slate-dark">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        className={`px-5 py-2 rounded-lg border transition-all duration-300 font-black text-[9px] uppercase tracking-widest ${selectedColor === color
                          ? 'bg-slate-dark text-white border-slate-dark shadow-lg -translate-y-0.5'
                          : 'bg-white text-slate-dark border-slate-dark/5 hover:border-slate-dark/20'
                          }`}
                        onClick={() => {
                          setSelectedColor(color);
                          setSelectedSize('');
                        }}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-dark/40">Fit</span>
                  <span className="text-[10px] font-bold text-slate-dark">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size.size}
                      className={`w-10 h-10 rounded-lg border transition-all duration-300 font-black text-[10px] flex items-center justify-center ${selectedSize === size.size
                        ? 'bg-slate-dark text-white border-slate-dark shadow-lg -translate-y-0.5'
                        : 'bg-white text-slate-dark border-slate-dark/5 hover:border-slate-dark/20'
                        }`}
                      onClick={() => setSelectedSize(size.size)}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-dark/40 mb-1">Qty</span>
                  <div className="flex items-center bg-off-white-warm rounded-lg p-0.5 border border-slate-dark/5">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 flex items-center justify-center font-black text-sm hover:bg-white rounded-md transition-all"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-black text-[11px]">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(10, qty + 1))}
                      className="w-8 h-8 flex items-center justify-center font-black text-sm hover:bg-white rounded-md transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-dark/40 mb-1">Price</span>
                  <span className="text-xl font-black text-slate-dark h-9 flex items-center">₹{(product.price * qty).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addToCartHandler}
                  disabled={!product.inStock || availableSizes.length === 0}
                  className={`flex-[4] py-4 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 transform active:scale-95 shadow-lg flex items-center justify-center gap-3 ${!product.inStock || availableSizes.length === 0
                    ? 'bg-slate-dark/10 text-slate-dark/20 cursor-not-allowed'
                    : 'bg-slate-dark text-white hover:bg-black hover:shadow-xl'
                    }`}
                >
                  <FaShoppingCart size={12} />
                  {!product.inStock ? 'Out of Stock' : 'Secure In-Bag'}
                </button>

                <button
                  onClick={toggleWishlist}
                  className={`w-14 h-14 rounded-2xl border transition-all duration-500 flex items-center justify-center transform hover:scale-105 ${isWishlisted
                      ? 'bg-red-50 border-red-100 text-red-500'
                      : 'bg-white border-slate-dark/5 text-slate-dark/20 hover:text-slate-dark hover:border-slate-dark/20'
                    }`}
                >
                  <FaHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-beige-soft/30 pt-12">
            <h2 className="text-4xl font-black text-slate-dark mb-10 tracking-tighter uppercase text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct._id} className="group">
                  <Product product={relatedProduct} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
