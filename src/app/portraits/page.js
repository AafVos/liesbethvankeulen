import { createClient } from 'contentful';
import Slideshow from '../components/Slideshow';
import Header from '../components/Header';
import NewsletterSubscription from '../components/NewsletterSubscription';
import Link from 'next/link';

// Configure Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Helper function to extract text from rich text field
function extractTextFromRichText(richTextField) {
  if (!richTextField || !richTextField.content) return '';
  
  let extractedText = '';
  
  // Process each content block
  richTextField.content.forEach(block => {
    if (block.nodeType === 'paragraph' && block.content) {
      // Process each text node in the paragraph
      block.content.forEach(textNode => {
        if (textNode.nodeType === 'text') {
          extractedText += textNode.value;
        }
      });
    }
  });
  
  return extractedText;
}

// Use async/await for data fetching
async function getContentfulEntry() {
  try {
    const entryId = process.env.CONTENTFUL_ENTRY_ID;
    console.log('Fetching Contentful entry with ID:', entryId);
    console.log('Using Contentful space:', process.env.CONTENTFUL_SPACE_ID);
    
    const entry = await client.getEntry(entryId);
    return entry;
  } catch (error) {
    console.error('Error fetching Contentful data:', error);
    return null;
  }
}

// Function to get portrait images from Contentful (tagged with 'portraits')
async function getPortraitImages() {
  try {
    // Fetch assets with the 'portraits' tag
    const response = await client.getAssets({
      'metadata.tags.sys.id[in]': 'portraits',
      limit: 100, // Increase if you have more assets
      order: 'sys.createdAt'
    });
    
    console.log(`Found ${response.items.length} portrait images in Contentful`);
    
    // Filter for just image assets and extract URLs
    const mediaAssets = response.items
      .filter(asset => asset.fields.file.contentType.startsWith('image/'))
      .map(asset => ({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title || '',
        description: asset.fields.description || '',
        contentType: asset.fields.file.contentType
      }));
      
    return mediaAssets;
  } catch (error) {
    console.error('Error fetching portrait images from Contentful:', error);
    return [];
  }
}

export default async function Portraits() {
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  const portraitImages = await getPortraitImages();
  
  // Extract the title text from the rich text field
  const titleText = entry?.fields?.title1 ? extractTextFromRichText(entry.fields.title1) : 'Liesbeth van Keulen';
  
  // Style for navigation links
  const navLinkStyle = {
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 400,
    letterSpacing: '0.07em'
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Slideshow as full background */}
      <div className="fixed inset-0 w-full h-full">
        <Slideshow images={portraitImages} />
      </div>
      
      {/* Use the new Header component */}
      <Header title={titleText} />
      
      {/* Newsletter Subscription */}
      <NewsletterSubscription />
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center">
        {/* You can add additional content here */}
      </main>
    </div>
  );
} 