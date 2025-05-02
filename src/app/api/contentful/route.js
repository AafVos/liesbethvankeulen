import { NextResponse } from 'next/server';
import { getEntries } from '@/lib/contentful';

export async function GET(request) {
  try {
    // Get content type from query parameters or default to 'page'
    const searchParams = request.nextUrl?.searchParams;
    const contentType = searchParams?.get('type') || 'page';

    // Fetch entries from Contentful
    const entries = await getEntries(contentType);
    
    return NextResponse.json({
      success: true,
      data: entries.items || []
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
} 