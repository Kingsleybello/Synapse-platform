// page.tsx
'use client';

import React, { useState } from 'react';
import DashboardHeader from './components/DashboardHeader';
import SubmitMilestoneForm from './components/SubmitMilestoneForm';
import InvestorReviewConsole from './components/InvestorReviewConsole';

export default function Page() {
  const [userRole, setUserRole] = useState<'builder' | 'investor'>('builder');
  const [activeTab, setActiveTab] = useState<'kanban' | 'actions'>('kanban');

  // Interactive local mock variables to let judges simulate real data workflows instantly
  const [milestone, setMilestone] = useState({
    id: 'm-902',
    title: 'Phase 1 MVP: Core Smart Contract Integration & Telemetry Testing',
    amountEscrowed: '0.50',
    status: 'in_progress',
    proofUrl: '',
    builderNotes: '',
  });

  const handleSubmissionSuccess = () => {
    setMilestone(prev => ({ ...prev, status: 'under_review', proofUrl: 'https://github.com' }));
    setActiveTab('kanban');
  };

  const handleReviewComplete = () => {
    setMilestone(prev => ({ ...prev, status: 'released' }));
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Integrated Presentation Layer Header */}
      <DashboardHeader />

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        
        {/* PM Strategic Control Banner */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Synapse Interactive Sandbox
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Hackathon Demo Mode: Switch roles below to simulate the end-to-end milestone lifecycle.
            </p>
          </div>

          {/* Toggle Engine to let judges experience both user personas seamlessly */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => { setUserRole('builder'); setActiveTab('kanban'); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${userRole === 'builder' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Builder View
            </button>
            <button
              onClick={() => { setUserRole('investor'); setActiveTab('kanban'); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${userRole === 'investor' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Investor View
            </button>
          </div>
        </div>

        {/* Workspace Display Navigation */}
        <div className="flex gap-2 border-b border-slate-800/60 pb-3">
          <button onClick={() => setActiveTab('kanban')} className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'kanban' ? 'border-cyan-400 text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            Workspace Board
          </button>
          <button onClick={() => setActiveTab('actions')} className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${activeTab === 'actions' ? 'border-cyan-400 text-slate-100' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            Interactive Panel ({milestone.status === 'in_progress' ? 'Submit Form' : 'Audit Console'})
          </button>
        </div>

        {/* Dynamic Sandbox Display Blocks */}
        {activeTab === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Active Work Tracking */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 min-h-[250px]">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">In Progress</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  {milestone.status === 'in_progress' ? '1' : '0'}
                </span>
              </div>
              {milestone.status === 'in_progress' && (
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-slate-200">{milestone.title}</h4>
                  <p className="text-[11px] text-slate-400">Funding Block Allocation: <span className="font-mono text-emerald-400 font-bold">{milestone.amountEscrowed} ETH</span></p>
                  {userRole === 'builder' && (
                    <button onClick={() => setActiveTab('actions')} className="w-full py-1.5 bg-cyan-600/20 hover:bg-cyan-600 text-cyan-400 hover:text-white text-xs font-bold rounded border border-cyan-500/30 transition-colors">
                      🚀 Finish & Submit Proof
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Column 2: Escrow Auditing Pipeline */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 min-h-[250px]">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Under Review</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  {milestone.status === 'under_review' ? '1' : '0'}
                </span>
              </div>
              {milestone.status === 'under_review' && (
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-3">
                  <h4 className="text-sm font-semibold text-slate-200">{milestone.title}</h4>
                  <p className="text-[11px] text-slate-400 font-mono text-amber-400">⚠️ Pending Escrow Verification</p>
                  {userRole === 'investor' && (
                    <button onClick={() => setActiveTab('actions')} className="w-full py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold rounded border border-emerald-500/30 transition-colors">
                      ⚖️ Open Audit Console
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Column 3: Complete & Broadcasted Releases */}
            <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 min-h-[250px]">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-2">
                <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Released / Paid</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  {milestone.status === 'released' ? '1' : '0'}
                </span>
              </div>
              {milestone.status === 'released' && (
                <div className="bg-slate-900 border border-emerald-900/50 p-4 rounded-lg bg-gradient-to-br from-slate-900 to-emerald-950/10">
                  <h4 className="text-sm font-semibold text-slate-200 line-through decoration-slate-700">{milestone.title}</h4>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold font-mono">✓ paid {milestone.amountEscrowed} ETH</span>
                    <span className="text-[10px] text-slate-500">On-Chain Safe</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* Execution Panel Fork */
          <div className="flex justify-center">
            {milestone.status === 'in_progress' ? (
              <SubmitMilestoneForm 
                milestoneId={milestone.id} 
                milestoneTitle={milestone.title} 
                onSubmitSuccess={handleSubmissionSuccess} 
              />
            ) : milestone.status === 'under_review' ? (
              <InvestorReviewConsole 
                milestone={{
                  id: milestone.id,
                  title: milestone.title,
                  proofUrl: milestone.proofUrl || 'https://github.com',
                  builderNotes: 'All smart contracts compiled. Local tests passing securely. Refactored the core provider layout elements successfully.',
                  amountEscrowed: milestone.amountEscrowed
                }} 
                onReviewComplete={handleReviewComplete} 
              />
            ) : (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center max-w-md w-full">
                <p className="text-3xl mb-2">🎉</p>
                <h3 className="text-base font-bold text-slate-200">Milestone Cycle Complete</h3>
                <p className="text-xs text-slate-400 mt-1">
                  The funds have been broadcasted and released to the builder's address wallet profile.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
