import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../store/slices/orderSlice';
import { fetchAllUsers } from '../store/slices/userSlice';
import { fetchProducts } from '../store/slices/productSlice';
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign, FaEye, FaCalendarAlt, FaArrowUp } from 'react-icons/fa';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import CustomDropdown from '../components/CustomDropdown';

const AnalyticsScreen = () => {
  const dispatch = useDispatch();
  const { orders, loading: ordersLoading } = useSelector((state) => state.order);
  const { users, loading: usersLoading } = useSelector((state) => state.user);
  const { products, loading: productsLoading } = useSelector((state) => state.product);

  const [timeRange, setTimeRange] = useState('30'); // 7, 30, 90 days
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(fetchAllOrders()),
      dispatch(fetchAllUsers()),
      dispatch(fetchProducts({ pageSize: 1000 }))
    ]).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // Calculate analytics data
  const calculateAnalytics = () => {
    if (!orders || !users || !products) return {};

    const now = new Date();
    const daysAgo = new Date(now.getTime() - (parseInt(timeRange) * 24 * 60 * 60 * 1000));

    // Filter data by time range
    const recentOrders = orders.filter(order => new Date(order.createdAt) >= daysAgo);
    const recentUsers = users.filter(user => new Date(user.createdAt) >= daysAgo);

    // Calculate metrics
    const totalRevenue = recentOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const totalOrders = recentOrders.length;
    const totalUsers = recentUsers.length;
    const totalProducts = products.length;

    // Calculate average order value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate conversion rate (orders per user)
    const conversionRate = totalUsers > 0 ? (totalOrders / totalUsers) * 100 : 0;

    // Calculate daily sales
    const dailySales = {};
    recentOrders.forEach(order => {
      const date = new Date(order.createdAt).toDateString();
      dailySales[date] = (dailySales[date] || 0) + (order.totalPrice || 0);
    });

    // Calculate top products
    const productSales = {};
    recentOrders.forEach(order => {
      order.orderItems?.forEach(item => {
        productSales[item.name] = (productSales[item.name] || 0) + item.qty;
      });
    });

    const topProducts = Object.entries(productSales)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Calculate order status distribution
    const statusDistribution = {
      pending: recentOrders.filter(o => !o.isPaid).length,
      paid: recentOrders.filter(o => o.isPaid && !o.isDelivered).length,
      delivered: recentOrders.filter(o => o.isDelivered).length
    };

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      averageOrderValue,
      conversionRate,
      dailySales,
      topProducts,
      statusDistribution
    };
  };

  const analytics = calculateAnalytics();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading || ordersLoading || usersLoading || productsLoading) {
    return <Loader />;
  }

  return (
    <>
      <Meta title="Market Intelligence | Mearn Admin" />
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-slate-dark/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">Economic Insights</span>
            </div>
            <h1 className="text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
              Market <span className="text-slate-dark/20">Analytics</span>
            </h1>
            <p className="text-xs font-bold text-slate-dark/50 tracking-widest uppercase">
              Deep-dive metrics across <span className="text-slate-dark">{timeRange} days</span> of global operations.
            </p>
          </div>

          <CustomDropdown
            label="Analysis Window"
            options={[
              { label: '7 Days Cycle', value: '7' },
              { label: '30 Days Cycle', value: '30' },
              { label: 'Quarterly Cycle', value: '90' },
            ]}
            value={timeRange}
            onChange={(val) => setTimeRange(val)}
          />
        </div>

        {/* Primary Analytical Focus */}
        <div className="mb-12">
          <div className="relative overflow-hidden bg-white border border-slate-dark/5 rounded-[40px] p-12 shadow-2xl shadow-slate-dark/5">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="space-y-2">
                <span className="text-[10px] font-black tracking-[0.5em] text-slate-dark/40 uppercase italic">Aggregated Valuation</span>
                <h2 className="text-8xl font-black tracking-tighter leading-none text-slate-dark italic">{formatCurrency(analytics.totalRevenue || 0)}</h2>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-1 bg-slate-dark text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <FaArrowUp className="text-[8px]" /> 18.2% Growth
                  </div>
                  <span className="text-[10px] font-bold text-slate-dark/30 uppercase tracking-[0.2em]">Validated Revenue Stream</span>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="bg-off-white-warm p-8 rounded-[32px] space-y-1">
                  <p className="text-[10px] font-black text-slate-dark/30 uppercase tracking-widest">Efficiency</p>
                  <p className="text-3xl font-black text-slate-dark italic">{analytics.conversionRate?.toFixed(1) || 0}%</p>
                  <p className="text-[9px] font-bold text-slate-dark/40 uppercase">Conv. Rate</p>
                </div>
                <div className="bg-slate-dark text-white p-8 rounded-[32px] space-y-1">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Precision</p>
                  <p className="text-3xl font-black italic">{formatCurrency(analytics.averageOrderValue || 0)}</p>
                  <p className="text-[9px] font-bold text-white/40 uppercase">Avg. Ticket</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Distributed Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-[40px] p-10 border border-slate-dark/5 shadow-xl">
            <h3 className="text-[11px] font-black text-slate-dark/30 uppercase tracking-[0.4em] mb-8 pb-4 border-b border-slate-dark/5 italic">Order Lifecycle</h3>
            <div className="space-y-6">
              {[
                { label: 'Pending', count: analytics.statusDistribution?.pending, color: 'bg-orange-400' },
                { label: 'Settled', count: analytics.statusDistribution?.paid, color: 'bg-blue-400' },
                { label: 'Fulfilled', count: analytics.statusDistribution?.delivered, color: 'bg-green-400' }
              ].map((status, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-dark">
                    <span>{status.label}</span>
                    <span>{status.count || 0}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-dark/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${status.color} transition-all duration-1000`}
                      style={{ width: `${(status.count / analytics.totalOrders) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-slate-dark rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
            <h3 className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] mb-8 pb-4 border-b border-white/10 italic relative z-10">High Velocity Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              {analytics.topProducts?.length > 0 ? (
                analytics.topProducts.map(([productName, quantity], index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-white/5 rounded-[24px] hover:bg-white/10 transition-all group">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white/20 uppercase">Rank {index + 1}</span>
                      <p className="text-xs font-black uppercase tracking-tight truncate max-w-[150px]">{productName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black italic">{quantity}</p>
                      <p className="text-[9px] font-bold text-white/40 uppercase">Units</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 py-10 flex flex-col items-center justify-center opacity-30">
                  <FaChartLine className="text-4xl mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Establishing Inventory Data</p>
                </div>
              )}
            </div>
            {/* Background Texture */}
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
              <div className="h-full w-full rotate-45 scale-150" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            </div>
          </div>
        </div>

        {/* Global Performance Chronicle */}
        <div className="space-y-8">
          <h3 className="text-[11px] font-black text-slate-dark/30 uppercase tracking-[0.5em] px-2 flex items-center gap-4">
            <div className="w-8 h-[1px] bg-slate-dark/20"></div>
            Recent Performance Registry
          </h3>
          <div className="bg-white border-t border-b border-slate-dark/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-dark/10">
                  <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Transaction Signature</th>
                  <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Chronology</th>
                  <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40">Liquidity Valuation</th>
                  <th className="px-6 py-6 text-[9px] font-black uppercase tracking-[0.4em] text-slate-dark/40 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-dark/5">
                {orders?.slice(0, 8).map((order, index) => (
                  <tr key={index} className="hover:bg-off-white-warm/30 transition-colors">
                    <td className="px-6 py-6">
                      <span className="text-xs font-black text-slate-dark uppercase tracking-widest leading-none">#{order._id.slice(-8).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.2em] italic">{formatDate(order.createdAt)}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-sm font-black text-slate-dark">{formatCurrency(order.totalPrice || 0)}</span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <span className={`text-[8px] font-black uppercase tracking-[0.3em] px-4 py-2 border ${order.isDelivered ? 'border-slate-dark text-slate-dark' : 'border-slate-dark/10 text-slate-dark/20'
                        }`}>
                        {order.isDelivered ? 'Fulfilled' : 'Synchronizing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsScreen;
