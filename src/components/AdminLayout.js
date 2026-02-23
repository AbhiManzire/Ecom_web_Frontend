import React, { useState } from 'react';
import { Link, useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { getAvatarUrl } from '../utils/avatarUtils';
import {
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
  FaSearch,
  FaBell,
  FaChevronDown,
  FaUserCircle
} from 'react-icons/fa';
import './AdminLayout.css';
import AdminDashboard from '../screens/AdminDashboard';
import UserListScreen from '../screens/UserListScreen';
import UserEditScreen from '../screens/UserEditScreen';
import UserAddScreen from '../screens/UserAddScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import ProductAddScreen from '../screens/ProductAddScreen';
import OrderListScreen from '../screens/OrderListScreen';
import OrderViewScreen from '../screens/OrderViewScreen';
import OrderEditScreen from '../screens/OrderEditScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const notificationCount = 0; // TODO: Connect to admin notifications
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarItems = [
    { name: 'Dashboard', icon: FaHome, path: '/admin/dashboard' },
    { name: 'Products', icon: FaBox, path: '/admin/productlist' },
    { name: 'Users', icon: FaUsers, path: '/admin/userlist' },
    { name: 'Orders', icon: FaShoppingCart, path: '/admin/orderlist' },
    { name: 'Analytics', icon: FaChartBar, path: '/admin/analytics' },
    { name: 'Settings', icon: FaCog, path: '/admin/settings' },
  ];

  const isActive = (path) => {
    return location.pathname === path || (location.pathname === '/admin' && path === '/admin/dashboard');
  };

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/admin':
      case '/admin/dashboard':
        return 'Admin Dashboard';
      case '/admin/productlist':
        return 'Products';
      case '/admin/product/add':
        return 'Add Product';
      case '/admin/userlist':
        return 'Users';
      case '/admin/user/add':
        return 'Add User';
      case '/admin/orderlist':
        return 'Orders';
      case '/admin/analytics':
        return 'Analytics';
      case '/admin/settings':
        return 'Settings';
      default:
        // Handle dynamic routes like /admin/product/:id/edit, /admin/user/:id/edit, /admin/order/:id/view, /admin/order/:id/edit
        if (pathname.includes('/admin/product/') && pathname.includes('/edit')) {
          return 'Edit Product';
        }
        if (pathname.includes('/admin/user/') && pathname.includes('/edit')) {
          return 'Edit User';
        }
        if (pathname.includes('/admin/order/') && pathname.includes('/view')) {
          return 'View Order';
        }
        if (pathname.includes('/admin/order/') && pathname.includes('/edit')) {
          return 'Edit Order';
        }
        return 'Admin Panel';
    }
  };

  return (
    <div className="h-screen bg-off-white-warm flex overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-dark/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Luxury Editorial Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-slate-dark transform transition-all duration-500 ease-editorial lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isMinimized ? 'lg:w-24' : 'lg:w-80'}`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Sidebar Header */}
          <div className={`p-8 pb-12 transition-all duration-500 ${isMinimized ? 'px-4' : 'px-8'}`}>
            <div className={`flex items-center justify-between transition-all duration-500 ${isMinimized ? 'flex-col gap-8' : 'mb-12'}`}>
              <div className={`space-y-1 transition-all duration-500 ${isMinimized ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">Mearn <span className="text-white/20">Admin</span></h1>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Control Center</p>
              </div>

              <div className="flex flex-col gap-4 items-center">
                {/* Desktop Toggle Button */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hidden lg:flex w-10 h-10 bg-white/5 rounded-xl items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                  title={isMinimized ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  <div className={`transition-transform duration-500 ${isMinimized ? 'rotate-180' : 'rotate-0'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden text-white/40 hover:text-white transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>

          </div>

          {/* Navigation Registry */}
          <nav className={`flex-1 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar transition-all duration-500 ${isMinimized ? 'px-4' : 'px-8'}`}>

            <span className={`text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-4 block transition-all duration-500 ${isMinimized ? 'opacity-0 h-0' : 'opacity-100 px-4'}`}>Operations</span>
            {sidebarItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center transition-all duration-300 group ${isMinimized ? 'justify-center p-4' : 'gap-4 px-6 py-4'} rounded-2xl ${active
                    ? 'bg-white text-slate-dark shadow-2xl shadow-white/5 scale-105 origin-left'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  title={isMinimized ? item.name : ""}
                >
                  <item.icon className={`text-sm shrink-0 ${active ? 'text-slate-dark' : 'text-white/20 group-hover:text-white/60'}`} />
                  <span className={`text-[11px] font-black uppercase tracking-[0.3em] italic transition-all duration-500 overflow-hidden ${isMinimized ? 'w-0 opacity-0 translate-x-4' : 'w-auto opacity-100 translate-x-0'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className={`mt-auto transition-all duration-500 ${isMinimized ? 'p-4' : 'p-8'}`}>
            <button
              onClick={logoutHandler}
              className={`w-full flex items-center justify-center transition-all rounded-2xl border border-white/5 text-white/40 hover:text-white hover:bg-white/5 text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden ${isMinimized ? 'aspect-square p-0' : 'gap-3 px-6 py-4'}`}
              title={isMinimized ? "Termination" : ""}
            >
              <FaSignOutAlt className="text-xs shrink-0" />
              {!isMinimized && <span>Termination</span>}
            </button>
            <div className={`mt-8 flex justify-center opacity-10 grayscale transition-all duration-500 ${isMinimized ? 'opacity-0 h-0 hidden' : 'opacity-10'}`}>
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white whitespace-nowrap">Registry Build 2.0.4</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Execution Layer (Main Content) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Super Admin Navbar - Search, Notification, Profile on right */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-dark/5 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 sm:p-3 bg-slate-dark text-white rounded-xl shadow-lg active:scale-95 transition-all"
            >
              <FaBars className="text-lg" />
            </button>
            <div className="space-y-0.5">
              <h2 className="text-sm lg:text-base font-black text-slate-dark uppercase tracking-tighter leading-none italic">{getPageTitle(location.pathname)}</h2>
              <p className="text-[8px] font-bold text-slate-dark/40 uppercase tracking-widest">Operation Live</p>
            </div>
          </div>
          {/* Right: Search, Notification, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-slate-dark/10 bg-white text-slate-dark hover:bg-slate-dark/5 transition-colors">
              <FaSearch className="text-sm sm:text-base" />
            </button>
            <button className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg border border-slate-dark/10 bg-white text-slate-dark hover:bg-slate-dark/5 transition-colors">
              <FaBell className="text-sm sm:text-base" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-[#7c3aed] text-white text-[10px] font-bold rounded-full">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 150)}
                className="flex items-center gap-2 pl-1 pr-2 py-1.5 rounded-xl hover:bg-slate-dark/5 transition-colors"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-black text-sm shrink-0 overflow-hidden">
                  {getAvatarUrl(userInfo?.avatar) ? (
                    <img src={getAvatarUrl(userInfo?.avatar)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{(userInfo?.name || 'A').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <span className="hidden sm:inline text-slate-dark font-bold text-sm">
                  Hi! {userInfo?.name?.split(' ')[0] || 'Admin'}
                </span>
                <FaChevronDown className={`hidden sm:block text-slate-dark/50 text-xs transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-dark/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="px-6 py-4 bg-slate-dark text-white">
                    <p className="font-black text-sm uppercase tracking-widest truncate">{userInfo?.name || 'Admin'}</p>
                    <p className="text-white/60 text-[10px] font-bold truncate mt-0.5">{userInfo?.email || 'admin@mearn.com'}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <Link to="/profile" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2.5 text-slate-dark hover:bg-slate-dark/5 rounded-lg transition-colors font-bold text-xs uppercase tracking-widest">
                      My account
                    </Link>
                    <Link to="/" onClick={() => setProfileDropdownOpen(false)} className="block px-4 py-2.5 text-slate-dark hover:bg-slate-dark/5 rounded-lg transition-colors font-bold text-xs uppercase tracking-widest">
                      Store
                    </Link>
                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-black text-xs uppercase tracking-widest">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Canvas (Page Content) */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-0 relative custom-scrollbar">
          {/* Advanced Editorial Background System */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Soft Ambient Blobs */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-slate-dark/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-slate-dark/[0.02] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          </div>

          <div className="relative z-10 min-h-full">
            <div className="max-w-[1600px] mx-auto p-8 md:p-12">
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/userlist" element={<UserListScreen />} />
                    <Route path="/user/add" element={<UserAddScreen />} />
                    <Route path="/user/:id/edit" element={<UserEditScreen />} />
                    <Route path="/productlist" element={<ProductListScreen />} />
                    <Route path="/product/add" element={<ProductAddScreen />} />
                    <Route path="/product/:id/edit" element={<ProductEditScreen />} />
                    <Route path="/orderlist" element={<OrderListScreen />} />
                    <Route path="/order/:id/view" element={<OrderViewScreen />} />
                    <Route path="/order/:id/edit" element={<OrderEditScreen />} />
                    <Route path="/analytics" element={<AnalyticsScreen />} />
                    <Route path="/settings" element={<SettingsScreen />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
