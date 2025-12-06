import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🚀</span>
              <span className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                DealFlow
              </span>
            </div>
            <p className="text-gray-400 text-base font-semibold leading-relaxed max-w-md">
              The simplest CRM for modern businesses. Track leads, close deals, and grow faster with our intuitive platform.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-black text-lg mb-4 text-white">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/signup" className="text-gray-400 hover:text-white transition-colors text-base font-semibold hover:translate-x-1 inline-block">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-white transition-colors text-base font-semibold hover:translate-x-1 inline-block">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-base font-semibold hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-black text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-base font-semibold hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-base font-semibold hover:translate-x-1 inline-block">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-base font-semibold">
            © {new Date().getFullYear()} DealFlow CRM. All rights reserved.
          </p>
          <p className="text-gray-400 text-base font-semibold flex items-center gap-2">
            Made with <span className="text-red-500 animate-pulse">❤️</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
