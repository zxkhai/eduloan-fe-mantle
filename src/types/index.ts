export const LoanStatus = {
  Pending: 0,
  Approved: 1,
  Active: 2,
  Repaid: 3,
  Defaulted: 4,
  Rejected: 5,
} as const;

export type LoanStatus = (typeof LoanStatus)[keyof typeof LoanStatus];

export interface Loan {
  loanId: bigint;
  borrower: `0x${string}`;
  principalAmount: bigint;
  interestRate: bigint;
  totalAmount: bigint;
  amountRepaid: bigint;
  applicationTime: bigint;
  approvalTime: bigint;
  deadline: bigint;
  status: LoanStatus;
  purpose: string;
}

export type LoanStatusType = keyof typeof LoanStatus;
