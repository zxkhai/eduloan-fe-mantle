import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mantleSepolia } from './chains';

export const config = getDefaultConfig({
  appName: 'EduLoan',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [mantleSepolia],
  transports: {
    [mantleSepolia.id]: http('https://rpc.sepolia.mantle.xyz'),
  },
});
