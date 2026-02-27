import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      // Check if user is admin and redirect accordingly
      if (userInfo.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <>
      <Meta title="Register | MearnSneakers" />
      <div className="min-h-screen bg-off-white-warm flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Story / Benefits panel */}
          <div className="space-y-6 order-2 md:order-1">
            <p className="text-[11px] font-black tracking-[0.4em] uppercase text-slate-dark/40">
              Join YouthCircle
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-dark leading-tight">
              Create your member profile
              <span className="text-slate-dark/30"> in seconds.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-dark/70 max-w-md">
              One account for your entire rotation. Sync orders, wishlists and sizes across every device.
            </p>
            <div className="hidden md:flex flex-col gap-3 text-[11px] text-slate-dark/60 font-bold uppercase tracking-[0.25em]">
              <span>Early access to selected drops</span>
              <span>Fast checkout with saved details</span>
              <span>Tailored recommendations by category</span>
            </div>
            <p className="text-xs text-slate-dark/50">
              Already a member?{' '}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                className="font-semibold text-slate-dark underline underline-offset-4"
              >
                Sign in to your account
              </Link>
            </p>
          </div>

          {/* Register card */}
          <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.18)] border border-slate-dark/10 overflow-hidden order-1 md:order-2">
            <div className="border-b border-slate-dark/5 px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black tracking-[0.35em] uppercase text-slate-dark/40">Create account</p>
                <p className="text-xs text-slate-dark/50 font-medium">Tell us a few details to get started</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-dark text-white flex items-center justify-center text-[10px] font-black tracking-[0.2em]">
                YC
              </div>
            </div>

            <div className="p-8 space-y-6">
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}

              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-black tracking-[0.2em] uppercase text-slate-dark/60 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="How should we address you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/15 bg-off-white-warm/60 text-sm text-slate-dark focus:outline-none focus:ring-2 focus:ring-slate-dark/20 focus:border-slate-dark/40 placeholder:text-slate-dark/30"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-black tracking-[0.2em] uppercase text-slate-dark/60 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/15 bg-off-white-warm/60 text-sm text-slate-dark focus:outline-none focus:ring-2 focus:ring-slate-dark/20 focus:border-slate-dark/40 placeholder:text-slate-dark/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-black tracking-[0.2em] uppercase text-slate-dark/60 mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/15 bg-off-white-warm/60 text-sm text-slate-dark focus:outline-none focus:ring-2 focus:ring-slate-dark/20 focus:border-slate-dark/40 placeholder:text-slate-dark/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-xs font-black tracking-[0.2em] uppercase text-slate-dark/60 mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/15 bg-off-white-warm/60 text-sm text-slate-dark focus:outline-none focus:ring-2 focus:ring-slate-dark/20 focus:border-slate-dark/40 placeholder:text-slate-dark/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-full bg-slate-dark text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-black transition-colors disabled:bg-slate-dark/50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <p className="text-[11px] text-center text-slate-dark/40">
                By creating an account you agree to YouthCircle&apos;s{' '}
                <span className="underline underline-offset-4">Terms</span> and{' '}
                <span className="underline underline-offset-4">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
