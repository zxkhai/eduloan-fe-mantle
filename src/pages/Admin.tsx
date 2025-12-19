import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import toast from 'react-hot-toast';
import { Shield, Wallet, TrendingUp, AlertCircle, Check, X, Banknote } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { LoanStatusBadge } from '../components/ui/Badge';
import { StatsCard } from '../components/stats/StatsCard';
import { PageLoader } from '../components/ui/Spinner';
import { useIsAdmin } from '../hooks/useAdmin';
import {
  useTotalLoans,
  useContractBalance,
  useMultipleLoanDetails,
  useGetApprovalTime,
} from '../hooks/useEduLoan';
import {
  useApproveLoan,
  useRejectLoan,
  useDisburseLoan,
  useDepositFunds,
  useWithdrawFunds,
} from '../hooks/useEduLoanWrite';
import { formatMNT, formatMNTShort, formatDate, shortenAddress } from '../lib/format';
import type { Loan } from '../types';
import { LoanStatus } from '../types';

interface ApprovedLoanItemProps {
  loan: Loan;
  isDisbursing: boolean;
  contractBalance: bigint | undefined;
  onDisburse: () => void;
}

function ApprovedLoanItem({ loan, isDisbursing, contractBalance, onDisburse }: ApprovedLoanItemProps) {
  const { data: approvalTime } = useGetApprovalTime(loan.loanId);

  return (
    <div className="p-4 border border-gray-100 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-gray-900">Loan #{loan.loanId.toString()}</p>
          <p className="text-sm text-gray-500">{shortenAddress(loan.borrower)}</p>
        </div>
        <LoanStatusBadge status={loan.status} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
        <div>
          <p className="text-gray-500">Amount to Disburse</p>
          <p className="font-medium">{formatMNT(loan.principalAmount)}</p>
        </div>
        <div>
          <p className="text-gray-500">Approved</p>
          <p className="font-medium">{approvalTime !== undefined ? formatDate(BigInt(approvalTime)) : '-'}</p>
        </div>
      </div>
      <Button
        size="sm"
        onClick={onDisburse}
        isLoading={isDisbursing}
        disabled={isDisbursing || (contractBalance !== undefined && contractBalance < loan.principalAmount)}
      >
        <Banknote className="w-4 h-4 mr-1" />
        Disburse Funds
      </Button>
      {contractBalance !== undefined && contractBalance < loan.principalAmount && (
        <p className="text-xs text-red-500 mt-2">Insufficient contract balance</p>
      )}
    </div>
  );
}

