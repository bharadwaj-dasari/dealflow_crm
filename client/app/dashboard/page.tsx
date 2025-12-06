'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LeadForm from '@/components/LeadForm';
import Dashboard from '@/components/Dashboard';
import Link from 'next/link';

// ============================================
// TYPE DEFINITIONS
// ============================================

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'new' | 'contacted' | 'interested' | 'closed' | 'lost';
  dealValue: number;
  nextFollowUp?: string;
  notes?: string;
}

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated, token, user, logout, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    fetchLeads();
  }, [isAuthenticated, token, authLoading]);

  const fetchLeads = async (): Promise<void> => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data: Lead[] = await response.json();
        setLeads(data);
      } else if (response.status === 401) {
        logout();
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // TYPED HANDLER FUNCTIONS
  // ============================================

  const handleLeadAdded = (newLead: Lead): void => {
    setLeads([...leads, newLead]);
  };

  const handleLeadDeleted = (id: string): void => {
    setLeads(leads.filter((lead: Lead) => lead._id !== id));
  };

  const handleLeadUpdated = (updatedLead: Lead): void => {
    setLeads(
      leads.map((lead: Lead) =>
        lead._id === updatedLead._id ? updatedLead : lead
      )
    );
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-300"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-blue-600 mb-6"></div>
          <p className="text-gray-900 text-2xl font-black">Loading your workspace...</p>
          <p className="text-gray-600 text-lg font-semibold mt-2">Getting everything ready</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Calculate stats with proper typing
  const totalLeads: number = leads.length;
  const totalValue: number = leads.reduce((sum: number, lead: Lead) => sum + lead.dealValue, 0);
  const activeLeads: number = leads.filter((l: Lead) => l.status !== 'closed' && l.status !== 'lost').length;
  const closedLeads: number = leads.filter((l: Lead) => l.status === 'closed').length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-300"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>

      <div className="relative z-10 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 animate-fadeInUp">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <span className="text-5xl animate-float">🚀</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
                </div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  DealFlow CRM
                </h1>
              </div>
              <p className="text-gray-700 text-xl font-bold">Manage your leads and close more deals</p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/profile"
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-xl text-base font-bold hover:bg-white hover:border-gray-400 hover:shadow-lg transition-all transform hover:scale-105"
              >
                👤 Profile
              </Link>
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border-2 border-gray-200">
                <span className="text-sm text-gray-600 font-semibold">Welcome, </span>
                <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl text-base font-bold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fadeInUp delay-100">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all hover:shadow-2xl cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-100 text-base font-bold">Total Leads</span>
                <span className="text-5xl">📊</span>
              </div>
              <p className="text-5xl font-black mb-2">{totalLeads}</p>
              <div className="h-1 w-16 bg-blue-300 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all hover:shadow-2xl cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-100 text-base font-bold">Total Value</span>
                <span className="text-5xl">💰</span>
              </div>
              <p className="text-5xl font-black mb-2">₹{(totalValue / 1000).toFixed(0)}K</p>
              <div className="h-1 w-16 bg-green-300 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all hover:shadow-2xl cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-100 text-base font-bold">Active Leads</span>
                <span className="text-5xl">⚡</span>
              </div>
              <p className="text-5xl font-black mb-2">{activeLeads}</p>
              <div className="h-1 w-16 bg-yellow-300 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-3xl shadow-xl text-white transform hover:scale-105 transition-all hover:shadow-2xl cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-purple-100 text-base font-bold">Closed Deals</span>
                <span className="text-5xl">✅</span>
              </div>
              <p className="text-5xl font-black mb-2">{closedLeads}</p>
              <div className="h-1 w-16 bg-purple-300 rounded-full"></div>
            </div>
          </div>

          {/* Lead Form */}
          <div className="animate-fadeInUp delay-200">
            <LeadForm onLeadAdded={handleLeadAdded} token={token} />
          </div>

          {/* Loading or Dashboard */}
          {loading ? (
            <div className="bg-white/90 backdrop-blur-sm p-16 rounded-3xl shadow-2xl text-center border-2 border-gray-200 animate-fadeInUp delay-300">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-6"></div>
              <p className="text-gray-900 text-2xl font-black mb-2">Loading your leads...</p>
              <p className="text-gray-600 text-lg font-semibold">Please wait a moment</p>
            </div>
          ) : (
            <div className="animate-fadeInUp delay-300">
              <Dashboard
                leads={leads}
                onLeadDeleted={handleLeadDeleted}
                onLeadUpdated={handleLeadUpdated}
                token={token}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
