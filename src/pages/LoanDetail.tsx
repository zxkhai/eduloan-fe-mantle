import { useParams, Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoanStatusBadge } from '../components/ui/Badge';
import { LoanProgress } from '../components/loan/LoanProgress';
import { LoanStatusInfo, DeadlineInfo } from '../components/loan/LoanStatus';
import { PaymentForm } from '../components/loan/PaymentForm';
import { PageLoader } from '../components/ui/Spinner';
import { useLoanDetails, useRemainingAmount, useGetApprovalTime, useGetDeadline } from '../hooks/useEduLoan';
import { formatMNT, formatDateTime, shortenAddress } from '../lib/format';
import { LoanStatus } from '../types';
import { eduLoanAddress } from '../config/contracts';

export function LoanDetail() {
  const { id } = useParams<{ id: string }>();
  const { address } = useAccount();

  const loanId = id ? BigInt(id) : undefined;
  const { data: loan, isLoading, refetch } = useLoanDetails(loanId);
  const { data: remainingAmount } = useRemainingAmount(loanId);
  const { data: approvalTime } = useGetApprovalTime(loanId);
  const { data: deadline } = useGetDeadline(loanId);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!loan) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-md mx-auto text-center py-12">
          <h2 className="text-xl font-semibold text-[#07203a] mb-2">Loan Not Found</h2>
          <p className="text-gray-600 mb-6">The loan you're looking for doesn't exist.</p>
          <Link to="/my-loans">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to My Loans
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isOwner = address?.toLowerCase() === loan.borrower.toLowerCase();
  const canMakePayment = isOwner && loan.status === LoanStatus.Active;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Back Button */}
      <Link
        to="/my-loans"
        className="inline-flex items-center text-sm text-[#054460] hover:text-[#39bfff] font-medium mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to My Loans
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loan Overview */}
          <Card variant="featured" className="shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Loan #{loan.loanId.toString()}</CardTitle>
                <LoanStatusBadge status={loan.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Info */}
              <LoanStatusInfo status={loan.status} />

              {/* Amounts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 glass-soft rounded-xl">
                  <p className="text-sm text-gray-600 font-medium mb-1">Principal Amount</p>
                  <p className="text-2xl font-bold text-ocean">
                    {formatMNT(loan.principalAmount)}
                  </p>
                </div>
                <div className="p-4 glass-soft rounded-xl">
                  <p className="text-sm text-gray-600 font-medium mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-ocean">
                    {formatMNT(loan.principalAmount + (loan.principalAmount * 5n) / 100n)}
                  </p>
                </div>
              </div>

              {/* Progress */}
              {loan.status === LoanStatus.Active && (
                <div className="p-4 glass rounded-xl">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Repayment Progress</h4>
                  <LoanProgress repaid={loan.amountRepaid} total={loan.principalAmount + (loan.principalAmount * 5n) / 100n} />
                  {remainingAmount !== undefined && (
                    <p className="text-sm text-gray-600 mt-3 font-medium">
                      Remaining: <span className="font-bold">{formatMNT(remainingAmount)}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Deadline */}
              {loan.status === LoanStatus.Active && loan.deadline > 0n && (
                <DeadlineInfo deadline={loan.deadline} />
              )}

              {/* Purpose */}
              <div className="p-4 glass-soft rounded-xl">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Loan Purpose</h4>
                <p className="text-gray-700 leading-relaxed">{loan.purpose}</p>
              </div>
            </CardContent>
          </Card>

          {/* Loan Details */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 font-medium">Borrower</dt>
                  <dd className="text-sm font-semibold text-gray-900">
                    <a
                      href={`https://sepolia.mantlescan.xyz/address/${loan.borrower}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-[#39bfff] transition-colors"
                    >
                      {shortenAddress(loan.borrower)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 font-medium">Interest Rate</dt>
                  <dd className="text-sm font-bold text-gray-900">5.00%</dd>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <dt className="text-sm text-gray-500 font-medium">Applied</dt>
                  <dd className="text-sm font-semibold text-gray-900">{formatDateTime(loan.applicationTime)}</dd>
                </div>
                {loan.approvalTime > 0n && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <dt className="text-sm text-gray-500 font-medium">Approved</dt>
                    <dd className="text-sm font-semibold text-gray-900">{approvalTime !== undefined ? formatDateTime(BigInt(approvalTime)) : '-'}</dd>
                  </div>
                )}
                {loan.deadline > 0n && (
                  <div className="flex justify-between py-3 border-b border-gray-100">
                    <dt className="text-sm text-gray-500">Deadline</dt>
                    <dd className="text-sm font-medium text-gray-900">{deadline !== undefined ? formatDateTime(BigInt(deadline)) : '-'}</dd>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <dt className="text-sm text-gray-500">Contract</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    <a
                      href={`https://sepolia.mantlescan.xyz/address/${eduLoanAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-[#39bfff]"
                    >
                      {shortenAddress(eduLoanAddress)}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Form */}
          {canMakePayment && remainingAmount !== undefined && remainingAmount > 0n && (
            <PaymentForm
              loanId={loan.loanId}
              remainingAmount={remainingAmount}
              onSuccess={() => refetch()}
            />
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount Repaid</span>
                <span className="text-sm font-medium text-gray-900">{formatMNT(loan.amountRepaid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Interest Amount</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatMNT((loan.principalAmount * 5n) / 100n)}
                </span>
              </div>
              {remainingAmount !== undefined && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Remaining</span>
                  <span className="text-sm font-bold text-[#07203a]">{formatMNT(remainingAmount)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
