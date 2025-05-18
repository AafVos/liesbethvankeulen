import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: "ee8958c49c729aa951becf3d7396b23c-us12",
  server: "us12",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    const response = await mailchimp.lists.addListMember("c09ffa2672", {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await mailchimp.lists.getList("c09ffa2672");
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 