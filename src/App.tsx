import '@rainbow-me/rainbowkit/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ApplyLoan } from './pages/ApplyLoan';
import { MyLoans } from './pages/MyLoans';
import { LoanDetail } from './pages/LoanDetail';
import { Admin } from './pages/Admin';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apply" element={<ApplyLoan />} />
                <Route path="/my-loans" element={<MyLoans />} />
                <Route path="/loan/:id" element={<LoanDetail />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
