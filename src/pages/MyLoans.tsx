import { useState, useEffect } from 'react';
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

  useCloseOnEscape(!!selectedLoanForPayment, () => setSelectedLoanForPayment(null));

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-[#07203a] mb-2">My Loans</h1>
          <p className="text-[#054460] font-medium">
            {loans?.length || 0} loan{(loans?.length || 0) !== 1 ? 's' : ''} found
          </p>
        </div>
        <Link to="/apply">
          <Button className="shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Apply for Loan
          </Button>
        </Link>
      </div>

      {/* Payment Modal */}
      {selectedLoanForPayment && remainingAmount !== undefined && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in"
          onClick={() => setSelectedLoanForPayment(null)}
        >
          <div className="w-full max-w-md animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <PaymentForm
              loanId={selectedLoanForPayment.loanId}
              remainingAmount={remainingAmount}
              onSuccess={handlePaymentSuccess}
            />
            <button
              onClick={() => setSelectedLoanForPayment(null)}
              className="w-full mt-4 py-2 text-sm text-[#054460] hover:text-[#07203a] font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Loans Grid */}
      {!loans || loans.length === 0 ? (
        <Card className="text-center py-16 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-ocean flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-300" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Loans Yet</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            You haven't applied for any loans yet. Get started by applying for your first loan
            and take the first step towards your educational goals.
          </p>
          <Link to="/apply">
            <Button className="shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Apply for Loan
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loans.map((loan, index) => (
            <div key={loan.loanId.toString()} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <LoanCard
                loan={loan}
                onMakePayment={
                  loan.status === LoanStatus.Active
                    ? () => setSelectedLoanForPayment(loan)
                    : undefined
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// close modal on Esc key when open
function useCloseOnEscape(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
}
