// components/SubmitMilestoneForm.tsx
'use client';

import React, { useState } from 'react';

interface SubmitMilestoneFormProps {
  milestoneId: string;
  milestoneTitle: string;
  onSubmitSuccess: () => void;
}

export default function SubmitMilestoneForm({ 
  milestoneId, 
  milestoneTitle, 
  onSubmitSuccess 
}: SubmitMilestoneFormProps) {
  const [proofUrl, setProofUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofUrl) return alert('Please provide a proof of work link!');

    setIsSubmitting(true);

    try {
      // Send the payload to update off-chain milestone status to 'under_review'
      const response = await fetch('/api/milestones/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestoneId, proofUrl, notes }),
      });

      // Trigger mandatory hackathon telemetry tracking via Novus.ai SDK
      if (typeof window !== 'undefined' && (window as any).novus) {
        (window as any).novus('track', 'milestone_submitted', { milestoneId });
      }

      alert('Milestone successfully submitted for investor review!');
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
      alert('Error submitting milestone variables.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-xl max-w-md w-full space-y-4">
      <div>
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Submitting Deliverable</h3>
        <p className="text-lg font-semibold text-slate-100 truncate">{milestoneTitle}</p>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300">Proof of Work URL (GitHub/Deploy Link)</label>
        <input
          type="url"
          required
          placeholder="https://github.com... or https://testnet.app"
          value={proofUrl}
          onChange={(e) => setProofUrl(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-300">Notes for the Investor (Optional)</label>
        <textarea
          placeholder="Provide any additional testing instructions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-all"
      >
        {isSubmitting ? 'Processing Submission...' : 'Submit Milestone to Investor'}
      </button>
    </form>
  );
        }
