import { createClient } from 'contentful';

// Check if Contentful environment variables are defined
const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_PREVIEW_TOKEN;

// Create a dummy client if credentials are not available
const createDummyClient = () => ({
  getEntries: () => Promise.resolve({ items: [] }),
});

// Create the real client if credentials are available
const createRealClient = (token, host) => {
  if (!spaceId || !token) {
    console.warn('Contentful credentials are missing, using dummy client');
    return createDummyClient();
  }
  
  return createClient({
    space: spaceId,
    accessToken: token,
    host: host || 'cdn.contentful.com',
  });
};

// Create clients
const client = createRealClient(accessToken);
const previewClient = createRealClient(previewToken, 'preview.contentful.com');

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
    console.error('Error fetching entries from Contentful:', error);
    return { items: [] }; // Return empty array to prevent build failures
  }
} 