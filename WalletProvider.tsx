// components/WalletProvider.tsx
'use client';

import React from 'react';
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrumSepolia, baseSepolia } from '@reown/appkit/networks';

// 1. Setup the project networks (Cheap EVM Layer 2 Testnets for our MVP)
const networks = [arbitrumSepolia, baseSepolia];

// 2. Setup the interface adapter
const ethersAdapter = new EthersAdapter();

// 3. Initialize AppKit (The visual modal popup)
createAppKit({
  adapters: [ethersAdapter],
  networks,
  metadata: {
    name: 'Synapse Platform',
    description: 'Neural link between milestone delivery and fund execution',
    url: 'https://vercel.app',
    icons: ['https://githubusercontent.com']
  },
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_FREE_PROJECT_ID'
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
