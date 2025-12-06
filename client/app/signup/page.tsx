'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

// ============================================
// VALIDATION UTILITIES
// ============================================

interface PasswordStrength {
  score: number;
  message: string;
  color: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return emailRegex.test(email);
};

const checkPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score <= 2) return { score, message: 'Weak', color: 'red' };
  if (score <= 4) return { score, message: 'Medium', color: 'yellow' };
  return { score, message: 'Strong', color: 'green' };
};

const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain at least one lowercase letter');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain at least one uppercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Must contain at least one number');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Must contain at least one special character (@#$%*!&)');
  }
  if (password.length > 128) {
    errors.push('Password must not exceed 128 characters');
  }
  
  return { valid: errors.length === 0, errors };
};

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({ 
    score: 0, 
    message: '', 
    color: 'gray' 
  });
  
  const { login } = useAuth();
  const router = useRouter();

  // Real-time validation
  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name });
    
    if (name.length > 0 && name.length < 2) {
      setFieldErrors({ ...fieldErrors, name: 'Name must be at least 2 characters' });
    } else if (name.length > 50) {
      setFieldErrors({ ...fieldErrors, name: 'Name must not exceed 50 characters' });
    } else {
      const { name: _, ...rest } = fieldErrors;
      setFieldErrors(rest);
    }
  };

  const handleEmailChange = (email: string) => {
    setFormData({ ...formData, email });
    
    if (email.length > 0 && !validateEmail(email)) {
      setFieldErrors({ ...fieldErrors, email: 'Please enter a valid email address' });
    } else {
      const { email: _, ...rest } = fieldErrors;
      setFieldErrors(rest);
    }
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    
    // Update password strength
    if (password.length > 0) {
      setPasswordStrength(checkPasswordStrength(password));
    } else {
      setPasswordStrength({ score: 0, message: '', color: 'gray' });
    }
    
    // Validate password
    const validation = validatePassword(password);
    if (!validation.valid && password.length > 0) {
      setFieldErrors({ ...fieldErrors, password: validation.errors[0] });
    } else {
      const { password: _, ...rest } = fieldErrors;
      setFieldErrors(rest);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Final validation before submission
    const errors: {[key: string]: string} = {};
    
    if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.errors.join(', ');
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('Please fix the validation errors below');
      return;
    }
    
    setLoading(true);

    try {
      const response = await fetch('https://dealflow-crm.onrender.com/api/auth/signup', {
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
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setError('');
    
    try {
      await signIn('google', {
        callbackUrl: '/dashboard',
      });
    } catch (err) {
      setError('Google signup error. Please try again.');
      setGoogleLoading(false);
    }
  };

  const getStrengthBarColor = () => {
    if (passwordStrength.color === 'red') return 'bg-red-500';
    if (passwordStrength.color === 'yellow') return 'bg-yellow-500';
    if (passwordStrength.color === 'green') return 'bg-green-500';
    return 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-300"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-500"></div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <span className="text-4xl animate-float">🚀</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur-lg opacity-20"></div>
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg transform hover:scale-110 transition-transform">
                  ✨
                </div>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Get Started Free
              </h1>
              <p className="text-gray-600 text-lg font-semibold">
                Create your account and start closing deals today
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-xl mb-6 text-sm font-bold animate-fadeIn">
                ⚠️ {error}
              </div>
            )}

            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 rounded-xl text-base font-bold hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all shadow-sm mb-6 flex items-center justify-center gap-3 disabled:bg-gray-100 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {googleLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
                  <span className="font-bold">Connecting to Google...</span>
                </span>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-bold">Sign up with Google</span>
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
                  Or sign up with email
                </span>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-base font-bold mb-2 text-gray-900">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={`w-full border-2 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 transition-all placeholder:text-gray-500 ${
                    fieldErrors.name 
                      ? 'border-red-500 focus:ring-red-200 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="John Doe"
                  disabled={googleLoading}
                />
                {fieldErrors.name && (
                  <p className="text-red-600 text-sm font-bold mt-2 flex items-center gap-1">
                    ⚠️ {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-base font-bold mb-2 text-gray-900">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full border-2 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 transition-all placeholder:text-gray-500 ${
                    fieldErrors.email 
                      ? 'border-red-500 focus:ring-red-200 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                  }`}
                  placeholder="you@example.com"
                  disabled={googleLoading}
                />
                {fieldErrors.email && (
                  <p className="text-red-600 text-sm font-bold mt-2 flex items-center gap-1">
                    ⚠️ {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-base font-bold mb-2 text-gray-900">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className={`w-full border-2 rounded-xl px-5 py-4 pr-12 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 transition-all placeholder:text-gray-500 ${
                      fieldErrors.password 
                        ? 'border-red-500 focus:ring-red-200 focus:border-red-500' 
                        : 'border-gray-300 focus:ring-green-200 focus:border-green-500'
                    }`}
                    placeholder="Create a strong password"
                    disabled={googleLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 font-bold"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password.length > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-gray-700">Password Strength:</span>
                      <span className={`text-sm font-black ${
                        passwordStrength.color === 'red' ? 'text-red-600' :
                        passwordStrength.color === 'yellow' ? 'text-yellow-600' :
                        passwordStrength.color === 'green' ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {passwordStrength.message}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getStrengthBarColor()}`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {fieldErrors.password && (
                  <p className="text-red-600 text-sm font-bold mt-2 flex items-start gap-1">
                    ⚠️ {fieldErrors.password}
                  </p>
                )}
                
                {/* Password Requirements */}
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-bold text-gray-700 mb-1">Password must contain:</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <p className={`font-semibold ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      ✓ 8+ characters
                    </p>
                    <p className={`font-semibold ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      ✓ Lowercase letter
                    </p>
                    <p className={`font-semibold ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      ✓ Uppercase letter
                    </p>
                    <p className={`font-semibold ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      ✓ Number
                    </p>
                    <p className={`font-semibold ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      ✓ Special character
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || googleLoading || Object.keys(fieldErrors).length > 0}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl text-lg font-black hover:from-green-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-lg hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create Free Account
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-semibold">
                Already have an account?{' '}
                <Link href="/login" className="text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text font-black hover:from-green-700 hover:to-blue-700 transition-all">
                  Login here →
                </Link>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t-2 border-gray-200">
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600 font-semibold">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-green-600 text-2xl">🔒</span>
                  <span>Secure Signup</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-blue-600 text-2xl">⚡</span>
                  <span>2 Min Setup</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-purple-600 text-2xl">🎉</span>
                  <span>Free Forever</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <p className="text-center mt-6 text-gray-600 font-semibold text-sm">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-bold">
              Terms
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-bold">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
