import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { LoanStatusBadge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { LoanProgress } from './LoanProgress';
import { formatMNT, formatDate } from '../../lib/format';
import type { Loan } from '../../types';
import { LoanStatus } from '../../types';

interface LoanCardProps {
  loan: Loan;
  onMakePayment?: () => void;
  showActions?: boolean;
}

export function LoanCard({ loan, onMakePayment, showActions = true }: LoanCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">Loan #{loan.loanId.toString()}</span>
        <LoanStatusBadge status={loan.status} />
      </div>

      {/* Amount */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">{formatMNT(loan.principalAmount)}</p>
        <p className="text-sm text-gray-500">Total: {formatMNT(loan.totalAmount)}</p>
      </div>

      {/* Purpose */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{loan.purpose}</p>

      {/* Progress (for Active loans) */}
      {loan.status === LoanStatus.Active && (
        <div className="mb-4">
          <LoanProgress repaid={loan.amountRepaid} total={loan.totalAmount} />
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-gray-400 mb-4">Applied: {formatDate(loan.applicationTime)}</p>

      {/* Actions */}
      {showActions && (
        <div className="flex items-center gap-2">
          {loan.status === LoanStatus.Active && onMakePayment && (
            <Button onClick={onMakePayment} className="flex-1">
              Make Payment
            </Button>
          )}
          <Link to={`/loan/${loan.loanId}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              View Details
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}

interface LoanCardSkeletonProps {
  count?: number;
}

export function LoanCardSkeleton({ count = 1 }: LoanCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>
          <div className="h-8 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
          <div className="h-4 w-full bg-gray-200 rounded mb-4" />
          <div className="h-3 w-28 bg-gray-200 rounded mb-4" />
          <div className="h-10 w-full bg-gray-200 rounded" />
        </Card>
      ))}
    </>
  );
}
