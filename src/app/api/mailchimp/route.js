import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Je bent succesvol geabonneerd op de nieuwsbrief!",
      data: response 
    });
  } catch (error) {
    // Check if the error is because member already exists
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return NextResponse.json({ 
        success: false,
        message: "Je bent al geabonneerd op de nieuwsbrief",
        error: "already_subscribed"
      }, { status: 200 }); // Return 200 instead of 500 for this case
    }
    
    // For other errors, return a generic message
    return NextResponse.json({ 
      success: false,
      message: "Er is een fout opgetreden. Probeer het later opnieuw.",
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const response = await mailchimp.lists.getList(process.env.MAILCHIMP_LIST_ID);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Mailchimp GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 