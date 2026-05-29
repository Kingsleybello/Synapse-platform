// components/AgreementSigner.tsx
'use client';

import React, { useState } from 'react';

interface AgreementSignerProps {
  projectId: string;
  projectTitle: string;
  investorAddress: string;
  builderAddress: string;
  totalFunds: string;
  onExecutionSuccess: () => void;
}

export default function AgreementSigner({
  projectId,
  projectTitle,
  investorAddress,
  builderAddress,
  totalFunds,
  onExecutionSuccess
}: AgreementSignerProps) {
  const [investorSigned, setInvestorSigned] = useState(false);
  const [builderSigned, setBuilderSigned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const contractTerms = `SYNAPSE PROGRAMMATIC FUNDING AGREEMENT
==============================================
Project Name: ${projectTitle}
Target Funding Pool: ${totalFunds} ERC-20 Tokens
Designated Investor Wallet: ${investorAddress}
Designated Builder Wallet: ${builderAddress}

CORE CLAUSES:
1. Capital Lock: Funds are locked transparently inside the SynapseEscrow smart contract.
2. Milestone Verification: Funds are released programmatically upon builder submission of verifiable deployment proof.
3. Accountability Guardrail: Rejections require a minimum 50-character constructive feedback loop.
By signing this document with a Web3 wallet, both parties accept these immutable execution parameters.`;

  const handleSign = async (role: 'investor' | 'builder') => {
    setIsProcessing(true);
    try {
      // In production, this utilizes window.ethereum.request({ method: 'personal_sign' })
      // Simulating the secure Ethers message signature process for the hackathon sandbox
      const mockSignatureHash = "0x" + Array.from({length: 130}, () => Math.floor(Math.random()*16).toString(16)).join('');
      
      const payload = {
        projectId,
        role,
        signature: mockSignatureHash
      };

      const response = await fetch('/api/agreements/sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Novus.ai mandatory hackathon telemetry logging hook
      if (typeof window !== 'undefined' && (window as any).novus) {
        (window as any).novus('track', 'agreement_signed_locally', { role, projectId });
      }

      if (role === 'investor') setInvestorSigned(true);
      if (role === 'builder') setBuilderSigned(true);

      alert(`${role.toUpperCase()} signed contract parameters successfully!`);
    } catch (err) {
      console.error(err);
      alert("Cryptographic signature authorization failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const checkExecution = investorSigned && builderSigned;

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-2xl w-full space-y-6">
      <div>
        <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Phase 0: Deal Formation</h3>
        <h2 className="text-xl font-bold text-slate-100 mt-1">Cryptographic Agreement Signer</h2>
      </div>

      {/* Contract Terms Text View Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
        {contractTerms}
      </div>

      {/* Signature Verification State Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-4 rounded-xl border ${investorSigned ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-slate-950 border-slate-800'}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase">Investor Signature</span>
            <span className={`h-2 w-2 rounded-full ${investorSigned ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1 truncate">{investorAddress}</p>
          <button
            onClick={() => handleSign('investor')}
            disabled={investorSigned || isProcessing}
            className="w-full mt-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:bg-emerald-900/30 disabled:text-emerald-400 text-xs font-bold text-slate-200 rounded border border-slate-700 transition-all"
          >
            {investorSigned ? '✓ Signed & Verified' : '🔑 Sign as Investor'}
          </button>
        </div>

        <div className={`p-4 rounded-xl border ${builderSigned ? 'bg-emerald-950/20 border-emerald-800/60' : 'bg-slate-950 border-slate-800'}`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-400 uppercase">Builder Signature</span>
            <span className={`h-2 w-2 rounded-full ${builderSigned ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'}`} />
          </div>
          <p className="text-[10px] font-mono text-slate-500 mt-1 truncate">{builderAddress}</p>
          <button
            onClick={() => handleSign('builder')}
            disabled={builderSigned || isProcessing}
            className="w-full mt-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:bg-emerald-900/30 disabled:text-emerald-400 text-xs font-bold text-slate-200 rounded border border-slate-700 transition-all"
          >
            {builderSigned ? '✓ Signed & Verified' : '🔑 Sign as Builder'}
          </button>
        </div>
      </div>

      {/* Global Final Execution Action Trigger */}
      {checkExecution && (
        <button
          onClick={onExecutionSuccess}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-950/30 transition-all animate-fade-in"
        >
          🚀 Initialize On-Chain Escrow Smart Contract Parameters
        </button>
      )}
    </div>
  );
  }
      
