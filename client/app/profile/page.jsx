'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, token, isAuthenticated, logout, login } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [isAuthenticated, user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/update-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login({ ...user, name: data.name, email: data.email }, token);
        setMessage({ type: 'success', text: '✓ Profile updated successfully!' });
        setIsEditing(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Update failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: '✓ Password changed successfully!' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Password change failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✓ Your account has been deleted successfully. You will now be logged out.');
        logout();
        router.push('/signup');
      } else {
        setMessage({ type: 'error', text: data.error || 'Account deletion failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
      setDeletePassword('');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-300"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 animate-fadeInUp">
            <div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                Account Settings
              </h1>
              <p className="text-gray-700 text-xl font-bold">Manage your profile and security preferences</p>
            </div>
            <Link
              href="/dashboard"
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:border-gray-400 hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </Link>
          </div>

          {/* Success/Error Message Banner */}
          {message.text && (
            <div
              className={`mb-8 px-8 py-5 rounded-2xl shadow-2xl animate-fadeIn border-2 ${
                message.type === 'success'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-900 border-green-400'
                  : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-900 border-red-400'
              }`}
            >
              <p className="font-black text-lg flex items-center gap-3">
                {message.type === 'success' ? '✅' : '⚠️'}
                {message.text}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Glass Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card with Glassmorphism */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-8 animate-fadeInUp">
                <div className="text-center">
                  {/* Avatar with Gradient Border */}
                  <div className="relative inline-block mb-6">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                      <span className="text-6xl">👤</span>
                    </div>
                  </div>

                  {/* User Info */}
                  <h2 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
                    {user?.name}
                  </h2>
                  <p className="text-gray-600 text-base font-bold mb-6">{user?.email}</p>

                  {/* Member Since Badge */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 shadow-xl">
                    <p className="text-white/80 text-sm font-bold mb-2">Member Since</p>
                    <p className="text-white text-2xl font-black">
                      {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-6 animate-fadeInUp delay-100">
                <h3 className="text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setShowPasswordForm(false);
                      setShowDeleteForm(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-4 rounded-xl text-base font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                  >
                    <span className="text-xl">✏️</span>
                    Edit Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordForm(true);
                      setIsEditing(false);
                      setShowDeleteForm(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-5 py-4 rounded-xl text-base font-bold hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                  >
                    <span className="text-xl">🔒</span>
                    Change Password
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/login');
                    }}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-5 py-4 rounded-xl text-base font-bold hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                  >
                    <span className="text-xl">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Information Card */}
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-10 animate-fadeInUp delay-200">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                      <span className="text-4xl">👤</span>
                      Profile Information
                    </h2>
                    <p className="text-gray-600 font-bold mt-2">View and update your personal details</p>
                  </div>
                </div>

                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-xl p-6">
                      <label className="block text-sm font-black text-blue-900 mb-2 uppercase tracking-wide">
                        Full Name
                      </label>
                      <p className="text-2xl text-gray-900 font-black">{user?.name}</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 rounded-xl p-6">
                      <label className="block text-sm font-black text-purple-900 mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <p className="text-2xl text-gray-900 font-black">{user?.email}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-600 rounded-xl p-6">
                      <label className="block text-sm font-black text-green-900 mb-2 uppercase tracking-wide">
                        Account Status
                      </label>
                      <span className="inline-flex items-center px-4 py-2 rounded-xl text-base font-black bg-green-600 text-white shadow-lg">
                        ✓ Active & Verified
                      </span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-6">
                      <div className="group">
                        <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
                          <span className="text-2xl">✏️</span>
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border-2 border-gray-300 rounded-xl px-6 py-5 text-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all hover:border-gray-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
                          <span className="text-2xl">📧</span>
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border-2 border-gray-300 rounded-xl px-6 py-5 text-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all hover:border-gray-400"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-10">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-5 rounded-xl text-xl font-black hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Saving...' : '✓ Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({ name: user.name, email: user.email });
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 px-8 py-5 rounded-xl text-xl font-black hover:from-gray-400 hover:to-gray-500 transition-all shadow-lg transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Change Password Card */}
              {showPasswordForm && (
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/50 p-10 animate-fadeInUp">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                      <span className="text-4xl">🔒</span>
                      Change Password
                    </h2>
                    <p className="text-gray-600 font-bold mt-2">
                      Update your password to keep your account secure
                    </p>
                  </div>
                  <form onSubmit={handleChangePassword}>
                    <div className="space-y-6">
                      <div className="group">
                        <label className="block text-base font-black mb-3 text-gray-900">
                          Current Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          className="w-full border-2 border-gray-300 rounded-xl px-6 py-5 text-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all hover:border-gray-400"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-base font-black mb-3 text-gray-900">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                          }
                          className="w-full border-2 border-gray-300 rounded-xl px-6 py-5 text-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all hover:border-gray-400"
                          placeholder="Minimum 6 characters"
                        />
                      </div>
                      <div className="group">
                        <label className="block text-base font-black mb-3 text-gray-900">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                          }
                          className="w-full border-2 border-gray-300 rounded-xl px-6 py-5 text-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all hover:border-gray-400"
                          placeholder="Re-enter new password"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-10">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-5 rounded-xl text-xl font-black hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Changing...' : '🔑 Update Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPasswordForm(false);
                          setPasswordData({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 px-8 py-5 rounded-xl text-xl font-black hover:from-gray-400 hover:to-gray-500 transition-all shadow-lg transform hover:scale-105"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Danger Zone - Delete Account */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl shadow-2xl border-2 border-red-300 p-10 animate-fadeInUp delay-300">
                <div className="mb-8">
                  <h2 className="text-3xl font-black text-red-900 flex items-center gap-3">
                    <span className="text-4xl">⚠️</span>
                    Delete Account
                  </h2>
                  <p className="text-red-800 font-black mt-3 text-lg">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-8 border-2 border-red-400 shadow-xl">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-3xl">🗑️</span>
                    Delete Account Permanently
                  </h3>
                  <p className="text-gray-700 font-bold mb-5">
                    This will permanently delete:
                  </p>
                  <ul className="list-none space-y-3 mb-8 bg-red-50 p-6 rounded-xl border-2 border-red-200">
                    <li className="font-black text-gray-900 flex items-center gap-3">
                      <span className="text-red-600 text-xl">❌</span>
                      Your profile and account information
                    </li>
                    <li className="font-black text-gray-900 flex items-center gap-3">
                      <span className="text-red-600 text-xl">❌</span>
                      All your leads and CRM data
                    </li>
                    <li className="font-black text-gray-900 flex items-center gap-3">
                      <span className="text-red-600 text-xl">❌</span>
                      Your login credentials and access
                    </li>
                  </ul>

                  {!showDeleteForm ? (
                    <button
                      onClick={() => setShowDeleteForm(true)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-5 rounded-xl text-xl font-black hover:from-red-700 hover:to-red-800 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      🗑️ I Want to Delete My Account
                    </button>
                  ) : (
                    <form onSubmit={handleDeleteAccount} className="space-y-6">
                      <div className="bg-yellow-50 border-2 border-yellow-500 rounded-xl p-6">
                        <p className="text-yellow-900 font-black mb-2 text-lg flex items-center gap-2">
                          <span className="text-2xl">⚠️</span>
                          Final Confirmation Required
                        </p>
                        <p className="text-yellow-800 font-bold">
                          Please enter your password to confirm deletion. This cannot be undone.
                        </p>
                      </div>

                      <div>
                        <label className="block text-base font-black mb-3 text-gray-900">
                          Enter Your Password to Confirm
                        </label>
                        <input
                          type="password"
                          required
                          value={deletePassword}
                          onChange={(e) => setDeletePassword(e.target.value)}
                          className="w-full border-2 border-red-400 rounded-xl px-6 py-5 text-lg text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all"
                          placeholder="Enter your password"
                          autoFocus
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-5 rounded-xl text-xl font-black hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-xl hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105"
                        >
                          {loading ? 'Deleting...' : '🗑️ Yes, Delete Forever'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowDeleteForm(false);
                            setDeletePassword('');
                            setMessage({ type: '', text: '' });
                          }}
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 px-8 py-5 rounded-xl text-xl font-black hover:from-gray-400 hover:to-gray-500 transition-all shadow-lg transform hover:scale-105 disabled:cursor-not-allowed"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
