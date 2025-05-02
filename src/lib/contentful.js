import { createClient } from 'contentful';

// Default space and access token for fallback
const DEFAULT_SPACE_ID = 'dvmnag9co35b';
const DEFAULT_ACCESS_TOKEN = 'c20cEmWuFGKGJQ5mpDKYDslrUUBpAdezGVhuNNmN_bc';
const DEFAULT_PREVIEW_TOKEN = 'eYbJDyO4PJAzGu7GYm5L8nvwsV2oWOQPWZGGcaU9Tww';

// Use environment variables with fallbacks
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID || DEFAULT_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN || DEFAULT_ACCESS_TOKEN;
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_PREVIEW_TOKEN || DEFAULT_PREVIEW_TOKEN;

// Create regular client
const client = createClient({
  space: spaceId,
  accessToken: accessToken,
});

// Optional preview client for draft content
const previewClient = createClient({
  space: spaceId,
  accessToken: previewToken,
  host: 'preview.contentful.com',
});

export const getClient = (preview = false) => (preview ? previewClient : client);

// Example function to fetch entries
export async function getEntries(type, options = {}) {
  try {
    const client = getClient(options.preview);
    const entries = await client.getEntries({
      content_type: type,
      ...options,
    });
    
    return entries;
  } catch (error) {
    console.error('Contentful error:', error);
    // Return empty result structure to prevent breaking the application
    return { items: [] };
  }
} 