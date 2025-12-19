import { GraduationCap, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Description */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-linear-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-gray-800" />
            </div>
            <span className="text-sm text-gray-600">
              EduLoan - Decentralized Student Loan System
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://docs.mantle.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900 transition-colors"
            >
              Mantle Docs
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://sepolia.mantlescan.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-900 transition-colors"
            >
              Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Credit */}
          <p className="text-sm text-gray-400">
            Built on Mantle | ETHJKT
          </p>
        </div>
      </div>
    </footer>
  );
}
