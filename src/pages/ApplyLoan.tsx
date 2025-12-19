import { LoanForm } from '../components/loan/LoanForm';
import { FileText, Shield, Clock, Percent } from 'lucide-react';

export function ApplyLoan() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
          <div className="w-6 h-6 rounded-full bg-ocean flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-[#07314a]">Loan Application</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Apply for a Loan</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Submit your loan application and get funded for your educational needs.
          Our simple process makes it easy to get started on your learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <LoanForm />
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          {/* Loan Terms */}
          <div className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-ocean flex items-center justify-center">
                <Percent className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Loan Terms</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 glass-soft rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Percent className="w-4 h-4" style={{ color: 'var(--ocean-500)' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">5% Interest Rate</p>
                  <p className="text-xs text-gray-500">Fixed rate for all loans</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 glass-soft rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-4 h-4" style={{ color: 'var(--ocean-500)' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">365 Days Duration</p>
                  <p className="text-xs text-gray-500">Repayment deadline from disbursement</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 glass-soft rounded-xl">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FileText className="w-4 h-4" style={{ color: 'var(--ocean-500)' }} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">0.01 - 10 MNT</p>
                  <p className="text-xs text-gray-500">Min and max loan amounts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="glass rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="font-bold text-lg text-gray-900 mb-6">Application Process</h3>
            <ol className="space-y-4">
              {[
                'Submit your loan application',
                'Wait for admin review',
                'Get approval notification',
                'Receive funds to your wallet',
                'Make repayments before deadline',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-ocean flex items-center justify-center text-xs font-bold text-white shadow-md">
                    {i + 1}
                  </span>
                  <span className="text-gray-600 font-medium pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Security */}
          <div className="relative overflow-hidden glass-soft rounded-2xl p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(63,169,255,0.12)] rounded-full blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-md">
                <Shield className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Secure & Transparent</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  All transactions are recorded on the Mantle blockchain,
                  ensuring full transparency and security for your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
