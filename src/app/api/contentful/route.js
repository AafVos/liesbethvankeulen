import { NextResponse } from 'next/server';
import { getEntries } from '@/lib/contentful';

export async function GET() {
  try {
    // Replace 'page' with your content type ID from Contentful
    const entries = await getEntries('page');
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 