import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, Home } from 'lucide-react';
import { loginStart, loginSuccess, loginFailure, clearError } from '../store/slices/authSlice.js';
import API_URL from '../app';

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  // Redirect to dashboard if token exists
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  // Clear previous auth errors when entering/exiting the login page
  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      dispatch(loginFailure('Please fill in all fields.'));
      return;
    }

    dispatch(loginStart());

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput, password: passwordInput }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(loginSuccess({
          token: data.token,
          email: data.user.email
        }));
        navigate('/dashboard');
      } else {
        dispatch(loginFailure(data.message || 'Invalid email or password.'));
      }
    } catch (err) {
      dispatch(loginFailure('Could not connect to server. Please verify backend is running.'));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl pointer-events-none animate-pulse delay-700"></div>

      {/* Back to Home Link */}
      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
      >
        <Home size={16} />
        Back to Website
      </a>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-fade-in">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3 text-[#7fff00]">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h2>
          <p className="text-slate-400 text-sm mt-1">Access the Hillside Lead Dashboard</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl p-3 flex items-start gap-2.5 mb-6 text-sm animate-shake">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email field */}
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-slate-500" size={18} />
              <input
                type="email"
                placeholder="admin@hillside.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                disabled={loading}
                className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-slate-600 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-slate-500" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                disabled={loading}
                className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-slate-600 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors outline-none focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-green-500 to-[#7fff00] hover:from-green-600 hover:to-[#66cd00] text-black font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-green-500/20 flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-slate-500 text-xs relative z-10">
        © {new Date().getFullYear()} Hillside Realty. Secured Admin Console.
      </div>
    </div>
  );
}
