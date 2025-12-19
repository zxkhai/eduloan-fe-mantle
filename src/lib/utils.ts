import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isValidAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num >= 0.01 && num <= 10;
}

export function getStatusColor(status: number): string {
  const colors: Record<number, string> = {
    0: 'bg-orange-50 text-orange-700', // Pending
    1: 'bg-blue-50 text-blue-700', // Approved
    2: 'bg-green-50 text-green-700', // Active
    3: 'bg-gray-100 text-gray-700', // Repaid
    4: 'bg-red-50 text-red-700', // Defaulted
    5: 'bg-red-50 text-red-700', // Rejected
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export function getDaysRemaining(deadline: bigint): number {
  if (deadline === 0n) return 0;
  const now = Math.floor(Date.now() / 1000);
  const deadlineNum = Number(deadline);
  const remaining = deadlineNum - now;
  return Math.max(0, Math.ceil(remaining / 86400));
}

export function isOverdue(deadline: bigint): boolean {
  if (deadline === 0n) return false;
  const now = Math.floor(Date.now() / 1000);
  return Number(deadline) < now;
}
