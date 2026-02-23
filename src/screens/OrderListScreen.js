import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaShoppingCart
} from 'react-icons/fa';
import { fetchAllOrders } from '../store/slices/orderSlice';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CustomDropdown from '../components/CustomDropdown';

const OrderListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.order);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Debounce search term to prevent excessive API calls
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      const timer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm);
      }, 500); // 500ms delay

      return () => clearTimeout(timer);
    }
  }, [searchTerm, debouncedSearchTerm]);

  // Fetch orders on component mount only
  useEffect(() => {
    console.log('🔄 OrderListScreen: Fetching orders...');
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleViewOrder = (orderId) => {
    navigate(`/admin/order/${orderId}/view`);
  };

  const handleEditOrder = (orderId) => {
    navigate(`/admin/order/${orderId}/edit`);
  };

  const handleDeleteOrder = async (orderId, orderNumber) => {
    if (window.confirm(`Are you sure you want to delete order #${orderNumber}?`)) {
      // TODO: Implement order deletion
      toast.info('Order deletion functionality coming soon!');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (order) => {
    if (order.isDelivered) {
      return 'bg-green-100 text-green-800';
    } else if (order.isPaid) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (order) => {
    if (order.isDelivered) {
      return 'Delivered';
    } else if (order.isPaid) {
      return 'Processing';
    } else {
      return 'Pending';
    }
  };

  const filteredOrders = orders.filter(order => {
    let matchesSearch = true;
    let matchesStatus = true;

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      matchesSearch = (
        order._id.toLowerCase().includes(searchLower) ||
        (order.user && order.user.name && order.user.name.toLowerCase().includes(searchLower)) ||
        (order.user && order.user.email && order.user.email.toLowerCase().includes(searchLower))
      );
    }

    if (selectedStatus) {
      if (selectedStatus === 'delivered') matchesStatus = order.isDelivered;
      else if (selectedStatus === 'paid') matchesStatus = order.isPaid && !order.isDelivered;
      else if (selectedStatus === 'pending') matchesStatus = !order.isPaid;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Meta title="Logistics Registry | Mearn Admin" />
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">E-Commerce Intelligence</span>
            </div>
            <h1 className="text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
              Order <span className="text-slate-dark/20">Logistics</span>
            </h1>
            <p className="text-xs font-bold text-slate-dark/50 tracking-widest uppercase">
              {loading ? 'Synchronizing Ledger...' : `Auditing ${filteredOrders.length} Transactional Records`}
            </p>
          </div>

          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="relative group">
              <input
                type="text"
                placeholder="Locate Transaction..."
                value={searchTerm}
                onChange={handleSearch}
                className="bg-off-white-warm px-8 py-5 rounded-full w-96 font-bold text-slate-dark focus:bg-white focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none border-none placeholder:text-slate-dark/20"
              />
              <FaSearch className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-dark/20 group-focus-within:text-slate-dark transition-colors" />
            </div>
          </div>
        </div>

        {/* Filters Ledger */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <CustomDropdown
            label="Fulfillment Status"
            options={[
              { label: 'Global Ledger', value: '' },
              { label: 'Pending Payment', value: 'pending' },
              { label: 'Processing (Paid)', value: 'paid' },
              { label: 'Delivered Archive', value: 'delivered' },
            ]}
            value={selectedStatus}
            onChange={(val) => setSelectedStatus(val)}
          />
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center opacity-40">
            <div className="w-16 h-16 border-4 border-slate-dark border-t-transparent rounded-full animate-spin mb-6"></div>
            <span className="font-black text-[10px] uppercase tracking-[0.5em]">Fetching Ledger Data</span>
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
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Chronicle Signature</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Client Portfolio</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Commercial Valuation</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Settlement Status</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Chronology</th>
                    <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-dark/5">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-off-white-warm/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-xs font-black text-slate-dark/60 tracking-widest leading-none">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-black text-slate-dark uppercase tracking-tighter leading-tight">{order.user ? order.user.name : 'Guest User'}</span>
                            <span className="text-[9px] font-bold text-slate-dark/20 uppercase tracking-widest italic tracking-tighter">{order.user ? order.user.email : 'No Contact Data'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[11px] font-black text-slate-dark">₹{order.totalPrice?.toLocaleString() || '0.00'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 border ${order.isDelivered ? 'border-green-400 text-green-700' :
                            order.isPaid ? 'border-blue-400 text-blue-700' : 'border-orange-400 text-orange-700'
                            }`}>
                            {order.isDelivered ? 'Fulfilled' : order.isPaid ? 'In-Process' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-widest italic">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1.5 ">
                            <button
                              onClick={() => handleViewOrder(order._id)}
                              className="w-8 h-8 bg-slate-dark text-white flex items-center justify-center hover:bg-black transition-colors"
                              title="Inspect Record"
                            >
                              <FaEye className="text-[10px]" />
                            </button>
                            <button
                              onClick={() => handleEditOrder(order._id)}
                              className="w-8 h-8 bg-off-white-warm text-slate-dark flex items-center justify-center hover:bg-slate-dark hover:text-white transition-colors border border-slate-dark/5"
                              title="Adjust Logistics"
                            >
                              <FaEdit className="text-[10px]" />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order._id, order._id.slice(-6).toUpperCase())}
                              className="w-8 h-8 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                              title="Void Transaction"
                            >
                              <FaTrash className="text-[10px]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-8 py-24 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="space-y-1">
                            <h3 className="text-lg font-black text-slate-dark uppercase tracking-wider">Empty Ledger</h3>
                            <p className="text-[9px] font-bold text-slate-dark/40 uppercase tracking-widest">Query returned null.</p>
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

export default OrderListScreen;
