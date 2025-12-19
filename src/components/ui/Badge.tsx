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
      default: 'bg-gradient-to-r from-[#e6f9ff]/40 via-[#d9f3ff]/30 to-[#eaf6ff]/40 text-[#03345a] border border-[#cfeeff]/40 badge-glow',
      success: 'bg-green-50 text-green-700 border border-green-200',
      warning: 'bg-orange-50 text-orange-700 border border-orange-200',
      error: 'bg-red-50 text-red-700 border border-red-200',
      info: 'bg-[#e8f8ff] text-[#024a72] border border-[#cbeffb]',
    };

    return (
      <span
        ref={ref}
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${variants[variant]} ${className}`}
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
