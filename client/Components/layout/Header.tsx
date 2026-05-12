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
import { Menu, X, User, Phone, LogOut, Instagram } from 'lucide-react';
import { Container } from '../ui/Container';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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
    { name: 'Stays', href: '/stays' },
    { name: 'Sports', href: '/sports' },
    { name: 'Events', href: '/events' },
    { name: 'Membership', href: '/membership' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/80 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.02)]">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex flex-col items-start leading-none group">
              <span className="text-2xl font-black font-display text-primary tracking-tighter group-hover:text-primary transition-colors duration-300">
                Kunnath<span className="text-primary"></span>House
              </span>
              <span className="text-[8.5px] uppercase tracking-[0.35em] font-bold text-gray-400 mt-1.5 opacity-80">Escape • Indulge • Reconnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center bg-gray-100/40 border border-gray-200/50 rounded-full p-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-6 py-2 text-[13px] font-bold rounded-full transition-all duration-500 relative overflow-hidden flex items-center justify-center",
                    isActive
                      ? "bg-white text-primary shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)] scale-[1.02] -translate-y-[0.5px]"
                      : "text-gray-500 hover:text-gray-900 hover:bg-white/60"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Phone + Auth */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center bg-gray-100/40 border border-gray-200/50 rounded-full px-4 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
              <a
                href="tel:+917702402505"
                className="flex items-center text-[11px] font-black text-gray-700 hover:text-primary transition-colors border-r border-gray-200 pr-4 mr-4"
              >
                <Phone size={13} className="mr-2 text-primary/70" />
                +91 7702402505
              </a>

              <a
                href="https://www.instagram.com/kunnath_farmhouse?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-all duration-300 hover:scale-125"
              >
                <Instagram size={17} />
              </a>
            </div>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 border border-gray-200/60 bg-white p-1 rounded-full shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
                >
                  <div className="bg-gray-50 rounded-full p-2 group-hover:bg-primary/5 transition-colors">
                    <User size={15} className="text-gray-600" />
                  </div>
                  <Menu size={15} className="text-gray-400 mr-2" />
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
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-base font-semibold transition-all",
                    isActive
                      ? "bg-primary/5 text-primary"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
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