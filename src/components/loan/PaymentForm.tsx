import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useMakePayment } from '../../hooks/useEduLoanWrite';
import { formatMNT } from '../../lib/format';

interface PaymentFormProps {
  loanId: bigint;
  remainingAmount: bigint;
  onSuccess?: () => void;
}

export function PaymentForm({ loanId, remainingAmount, onSuccess }: PaymentFormProps) {
  const [amount, setAmount] = useState('');
  const { makePayment, isPending, isConfirming, isSuccess, error, reset } = useMakePayment();

  const maxAmount = Number(remainingAmount) / 1e18;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Payment successful!');
      setAmount('');
      reset();
      onSuccess?.();
    }
  }, [isSuccess, reset, onSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Payment failed');
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (numAmount > maxAmount) {
      toast.error(`Maximum payment amount is ${maxAmount.toFixed(4)} MNT`);
      return;
    }

    makePayment(loanId, amount);
  };

  const handlePayFull = () => {
    setAmount(maxAmount.toFixed(4));
  };

  return (
    <Card className="glass-strong shadow-xl">
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 glass-soft rounded-xl">
            <p className="text-sm text-[#4b6b80] font-medium">Remaining Balance</p>
            <p className="text-2xl font-bold text-ocean mt-1">{formatMNT(remainingAmount)}</p>
          </div>

          <div className="space-y-2">
            <Input
              label="Payment Amount (MNT)"
              type="number"
              step="0.0001"
              min="0.0001"
              max={maxAmount}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isPending || isConfirming}
            />
            <button
              type="button"
              onClick={handlePayFull}
              disabled={isPending || isConfirming}
              className="text-xs text-[#39bfff] hover:text-[#2fa7e6] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Pay Full Amount →
            </button>
          </div>

          <Button
            type="submit"
            className="w-full shadow-lg"
            isLoading={isPending || isConfirming}
            disabled={!amount || parseFloat(amount) <= 0 || isPending || isConfirming}
          >
            {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Submit Payment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
