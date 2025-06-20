// Mailchimp API functions

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us12';
const MAILCHIMP_BASE_URL = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0`;

// Function to get campaigns from Mailchimp
export async function getMailchimpCampaigns(sinceDate = '2025-01-01T15:41:36+00:00') {
  try {
    if (!MAILCHIMP_API_KEY) {
      throw new Error('Mailchimp API key not found in environment variables');
    }

    const url = `${MAILCHIMP_BASE_URL}/campaigns?since_create_time=${sinceDate}&status=sent&fields=campaigns.id,campaigns.send_time,campaigns.settings.title`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.campaigns || [];
  } catch (error) {
    console.error('Error fetching Mailchimp campaigns:', error);
    throw error;
  }
}

// Function to get campaign content by ID
export async function getCampaignContent(campaignId) {
  try {
    if (!MAILCHIMP_API_KEY) {
      throw new Error('Mailchimp API key not found in environment variables');
    }

    const url = `${MAILCHIMP_BASE_URL}/campaigns/${campaignId}/content?fields=html`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Mailchimp API error for campaign ${campaignId}: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.html || '';
  } catch (error) {
    console.error(`Error fetching content for campaign ${campaignId}:`, error);
    throw error;
  }
}

// Function to get all campaigns with their content
export async function getCampaignsWithContent(sinceDate = '2025-01-01T15:41:36+00:00') {
  try {
    // First, get all campaign IDs with additional info
    const campaigns = await getMailchimpCampaigns(sinceDate);
    
    console.log(`Found ${campaigns.length} campaigns`);
    console.log('Campaign details:', campaigns.map(c => ({ 
      id: c.id, 
      title: c.settings?.title || 'No title', 
      send_time: c.send_time 
    })));
    
    // Then, fetch content for each campaign
    const campaignsWithContent = await Promise.all(
      campaigns.map(async (campaign) => {
        try {
          const content = await getCampaignContent(campaign.id);
          return {
            id: campaign.id,
            title: campaign.settings?.title || '',
            send_time: campaign.send_time || '',
            html: content
          };
        } catch (error) {
          console.error(`Failed to fetch content for campaign ${campaign.id}:`, error);
          return {
            id: campaign.id,
            title: campaign.settings?.title || '',
            send_time: campaign.send_time || '',
            html: '',
            error: error.message
          };
        }
      })
    );

    return campaignsWithContent;
  } catch (error) {
    console.error('Error fetching campaigns with content:', error);
    throw error;
  }
} 