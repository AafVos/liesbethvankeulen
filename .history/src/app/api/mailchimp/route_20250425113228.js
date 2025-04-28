import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: "aecaa5d79e4a3bf89514194567d78d8f-us12",
  server: "us12",
});

export async function GET() {
  try {
    const response = await mailchimp.lists.getList("list_id");
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 