export function Admin() {
  const { isConnected } = useAccount();
  const { isAdmin, isLoading: loadingAdmin } = useIsAdmin();

  const { data: totalLoans } = useTotalLoans();
  const { data: contractBalance, refetch: refetchBalance } = useContractBalance();

  // Get all loans for admin view
  const allLoanIds = totalLoans
    ? Array.from({ length: Number(totalLoans) }, (_, i) => BigInt(i + 1))
    : [];
  const { data: allLoansData, refetch: refetchLoans } = useMultipleLoanDetails(
    allLoanIds.length > 0 ? allLoanIds : undefined
  );

  const allLoans = allLoansData
    ?.filter((result) => result.status === 'success')
    .map((result) => result.result as Loan)
    .sort((a, b) => Number(b.loanId) - Number(a.loanId));

  const pendingLoans = allLoans?.filter((l) => l.status === LoanStatus.Pending) || [];
  const approvedLoans = allLoans?.filter((l) => l.status === LoanStatus.Approved) || [];
  const activeLoans = allLoans?.filter((l) => l.status === LoanStatus.Active) || [];

  // Actions
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingLoanId, setRejectingLoanId] = useState<bigint | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const { approveLoan, isPending: approvePending, isConfirming: approveConfirming, isSuccess: approveSuccess, reset: resetApprove } = useApproveLoan();
  const { rejectLoan, isPending: rejectPending, isConfirming: rejectConfirming, isSuccess: rejectSuccess, reset: resetReject } = useRejectLoan();
  const { disburseLoan, isPending: disbursePending, isConfirming: disburseConfirming, isSuccess: disburseSuccess, reset: resetDisburse } = useDisburseLoan();
  const { depositFunds, isPending: depositPending, isConfirming: depositConfirming, isSuccess: depositSuccess, reset: resetDeposit } = useDepositFunds();
  const { withdrawFunds, isPending: withdrawPending, isConfirming: withdrawConfirming, isSuccess: withdrawSuccess, reset: resetWithdraw } = useWithdrawFunds();

  // Combined loading states
  const isApproving = approvePending || approveConfirming;
  const isRejecting = rejectPending || rejectConfirming;
  const isDisbursing = disbursePending || disburseConfirming;
  const isDepositing = depositPending || depositConfirming;
  const isWithdrawing = withdrawPending || withdrawConfirming;

  useEffect(() => {
    if (approveSuccess) {
      toast.success('Loan approved successfully!');
      refetchLoans();
      resetApprove();
    }
  }, [approveSuccess, refetchLoans, resetApprove]);

  useEffect(() => {
    if (rejectSuccess) {
      toast.success('Loan rejected');
      setRejectingLoanId(null);
      setRejectReason('');
      refetchLoans();
      resetReject();
    }
  }, [rejectSuccess, refetchLoans, resetReject]);

  useEffect(() => {
    if (disburseSuccess) {
      toast.success('Loan disbursed successfully!');
      refetchLoans();
      refetchBalance();
      resetDisburse();
    }
  }, [disburseSuccess, refetchLoans, refetchBalance, resetDisburse]);

  useEffect(() => {
    if (depositSuccess) {
      toast.success('Funds deposited successfully!');
      setDepositAmount('');
      refetchBalance();
      resetDeposit();
    }
  }, [depositSuccess, refetchBalance, resetDeposit]);

  useEffect(() => {
    if (withdrawSuccess) {
      toast.success('Funds withdrawn successfully!');
      setWithdrawAmount('');
      refetchBalance();
      resetWithdraw();
    }
  }, [withdrawSuccess, refetchBalance, resetWithdraw]);

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-md mx-auto text-center py-12">
          <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-500 mb-6">Connect your admin wallet to access this page</p>
          <ConnectButton />
        </Card>
      </div>
    );
  }

  if (loadingAdmin) {
    return <PageLoader />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-md mx-auto text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have admin privileges for this contract.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-ocean flex items-center justify-center shadow-md">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#07203a]">Admin Dashboard</h1>
            <p className="text-[#054460] font-medium mt-1">Manage loans and contract funds</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="animate-scale-in">
          <StatsCard
            title="Total Loans"
            value={totalLoans?.toString() || '0'}
              icon={<TrendingUp className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />}
          />
        </div>
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <StatsCard
            title="Contract Balance"
            value={contractBalance ? formatMNTShort(contractBalance) : '0 MNT'}
              icon={<Wallet className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />}
          />
        </div>
        <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <StatsCard
            title="Pending"
            value={pendingLoans.length.toString()}
            icon={<AlertCircle className="w-5 h-5 text-orange-500" />}
          />
        </div>
        <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <StatsCard
            title="Active"
            value={activeLoans.length.toString()}
            icon={<Banknote className="w-5 h-5 text-green-500" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Loans Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Loans */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Loans ({pendingLoans.length})</CardTitle>
                {pendingLoans.length > 0 && (
                  <span className="px-2.5 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                    Review Needed
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {pendingLoans.length === 0 ? (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm font-medium">No pending loans</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingLoans.map((loan) => (
                    <div key={loan.loanId.toString()} className="p-5 glass rounded-xl hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="font-bold text-[#07203a] text-lg">Loan #{loan.loanId.toString()}</p>
                            <p className="text-sm text-[#054460] font-medium">{shortenAddress(loan.borrower)}</p>
                        </div>
                        <LoanStatusBadge status={loan.status} />
                      </div>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="p-3 glass-soft rounded-lg">
                            <p className="text-gray-600 font-medium">Amount</p>
                            <p className="font-bold text-[#07203a]">{formatMNT(loan.principalAmount)}</p>
                          </div>
                          <div className="p-3 glass-soft rounded-lg">
                            <p className="text-gray-600 font-medium">Applied</p>
                            <p className="font-semibold text-[#07203a]">{formatDate(loan.applicationTime)}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-5 leading-relaxed p-3 glass-soft rounded-lg">{loan.purpose}</p>

                      {rejectingLoanId === loan.loanId ? (
                        <div className="space-y-3">
                          <TextArea
                            placeholder="Rejection reason..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            rows={2}
                          />
                          <div className="flex gap-2">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => rejectLoan(loan.loanId, rejectReason)}
                              isLoading={isRejecting}
                              disabled={!rejectReason.trim() || isRejecting}
                            >
                              {rejectPending ? 'Confirming...' : rejectConfirming ? 'Processing...' : 'Confirm Reject'}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setRejectingLoanId(null);
                                setRejectReason('');
                              }}
                              disabled={isRejecting}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveLoan(loan.loanId)}
                            isLoading={isApproving}
                            disabled={isApproving}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            {approvePending ? 'Confirming...' : approveConfirming ? 'Processing...' : 'Approve'}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setRejectingLoanId(loan.loanId)}
                            disabled={isApproving}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Approved Loans (Ready for Disbursement) */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ready for Disbursement ({approvedLoans.length})</CardTitle>
                {approvedLoans.length > 0 && (
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                    Action Required
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {approvedLoans.length === 0 ? (
                <div className="text-center py-8">
                  <Banknote className="w-12 h-12 text-(--ocean-500) mx-auto mb-2" />
                  <p className="text-gray-600 text-sm font-medium">No loans ready for disbursement</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {approvedLoans.map((loan) => (
                    <ApprovedLoanItem
                      key={loan.loanId.toString()}
                      loan={loan}
                      isDisbursing={isDisbursing}
                      contractBalance={contractBalance}
                      onDisburse={() => disburseLoan(loan.loanId)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Funds Management */}
        <div className="space-y-6">
          {/* Deposit */}
          <Card variant="gradient" className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />
                Deposit Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  label="Amount (MNT)"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  disabled={isDepositing}
                />
                <Button
                  className="w-full shadow-lg"
                  onClick={() => depositFunds(depositAmount)}
                  isLoading={isDepositing}
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing}
                >
                  {depositPending ? 'Confirming...' : depositConfirming ? 'Processing...' : 'Deposit Funds'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Withdraw */}
          <Card variant="gradient" className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="w-5 h-5" style={{ color: 'var(--ocean-500)' }} />
                Withdraw Funds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 glass-soft rounded-xl">
                  <p className="text-sm text-gray-600 font-medium">Available Balance</p>
                  <p className="text-2xl font-bold text-ocean mt-1">
                    {contractBalance ? formatMNT(contractBalance) : '0 MNT'}
                  </p>
                </div>
                <Input
                  label="Amount (MNT)"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  disabled={isWithdrawing}
                />
                <Button
                  variant="secondary"
                  className="w-full shadow-lg"
                  onClick={() => withdrawFunds(withdrawAmount)}
                  isLoading={isWithdrawing}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || isWithdrawing}
                >
                  {withdrawPending ? 'Confirming...' : withdrawConfirming ? 'Processing...' : 'Withdraw Funds'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
