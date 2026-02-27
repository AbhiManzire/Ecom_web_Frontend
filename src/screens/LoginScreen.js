import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      console.log('🔍 LoginScreen: User logged in:', userInfo);

      // Check if user is admin and redirect accordingly
      if (userInfo.isAdmin) {
        console.log('🔍 LoginScreen: Redirecting to admin dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else {
        const path = redirect === '/' ? '/' : redirect;
        console.log('🔍 LoginScreen: Redirecting to:', path);
        navigate(path, { replace: true });
      }
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <>
      <Meta title="Sign In | MearnSneakers" />
      <div className="min-h-screen bg-off-white-warm flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Brand / Story panel */}
          <div className="space-y-6">
            <p className="text-[11px] font-black tracking-[0.4em] uppercase text-slate-dark/40">
              YouthCircle Members
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-dark leading-tight">
              Welcome back
              <span className="text-slate-dark/30"> to the circle.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-dark/70 max-w-md">
              Access your orders, saved styles and exclusive member drops. Sign in to keep your rotation in sync.
            </p>
            <div className="hidden md:flex flex-col gap-3 text-[11px] text-slate-dark/60 font-bold uppercase tracking-[0.25em]">
              <span>Track every order in real time</span>
              <span>Save favourites across collections</span>
              <span>Early access to selected drops</span>
            </div>
            <p className="text-xs text-slate-dark/50">
              New here?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                className="font-semibold text-slate-dark underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Sign-in card */}
          <div className="bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.18)] border border-slate-dark/10 overflow-hidden">
            <div className="border-b border-slate-dark/5 px-8 py-6 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-black tracking-[0.35em] uppercase text-slate-dark/40">Sign in</p>
                <p className="text-xs text-slate-dark/50 font-medium">Use your email and password to continue</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-dark text-white flex items-center justify-center text-[10px] font-black tracking-[0.2em]">
                YC
              </div>
            </div>

            <div className="p-8 space-y-6">
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}

              <form onSubmit={submitHandler} className="space-y-4">
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
                    autoComplete="email"
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full px-4 py-3 rounded-xl border border-slate-dark/15 bg-off-white-warm/60 text-sm text-slate-dark focus:outline-none focus:ring-2 focus:ring-slate-dark/20 focus:border-slate-dark/40 placeholder:text-slate-dark/30"
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-dark/50">
                    <Link to="/forgot-password" className="font-semibold text-slate-dark underline underline-offset-4">
                      Forgot password?
                    </Link>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-full bg-slate-dark text-white text-xs font-black uppercase tracking-[0.3em] hover:bg-black transition-colors disabled:bg-slate-dark/50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <p className="text-[11px] text-center text-slate-dark/40">
                By continuing you agree to YouthCircle&apos;s{' '}
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

export default LoginScreen;
