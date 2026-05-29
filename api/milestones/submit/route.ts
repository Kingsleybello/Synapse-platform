// api/milestones/submit/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    // 1. Authenticate user wallet session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized user session' }, { status: 401 });
    }

    // 2. Parse payload from the SubmitMilestoneForm
    const { milestoneId, proofUrl, notes } = await request.json();
    if (!milestoneId || !proofUrl) {
      return NextResponse.json({ error: 'Missing required validation parameters' }, { status: 400 });
    }

    // 3. Update relational database rows matching our PM pipeline rules
    const { data, error } = await supabase
      .from('milestones')
      .update({
        status: 'under_review',
        proof_url: proofUrl,
        builder_notes: notes,
        submitted_at: new Date().toISOString(),
      })
      .eq('id', milestoneId)
      .select()
      .single();

    if (error) throw error;

    // 4. Return success to refresh client-side elements
    return NextResponse.json({ 
      success: true, 
      message: 'Milestone transitioned to under_review', 
      data 
    });

  } catch (error: any) {
    console.error('Submission Endpoint Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
