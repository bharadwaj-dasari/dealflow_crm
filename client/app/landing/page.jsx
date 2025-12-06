'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  
  // Refs for scroll animations
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [socialProofRef, socialProofInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-200 shadow-sm animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="text-4xl animate-float"></span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20"></div>
              </div>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DealFlow
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden sm:block text-gray-700 hover:text-gray-900 px-5 py-2.5 rounded-xl font-bold transition-all hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-7 py-2.5 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-32 pb-24 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-300"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className={`inline-block transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
                  ✨ Simple. Powerful. Free Forever
                </span>
              </div>
              
              <h1 className={`text-6xl lg:text-8xl font-black leading-tight transition-all duration-700 delay-100 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <span className="text-gray-900" style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(255,255,255,0.5)' }}>
    Manage Your Leads,{' '}
  </span>
  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.2)' }}>
    Close More Deals
  </span>
</h1>

              
              <p className={`text-2xl text-gray-600 leading-relaxed transition-all duration-700 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                The simplest CRM for freelancers, startups, and small businesses. 
                Track leads, manage follow-ups, and never miss a deal again.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link
                  href="/signup"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 text-center relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    🚀 Start Free Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Link>
                {/*<button className="border-3 border-gray-300 bg-white text-gray-700 px-10 py-5 rounded-2xl text-xl font-bold hover:border-gray-400 hover:bg-gray-50 hover:shadow-lg transition-all transform hover:scale-105 hover:-translate-y-1">
                  📺 Watch Demo
                </button>*/}
              </div>

              <div className={`flex flex-wrap items-center gap-6 pt-6 transition-all duration-700 delay-400 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {['No Credit Card', 'Free Forever', '2 Min Setup'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <span className="text-green-600 text-2xl">✓</span>
                    <span className="text-gray-700 font-bold">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Enhanced Dashboard Preview */}
            <div className={`relative transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100 backdrop-blur-sm hover:scale-105 transition-transform duration-500">
                <div className="space-y-6">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between pb-6 border-b-2 border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg"></div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">Your Dashboard</p>
                        <p className="text-sm text-gray-500">Real-time updates</p>
                      </div>
                    </div>
                    <span className="bg-gradient-to-r from-green-400 to-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md animate-pulse">
                      ● LIVE
                    </span>
                  </div>

                  {/* Enhanced Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-transform">
                      <p className="text-sm opacity-90 font-semibold">Total Leads</p>
                      <p className="text-4xl font-black mt-2">47</p>
                      <div className="mt-2 text-xs opacity-75">↑ 12% this week</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-transform">
                      <p className="text-sm opacity-90 font-semibold">Total Value</p>
                      <p className="text-4xl font-black mt-2">₹2.4M</p>
                      <div className="mt-2 text-xs opacity-75">↑ 28% this month</div>
                    </div>
                  </div>

                  {/* Mock Leads with better design */}
                  <div className="space-y-3">
                    {[
                      { name: 'Acme Corp', value: '₹850K', status: 'HOT', color: 'red' },
                      { name: 'TechStart Inc', value: '₹640K', status: 'WARM', color: 'yellow' },
                      { name: 'Global Solutions', value: '₹910K', status: 'HOT', color: 'red' },
                    ].map((lead, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${i === 0 ? 'from-purple-400 to-pink-400' : i === 1 ? 'from-blue-400 to-cyan-400' : 'from-orange-400 to-red-400'} rounded-xl group-hover:scale-110 transition-transform`}></div>
                          <div>
                            <p className="font-bold text-gray-900">{lead.name}</p>
                            <p className="text-xs text-gray-500 font-semibold">{lead.value} • Follow-up today</p>
                          </div>
                        </div>
                        <span className={`${lead.color === 'red' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'} px-3 py-1.5 rounded-lg text-xs font-black`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Scroll Animation */}
      <section 
        ref={featuresRef}
        className="py-24 px-4 bg-white relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-700 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
  <h2 className="text-5xl lg:text-6xl font-black mb-6">
    <span className="text-gray-900" style={{ 
      textShadow: '0 2px 8px rgba(255, 255, 255, 0.5)' 
    }}>
      Everything You Need,{' '}
    </span>
    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ 
      filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1))' 
    }}>
      Nothing You Don't
    </span>
  </h2>
  <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-semibold">
    Built for speed and simplicity. Get started in minutes, not days.
  </p>
</div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Add leads in seconds. No complex forms or endless clicks.',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: '🔔',
                title: 'Smart Reminders',
                description: 'Never miss a follow-up. Get notified when leads need attention.',
                color: 'from-blue-400 to-blue-600',
              },
              {
                icon: '📊',
                title: 'Visual Pipeline',
                description: 'See your deals at a glance. Track progress effortlessly.',
                color: 'from-purple-400 to-purple-600',
              },
              {
                icon: '🔒',
                title: 'Secure & Private',
                description: 'Your data is encrypted and belongs only to you.',
                color: 'from-green-400 to-green-600',
              },
              {
                icon: '📱',
                title: 'Works Everywhere',
                description: 'Desktop, tablet, mobile. Access your CRM anywhere.',
                color: 'from-pink-400 to-pink-600',
              },
              {
                icon: '🎯',
                title: 'Zero Learning Curve',
                description: "So simple, you will be productive from day one.",
                color: 'from-indigo-400 to-indigo-600',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-purple-200 group cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                  featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof with Animation */}
      <section 
        ref={socialProofRef}
        className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className={`text-5xl lg:text-6xl font-black mb-6 transition-all duration-700 ${socialProofInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Join Thousands of Happy Users
          </h2>
          <p className={`text-2xl text-blue-100 mb-16 transition-all duration-700 delay-100 ${socialProofInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Trusted by freelancers, startups, and businesses worldwide
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '10,000+', label: 'Active Users' },
              { number: '50,000+', label: 'Leads Managed' },
              { number: '₹500Cr+', label: 'Deals Closed' },
            ].map((stat, i) => (
              <div 
                key={i} 
                className={`bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 ${
                  socialProofInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <p className="text-6xl font-black mb-4">{stat.number}</p>
                <p className="text-blue-100 text-xl font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Animation */}
      <section 
        ref={ctaRef}
        className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl lg:text-6xl font-black mb-8 transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    <span className="text-gray-900" style={{ 
      textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)' 
    }}>
      Ready to Close More Deals?
    </span>
  </h2>
  <p className={`text-2xl text-gray-600 mb-12 font-semibold transition-all duration-700 delay-100 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
    Join thousands of successful businesses using DealFlow CRM
  </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 transition-all duration-700 delay-200 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-grey-800 placeholder:text-gray-500 px-8 py-5 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 text-lg w-full sm:w-96 font-semibold transition-all "
            />
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl w-full sm:w-auto transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Started Free
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <p className={`text-gray-500 text-base font-semibold transition-all duration-700 delay-300 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            No credit card required • Free forever • 2-minute setup
          </p>
        </div>
      </section>
    </div>
  );
}
