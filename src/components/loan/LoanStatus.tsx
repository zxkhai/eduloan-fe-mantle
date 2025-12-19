import { Clock, CheckCircle, AlertCircle, XCircle, Banknote, Timer } from 'lucide-react';
import { LoanStatus as LoanStatusEnum } from '../../types';

interface LoanStatusInfoProps {
  status: LoanStatusEnum;
}

export function LoanStatusInfo({ status }: LoanStatusInfoProps) {
  const statusInfo = {
    [LoanStatusEnum.Pending]: {
      icon: Clock,
      title: 'Pending Review',
      description: 'Your loan application is being reviewed by the admin.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    [LoanStatusEnum.Approved]: {
      icon: CheckCircle,
      title: 'Approved',
      description: 'Your loan has been approved. Waiting for disbursement.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    [LoanStatusEnum.Active]: {
      icon: Banknote,
      title: 'Active',
      description: 'Your loan is active. Make payments to complete repayment.',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    [LoanStatusEnum.Repaid]: {
      icon: CheckCircle,
      title: 'Fully Repaid',
      description: 'Congratulations! You have fully repaid this loan.',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
    },
    [LoanStatusEnum.Defaulted]: {
      icon: AlertCircle,
      title: 'Defaulted',
      description: 'This loan has passed its deadline without full repayment.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    [LoanStatusEnum.Rejected]: {
      icon: XCircle,
      title: 'Rejected',
      description: 'Your loan application was rejected.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  };

  const info = statusInfo[status];
  const Icon = info.icon;

  return (
    <div className={`p-4 rounded-lg ${info.bgColor}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${info.color} flex-shrink-0 mt-0.5`} />
        <div>
          <p className={`font-medium ${info.color}`}>{info.title}</p>
          <p className="text-sm text-gray-600 mt-1">{info.description}</p>
        </div>
      </div>
    </div>
  );
}

interface DeadlineInfoProps {
  deadline: bigint;
}

export function DeadlineInfo({ deadline }: DeadlineInfoProps) {
  if (deadline === 0n) return null;

  const now = Math.floor(Date.now() / 1000);
  const deadlineNum = Number(deadline);
  const remaining = deadlineNum - now;
  const daysRemaining = Math.ceil(remaining / 86400);
  const isOverdue = remaining < 0;

  return (
    <div className={`p-4 rounded-lg ${isOverdue ? 'bg-red-50' : 'bg-blue-50'}`}>
      <div className="flex items-start gap-3">
        <Timer className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isOverdue ? 'text-red-500' : 'text-blue-500'}`} />
        <div>
          <p className={`font-medium ${isOverdue ? 'text-red-500' : 'text-blue-500'}`}>
            {isOverdue ? 'Overdue' : 'Time Remaining'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {isOverdue
              ? `${Math.abs(daysRemaining)} days past deadline`
              : `${daysRemaining} days until deadline`}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Deadline: {new Date(deadlineNum * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
