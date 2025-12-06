'use client';

import { useState } from 'react';

export default function LeadForm({ onLeadAdded, token }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dealValue: '',
    status: 'new',
    nextFollowUp: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          dealValue: Number(formData.dealValue) || 0,
        }),
      });

      if (response.ok) {
        const newLead = await response.json();
        onLeadAdded(newLead);
        setFormData({
          name: '',
          email: '',
          dealValue: '',
          status: 'new',
          nextFollowUp: '',
          notes: '',
        });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to add lead. Please try again.');
      }
    } catch (error) {
      console.error('Error adding lead:', error);
      alert('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusEmoji = (status) => {
    const emojis = {
      new: '🆕',
      contacted: '📞',
      interested: '⭐',
      closed: '✅',
      lost: '❌',
    };
    return emojis[status] || '📋';
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden mb-10 animate-fadeInUp">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
               Add New Lead
            </h2>
            <p className="text-blue-100 text-lg font-semibold">
              Fill in the details to track a new opportunity
            </p>
          </div>
          {success && (
            <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg animate-bounce shadow-xl">
              ✅ Lead Added!
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="group">
            <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">👤</span>
              Lead Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all placeholder:text-gray-500 hover:border-gray-400"
              placeholder="Enter full name"
            />
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📧</span>
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all placeholder:text-gray-500 hover:border-gray-400"
              placeholder="email@example.com"
            />
          </div>

          {/* Deal Value Field */}
          <div className="group">
            <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Deal Value (₹)
            </label>
            <input
              type="number"
              min="0"
              value={formData.dealValue}
              onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all placeholder:text-gray-500 hover:border-gray-400"
              placeholder="50000"
            />
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              💡 Estimated deal value in Rupees
            </p>
          </div>

          {/* Status Field */}
          <div className="group">
            <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Lead Status
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all appearance-none cursor-pointer hover:border-gray-400 bg-white"
              >
                <option value="new">🆕 New Lead</option>
                <option value="contacted">📞 Contacted</option>
                <option value="interested">⭐ Interested</option>
                <option value="closed">✅ Closed Won</option>
                <option value="lost">❌ Lost</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Follow-Up Date Field */}
          <div className="group">
            <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Next Follow-Up *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.nextFollowUp}
              onChange={(e) => setFormData({ ...formData, nextFollowUp: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all hover:border-gray-400 cursor-pointer"
            />
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              🔔 Set a reminder for follow-up
            </p>
          </div>

          {/* Notes Field */}
          <div className="group">
            <label className="block text-base font-black mb-3 text-gray-900 flex items-center gap-2">
              <span className="text-2xl">📝</span>
              Notes (Optional)
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full border-2 border-gray-300 rounded-xl px-5 py-4 text-base text-gray-900 font-semibold focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-gray-500 transition-all placeholder:text-gray-500 hover:border-gray-400"
              placeholder="Additional information..."
            />
            <p className="text-sm text-gray-600 mt-2 font-semibold">
              ℹ️ Any extra details about this lead
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl text-xl font-black hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 transition-all shadow-xl hover:shadow-2xl disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Lead...
              </>
            ) : (
              <>
                <span className="text-2xl">✨</span>
                Add Lead to Pipeline
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Helper Text */}
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900 font-bold flex items-center gap-2">
            <span className="text-xl">💡</span>
            Pro Tip: Set follow-up dates to stay on top of your leads and never miss an opportunity!
          </p>
        </div>
      </form>
    </div>
  );
}
