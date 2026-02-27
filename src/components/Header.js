import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaShoppingCart, FaBars, FaChevronDown, FaSearch } from 'react-icons/fa';
import { logout } from '../store/slices/userSlice';
import { getAvatarUrl } from '../utils/avatarUtils';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileLadiesOpen, setMobileLadiesOpen] = useState(false);
  const [mobileKidsOpen, setMobileKidsOpen] = useState(false);
  const [mobileSportsOpen, setMobileSportsOpen] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const NavDropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative group">
        <button
          className="flex items-center text-slate-dark hover:text-blue-grey-muted px-4 py-2 rounded-full transition-all duration-300 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-dark/5"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {title}
          <FaChevronDown className={`ml-2 text-[10px] transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div
          className={`absolute top-[120%] left-0 bg-white border border-slate-dark/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] min-w-[280px] max-w-[min(380px,calc(100vw-2rem))] z-50 transition-all duration-500 transform overflow-hidden ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
            }`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="bg-slate-dark p-3">
            <p className="text-white font-black text-[9px] uppercase tracking-[0.3em] opacity-40">Quick Explore</p>
          </div>
          <div className="p-2 grid grid-cols-2 gap-x-1 gap-y-0.5">
            {children}
          </div>
        </div>
      </div>
    );
  };

  const NavDropdownItem = ({ href, children }) => (
    <Link
      to={href}
      className="group flex items-center px-4 py-2.5 text-slate-dark hover:bg-slate-dark/5 rounded-xl transition-all duration-300 font-bold text-[11px] uppercase tracking-widest"
    >
      <span className="w-0 group-hover:w-2 h-[2px] bg-slate-dark mr-0 group-hover:mr-3 transition-all duration-300"></span>
      {children}
    </Link>
  );

  return (
    <header className="bg-white text-slate-dark sticky top-0 z-50 border-b border-slate-dark/5 backdrop-blur-md bg-opacity-95 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.svg"
              alt="Youth Circle Logo"
              className="h-8 sm:h-10 w-auto object-contain transition-opacity duration-300"
              loading="eager"
              decoding="sync"
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              style={{ opacity: 0 }}
            />
            <div className="text-slate-dark font-black text-lg sm:text-xl md:text-2xl tracking-tighter truncate">
              <span className="text-slate-dark">YOUTH</span>
              <span className="text-blue-grey-muted ml-0.5">CIRCLE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md transition-all duration-300 font-semibold text-sm uppercase tracking-wide hover:scale-105 ${location.pathname === '/'
                ? 'text-white bg-slate-dark shadow-lg scale-105'
                : 'text-slate-dark hover:opacity-60'
                }`}
            >
              HOME
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md transition-all duration-300 font-semibold text-sm uppercase tracking-wide hover:scale-105 ${location.pathname === '/about'
                ? 'text-white bg-slate-dark shadow-lg scale-105'
                : 'text-slate-dark hover:opacity-60'
                }`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-md transition-all duration-300 font-semibold text-sm uppercase tracking-wide hover:scale-105 ${location.pathname === '/contact'
                ? 'text-white bg-slate-dark shadow-lg scale-105'
                : 'text-slate-dark hover:opacity-60'
                }`}
            >
              CONTACT
            </Link>
            <NavDropdown title="MEN">
              <NavDropdownItem href="/category/men-clothing">Clothing</NavDropdownItem>
              <NavDropdownItem href="/category/men-accessories">Accessories</NavDropdownItem>
              <NavDropdownItem href="/category/men-sport">Sport</NavDropdownItem>
              <div className="h-[1px] bg-slate-dark/5 my-2 mx-4"></div>
              <NavDropdownItem href="/category/tshirt">T-Shirt</NavDropdownItem>
              <NavDropdownItem href="/category/shirt">Shirt</NavDropdownItem>
              <NavDropdownItem href="/category/cargo">Cargo</NavDropdownItem>
              <NavDropdownItem href="/category/jeans">Jeans</NavDropdownItem>
              <NavDropdownItem href="/category/trousers">Trousers</NavDropdownItem>
              <NavDropdownItem href="/category/hoodies-sweaters">Hoodies & Sweaters</NavDropdownItem>
              <NavDropdownItem href="/category/sneakers">Sneakers</NavDropdownItem>
              <NavDropdownItem href="/category/flipflop">Flip Flop</NavDropdownItem>
            </NavDropdown>

            <NavDropdown title="LADIES">
              <NavDropdownItem href="/category/ladies-clothing">Clothing</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-shoes">Shoes</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-accessories">Accessories</NavDropdownItem>
              <NavDropdownItem href="/category/lingerie">Lingerie</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-sport">Sport</NavDropdownItem>
              <div className="h-[1px] bg-slate-dark/5 my-2 mx-4"></div>
              <NavDropdownItem href="/category/ladies-tshirt">T-Shirt</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-shirt">Shirt</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-cargo">Cargo</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-jeans">Jeans</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-shorts">Shorts</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-trousers">Trousers</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-hoodies">Hoodies</NavDropdownItem>
              <NavDropdownItem href="/category/coord-set">Co-ord Set</NavDropdownItem>
            </NavDropdown>

            <NavDropdown title="KIDS">
              <NavDropdownItem href="/category/kids-clothing">Clothing</NavDropdownItem>
              <NavDropdownItem href="/category/kids-shoes">Shoes</NavDropdownItem>
              <NavDropdownItem href="/category/kids-accessories">Accessories</NavDropdownItem>
              <div className="h-[1px] bg-slate-dark/5 my-2 mx-4"></div>
              <NavDropdownItem href="/category/boys">Boys Collection</NavDropdownItem>
              <NavDropdownItem href="/category/girls">Girls Collection</NavDropdownItem>
              <NavDropdownItem href="/category/infants">Infants</NavDropdownItem>
            </NavDropdown>

            <NavDropdown title="SPORTS">
              <NavDropdownItem href="/category/activewear">Activewear</NavDropdownItem>
              <NavDropdownItem href="/category/performance">Performance</NavDropdownItem>
              <NavDropdownItem href="/category/gym-gear">Gym Gear</NavDropdownItem>
              <div className="h-[1px] bg-slate-dark/5 my-2 mx-4"></div>
              <NavDropdownItem href="/category/men-sport">Men's Sport</NavDropdownItem>
              <NavDropdownItem href="/category/ladies-sport">Ladies' Sport</NavDropdownItem>
              <NavDropdownItem href="/category/running">Running</NavDropdownItem>
              <NavDropdownItem href="/category/training">Training</NavDropdownItem>
            </NavDropdown>
          </div>

          {/* Right Side - Cart, Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Cart */}
            <Link to="/cart" className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-slate-dark/10 bg-white text-slate-dark hover:bg-slate-dark/5 transition-colors">
              <FaShoppingCart className="text-sm sm:text-base" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-slate-dark text-white text-[10px] font-bold rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0) > 99 ? '99+' : cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>

            {/* User Profile - Avatar + Hi! Name + Dropdown */}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 150)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-xl hover:bg-slate-dark/5 transition-colors"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 overflow-hidden">
                    {getAvatarUrl(userInfo.avatar) ? (
                      <img src={getAvatarUrl(userInfo.avatar)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span>{(userInfo.name || 'U').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="hidden sm:inline text-slate-dark font-bold text-sm">
                    Hi! {userInfo.name?.split(' ')[0] || 'User'}
                  </span>
                  <FaChevronDown className={`hidden sm:block text-slate-dark/50 text-xs transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-dark/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="px-6 py-4 bg-slate-dark text-white">
                      <p className="font-black text-sm uppercase tracking-widest truncate">{userInfo.name}</p>
                      <p className="text-white/60 text-[10px] font-bold truncate mt-0.5">{userInfo.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2.5 text-slate-dark hover:bg-slate-dark/5 rounded-lg transition-colors font-bold text-xs uppercase tracking-widest">
                        My account
                      </Link>
                      {userInfo.isAdmin && (
                        <Link to="/admin/dashboard" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2.5 text-slate-dark hover:bg-slate-dark/5 rounded-lg transition-colors font-bold text-xs uppercase tracking-widest">
                          Management
                        </Link>
                      )}
                      <button onClick={logoutHandler} className="block w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-black text-xs uppercase tracking-widest">
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-xl hover:bg-slate-dark/5 transition-colors">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-dark/10 flex items-center justify-center text-slate-dark">
                  <FaUser className="text-sm" />
                </div>
                <span className="hidden sm:inline text-slate-dark font-bold text-sm">Sign In</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-slate-dark hover:opacity-60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-black">
            <div className="px-4 py-3 space-y-2 max-h-[80vh] overflow-y-auto">
              {/* Primary links */}
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-widest ${
                  location.pathname === '/' ? 'text-white bg-slate-dark shadow-lg' : 'text-slate-dark hover:bg-slate-dark/5'
                }`}
              >
                HOME
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-widest ${
                  location.pathname === '/about'
                    ? 'text-white bg-slate-dark shadow-lg'
                    : 'text-slate-dark hover:bg-slate-dark/5'
                }`}
              >
                ABOUT
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 font-bold text-sm uppercase tracking-widest ${
                  location.pathname === '/contact'
                    ? 'text-white bg-slate-dark shadow-lg'
                    : 'text-slate-dark hover:bg-slate-dark/5'
                }`}
              >
                CONTACT
              </Link>

              {/* Divider */}
              <div className="border-t border-slate-dark/10 my-3" />

              {/* MEN dropdown */}
              <button
                type="button"
                onClick={() => setMobileMenOpen((prev) => !prev)}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-dark font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-dark/5 rounded-lg"
              >
                <span>Men</span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${mobileMenOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileMenOpen && (
                <div className="space-y-1 pl-4">
                  <Link
                    to="/category/men-clothing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/category/men-accessories"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Accessories
                  </Link>
                  <Link
                    to="/category/men-sport"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Sport
                  </Link>
                  <div className="text-slate-dark/30 font-black mt-3 mb-1 text-[10px] uppercase tracking-[0.25em] px-4">
                    Core styles
                  </div>
                  <Link
                    to="/category/tshirt"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    T-Shirt
                  </Link>
                  <Link
                    to="/category/shirt"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Shirt
                  </Link>
                  <Link
                    to="/category/cargo"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Cargo
                  </Link>
                  <Link
                    to="/category/jeans"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Jeans
                  </Link>
                  <Link
                    to="/category/trousers"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Trousers
                  </Link>
                  <Link
                    to="/category/hoodies-sweaters"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Hoodies & Sweaters
                  </Link>
                  <Link
                    to="/category/sneakers"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Sneakers
                  </Link>
                  <Link
                    to="/category/flipflop"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Flip Flop
                  </Link>
                </div>
              )}

              {/* LADIES dropdown */}
              <button
                type="button"
                onClick={() => setMobileLadiesOpen((prev) => !prev)}
                className="w-full flex items-center justify-between mt-2 px-4 py-3 text-slate-dark font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-dark/5 rounded-lg"
              >
                <span>Ladies</span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${mobileLadiesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileLadiesOpen && (
                <div className="space-y-1 pl-4">
                  <Link
                    to="/category/ladies-clothing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/category/ladies-shoes"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Shoes
                  </Link>
                  <Link
                    to="/category/ladies-accessories"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Accessories
                  </Link>
                  <Link
                    to="/category/lingerie"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Lingerie
                  </Link>
                  <Link
                    to="/category/ladies-sport"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Sport
                  </Link>
                  <div className="text-slate-dark/30 font-black mt-3 mb-1 text-[10px] uppercase tracking-[0.25em] px-4">
                    Core styles
                  </div>
                  <Link
                    to="/category/ladies-tshirt"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    T-Shirt
                  </Link>
                  <Link
                    to="/category/ladies-shirt"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Shirt
                  </Link>
                  <Link
                    to="/category/ladies-cargo"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Cargo
                  </Link>
                  <Link
                    to="/category/ladies-jeans"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Jeans
                  </Link>
                  <Link
                    to="/category/ladies-shorts"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Shorts
                  </Link>
                  <Link
                    to="/category/ladies-trousers"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Trousers
                  </Link>
                  <Link
                    to="/category/ladies-hoodies"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Hoodies
                  </Link>
                  <Link
                    to="/category/coord-set"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Co-ord Set
                  </Link>
                </div>
              )}

              {/* KIDS dropdown */}
              <button
                type="button"
                onClick={() => setMobileKidsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between mt-2 px-4 py-3 text-slate-dark font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-dark/5 rounded-lg"
              >
                <span>Kids</span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${mobileKidsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileKidsOpen && (
                <div className="space-y-1 pl-4">
                  <Link
                    to="/category/kids-clothing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Clothing
                  </Link>
                  <Link
                    to="/category/kids-shoes"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Shoes
                  </Link>
                  <Link
                    to="/category/kids-accessories"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Accessories
                  </Link>
                  <div className="text-slate-dark/30 font-black mt-3 mb-1 text-[10px] uppercase tracking-[0.25em] px-4">
                    Collections
                  </div>
                  <Link
                    to="/category/boys"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Boys
                  </Link>
                  <Link
                    to="/category/girls"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Girls
                  </Link>
                  <Link
                    to="/category/infants"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Infants
                  </Link>
                </div>
              )}

              {/* SPORTS dropdown */}
              <button
                type="button"
                onClick={() => setMobileSportsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between mt-2 px-4 py-3 text-slate-dark font-black text-xs uppercase tracking-[0.25em] hover:bg-slate-dark/5 rounded-lg mb-1"
              >
                <span>Sports</span>
                <FaChevronDown
                  className={`text-[10px] transition-transform duration-300 ${mobileSportsOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileSportsOpen && (
                <div className="space-y-1 pl-4 pb-3">
                  <Link
                    to="/category/activewear"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Activewear
                  </Link>
                  <Link
                    to="/category/performance"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Performance
                  </Link>
                  <Link
                    to="/category/gym-gear"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Gym Gear
                  </Link>
                  <Link
                    to="/category/men-sport"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Men&apos;s Sport
                  </Link>
                  <Link
                    to="/category/ladies-sport"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Ladies&apos; Sport
                  </Link>
                  <Link
                    to="/category/running"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Running
                  </Link>
                  <Link
                    to="/category/training"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-slate-dark text-xs font-bold uppercase tracking-widest hover:bg-slate-dark/5 rounded-lg"
                  >
                    Training
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
