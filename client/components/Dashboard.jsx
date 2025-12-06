'use client';

import { useState } from 'react';

export default function Dashboard({ leads, onLeadDeleted, onLeadUpdated, token }) {
  const [filter, setFilter] = useState('all');

  const isDueToday = (date) => {
    if (!date) return false;
    
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const followUpDate = new Date(date);
      followUpDate.setHours(0, 0, 0, 0);
      
      if (isNaN(today.getTime()) || isNaN(followUpDate.getTime())) {
        return false;
      }
      
      return followUpDate.getTime() <= today.getTime();
    } catch (error) {
      return false;
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (filter === 'dueToday') {
      return isDueToday(lead.nextFollowUp);
    }
    return true;
  });

  const handleDelete = async (id) => {
    if (!confirm('⚠️ Are you sure you want to delete this lead? This action cannot be undone.')) return;

    try {
      const response = await fetch(`https://dealflow-crm.onrender.com/api/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        onLeadDeleted(id);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('Failed to delete lead. Please try again.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // Optimistic update - update UI immediately
    const updatedLead = leads.find(l => l._id === id);
    if (updatedLead) {
      onLeadUpdated({ ...updatedLead, status: newStatus });
    }

    try {
      const response = await fetch(`https://dealflow-crm.onrender.com/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedLeadFromServer = await response.json();
        onLeadUpdated(updatedLeadFromServer);
      } else {
        // Revert on error
        if (updatedLead) {
          onLeadUpdated(updatedLead);
        }
        alert('Failed to update status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating lead:', error);
      // Revert on error
      if (updatedLead) {
        onLeadUpdated(updatedLead);
      }
      alert('Network error. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-500 text-white',
      contacted: 'bg-yellow-500 text-gray-900',
      interested: 'bg-green-500 text-white',
      closed: 'bg-purple-600 text-white',
      lost: 'bg-gray-500 text-white',
    };
    return colors[status] || 'bg-gray-500 text-white';
  };

  const getStatusLabel = (status) => {
    const labels = {
      new: 'New',
      contacted: 'Contacted',
      interested: 'Interested',
      closed: 'Closed',
      lost: 'Lost',
    };
    return labels[status] || status;
  };

  const dueTodayCount = leads.filter((l) => isDueToday(l.nextFollowUp)).length;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
              📊 Your Leads Pipeline
            </h2>
            <p className="text-blue-100 text-lg font-semibold">
              {filteredLeads.length} {filteredLeads.length === 1 ? 'lead' : 'leads'} 
              {filter === 'dueToday' ? ' need your attention today' : ' in your pipeline'}
            </p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl text-base font-black transition-all transform hover:scale-105 ${
                filter === 'all'
                  ? 'bg-white text-blue-600 shadow-xl'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              All Leads ({leads.length})
            </button>
            <button
              onClick={() => setFilter('dueToday')}
              className={`px-6 py-3 rounded-xl text-base font-black transition-all transform hover:scale-105 flex items-center gap-2 ${
                filter === 'dueToday'
                  ? 'bg-red-600 text-white shadow-xl animate-pulse'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              🔥 Due Today ({dueTodayCount})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">
              {filter === 'dueToday' ? '🎉' : '📭'}
            </div>
            <p className="text-gray-900 text-3xl font-black mb-3">
              {filter === 'dueToday' ? 'All caught up!' : 'No leads yet'}
            </p>
            <p className="text-gray-600 text-xl font-semibold mb-6">
              {filter === 'dueToday' 
                ? 'You have no follow-ups due today. Great job!' 
                : 'Start by adding your first lead above.'}
            </p>
            {filter === 'dueToday' && (
              <button
                onClick={() => setFilter('all')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View All Leads →
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border-2 border-gray-200">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-300">
                  <th className="w-[20%] px-4 py-5 text-left text-sm font-black text-gray-900">Lead Name</th>
                  <th className="w-[18%] px-4 py-5 text-left text-sm font-black text-gray-900">Email</th>
                  <th className="w-[10%] px-4 py-5 text-left text-sm font-black text-gray-900">Value</th>
                  <th className="w-[13%] px-4 py-5 text-left text-sm font-black text-gray-900">Status</th>
                  <th className="w-[13%] px-4 py-5 text-left text-sm font-black text-gray-900">Follow-Up</th>
                  <th className="w-[16%] px-4 py-5 text-left text-sm font-black text-gray-900">Notes</th>
                  <th className="w-[10%] px-4 py-5 text-left text-sm font-black text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, index) => {
                  const isOverdue = isDueToday(lead.nextFollowUp);
                  
                  return (
                    <tr 
                      key={lead._id} 
                      className={`border-b border-gray-200 transition-all hover:shadow-lg ${
                        isOverdue 
                          ? 'bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100' 
                          : index % 2 === 0 
                            ? 'bg-white hover:bg-blue-50' 
                            : 'bg-gray-50 hover:bg-blue-50'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate">
                              {lead.name}
                              {isOverdue && <span className="ml-1 text-red-600">🔥</span>}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-700 truncate" title={lead.email}>{lead.email}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-black text-green-600">
                          ₹{(lead.dealValue / 1000).toFixed(0)}k
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className={`w-full px-3 py-2 rounded-lg text-xs font-black cursor-pointer transition-all shadow-sm border-2 border-transparent hover:border-gray-300 ${getStatusColor(lead.status)}`}
                        >
                          <option value="new" className="bg-white text-gray-900 font-bold">New</option>
                          <option value="contacted" className="bg-white text-gray-900 font-bold">Contacted</option>
                          <option value="interested" className="bg-white text-gray-900 font-bold">Interested</option>
                          <option value="closed" className="bg-white text-gray-900 font-bold">Closed</option>
                          <option value="lost" className="bg-white text-gray-900 font-bold">Lost</option>
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-bold inline-block whitespace-nowrap ${
                            isOverdue
                              ? 'bg-red-600 text-white animate-pulse'
                              : 'bg-gray-200 text-gray-900'
                          }`}
                        >
                          {new Date(lead.nextFollowUp).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: '2-digit'
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-xs text-gray-700 font-semibold truncate" title={lead.notes}>
                          {lead.notes || <span className="text-gray-400 italic">-</span>}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleDelete(lead._id)}
                          className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-all shadow-sm hover:shadow-md"
                          title="Delete lead"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      {filteredLeads.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t-2 border-gray-200">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-gray-700 font-bold text-base">
              Showing <span className="text-blue-600 font-black">{filteredLeads.length}</span> of <span className="text-purple-600 font-black">{leads.length}</span> leads
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-gray-600 text-xs font-bold">Total Value</p>
                <p className="text-xl font-black text-green-600">
                  ₹{(filteredLeads.reduce((sum, lead) => sum + lead.dealValue, 0) / 1000).toFixed(0)}k
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-xs font-bold">Avg Deal</p>
                <p className="text-xl font-black text-purple-600">
                  ₹{(filteredLeads.reduce((sum, lead) => sum + lead.dealValue, 0) / filteredLeads.length / 1000).toFixed(0)}k
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
