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
    <div className="animate-fade-in min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-8">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 glass rounded-full shadow-xl border border-white/30 mb-8 animate-slide-up">
              <div className="w-7 h-7 rounded-full bg-ocean flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-[#07314a]">Built on Mantle Network</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#07203a] mb-6 leading-tight">
              Decentralized
              <span className="block mt-2 text-ocean">
                Student Loans
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#054460] mb-10 max-w-2xl mx-auto leading-relaxed">
              Access affordable education funding through blockchain technology.
              Apply for loans, track repayments, and manage your education financing
              all in one secure platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/apply">
                <Button size="lg" className="shadow-2xl min-w-50">
                  Apply for Loan
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              {isConnected && (
                <Link to="/my-loans">
                  <Button variant="secondary" size="lg" className="shadow-xl min-w-50">
                    View My Loans
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#054460]">
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Transparent Process</span>
              </div>
              <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>5% Fixed Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="animate-scale-in">
            <StatsCard
              title="Total Loans"
              value={totalLoans?.toString() || '0'}
              icon={<TrendingUp className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />}
              description="All-time loan applications"
            />
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <StatsCard
              title="Contract Balance"
              value={contractBalance ? formatMNTShort(contractBalance) : '0 MNT'}
              icon={<Wallet className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />}
              description="Available for disbursement"
            />
          </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <StatsCard
              title="Interest Rate"
              value="5%"
              icon={<GraduationCap className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />}
              description="Fixed annual rate"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">How It Works</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get funded in four simple steps with our transparent blockchain-based process
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '1', title: 'Connect Wallet', desc: 'Connect your Web3 wallet to get started securely', icon: '🔐' },
            { step: '2', title: 'Apply for Loan', desc: 'Submit your loan application with purpose and amount', icon: '📝' },
            { step: '3', title: 'Get Approved', desc: 'Wait for admin review and approval notification', icon: '✅' },
            { step: '4', title: 'Repay & Complete', desc: 'Make payments until fully repaid before deadline', icon: '💰' },
          ].map((item, index) => (
            <div key={item.step} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-ocean flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {item.step}
                </div>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#39bfff] transition-colors">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
          {/* Gradient Background */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(234,246,255,0.35) 0%, rgba(201,242,255,0.28) 50%, rgba(214,246,255,0.24) 100%)' }} />
          <div className="absolute inset-0 backdrop-blur-sm" />
          
          {/* Content */}
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Fund Your Education?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join the decentralized education financing revolution. Apply for a loan today
              and take the first step towards your academic goals with transparent, blockchain-secured funding.
            </p>
            <Link to="/apply">
              <Button size="lg" className="shadow-2xl" >
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
