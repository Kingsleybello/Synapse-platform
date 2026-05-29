// components/DashboardHeader.tsx
import React from 'react';

export default function DashboardHeader() {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-bold tracking-wider text-xl text-slate-100">SYNAPSE</span>
      </div>
      
      {/* Magic Global Web3 Button Component injected by AppKit automatically */}
      <appkit-button balance="show" />
    </header>
  );
}
