import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useApplyLoan } from '../../hooks/useEduLoanWrite';
import { calculateInterestPreview, calculateTotalPreview } from '../../lib/format';
import { isValidAmount } from '../../lib/utils';

export function LoanForm() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [amountError, setAmountError] = useState('');

  const { applyLoan, isPending, isConfirming, isSuccess, error, reset } = useApplyLoan();

  const interest = calculateInterestPreview(amount);
  const total = calculateTotalPreview(amount);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Loan application submitted successfully!');
      setAmount('');
      setPurpose('');
      reset();
    }
  }, [isSuccess, reset]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to submit loan application');
    }
  }, [error]);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && !isValidAmount(value)) {
      setAmountError('Amount must be between 0.01 and 10 MNT');
    } else {
      setAmountError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAmount(amount)) {
      setAmountError('Amount must be between 0.01 and 10 MNT');
      return;
    }

    if (!purpose.trim()) {
      toast.error('Please enter a loan purpose');
      return;
    }

    applyLoan(amount, purpose.trim());
  };

  if (!isConnected) {
    return (
      <Card className="max-w-lg mx-auto text-center">
        <CardHeader>
          <CardTitle>Connect Wallet</CardTitle>
          <CardDescription>Connect your wallet to apply for a loan</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Apply for a Loan</CardTitle>
        <CardDescription>Fill in the details below to submit your loan application</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Loan Amount (MNT)"
            type="number"
            step="0.01"
            min="0.01"
            max="10"
            placeholder="0.00"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            error={amountError}
            hint="Min: 0.01 MNT | Max: 10 MNT"
            disabled={isPending || isConfirming}
          />

          <TextArea
            label="Purpose"
            placeholder="e.g., Tuition fees for Computer Science program"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            rows={3}
            hint="Describe why you need this loan"
            disabled={isPending || isConfirming}
          />

          {/* Preview */}
          {amount && isValidAmount(amount) && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Principal Amount</span>
                <span className="font-medium text-gray-900">{amount} MNT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Interest (5%)</span>
                <span className="font-medium text-gray-900">{interest} MNT</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                <span className="text-gray-700 font-medium">Total Repayment</span>
                <span className="font-bold text-gray-900">{total} MNT</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            isLoading={isPending || isConfirming}
            disabled={!amount || !purpose || !!amountError || isPending || isConfirming}
          >
            {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
