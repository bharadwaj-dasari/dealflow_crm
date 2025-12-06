import Link from 'next/link';

export default function AboutPage() {
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

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          About DealFlow CRM
        </h1>
        <p className="text-gray-600 text-xl mb-12">
          The story behind the simplest CRM for modern businesses
        </p>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border-2 border-gray-200 space-y-10">

          {/* Origin Story */}
          <section>
            <h2 className="text-4xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-5xl">💡</span>
              How It Started
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p className="font-semibold">
                DealFlow CRM began with a simple observation on Reddit. While browsing entrepreneurship communities, 
                I noticed countless founders, freelancers, and small business owners struggling with the same issue: 
                <strong> existing CRM tools were too expensive, too complicated, or overloaded with unnecessary features.</strong>
              </p>
              <p className="font-semibold">
                One post stood out — a solo entrepreneur paying $50/month just to track a few leads. That moment sparked 
                the idea: <strong>What if there was a CRM that was clean, simple, fast, and completely free?</strong>
              </p>
              <p className="font-semibold">
                So I set out to build it. What began as a personal challenge quickly grew into a tool designed to help 
                entrepreneurs stay organized without wasting time or money.
              </p>
            </div>
          </section>

          {/* The Problem */}
          <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-4xl">❌</span>
              The Problem with Existing CRMs
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💰</span>
                <span className="font-bold text-gray-800">
                  <strong>Too Expensive:</strong> Most CRMs cost $20–100+ per user/month — unaffordable for many.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🤯</span>
                <span className="font-bold text-gray-800">
                  <strong>Overly Complex:</strong> Bloated dashboards full of enterprise features that most users never touch.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">⏰</span>
                <span className="font-bold text-gray-800">
                  <strong>Slow Onboarding:</strong> Hours of setup, configuration, and tutorial watching.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">🔒</span>
                <span className="font-bold text-gray-800">
                  <strong>Vendor Lock-In:</strong> Difficult exports and systems designed to keep your data trapped.
                </span>
              </li>
            </ul>
          </section>

          {/* The Solution */}
          <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
            <h2 className="text-3xl font-black text-gray-900 mb-4 flex items-center gap-3">
              <span className="text-4xl">✅</span>
              The DealFlow Solution
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-black text-blue-600 mb-3">🎯 Simple & Focused</h3>
                <p className="text-gray-700 font-semibold">
                  Only the essentials: lead tracking, follow-up reminders, and status management.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-black text-green-600 mb-3">💯 Completely Free</h3>
                <p className="text-gray-700 font-semibold">
                  No subscriptions. No limits. No credit card. Free forever.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-black text-purple-600 mb-3">⚡ Lightning-Fast Setup</h3>
                <p className="text-gray-700 font-semibold">
                  Create an account and start managing leads in under 2 minutes.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-black text-pink-600 mb-3">🔐 Your Data</h3>
                <p className="text-gray-700 font-semibold">
                  Easy exports and one-click account deletion — your data stays yours.
                </p>
              </div>
            </div>
          </section>

          {/* About the Creator */}
          <section>
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-5xl">👨‍💻</span>
              About the Creator
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4">
                  <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                    Hi! I'm a final-year B.Tech Computer Science student passionate about building clean, efficient, 
                    and user-focused digital products.
                  </p>
                  <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                    I built DealFlow CRM using the MERN stack along with Next.js 14 and Tailwind CSS. This project 
                    showcases my experience with full-stack development, authentication systems, database design, and 
                    modern UI/UX.
                  </p>
                  <p className="text-gray-700 text-lg font-semibold leading-relaxed">
                    I enjoy creating impactful tools, exploring new technologies, and continuously improving as a software developer.
                  </p>

                  <div className="flex gap-4 pt-4">
                    <a
                      href="https://profile-flax-zeta.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      View My Portfolio →
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-4xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-5xl">⚙️</span>
              Built With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl mb-2">🍃</p>
                <p className="font-black text-lg">MongoDB</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl mb-2">⚡</p>
                <p className="font-black text-lg">Express.js</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl mb-2">⚛️</p>
                <p className="font-black text-lg">React / Next.js</p>
              </div>
              <div className="bg-gradient-to-br from-green-600 to-green-700 text-white p-6 rounded-2xl text-center shadow-lg">
                <p className="text-3xl mb-2">🟢</p>
                <p className="font-black text-lg">Node.js</p>
              </div>
            </div>
            <p className="text-gray-600 font-bold text-center mt-6">
              Plus: Tailwind CSS, NextAuth.js, JWT Authentication, and more
            </p>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-10 text-center text-white">
            <h2 className="text-4xl font-black mb-4">Ready to Simplify Your Lead Management?</h2>
            <p className="text-xl font-semibold mb-6">
              Join entrepreneurs who manage their leads effortlessly with DealFlow CRM
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl text-xl font-black hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
            >
              Get Started Free →
            </Link>
          </section>
        </div>

        {/* Back Button */}
        <section className="mt-10 flex justify-end">
          <Link
            href="/"
            className="no-underline inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </section>
      </div>
    </div>
  );
}
