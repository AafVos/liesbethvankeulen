import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || "85b0c626d433e9517ce93b93e1ecc987-us12",
  server: "us12",
});

export async function GET(request) {
  try {
    // Get the list ID from the request or use a default
    const listId = request.nextUrl.searchParams.get('listId') || "list_id";
    
    const response = await mailchimp.lists.getList(listId);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Mailchimp API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch Mailchimp list' },
      { status: 500 }
    );
  }
} 