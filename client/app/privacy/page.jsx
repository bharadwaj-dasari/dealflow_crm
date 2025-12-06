import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
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
        <h1 className="text-5xl font-black text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 text-lg mb-12">Last updated: December 6, 2025</p>
         
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Welcome to DealFlow CRM ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CRM platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2.1 Personal Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
                  <li>Name and email address (when you create an account)</li>
                  <li>Login credentials (email and encrypted password)</li>
                  <li>Google account information (if you sign up with Google OAuth)</li>
                  <li>Profile information you choose to provide</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2.2 Lead Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  When you use our CRM, you may store information about your leads, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
                  <li>Lead names, email addresses, and contact information</li>
                  <li>Deal values and follow-up dates</li>
                  <li>Status updates and notes</li>
                  <li>Any other information you choose to enter</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2.3 Usage Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We automatically collect certain information when you use our service:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Log data and error reports</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide, maintain, and improve our CRM services</li>
              <li>Authenticate your account and prevent fraud</li>
              <li>Send you follow-up reminders and notifications</li>
              <li>Respond to your comments, questions, and support requests</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We implement appropriate technical and organizational security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Passwords are encrypted using bcrypt hashing</li>
              <li>Data transmission is secured using HTTPS/SSL encryption</li>
              <li>Access to your data is restricted and authenticated</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We do NOT sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>With your consent:</strong> When you explicitly authorize us to share information</li>
              <li><strong>Service providers:</strong> With trusted third-party services that help us operate (e.g., hosting, authentication)</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Export:</strong> Download your lead data in a portable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise these rights, please contact us or use the account deletion feature in your profile settings.
            </p>
          </section>

          {/* Google OAuth */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Third-Party Authentication</h2>
            <p className="text-gray-700 leading-relaxed">
              If you sign up using Google OAuth, we receive your name, email address, and profile information from Google. We use this information solely for authentication purposes. Your use of Google services is governed by Google's Privacy Policy.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar technologies to maintain your session, remember your preferences, and analyze usage patterns. You can control cookies through your browser settings, but disabling them may affect functionality.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide services. When you delete your account, we permanently remove your data from our systems within 30 days, except where retention is required by law.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our service is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <p className="text-gray-900 font-semibold">DealFlow CRM</p>
              <p className="text-gray-700 mt-2">Email: bharadwaj4002@gmail.com</p>
              <p className="text-gray-700">Address: Visakhapatnam, Andhra Pradesh, 5350048</p>  
            </div>
            
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
