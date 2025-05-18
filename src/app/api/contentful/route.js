import { NextResponse } from 'next/server';
import { getEntries } from '@/lib/contentful';

export async function GET() {
  try {
    // Check if Contentful environment variables are set
    const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
    const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;
    
    // Return empty response if credentials are missing
    if (!spaceId || !accessToken) {
      console.warn('Contentful credentials not found in environment variables');
      return NextResponse.json({ items: [] });
    }
    
    // Replace 'page' with your content type ID from Contentful
    const entries = await getEntries('page');
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error in Contentful API route:', error);
    return NextResponse.json({ error: error.message, items: [] }, { status: 500 });
  }
} 