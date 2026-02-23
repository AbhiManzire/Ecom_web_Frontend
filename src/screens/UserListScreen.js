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
import { fetchAllUsers, deleteUser } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import './UserListScreen.css';
import CustomDropdown from '../components/CustomDropdown';

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      setIsSearching(true);
    }

    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearching(false);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearchTerm]);

  // Fetch users on component mount and when filters change
  useEffect(() => {
    const params = {};

    if (debouncedSearchTerm) {
      params.search = debouncedSearchTerm;
    }

    if (selectedRole && selectedRole !== 'All Users') {
      params.role = selectedRole.toLowerCase().replace(' ', '');
    }

    console.log('🔄 UserListScreen: Fetching users with params:', params);
    dispatch(fetchAllUsers(params));
  }, [dispatch, debouncedSearchTerm, selectedRole]);

  const handleAddUser = () => {
    navigate('/admin/user/add');
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/user/${userId}/edit`);
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete "${userName}"?`)) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        toast.success('User deleted successfully!');
        // Refresh the user list
        dispatch(fetchAllUsers());
      } catch (error) {
        toast.error(error?.message || 'Failed to delete user');
      }
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredUsers = users.filter(user => {
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <>
      <Meta title="Identity Registry | Mearn Admin" />
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">Human Capital Archive</span>
            </div>
            <h1 className="text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
              User <span className="text-slate-dark/20">Identities</span>
            </h1>
            <p className="text-xs font-bold text-slate-dark/50 tracking-widest uppercase">
              {(loading || isSearching) ? 'Synchronizing Archive...' : `Managing ${filteredUsers.length} Active Profiles`}
            </p>
          </div>

          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="relative group">
              <input
                type="text"
                placeholder="Find in Archive..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-off-white-warm px-8 py-5 rounded-full w-96 font-bold text-slate-dark focus:bg-white focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none border-none placeholder:text-slate-dark/20"
              />
              <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-dark/20 group-focus-within:text-slate-dark transition-colors" />
            </div>
            <button
              onClick={handleAddUser}
              className="bg-slate-dark text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl flex items-center gap-3 active:scale-95"
            >
              <FaPlus className="text-xs" />
              Invite Associate
            </button>
          </div>
        </div>

        {/* Filters Registry */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <CustomDropdown
            label="Clearance Level"
            options={[
              { label: 'Global Directory', value: '' },
              { label: 'Administrators', value: 'Admin' },
              { label: 'Standard Users', value: 'Regular' },
            ]}
            value={selectedRole}
            onChange={(val) => setSelectedRole(val)}
          />
        </div>

        {(loading || isSearching) ? (
          <div className="py-32 flex flex-col items-center justify-center opacity-40">
            <div className="w-16 h-16 border-4 border-slate-dark border-t-transparent rounded-full animate-spin mb-6"></div>
            <span className="font-black text-[10px] uppercase tracking-[0.5em]">Fetching Directory Records</span>
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
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Identity Portfolio</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Access Credentials</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Clearance Level</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Chronology</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-dark/5">
                  {filteredUsers && filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-off-white-warm/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-dark/5 flex items-center justify-center border border-slate-dark/10 overflow-hidden">
                              <span className="text-[10px] font-black text-slate-dark tracking-tighter">{getInitials(user.name)}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-black text-slate-dark uppercase tracking-tighter leading-tight">{user.name}</span>
                              <span className="text-[9px] font-bold text-slate-dark/20 uppercase tracking-widest italic tracking-tighter">{user._id.toString().slice(-8)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-bold text-slate-dark/60 lowercase italic tracking-tight">{user.email}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 border ${user.isAdmin ? 'border-slate-dark text-slate-dark' : 'border-slate-dark/10 text-slate-dark/20'}`}>
                            {user.isAdmin ? 'ADMIN' : 'MEMBER'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-widest italic">
                            {formatDate(user.createdAt)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button
                              onClick={() => handleEditUser(user._id)}
                              className="w-8 h-8 bg-slate-dark text-white flex items-center justify-center hover:bg-black transition-colors"
                              title="Refine Profile"
                            >
                              <FaEdit className="text-[10px]" />
                            </button>
                            {user._id !== userInfo?._id && (
                              <button
                                onClick={() => handleDeleteUser(user._id, user.name)}
                                className="w-8 h-8 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                title="Revoke Access"
                              >
                                <FaTrash className="text-[10px]" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="space-y-1">
                            <h3 className="text-lg font-black text-slate-dark uppercase tracking-wider">No Records</h3>
                            <p className="text-[9px] font-bold text-slate-dark/40 uppercase tracking-widest">Directory query returned null.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserListScreen;
