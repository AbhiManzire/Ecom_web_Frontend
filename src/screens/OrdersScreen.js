import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../store/slices/orderSlice';
import { FaBox, FaArrowRight } from 'react-icons/fa';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=orders');
      return;
    }
    dispatch(getUserOrders());
  }, [dispatch, navigate, userInfo]);

  if (!userInfo) return null;

  return (
    <>
      <Meta title="My Orders | YOUTH CIRCLE" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-[2px] bg-slate-dark/20"></div>
            <span className="text-[10px] font-black tracking-[0.4em] text-slate-dark/40 uppercase">Order History</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-dark tracking-tighter uppercase">
            My Orders
          </h1>
          <p className="mt-2 text-slate-dark/60 text-sm font-medium">
            View and track your orders
          </p>
        </div>

        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/order/${order._id}`}
                className="block bg-white rounded-2xl border border-slate-dark/5 shadow-sm p-6 hover:shadow-md hover:border-slate-dark/10 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-dark/5 flex items-center justify-center shrink-0">
                      <FaBox className="text-slate-dark/60" />
                    </div>
                    <div>
                      <p className="font-black text-slate-dark text-sm">
                        Order #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-slate-dark/50 text-xs mt-0.5">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems?.length || 0} item(s)
                      </p>
                      <p className="text-slate-dark font-bold mt-1">
                        ₹{order.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-dark/60">
                    <span className="text-xs font-bold uppercase">
                      {order.isDelivered ? 'Delivered' : order.isPaid ? 'Shipped' : 'Processing'}
                    </span>
                    <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-dark/5 p-12 text-center">
            <FaBox className="text-4xl text-slate-dark/20 mx-auto mb-4" />
            <p className="text-slate-dark/60 font-bold">No orders yet</p>
            <p className="text-slate-dark/40 text-sm mt-1">Start shopping to see your orders here</p>
            <Link
              to="/"
              className="inline-block mt-6 px-6 py-3 bg-slate-dark text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-dark/90 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersScreen;
