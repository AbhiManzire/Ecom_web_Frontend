import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../store/slices/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const UserEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedUser, loading, error, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || '',
        email: selectedUser.email || '',
        password: '',
        isAdmin: selectedUser.isAdmin || false,
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    if (success) {
      navigate('/admin/users');
    }
  }, [success, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      name: formData.name,
      email: formData.email,
      isAdmin: formData.isAdmin,
    };

    // Only include password if it's provided
    if (formData.password.trim()) {
      updateData.password = formData.password;
    }

    dispatch(updateUser({ id, userData: updateData }));
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <>
      <Meta title="Identity Refinement | Mearn Admin" />
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-dark/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">Identity Registry</span>
            </div>
            <h1 className="text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
              Refine <span className="text-slate-dark/20">Profile</span>
            </h1>
            <p className="text-xs font-bold text-slate-dark/50 tracking-widest uppercase">
              Modifying credentials for associate <span className="text-slate-dark">{formData.name || 'Anonymous'}</span>
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/userlist')}
            className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.3em] hover:text-slate-dark transition-colors flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Registry
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Identity Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-12 space-y-8">
              <div className="bg-slate-dark rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-8">
                  <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20 shadow-2xl mx-auto mb-8">
                    <span className="text-3xl font-black italic">{formData.name ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase() : '??'}</span>
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-black uppercase tracking-tight">{formData.name || 'Awaiting Input'}</h3>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">{formData.email || 'no-email@registry.com'}</p>
                  </div>
                  <div className="pt-8 border-t border-white/10">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 text-center flex-1">Status</span>
                      <div className="w-px h-8 bg-white/10"></div>
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 text-center flex-1">Access</span>
                    </div>
                    <div className="flex justify-between items-center px-2 mt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-center flex-1">Active</span>
                      <div className="w-px h-4 opacity-0"></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest text-center flex-1 ${formData.isAdmin ? 'text-blue-400' : 'text-white/40'}`}>
                        {formData.isAdmin ? 'ADMIN' : 'USER'}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Decoration */}
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
              </div>

              <div className="p-8 bg-off-white-warm rounded-[32px] border border-slate-dark/5 space-y-4">
                <span className="text-[10px] font-black text-slate-dark/30 uppercase tracking-[0.3em]">Temporal Logs</span>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-dark/60">
                    <span>Initialized</span>
                    <span className="italic">{selectedUser ? new Date(selectedUser.createdAt).toLocaleDateString() : 'Pending'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-dark/60">
                    <span>Archive ID</span>
                    <span className="italic">#{id.slice(-8).toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <div className="md:col-span-2 pb-4 border-b border-slate-dark/5">
                  <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.4em] italic">Credentials Manifest</span>
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Legal Nomenclature</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
                    placeholder="Full identity name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Primary Liaison Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
                    placeholder="Registry email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Access Key (Optional)</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
                    placeholder="Leave dormant to persist current"
                  />
                </div>

                <div className="flex items-center gap-4 p-4 bg-off-white-warm rounded-2xl border border-slate-dark/5 mt-auto">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-slate-dark/10 text-slate-dark focus:ring-slate-dark/5 cursor-pointer"
                  />
                  <label htmlFor="isAdmin" className="text-[11px] font-black text-slate-dark uppercase tracking-widest cursor-pointer">
                    Grant Executive Privileges
                  </label>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-dark/5 flex justify-end gap-6">
                <button
                  type="button"
                  onClick={() => navigate('/admin/userlist')}
                  className="px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] text-slate-dark/40 hover:text-slate-dark transition-all"
                >
                  Cancel Operation
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-slate-dark text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Committing Synchrony...' : 'Synchronize Identity'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserEditScreen;
