import { useReadContract, useReadContracts } from 'wagmi';
import { eduLoanABI, eduLoanAddress } from '../config/contracts';
import type { Loan } from '../types';

export function useMyLoans(address: `0x${string}` | undefined) {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'getMyLoans',
    account: address,
    query: {
      enabled: !!address,
    },
  });
}

export function useLoanDetails(loanId: bigint | undefined) {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'getLoanDetails',
    args: loanId !== undefined ? [loanId] : undefined,
    query: {
      enabled: loanId !== undefined,
    },
  }) as { data: Loan | undefined; isLoading: boolean; error: Error | null; refetch: () => void };
}

export function useMultipleLoanDetails(loanIds: readonly bigint[] | undefined) {
  const contracts = loanIds?.map((id) => ({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'getLoanDetails' as const,
    args: [id] as const,
  }));

  return useReadContracts({
    contracts: contracts || [],
    query: {
      enabled: !!loanIds && loanIds.length > 0,
    },
  });
}

export function useTotalLoans() {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'getTotalLoans',
  });
}

export function useContractBalance() {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'getContractBalance',
  });
}

export function useAdmin() {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'admin',
  });
}

export function useRemainingAmount(loanId: bigint | undefined) {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'getRemainingAmount',
    args: loanId !== undefined ? [loanId] : undefined,
    query: {
      enabled: loanId !== undefined,
    },
  });
}

export function useCalculateInterest(amount: bigint | undefined) {
  return useReadContract({
    address: eduLoanAddress,
    abi: eduLoanABI,
    functionName: 'calculateInterest',
    args: amount !== undefined ? [amount] : undefined,
    query: {
      enabled: amount !== undefined && amount > 0n,
    },
  });
}
