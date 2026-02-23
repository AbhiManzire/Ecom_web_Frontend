import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile, uploadAvatar } from '../store/slices/userSlice';
import { FaShoppingBag, FaShoppingCart, FaCog, FaArrowRight, FaCamera } from 'react-icons/fa';
import { getAvatarUrl } from '../utils/avatarUtils';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, profileLoading, avatarLoading, error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=profile');
      return;
    }
    dispatch(getUserProfile());
  }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        address: {
          street: userInfo.address?.street || '',
          city: userInfo.address?.city || '',
          state: userInfo.address?.state || '',
          zipCode: userInfo.address?.zipCode || '',
          country: userInfo.address?.country || 'India'
        }
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      toast.success('Profile updated successfully!');
    }
  }, [success]);

  const isUploadingAvatar = avatarLoading;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      dispatch(uploadAvatar(file));
    }
    e.target.value = '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(updateUserProfile({ password: passwordData.newPassword }));
    setPasswordData({ newPassword: '', confirmPassword: '' });
    setShowPasswordSection(false);
  };

  if (!userInfo) return null;

  return (
    <>
      <Meta title="Profile | YOUTH CIRCLE" />

      {/* Hero Section - Home page style */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
            <div className="absolute top-0 right-0 w-[140%] h-full bg-slate-dark/5 -skew-x-12 transform origin-top-right"></div>
          </div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-dark/[0.03] rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <span className="text-slate-dark/40 font-black tracking-[0.3em] text-sm uppercase">My Account</span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-dark leading-[0.9] tracking-tighter">
                  YOUR <br />
                  <span>PROFILE.</span>
                </h1>
              </div>
              <p className="text-xl text-slate-dark/70 font-medium max-w-lg leading-relaxed">
                Manage your account details, shipping address, and preferences. Your personal vault for all things YOUTH CIRCLE.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/orders"
                  className="px-10 py-5 bg-slate-dark text-white border-2 border-slate-dark rounded-full font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-white hover:text-slate-dark transition-all duration-500 text-center"
                >
                  My Orders
                </Link>
                <Link
                  to="/cart"
                  className="px-10 py-5 border-2 border-slate-dark text-slate-dark rounded-full font-black uppercase tracking-widest text-sm hover:bg-slate-dark hover:text-white transition-all duration-500 text-center"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Profile Avatar Card - Right (desktop) / Below (mobile) */}
            <div className="flex lg:hidden justify-center my-8">
              <label className="relative cursor-pointer group">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-black text-3xl border-4 border-white shadow-xl overflow-hidden">
                  {getAvatarUrl(userInfo.avatar) ? (
                    <img src={getAvatarUrl(userInfo.avatar)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{(userInfo.name || 'U').charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaCamera className="text-white text-xl" />
                </div>
                {isUploadingAvatar && (
                  <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xs font-bold animate-pulse">Uploading...</span>
                  </div>
                )}
              </label>
            </div>
            <div className="hidden lg:flex justify-center items-center relative">
              <div className="absolute inset-0 bg-slate-dark/5 rounded-full scale-90 blur-2xl"></div>
              <div className="relative z-10 bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(48,54,79,0.15)] p-12 border border-slate-dark/5">
                <label className="relative cursor-pointer group block w-fit mx-auto">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white font-black text-5xl border-4 border-white shadow-xl overflow-hidden">
                    {getAvatarUrl(userInfo.avatar) ? (
                      <img src={getAvatarUrl(userInfo.avatar)} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span>{(userInfo.name || 'U').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaCamera className="text-white text-2xl" />
                  </div>
                  {isUploadingAvatar && (
                    <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xs font-bold animate-pulse">Uploading...</span>
                    </div>
                  )}
                </label>
                <p className="text-center text-slate-dark/50 text-[10px] font-bold uppercase tracking-widest mt-2">Click to change photo</p>
                <h2 className="text-2xl font-black text-slate-dark tracking-tighter uppercase text-center mt-2">{userInfo.name}</h2>
                <p className="text-slate-dark/50 text-xs font-bold mt-1 text-center">{userInfo.email}</p>
                {userInfo.isAdmin && (
                  <div className="mt-4 flex justify-center">
                    <span className="px-4 py-2 bg-slate-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                      Admin
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-6 -right-6 bg-slate-dark text-white p-6 rounded-2xl shadow-xl border border-white">
                  <p className="text-2xl font-black leading-none">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Section - Dark header like Men's/Ladies */}
      <div className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="space-y-8">
          {/* Personal Information Block */}
          <div className="relative py-12 sm:py-16 md:py-20 bg-slate-dark overflow-hidden rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 min-w-0">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 select-none pointer-events-none opacity-20 overflow-hidden">
              <h2 className="text-[80px] sm:text-[120px] md:text-[150px] font-black text-white leading-none mr-[-30px] italic">IDENTITY</h2>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-white/20"></div>
                    <span className="text-white/60 font-black tracking-widest text-xs uppercase">Personal Details</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.85]">
                    REFINE <br />
                    <span>YOUR INFO.</span>
                  </h2>
                </div>
              </div>

              {error && <Message variant="danger">{error}</Message>}
              {profileLoading && <Loader />}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-medium"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-medium"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-medium"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="px-10 py-4 bg-white text-slate-dark rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {profileLoading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Address Section - White block like Ladies */}
          <div className="relative py-12 sm:py-16 md:py-20 bg-white overflow-hidden rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 border border-slate-dark/10 shadow-sm">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.08] overflow-hidden">
              <h2 className="text-[80px] sm:text-[120px] md:text-[150px] font-black text-slate-dark leading-none ml-[-30px] italic">ADDRESS</h2>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-[2px] bg-slate-dark/40"></div>
                    <span className="text-slate-dark/70 font-black tracking-widest text-xs uppercase">Shipping</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-dark tracking-tighter leading-[0.85]">
                    DELIVERY <br />
                    <span>ARCHIVE.</span>
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">Street</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-off-white-warm/50 focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">City</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-off-white-warm/50 focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">State</label>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-off-white-warm/50 focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-off-white-warm/50 focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                    placeholder="PIN / ZIP"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">Country</label>
                  <input
                    type="text"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-off-white-warm/50 focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                    placeholder="Country"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="px-10 py-4 bg-slate-dark text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-dark/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {profileLoading ? 'Updating...' : 'Update Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Password Section - Featured style */}
          <div className="relative py-16 bg-white overflow-hidden mx-4">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none w-full overflow-hidden">
              <h2 className="text-[80px] sm:text-[120px] md:text-[160px] font-black text-slate-dark/[0.05] leading-none text-center italic">SECURE</h2>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-slate-dark"></div>
                    <span className="text-slate-dark/50 font-black tracking-widest text-xs uppercase">Credentials</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-dark tracking-tighter leading-[0.9]">
                    CHANGE <br />
                    <span>PASSWORD.</span>
                  </h2>
                  <p className="text-slate-dark/50 text-lg font-medium">
                    Update your password to keep your account secure.
                  </p>
                </div>
                {!showPasswordSection && (
                  <button
                    onClick={() => setShowPasswordSection(true)}
                    className="group flex items-center gap-4 text-slate-dark font-black uppercase tracking-widest text-sm hover:opacity-70 transition-all"
                  >
                    Edit Password
                    <div className="w-12 h-12 rounded-full border border-slate-dark/20 flex items-center justify-center group-hover:bg-slate-dark group-hover:text-white transition-all duration-500">
                      <FaArrowRight className="text-sm" />
                    </div>
                  </button>
                )}
              </div>

              {showPasswordSection ? (
                <form onSubmit={handlePasswordSubmit} className="max-w-xl space-y-6 bg-slate-dark/[0.03] rounded-3xl p-8 border-2 border-dashed border-slate-dark/10">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-white focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                      placeholder="Min 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-dark/50 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 rounded-xl border border-slate-dark/10 bg-white focus:border-slate-dark/30 focus:outline-none font-medium text-slate-dark"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="px-10 py-4 bg-slate-dark text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-dark/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {profileLoading ? 'Updating...' : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordSection(false);
                        setPasswordData({ newPassword: '', confirmPassword: '' });
                      }}
                      className="px-8 py-4 border-2 border-slate-dark/10 text-slate-dark rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-dark/5 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="max-w-xl py-8 px-6 bg-slate-dark/[0.03] rounded-3xl border-2 border-dashed border-slate-dark/10">
                  <p className="text-slate-dark/40 font-bold italic">Your password is securely stored. Click Edit Password to change it.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links - Like Featured CTA */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap gap-4 justify-center py-8">
              <Link
                to="/orders"
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-dark/5 border border-slate-dark/10 hover:bg-slate-dark hover:text-white transition-all duration-500 font-black text-xs uppercase tracking-widest"
              >
                <FaShoppingBag className="text-sm" />
                My Orders
              </Link>
              <Link
                to="/cart"
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-dark/5 border border-slate-dark/10 hover:bg-slate-dark hover:text-white transition-all duration-500 font-black text-xs uppercase tracking-widest"
              >
                <FaShoppingCart className="text-sm" />
                My Cart
              </Link>
              {userInfo.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-dark/5 border border-slate-dark/10 hover:bg-slate-dark hover:text-white transition-all duration-500 font-black text-xs uppercase tracking-widest"
                >
                  <FaCog className="text-sm" />
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
