import { formatEther } from 'viem';

export function formatMNT(value: bigint): string {
  return `${parseFloat(formatEther(value)).toFixed(4)} MNT`;
}

export function formatMNTShort(value: bigint): string {
  const num = parseFloat(formatEther(value));
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K MNT`;
  }
  return `${num.toFixed(2)} MNT`;
}

export function formatDate(timestamp: bigint): string {
  if (timestamp === 0n) return '-';
  return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(timestamp: bigint): string {
  if (timestamp === 0n) return '-';
  return new Date(Number(timestamp) * 1000).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatStatus(status: number): string {
  const statuses = ['Pending', 'Approved', 'Active', 'Repaid', 'Defaulted', 'Rejected'];
  return statuses[status] || 'Unknown';
}

export function calculateProgress(repaid: bigint, total: bigint): number {
  if (total === 0n) return 0;
  return Number((repaid * 100n) / total);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculateInterestPreview(amount: string): string {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) return '0';
  const interest = amountNum * 0.05; // 5% interest
  return interest.toFixed(4);
}

export function calculateTotalPreview(amount: string): string {
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) return '0';
  const total = amountNum * 1.05; // principal + 5% interest
  return total.toFixed(4);
}
