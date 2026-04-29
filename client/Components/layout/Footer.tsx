// import React from 'react';

// export function Footer() {
//   return (
//     <footer className="bg-gray-50 py-8 border-t border-gray-100 mt-20">
//       <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
//         <p>&copy; {new Date().getFullYear()} Kunnath House. All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }


// components/Footer.tsx
import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-[#E0E0E0] pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-semibold text-primary hover:text-primary-hover transition-colors">
              Kunnath House
            </h3>
            <p className="text-[#666666] mt-2 text-sm">
              Escape. Indulge. Reconnect.
            </p>
            <div className="mt-4">
              <a
                href="tel:+919876543210"
                className="text-primary hover:text-primary-hover font-medium transition-colors"
              >
                +91 7702402505
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#1A1A1A] font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/farm-stays"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Farm Stays
                </Link>
              </li>
              <li>
                <Link
                  href="/sports"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Sports Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[#1A1A1A] font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#666666] hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter Callout */}
          <div>
            <h4 className="text-[#1A1A1A] font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-[#666666] hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-[#666666] hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-[#666666] hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.16-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.38-12.08c0-.213 0-.425-.015-.637A10.025 10.025 0 0024 4.57z" />
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-[#666666] text-sm">
                <span className="font-medium">Address:</span> Kunnath House Farms, Wayanad, Kerala - 673121
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#E0E0E0] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#666666]">
          <p>&copy; {currentYear} Kunnath House. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

