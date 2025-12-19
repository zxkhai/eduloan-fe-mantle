# EduLoan - Decentralized Education Loan Platform

A decentralized education loan platform built on the Mantle Sepolia Testnet. Students can apply for education loans, and administrators can manage loan approvals, disbursements, and track repayments.

## Features

- **Apply for Loans** - Students can submit loan applications with specified amounts and purposes
- **Loan Management** - View all your loans, track status, and make payments
- **Admin Dashboard** - Approve/reject loans, disburse funds, manage contract balance
- **Wallet Integration** - Connect with popular wallets via RainbowKit

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Web3**: Wagmi, Viem, RainbowKit
- **Blockchain**: Mantle Sepolia Testnet

## Smart Contract

- **Address**: `0xaC6173752c2BDDde630091A3FEe9b60Aef0B4659`
- **Network**: Mantle Sepolia Testnet (Chain ID: 5003)
- **Explorer**: https://sepolia.mantlescan.xyz

## Getting Started

### Prerequisites

- Node.js 18+
- A Web3 wallet (MetaMask, etc.)
- MNT tokens on Mantle Sepolia Testnet

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd eduloan-mantle-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── layout/      # Header, Footer, Layout
│   ├── loan/        # LoanCard, LoanForm, PaymentForm
│   ├── stats/       # StatsCard
│   └── ui/          # Button, Card, Input, Badge, Spinner
├── config/
│   ├── chains.ts    # Mantle Sepolia chain config
│   ├── contracts.ts # Contract address and ABI
│   └── wagmi.ts     # Wagmi configuration
├── hooks/
│   ├── useAdmin.ts       # Admin functions hook
│   ├── useEduLoan.ts     # Read contract data hook
│   └── useEduLoanWrite.ts # Write contract data hook
├── lib/
│   ├── format.ts    # Formatting utilities
│   └── utils.ts     # General utilities
├── pages/
│   ├── Home.tsx     # Landing page
│   ├── ApplyLoan.tsx # Loan application form
│   ├── MyLoans.tsx  # User's loans list
│   ├── LoanDetail.tsx # Individual loan details
│   └── Admin.tsx    # Admin dashboard
└── types/
    └── index.ts     # TypeScript types
```

## Loan Status Flow

1. **Pending** - Loan application submitted, awaiting review
2. **Approved** - Loan approved by admin, awaiting disbursement
3. **Active** - Funds disbursed, repayment period started
4. **Repaid** - Loan fully repaid
5. **Defaulted** - Loan past deadline without full repayment
6. **Rejected** - Loan application rejected by admin

## Deployment

The app is configured for Vercel deployment with SPA routing support via `vercel.json`.

```bash
# Deploy to Vercel
vercel
```

## License

MIT
