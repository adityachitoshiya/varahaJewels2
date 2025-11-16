import { useState, useRef, useEffect } from 'react';
import { Search, Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ cartCount = 0, onCartClick }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const searchRef = useRef(null);

  // Desktop sticky header only
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) {
        setIsSticky(window.scrollY > 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#EFE9E2] border-b border-heritage/15 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center justify-center group py-2">
              <Image
                src="/varaha-assets/logo.png"
                alt="Varaha Jewels"
                width={160}
                height={50}
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-[9px] text-heritage/60 font-light tracking-[0.15em] mt-0.5 italic whitespace-nowrap">
                Where heritage meets royalty
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10">
              <Link href="/coming-soon" className="text-heritage hover:text-copper transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-copper pb-1">
                Collections
              </Link>
              <Link href="/coming-soon" className="text-heritage hover:text-copper transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-copper pb-1">
                Heritage
              </Link>
              <Link href="/coming-soon" className="text-heritage hover:text-copper transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-copper pb-1">
                New Arrivals
              </Link>
              <Link href="/coming-soon" className="text-heritage hover:text-copper transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-copper pb-1">
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Search */}
              <button 
                className="hidden md:block text-heritage hover:text-copper transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              {/* Cart */}
              <button 
                onClick={onCartClick}
                className="relative text-heritage hover:text-copper transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-copper text-warm-sand text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden text-heritage hover:text-copper transition-colors duration-200"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

