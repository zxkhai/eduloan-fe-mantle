import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { getStatusColor } from '../../lib/utils';
import { formatStatus } from '../../lib/format';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-700',
      success: 'bg-green-50 text-green-700',
      warning: 'bg-orange-50 text-orange-700',
      error: 'bg-red-50 text-red-700',
      info: 'bg-blue-50 text-blue-700',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

interface LoanStatusBadgeProps {
  status: number;
}

export function LoanStatusBadge({ status }: LoanStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}
    >
      {formatStatus(status)}
    </span>
  );
}
