// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuthStore } from '@/store/authStore';
// import { Menu, X, User, Phone, LogOut } from 'lucide-react';
// import { Container } from '../ui/Container';

// export function Header() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const { user, logout } = useAuthStore();
//   const pathname = usePathname();

//   const navLinks = [
//     { name: 'Farm Stays', href: '/#stays' },
//     { name: 'Sports', href: '/sports' },
//     { name: 'Events', href: '/events' },
//     { name: 'Membership', href: '/membership' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   return (
//     <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
//       <Container>
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/" className="flex items-center gap-2">
//               <span className="text-2xl font-bold font-display text-primary">Kunnath House</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary font-semibold' : 'text-text-primary'
//                   }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Right Section: Phone + Auth */}
//           <div className="hidden md:flex items-center space-x-6">
//             <a href="tel:+911234567890" className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-colors">
//               <Phone size={16} className="mr-2" />
//               +91 12345 67890
//             </a>

//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center space-x-2 border border-gray-200 p-2 rounded-full hover:shadow-soft transition-all"
//                 >
//                   <Menu size={16} className="text-gray-500" />
//                   <div className="bg-gray-200 rounded-full p-1">
//                     <User size={16} className="text-gray-600" />
//                   </div>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                       <p className="text-xs text-gray-500 truncate">{user.email}</p>
//                     </div>
//                     <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsProfileOpen(false)}>
//                       My Bookings
//                     </Link>
//                     <button
//                       onClick={() => {
//                         logout();
//                         setIsProfileOpen(false);
//                       }}
//                       className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                     >
//                       <LogOut size={16} className="mr-2" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 className="flex items-center space-x-2 border border-gray-200 p-2 px-4 rounded-full hover:shadow-soft transition-all text-sm font-medium"
//               >
//                 <User size={16} className="text-gray-500" />
//                 <span>Login</span>
//               </Link>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex items-center md:hidden">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </Container>

//       {/* Mobile menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-white border-b border-gray-200 absolute w-full">
//           <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <a
//               href="tel:+911234567890"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
//             >
//               Call Us: +91 12345 67890
//             </a>
//             <div className="pt-4 border-t border-gray-200">
//               {user ? (
//                 <>
//                   <div className="px-3 pb-2">
//                     <p className="text-base font-medium text-gray-800">{user.name}</p>
//                     <p className="text-sm font-medium text-gray-500">{user.email}</p>
//                   </div>
//                   <Link
//                     href="/dashboard"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     My Bookings
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <Link
//                   href="/login"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Login / Sign up
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Menu, X, User, Phone, LogOut } from 'lucide-react';
import { Container } from '../ui/Container';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleStayClick = (e) => {
    e.preventDefault();
    router.push('/#stays');
    // Wait for DOM update then scroll
    setTimeout(() => {
      document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navLinks = [
    { name: 'Farm Stays', href: '/#stays', isHashLink: true },
    { name: 'Sports', href: '/sports' },
    { name: 'Events', href: '/events' },
    { name: 'Membership', href: '/membership' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold font-display text-primary">Kunnath House</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) =>
              link.isHashLink ? (
                <button
                  key={link.name}
                  onClick={handleStayClick}
                  className="text-sm font-medium transition-colors hover:text-primary text-text-primary"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary font-semibold' : 'text-text-primary'
                    }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right Section: Phone + Auth */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+911234567890"
              className="flex items-center text-sm font-medium text-text-primary hover:text-primary transition-colors"
            >
              <Phone size={16} className="mr-2" />
              +91 12345 67890
            </a>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 border border-gray-200 p-2 rounded-full hover:shadow-soft transition-all"
                >
                  <Menu size={16} className="text-gray-500" />
                  <div className="bg-gray-200 rounded-full p-1">
                    <User size={16} className="text-gray-600" />
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 border border-gray-200 p-2 px-4 rounded-full hover:shadow-soft transition-all text-sm font-medium"
              >
                <User size={16} className="text-gray-500" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
            {navLinks.map((link) =>
              link.isHashLink ? (
                <button
                  key={link.name}
                  onClick={(e) => {
                    handleStayClick(e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}
            <a
              href="tel:+911234567890"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
            >
              Call Us: +91 12345 67890
            </a>
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <>
                  <div className="px-3 pb-2">
                    <p className="text-base font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm font-medium text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login / Sign up
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}