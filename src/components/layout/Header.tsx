import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useIsAdmin } from '../../hooks/useAdmin';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAdmin } = useIsAdmin();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/apply', label: 'Apply Loan' },
    { href: '/my-loans', label: 'My Loans' },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="glass glass-soft backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-ocean flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-[#07203a]">
              EduLoan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      isActive(link.href)
                        ? 'text-[#07203a] bg-white/18 backdrop-blur-sm shadow-md'
                        : 'text-[#054460] hover:text-[#07203a] hover:bg-white/8'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Connect Button */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ConnectButton
                showBalance={false}
                accountStatus="address"
                chainStatus="icon"
              />
            </div>
            <div className="sm:hidden">
              <ConnectButton
                showBalance={false}
                accountStatus="avatar"
                chainStatus="none"
              />
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-[#054460]/90 hover:text-[#07203a] hover:bg-white/8 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 mb-1 ${
                  isActive(link.href)
                    ? 'text-[#07203a] bg-white/20 backdrop-blur-sm'
                    : 'text-[#054460] hover:text-[#07203a] hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
