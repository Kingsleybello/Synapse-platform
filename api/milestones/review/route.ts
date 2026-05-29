// api/milestones/review/route.ts
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

    // 2. Extract inputs from the InvestorReviewConsole request
    const { milestoneId, action, feedback } = await request.json();
    if (!milestoneId || !action) {
      return NextResponse.json({ error: 'Missing evaluation parameters' }, { status: 400 });
    }

    // 3. Resolve target status based on product lifecycle workflows
    let nextStatus: 'released' | 'rejected';
    if (action === 'approve') {
      nextStatus = 'released';
    } else if (action === 'reject') {
      // Validate the 50-character constraint rule on the backend for safety
      if (!feedback || feedback.trim().length < 50) {
        return NextResponse.json({ error: 'Incomplete dispute feedback' }, { status: 400 });
      }
      nextStatus = 'rejected';
    } else {
      return NextResponse.json({ error: 'Invalid workflow choice' }, { status: 400 });
    }

    // 4. Update off-chain database schema rows
    const { data, error } = await supabase
      .from('milestones')
      .update({
        status: nextStatus,
        investor_feedback: feedback || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', milestoneId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true, 
      message: `Milestone effectively updated to ${nextStatus}`,
      data 
    });

  } catch (error: any) {
    console.error('Review Process API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
