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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-gray-800" />
            </div>
            <span className="font-bold text-lg text-gray-900">EduLoan</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
