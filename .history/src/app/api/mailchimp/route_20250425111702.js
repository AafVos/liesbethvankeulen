import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: "85b0c626d433e9517ce93b93e1ecc987-us12",
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