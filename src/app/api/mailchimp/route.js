import { NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

// Backup function to send failed signups to Formspree
async function sendBackupToFormspree(email, firstName, lastName, error) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('subject', 'BACKUP: Newsletter Signup Failed');
    formData.append('message', `
Newsletter signup failed for:
- Email: ${email}
- First Name: ${firstName}
- Last Name: ${lastName}
- Error: ${error}
- Timestamp: ${new Date().toISOString()}

Please manually add this person to the Mailchimp list.
    `);

    const response = await fetch('https://formspree.io/f/xpwdgzab', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      console.log('Backup email sent successfully to Formspree');
    } else {
      console.error('Failed to send backup email to Formspree');
    }
  } catch (backupError) {
    console.error('Error sending backup to Formspree:', backupError);
  }
}

export async function POST(request) {
  let email, firstName, lastName;
  
  try {
    const body = await request.json();
    ({ email, firstName, lastName } = body);

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
    
    // For any other error (including 500s), send backup to Formspree
    // but tell the user it succeeded so no information is lost
    console.error('Mailchimp error, sending backup to Formspree:', error);
    
    // Send backup email with the signup details
    await sendBackupToFormspree(email, firstName, lastName, error.message || 'Unknown error');
    
    // Always return success to the user so they don't lose their information
    return NextResponse.json({ 
      success: true, 
      message: "Je bent succesvol geabonneerd op de nieuwsbrief!"
    }, { status: 200 });
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