import { getCampaignsWithContent } from '@/lib/mailchimp';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the since date from query parameters, or use default
    const { searchParams } = new URL(request.url);
    const sinceDate = searchParams.get('since') || '2025-01-01T15:41:36+00:00';
    
    console.log('Fetching Mailchimp campaigns since:', sinceDate);
    
    // Fetch campaigns with content
    const campaigns = await getCampaignsWithContent(sinceDate);
    
    console.log(`Successfully fetched ${campaigns.length} campaigns`);
    
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch campaigns', 
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 