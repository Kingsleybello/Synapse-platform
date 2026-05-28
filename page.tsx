// app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'progress' | 'review' | 'done';
  proofUrl?: string;
}

export default function Dashboard() {
  // Local state for our lightweight native task tracker (Kanban)
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Complete UI Layout Wireframes', status: 'done', proofUrl: 'https://figma.com' },
    { id: '2', title: 'Deploy Smart Contract on Testnet', status: 'review', proofUrl: '0xabc123...789' },
    { id: '3', title: 'Integrate Web3 Client Provider Wallet', status: 'progress' },
    { id: '4', title: 'Set up Supabase Database Schema', status: 'todo' },
  ]);

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    // Send event data to Novus tracking platform
    if (typeof window !== 'undefined' && (window as any).novus) {
      (window as any).novus('track', 'task_moved', { taskId, status: newStatus });
    }
  };

  const executeMilestoneRelease = async () => {
    try {
      alert("Initiating Web3 multi-sig payload to release milestone 1 funds via SynapseEscrow contract...");
      // Future location for: await contract.releaseMilestone(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
      {/* Top Value Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Synapse Workspace
          </h1>
          <p className="text-sm text-slate-400 mt-1">Project Roadmap: Seed Funding Execution Pipeline</p>
        </div>
        <button 
          onClick={executeMilestoneRelease}
          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-emerald-950 transition-all active:scale-95"
        >
          Approve & Release Next Milestone
        </button>
      </div>

      {/* Grid columns for native Kanban boards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {(['todo', 'progress', 'review', 'done'] as const).map(columnStatus => (
          <div key={columnStatus} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">{columnStatus}</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === columnStatus).length}
              </span>
            </div>
            
            <div className="space-y-3 flex-1">
              {tasks.filter(t => t.status === columnStatus).map(task => (
                <div key={task.id} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-lg shadow-sm hover:border-slate-600 transition-colors">
                  <p className="text-sm text-slate-200 font-medium mb-2">{task.title}</p>
                  {task.proofUrl && (
                    <a href={task.proofUrl} target="_blank" rel="noreferrer" className="text-xs text-cyan-400 hover:underline block mb-3 truncate">
                      🔗 Proof: {task.proofUrl}
                    </a>
                  )}
                  
                  {/* Simplistic state shifter controls for the MVP prototype */}
                  <div className="flex gap-1 justify-end pt-2 border-t border-slate-800">
                    {columnStatus !== 'todo' && (
                      <button onClick={() => moveTask(task.id, columnStatus === 'done' ? 'review' : columnStatus === 'review' ? 'progress' : 'todo')} className="text-[10px] text-slate-400 bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded">
                        ◀
                      </button>
                    )}
                    {columnStatus !== 'done' && (
                      <button onClick={() => moveTask(task.id, columnStatus === 'todo' ? 'progress' : columnStatus === 'progress' ? 'review' : 'done')} className="text-[10px] text-slate-400 bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded">
                        ▶
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
