import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../store/slices/cartSlice';
import Meta from '../components/Meta';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  const removeFromCartHandler = (id, size, color) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/checkout');
    } else {
      navigate('/mobile-login?redirect=checkout');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <Meta title="Shopping Cart | YOUTH CIRCLE" />

      {/* Hero Section */}
      <div className="relative min-h-[35vh] sm:min-h-[40vh] flex items-center bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-[140%] h-full bg-slate-dark/5 -skew-x-12 transform origin-top-right"></div>
          </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-dark/[0.03] rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-slate-dark/50 font-black tracking-[0.3em] text-sm uppercase">Your Selection</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-dark leading-[0.9] tracking-tighter">
              YOUR <br />
              <span>CART.</span>
            </h1>
            <p className="text-lg text-slate-dark/60 font-medium max-w-xl">
              {cartItems.length > 0
                ? `${itemCount} item${itemCount !== 1 ? 's' : ''} ready for checkout`
                : 'Add items to get started'}
            </p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <div className="relative py-16 sm:py-24 bg-white rounded-2xl sm:rounded-3xl border border-slate-dark/10 shadow-sm overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full overflow-hidden">
                <h2 className="text-[80px] sm:text-[120px] font-black text-slate-dark/[0.05] leading-none text-center italic">EMPTY</h2>
              </div>
              <div className="relative z-10 text-center px-4">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-dark/5 flex items-center justify-center">
                  <FaShoppingBag className="text-3xl text-slate-dark/30" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-dark tracking-tighter mb-3">Your cart is empty</h2>
                <p className="text-slate-dark/60 font-medium mb-8 max-w-md mx-auto">
                  Looks like you haven't added anything to your cart yet. Explore our collection and find something you love.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-slate-dark text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-slate-dark/90 transition-all duration-300"
                >
                  Continue Shopping
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.size}-${item.color || 'default'}`}
                    className="group bg-white rounded-2xl border border-slate-dark/5 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <Link to={`/product/${item._id}`} className="sm:w-40 md:w-48 shrink-0 aspect-square bg-slate-dark/5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item._id}`}
                            className="text-slate-dark font-black text-lg tracking-tight hover:text-blue-grey-muted transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-dark/60 font-bold uppercase tracking-widest">
                            <span>Size: {item.size}</span>
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                          <p className="mt-2 text-xl font-black text-slate-dark">
                            ₹{item.price.toLocaleString()}
                            {item.qty > 1 && (
                              <span className="text-slate-dark/50 font-bold text-base ml-1">
                                × {item.qty} = ₹{(item.price * item.qty).toLocaleString()}
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-dark/50">Qty</label>
                            <select
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  updateCartItemQuantity({
                                    id: item._id,
                                    size: item.size,
                                    color: item.color,
                                    qty: Number(e.target.value),
                                  })
                                )
                              }
                              className="px-4 py-2.5 border border-slate-dark/10 rounded-xl bg-white text-slate-dark font-bold focus:outline-none focus:ring-2 focus:ring-slate-dark/20 focus:border-slate-dark/30"
                            >
                              {[...Array(Math.min(item.countInStock || 10, 20)).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeFromCartHandler(item._id, item.size, item.color)}
                            className="p-3 text-slate-dark/40 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
                            title="Remove item"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-2xl border border-slate-dark/5 shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[2px] bg-slate-dark"></div>
                    <span className="text-slate-dark/60 font-black tracking-widest text-xs uppercase">Order Summary</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-dark/70 font-bold">
                      <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                      <span className="text-slate-dark font-black">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <p className="text-slate-dark/40 text-xs font-medium">
                      Shipping & taxes calculated at checkout
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    className="w-full py-4 px-6 bg-slate-dark text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-slate-dark/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-dark"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/"
                    className="block text-center mt-4 text-slate-dark/60 font-bold text-sm hover:text-slate-dark transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartScreen;
