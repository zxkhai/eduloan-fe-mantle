import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Plus, FileText } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoanCard, LoanCardSkeleton } from '../components/loan/LoanCard';
import { PaymentForm } from '../components/loan/PaymentForm';
import { useMyLoans, useMultipleLoanDetails, useRemainingAmount } from '../hooks/useEduLoan';
import type { Loan } from '../types';
import { LoanStatus } from '../types';

export function MyLoans() {
  const { address, isConnected } = useAccount();
  const [selectedLoanForPayment, setSelectedLoanForPayment] = useState<Loan | null>(null);

  const { data: loanIds, isLoading: loadingIds, refetch: refetchIds } = useMyLoans(address);
  const { data: loansData, isLoading: loadingLoans, refetch: refetchLoans } = useMultipleLoanDetails(loanIds);

  const { data: remainingAmount } = useRemainingAmount(
    selectedLoanForPayment?.loanId
  );

  const loans = loansData
    ?.filter((result) => result.status === 'success')
    .map((result) => result.result as Loan)
    .sort((a, b) => Number(b.loanId) - Number(a.loanId));

  const handlePaymentSuccess = () => {
    setSelectedLoanForPayment(null);
    refetchIds();
    refetchLoans();
  };

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-md mx-auto text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Wallet</h2>
          <p className="text-gray-500 mb-6">Connect your wallet to view your loans</p>
          <ConnectButton />
        </Card>
      </div>
    );
  }

  if (loadingIds || loadingLoans) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Loans</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LoanCardSkeleton count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Loans</h1>
          <p className="text-gray-500 mt-1">
            {loans?.length || 0} loan{(loans?.length || 0) !== 1 ? 's' : ''} found
          </p>
        </div>
        <Link to="/apply">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Apply for Loan
          </Button>
        </Link>
      </div>

      {/* Payment Modal */}
      {selectedLoanForPayment && remainingAmount !== undefined && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-md">
            <PaymentForm
              loanId={selectedLoanForPayment.loanId}
              remainingAmount={remainingAmount}
              onSuccess={handlePaymentSuccess}
            />
            <button
              onClick={() => setSelectedLoanForPayment(null)}
              className="w-full mt-4 py-2 text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loans Grid */}
      {!loans || loans.length === 0 ? (
        <Card className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Loans Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't applied for any loans yet. Get started by applying for your first loan.
          </p>
          <Link to="/apply">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Apply for Loan
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan) => (
            <LoanCard
              key={loan.loanId.toString()}
              loan={loan}
              onMakePayment={
                loan.status === LoanStatus.Active
                  ? () => setSelectedLoanForPayment(loan)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
