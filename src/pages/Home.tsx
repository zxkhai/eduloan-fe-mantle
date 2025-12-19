import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { GraduationCap, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { StatsCard } from '../components/stats/StatsCard';
import { useTotalLoans, useContractBalance } from '../hooks/useEduLoan';
import { formatMNTShort } from '../lib/format';

export function Home() {
  const { isConnected } = useAccount();
  const { data: totalLoans } = useTotalLoans();
  const { data: contractBalance } = useContractBalance();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[#F2A9DD]/10 via-[#C8B2F5]/10 to-[#F7FAE4]/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
              <div className="w-6 h-6 rounded-full bg-linear-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-gray-800" />
              </div>
              <span className="text-sm font-medium text-gray-600">Built on Mantle Network</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Decentralized
              <span className="block bg-linear-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] bg-clip-text text-transparent">
                Student Loans
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Access affordable education funding through blockchain technology.
              Apply for loans, track repayments, and manage your education financing
              all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/apply">
                <Button size="lg">
                  Apply for Loan
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              {isConnected && (
                <Link to="/my-loans">
                  <Button variant="secondary" size="lg">
                    View My Loans
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Loans"
            value={totalLoans?.toString() || '0'}
            icon={<TrendingUp className="w-5 h-5 text-[#C8B2F5]" />}
            description="All-time loan applications"
          />
          <StatsCard
            title="Contract Balance"
            value={contractBalance ? formatMNTShort(contractBalance) : '0 MNT'}
            icon={<Wallet className="w-5 h-5 text-[#C8B2F5]" />}
            description="Available for disbursement"
          />
          <StatsCard
            title="Interest Rate"
            value="5%"
            icon={<GraduationCap className="w-5 h-5 text-[#C8B2F5]" />}
            description="Fixed annual rate"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Connect Wallet', desc: 'Connect your Web3 wallet to get started' },
            { step: '2', title: 'Apply for Loan', desc: 'Submit your loan application with purpose' },
            { step: '3', title: 'Get Approved', desc: 'Wait for admin review and approval' },
            { step: '4', title: 'Repay & Complete', desc: 'Make payments until fully repaid' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-linear-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] flex items-center justify-center">
                <span className="text-lg font-bold text-gray-800">{item.step}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-linear-to-r from-[#F2A9DD]/20 via-[#C8B2F5]/20 to-[#F7FAE4]/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Fund Your Education?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Join the decentralized education financing revolution. Apply for a loan today
            and take the first step towards your academic goals.
          </p>
          <Link to="/apply">
            <Button size="lg">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
