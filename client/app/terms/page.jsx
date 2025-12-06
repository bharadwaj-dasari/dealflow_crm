import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl"></span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DealFlow
              </span>
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-gray-900 font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Terms and Conditions</h1>
        <p className="text-gray-600 text-lg mb-12">Last updated: December 6, 2025</p>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Welcome to DealFlow CRM. By accessing or using our service, you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              DealFlow CRM provides a customer relationship management platform that allows users to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Track and manage leads</li>
              <li>Set follow-up reminders</li>
              <li>Monitor deal values and status</li>
              <li>Store notes and contact information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We reserve the right to modify, suspend, or discontinue any part of the service at any time with or without notice.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3.1 Account Registration</h3>
                <p className="text-gray-700 leading-relaxed">
                  To use DealFlow CRM, you must create an account by providing accurate and complete information. You may register using email/password or Google OAuth authentication.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3.2 Account Security</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Maintaining the confidentiality of your password</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3.3 Account Eligibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  You must be at least 18 years old to create an account. By creating an account, you represent that you meet this requirement.
                </p>
              </div>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You agree NOT to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Transmit viruses, malware, or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Use automated systems (bots) without permission</li>
              <li>Impersonate another person or entity</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Collect or store personal data of other users without consent</li>
            </ul>
          </section>

          {/* Data Ownership */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Data Ownership and Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">5.1 Your Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  You retain all rights to the data you input into the service (leads, notes, etc.). We do not claim ownership of your content.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">5.2 License to Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  By using our service, you grant us a limited license to store, process, and display your data solely for the purpose of providing the service to you.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">5.3 Data Backup</h3>
                <p className="text-gray-700 leading-relaxed">
                  While we maintain regular backups, you are responsible for maintaining your own backup copies of important data.
                </p>
              </div>
            </div>
          </section>

          {/* Free Service */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Free Service</h2>
            <p className="text-gray-700 leading-relaxed">
              DealFlow CRM is currently provided free of charge. We reserve the right to introduce paid features or subscription plans in the future. Existing users will be notified in advance of any pricing changes.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content, features, and functionality of DealFlow CRM (including software, design, logos, and trademarks) are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our intellectual property without permission.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
              <p className="text-gray-900 font-bold mb-2">IMPORTANT:</p>
              <p className="text-gray-700 leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. USE AT YOUR OWN RISK.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, DealFlow CRM shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the service.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Termination</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">10.1 By You</h3>
                <p className="text-gray-700 leading-relaxed">
                  You may terminate your account at any time by using the account deletion feature in your profile settings.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">10.2 By Us</h3>
                <p className="text-gray-700 leading-relaxed">
                  We may suspend or terminate your account if you violate these Terms or engage in conduct that we deem harmful to other users or the service.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">10.3 Effect of Termination</h3>
                <p className="text-gray-700 leading-relaxed">
                  Upon termination, your right to access the service will cease immediately. Your data will be permanently deleted within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the service. Your continued use after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or the service shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
              <p className="text-gray-900 font-semibold">DealFlow CRM</p>
              <p className="text-gray-700 mt-2">Email: bharadwaj4002@gmail.com</p>
              <p className="text-gray-700">Address: Visakhapatnam, Andhra Pradesh, 5350048</p>
            </div>
          </section>

          {/* Acceptance */}
          <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
            <p className="text-gray-900 font-bold mb-2">By using DealFlow CRM, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          </section>
          <section className="pt-8 border-t-2 border-gray-200 flex justify-end">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
