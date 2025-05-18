import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Optional preview client for draft content
const previewClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN || process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: 'preview.contentful.com',
});

export const getClient = (preview = false) => (preview ? previewClient : client);

// Example function to fetch entries
export async function getEntries(type, options = {}) {
  const client = getClient(options.preview);
  const entries = await client.getEntries({
    content_type: type,
    ...options,
  });
  
  return entries;
} 