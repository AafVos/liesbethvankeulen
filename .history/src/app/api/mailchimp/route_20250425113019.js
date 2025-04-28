import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp configuration
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY || "85b0c626d433e9517ce93b93e1ecc987-us12",
  server: "us12",
});

export async function GET(request) {
  try {
    console.log('Mailchimp API Key:', process.env.MAILCHIMP_API_KEY || "85b0c626d433e9517ce93b93e1ecc987-us12");
    console.log('Mailchimp Server:', "us12");
    
    // Get the list ID from the request or use a default
    const listId = request.nextUrl.searchParams.get('listId') || "list_id";
    console.log('Attempting to fetch list with ID:', listId);
    
    const response = await mailchimp.lists.getList(listId);
    console.log('Mailchimp API Response:', response);
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Detailed Mailchimp API Error:', {
      message: error.message,
      status: error.status,
      response: error.response?.body,
      stack: error.stack
    });
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch Mailchimp list',
        details: error.response?.body || 'No additional details available'
      },
      { status: 500 }
    );
  }
} 