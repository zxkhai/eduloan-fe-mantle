import { GraduationCap, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass mt-auto border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Description */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-ocean flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-[#07314a]">
              EduLoan - Decentralized Student Loan System
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[#054460]">
            <a
              href="https://docs.mantle.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#03345a] transition-colors"
            >
              Mantle Docs
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://sepolia.mantlescan.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#03345a] transition-colors"
            >
              Explorer
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Credit */}
          <p className="text-sm text-[#4b6b80]">
            Built on Mantle | ETHJKT x Khai
          </p>
        </div>
      </div>
    </footer>
  );
}
