import { LoanForm } from '../components/loan/LoanForm';
import { FileText, Shield, Clock, Percent } from 'lucide-react';

export function ApplyLoan() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Apply for a Loan</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Submit your loan application and get funded for your educational needs.
          Our simple process makes it easy to get started.
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
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Loan Terms</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#C8B2F5]/10 rounded-lg">
                  <Percent className="w-4 h-4 text-[#C8B2F5]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">5% Interest Rate</p>
                  <p className="text-xs text-gray-500">Fixed rate for all loans</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#C8B2F5]/10 rounded-lg">
                  <Clock className="w-4 h-4 text-[#C8B2F5]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">365 Days Duration</p>
                  <p className="text-xs text-gray-500">Repayment deadline from disbursement</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#C8B2F5]/10 rounded-lg">
                  <FileText className="w-4 h-4 text-[#C8B2F5]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">0.01 - 10 MNT</p>
                  <p className="text-xs text-gray-500">Min and max loan amounts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Application Process</h3>
            <ol className="space-y-3">
              {[
                'Submit your loan application',
                'Wait for admin review',
                'Get approval notification',
                'Receive funds to your wallet',
                'Make repayments before deadline',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-linear-to-r from-[#F2A9DD] via-[#C8B2F5] to-[#F7FAE4] flex items-center justify-center text-xs font-medium text-gray-800">
                    {i + 1}
                  </span>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Security */}
          <div className="bg-linear-to-r from-[#F2A9DD]/10 via-[#C8B2F5]/10 to-[#F7FAE4]/10 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#C8B2F5] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Secure & Transparent</h3>
                <p className="text-sm text-gray-600">
                  All transactions are recorded on the Mantle blockchain,
                  ensuring full transparency and security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
