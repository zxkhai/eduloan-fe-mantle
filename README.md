## EduLoan — Decentralized Student Loans (Mantle)

> A simple, beautiful front-end for decentralized student loans. Built with a glassmorphism UI and an ocean-inspired color system.

Live demo: https://eduloan-mantle-pied.vercel.app

Smart contract (Mantle Sepolia): [`0x0b16faeab87279ba9ecf7f6530172c8c3eb4d653`](https://sepolia.mantlescan.xyz/address/0x0b16faeab87279ba9ecf7f6530172c8c3eb4d653)

Created by ETHJKT x Khai

---

## 🚀 Quick Start

Clone, install, and run locally:

```bash
git clone <repo-url>
cd eduloan-fe-mantle
npm install
npm run dev
# Open http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview
```

---

## ✨ Highlights

- Apply for student loans and check application status
- Admin dashboard to review, approve, disburse, and manage funds
- Repayment flow with progress tracking and payment modal
- Wallet connect via RainbowKit + Wagmi
- Responsive UI with glassmorphism and ocean-white-blue gradients

---

## 🧰 Tech Stack

- Frontend: React 19 + TypeScript
- Build: Vite
- Styling: TailwindCSS + custom CSS tokens (`src/index.css`)
- Web3: Wagmi + Viem
- Wallet UI: RainbowKit
- Icons: Lucide

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── layout/      # Header, Footer, Layout
│   ├── loan/        # LoanCard, LoanForm, PaymentForm, LoanProgress
│   ├── stats/       # StatsCard
│   └── ui/          # Button, Card, Input, Badge, Spinner
├── config/          # chains.ts, contracts.ts, wagmi.ts
├── hooks/           # useEduLoan, useEduLoanWrite, useAdmin
├── lib/             # format.ts, utils.ts
├── pages/           # Home, ApplyLoan, MyLoans, LoanDetail, Admin
└── index.css         # global tokens + glass styles
```

---

## 🔗 Deployments

- Frontend: https://eduloan-mantle.vercel.app
- Smart contract (Mantle Sepolia): [`0x0b16faeab87279ba9ecf7f6530172c8c3eb4d653`](https://sepolia.mantlescan.xyz/address/0x0b16faeab87279ba9ecf7f6530172c8c3eb4d653)

If you need the ABI or verified source, check `src/config/contracts.ts` or ask me to add it here.

---

## 🛠 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Build production assets |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🧭 Design Tokens & Styling

- Global tokens and glass styles are defined in `src/index.css` (variables like `--ocean-500`, helpers `.glass`, `.glass-soft`, `.glass-strong`).
- When contributing, prefer using these tokens for consistent visual language.

---

## ✅ Contribution

Contributions welcome — open an issue or submit a PR. Please keep UI and color changes consistent with the theme in `src/index.css`.

Options I can add on request:

- Visual style guide (colors, spacing, component examples)
- Contract ABI & verification details
- Deployment notes for Vercel & environment variables

---

## ❤️ Credits

Built by **ETHJKT x Khai**

---

If you prefer a developer guide (example contract calls, ABIs, scripts), tell me which parts to include and I will update the README.
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
