'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(
          { _id: data._id, name: data.name, email: data.email },
          data.token
        );
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
      });
    } catch (err) {
      setError('Google login error. Please try again.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-300"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <span className="text-4xl animate-float"></span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DealFlow
              </span>
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 font-bold transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Card with animations */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border-2 border-gray-100 animate-fadeInUp">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg transform hover:scale-110 transition-transform">
                  🔐
                </div>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-lg font-semibold">
                Login to manage your leads and close deals
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-xl mb-6 text-sm font-bold animate-fadeIn">
                ⚠️ {error}
              </div>
            )}

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl text-base font-bold hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all shadow-sm mb-6 flex items-center justify-center gap-3 disabled:bg-gray-100 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {googleLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="font-bold">Connecting to Google...</span>
                </span>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-bold">Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 font-bold text-sm">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-base font-bold mb-2 text-gray-900">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all placeholder:text-gray-500"
                  placeholder="you@example.com"
                  disabled={googleLoading}
                />
              </div>

              <div>
                <label className="block text-base font-bold mb-2 text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all placeholder:text-gray-500"
                  placeholder="Enter your password"
                  disabled={googleLoading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-lg font-black hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-lg hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-semibold">
                Don't have an account?{' '}
                <Link href="/signup" className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-black hover:from-blue-700 hover:to-purple-700 transition-all">
                  Sign up for free →
                </Link>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">🔒</span>
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 text-xl">⚡</span>
                  <span>Fast Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Link */}
          <p className="text-center mt-6 text-gray-600 font-semibold">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-3">•</span>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
