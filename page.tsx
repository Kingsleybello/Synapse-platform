// app/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { Header } from "@/components/synapse/header";
import { ControlBanner } from "@/components/synapse/control-banner";
import { KanbanBoard } from "@/components/synapse/kanban-board";
import { SlideOutModal } from "@/components/synapse/slide-out-modal";
import { AuditPanel } from "@/components/synapse/audit-panel";
import { TelemetryMonitor } from "@/components/synapse/telemetry-monitor";
import { ChatSandbox } from "@/components/synapse/chat-sandbox";
import { AgreementSigner } from "@/components/synapse/agreement-signer";
import type {
  Card,
  CardStatus,
  ViewMode,
  SubmissionData,
  TelemetryLog,
  ChatMessage,
} from "@/lib/types";

const initialCard: Card = {
  id: "1",
  title: "Phase 1 MVP: Core Smart Contract Integration & Telemetry Testing",
  escrowAmount: "0.50 ETH",
  status: "in-progress",
  submissionData: null,
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function SynapseDashboard() {
  const [agreementComplete, setAgreementComplete] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("builder");
  const [card, setCard] = useState<Card>(initialCard);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  // Modal and panel states
  const [slideOutOpen, setSlideOutOpen] = useState(false);
  const [auditPanelOpen, setAuditPanelOpen] = useState(false);
  const [disputeMode, setDisputeMode] = useState(false);
  const [disputeFeedback, setDisputeFeedback] = useState("");

  // Telemetry logs
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([]);

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 300000),
      sender: "builder",
      message: "Hey, I am starting work on the smart contract integration milestone.",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 240000),
      sender: "investor",
      message: "Sounds good! Let me know when you have the first testnet deployment ready.",
    },
    {
      id: generateId(),
      timestamp: new Date(Date.now() - 180000),
      sender: "builder",
      message: "Will do. Expecting to have something for review by end of week.",
    },
  ]);

  // Add telemetry log helper
  const addTelemetryLog = useCallback(
    (message: string, type: TelemetryLog["type"] = "event") => {
      setTelemetryLogs((prev) => [
        ...prev,
        {
          id: generateId(),
          timestamp: new Date(),
          message,
          type,
        },
      ]);
    },
    []
  );

  // Add chat message helper
  const addChatMessage = useCallback(
    (sender: ChatMessage["sender"], message: string) => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          timestamp: new Date(),
          sender,
          message,
        },
      ]);
    },
    []
  );

  // Initialize telemetry on mount
  useEffect(() => {
    addTelemetryLog(
      "[Novus Initialized]: HACKATHON_MIND_THE_PRODUCT_2026",
      "init"
    );
  }, [addTelemetryLog]);

  const animateCardTransition = useCallback(
    (newStatus: CardStatus, callback?: () => void) => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCard((prev) => ({ ...prev, status: newStatus }));
        setIsTransitioning(false);
        callback?.();
      }, 400);
    },
    []
  );

  const handleConnectWallet = () => {
    addTelemetryLog(
      `[Novus Event]: user_authenticated { role: '${viewMode}' }`
    );
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    addTelemetryLog(`[Novus Event]: role_switched { newRole: '${mode}' }`);
  };

  const handleSubmitProof = (data: SubmissionData) => {
    setCard((prev) => ({ ...prev, submissionData: data }));
    setSlideOutOpen(false);
    addTelemetryLog("[Novus Event]: milestone_submitted { id: 'm-902' }");
    animateCardTransition("under-review");
    addChatMessage(
      "system",
      `Builder submitted proof link: ${data.proofUrl}`
    );
  };

  const handleApprove = () => {
    setCelebrationActive(true);
    addTelemetryLog(
      "[Novus Event]: milestone_approved { payout: '0.50 ETH' }"
    );
    animateCardTransition("released", () => {
      setTimeout(() => setCelebrationActive(false), 2500);
    });
    setAuditPanelOpen(false);
    setDisputeMode(false);
    addChatMessage(
      "system",
      "Milestone APPROVED! 0.50 ETH has been released to Builder wallet (0x71C...7f2d). Congratulations!"
    );
  };

  const handleConfirmDispute = (feedback: string) => {
    addTelemetryLog(
      `[Novus Event]: milestone_rejected { feedback: '${feedback.substring(0, 30)}...' }`
    );
    animateCardTransition("in-progress", () => {
      setCard((prev) => ({ ...prev, submissionData: null }));
    });
    setAuditPanelOpen(false);
    setDisputeMode(false);
    addChatMessage("investor", feedback);
    setDisputeFeedback("");
  };

  const handleOpenAuditPanel = () => {
    setAuditPanelOpen(true);
    setDisputeMode(false);
    addTelemetryLog("[Novus Event]: audit_console_opened { cardId: '1' }");
  };

  const handleSendChatMessage = (message: string) => {
    addChatMessage(viewMode, message);
    addTelemetryLog(
      `[Novus Event]: chat_message_sent { from: '${viewMode}' }`
    );
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 transition-all duration-300 ${celebrationActive ? "ring-4 ring-emerald-500/50 ring-inset" : ""}`}>
      {celebrationActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="bg-emerald-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
              Funds Released Successfully
            </div>
          </div>
        </div>
      )}

      <Header onConnectWallet={handleConnectWallet} />

      <main className="container mx-auto px-4 py-4 lg:py-6 max-w-7xl pb-48 lg:pb-24">
        
        {/* Conditional Switch Layer: Displays Agreement Signer first if not executed */}
        {!agreementComplete ? (
          <div className="flex justify-center py-12">
            <AgreementSigner 
              projectId="p-301"
              projectTitle="Synapse Core Deployment"
              investorAddress="0x3bF...89a1"
              builderAddress="0x71C...7f2d"
              totalFunds="0.50 ETH"
              onExecutionSuccess={() => {
                setAgreementComplete(true);
                addTelemetryLog("[Novus Event]: escrow_contract_initialized");
              }}
            />
          </div>
        ) : (
          /* Main Functional Kanban Dashboard Unlocks post-signing */
          <>
            <ControlBanner viewMode={viewMode} onViewModeChange={handleViewModeChange} />

            <KanbanBoard
              card={card}
              viewMode={viewMode}
              isTransitioning={isTransitioning}
              onOpenSubmitModal={() => {
                setSlideOutOpen(true);
                addTelemetryLog("[Novus Event]: submit_modal_opened { cardId: '1' }");
              }}
              onOpenAuditPanel={handleOpenAuditPanel}
            />

            <AuditPanel
              open={auditPanelOpen}
              submissionData={card.submissionData}
              escrowAmount={card.escrowAmount}
              disputeMode={disputeMode}
              disputeFeedback={disputeFeedback}
              onDisputeFeedbackChange={setDisputeFeedback}
              onApprove={handleApprove}
              onStartDispute={() => {
                setDisputeMode(true);
                addTelemetryLog("[Novus Event]: dispute_mode_entered");
              }}
              onConfirmDispute={handleConfirmDispute}
              onClose={() => {
                setAuditPanelOpen(false);
                setDisputeMode(false);
                setDisputeFeedback("");
              }}
            />

            <ChatSandbox
              messages={chatMessages}
              viewMode={viewMode}
              onSendMessage={handleSendChatMessage}
            />
          </>
        )}
      </main>

      <SlideOutModal
        open={slideOutOpen}
        onClose={() => setSlideOutOpen(false)}
        onSubmit={handleSubmitProof}
      />

      <TelemetryMonitor logs={telemetryLogs} />
    </div>
  );
}
            <ControlBanner viewMode={viewMode} onViewModeChange={handleViewModeChange} />

            <KanbanBoard
              card={card}
              viewMode={viewMode}
              isTransitioning={isTransitioning}
              onOpenSubmitModal={() => {
                setSlideOutOpen(true);
                addTelemetryLog("[Novus Event]: submit_modal_opened { cardId: '1' }");
              }}
              onOpenAuditPanel={handleOpenAuditPanel}
            />

            <AuditPanel
              open={auditPanelOpen}
              submissionData={card.submissionData}
              escrowAmount={card.escrowAmount}
              disputeMode={disputeMode}
              disputeFeedback={disputeFeedback}
              onDisputeFeedbackChange={setDisputeFeedback}
              onApprove={handleApprove}
              onStartDispute={() => {
                setDisputeMode(true);
                addTelemetryLog("[Novus Event]: dispute_mode_entered");
              }}
              onConfirmDispute={handleConfirmDispute}
              onClose={() => {
                setAuditPanelOpen(false);
                setDisputeMode(false);
                setDisputeFeedback("");
              }}
            />

            <ChatSandbox
              messages={chatMessages}
              viewMode={viewMode}
              onSendMessage={handleSendChatMessage}
            />
          </>
        )}
      </main>

      <SlideOutModal
        open={slideOutOpen}
        onClose={() => setSlideOutOpen(false)}
        onSubmit={handleSubmitProof}
      />

      <TelemetryMonitor logs={telemetryLogs} />
    </div>
  );
}
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
