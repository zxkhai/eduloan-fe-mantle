import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { eduLoanABI, eduLoanAddress } from '../config/contracts';

export function useApplyLoan() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const applyLoan = (amount: string, purpose: string) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'applyLoan',
      args: [parseEther(amount), purpose],
    });
  };

  return { applyLoan, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useMakePayment() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const makePayment = (loanId: bigint, amount: string) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'makePayment',
      args: [loanId],
      value: parseEther(amount),
    });
  };

  return { makePayment, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useApproveLoan() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const approveLoan = (loanId: bigint) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'approveLoan',
      args: [loanId],
    });
  };

  return { approveLoan, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useRejectLoan() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const rejectLoan = (loanId: bigint, reason: string) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'rejectLoan',
      args: [loanId, reason],
    });
  };

  return { rejectLoan, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useDisburseLoan() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const disburseLoan = (loanId: bigint) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'disburseLoan',
      args: [loanId],
    });
  };

  return { disburseLoan, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useDepositFunds() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const depositFunds = (amount: string) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'depositFunds',
      value: parseEther(amount),
    });
  };

  return { depositFunds, isPending, isConfirming, isSuccess, error, hash, reset };
}

export function useWithdrawFunds() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const withdrawFunds = (amount: string) => {
    writeContract({
      address: eduLoanAddress,
      abi: eduLoanABI,
      functionName: 'withdrawFunds',
      args: [parseEther(amount)],
    });
  };

  return { withdrawFunds, isPending, isConfirming, isSuccess, error, hash, reset };
}
