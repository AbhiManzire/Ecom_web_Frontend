import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import MobileLoginScreen from './screens/MobileLoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import { clearError, clearSuccess } from './store/slices/userSlice';
import { clearError as clearProductError } from './store/slices/productSlice';
import { clearError as clearOrderError } from './store/slices/orderSlice';

function App() {
  const dispatch = useDispatch();
  const { error: userError, success: userSuccess } = useSelector((state) => state.user);
  const { error: productError } = useSelector((state) => state.product);
  const { error: orderError } = useSelector((state) => state.order);

  useEffect(() => {
    if (userError) {
      toast.error(userError);
      dispatch(clearError());
    }
    if (productError) {
      toast.error(productError);
      dispatch(clearProductError());
    }
    if (orderError) {
      toast.error(orderError);
      dispatch(clearOrderError());
    }
    if (userSuccess) {
      toast.success('Success!');
      dispatch(clearSuccess());
    }
  }, [userError, productError, orderError, userSuccess, dispatch]);

  return (
    <Routes>
      {/* Admin Routes - No Header/Footer */}
      <Route path="/admin/*" element={<AdminRoute><AdminLayout /></AdminRoute>} />

      {/* Main Website Routes - With Header/Footer */}
      <Route path="/*" element={
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/search/:keyword" element={<HomeScreen />} />
              <Route path="/page/:pageNumber" element={<HomeScreen />} />
              <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
              <Route path="/category/:category" element={<HomeScreen />} />
              <Route path="/category/:category/page/:pageNumber" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/mobile-login" element={<MobileLoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrdersScreen /></ProtectedRoute>} />
              <Route path="/shipping" element={<ProtectedRoute><ShippingScreen /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><PaymentScreen /></ProtectedRoute>} />
              <Route path="/placeorder" element={<ProtectedRoute><PlaceOrderScreen /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutScreen /></ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

export default App;
