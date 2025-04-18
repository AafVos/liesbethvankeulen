import { createClient } from 'contentful';
import Slideshow from './components/Slideshow';

// Configure Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '1z6huih0p4zo',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'Txn-WQTpRlMJOgPkZu-ifKIM1x52cW95lwJ3-I6DKWY',
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
    const entryId = process.env.CONTENTFUL_ENTRY_ID || 'VK4FUyRfriPg9Aa2UP2Rc';
    console.log('Fetching Contentful entry with ID:', entryId);
    console.log('Using Contentful space:', process.env.CONTENTFUL_SPACE_ID || '1z6huih0p4zo');
    
    const entry = await client.getEntry(entryId);
    return entry;
  } catch (error) {
    console.error('Error fetching Contentful data:', error);
    return null;
  }
}

// Function to get all media assets from Contentful
async function getAllContentfulMedia() {
  try {
    // Fetch all assets from Contentful
    const response = await client.getAssets({
      limit: 100, // Increase if you have more assets
      order: 'sys.createdAt'
    });
    
    console.log(`Found ${response.items.length} media assets in Contentful`);
    
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
    console.error('Error fetching media assets from Contentful:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  const mediaAssets = await getAllContentfulMedia();
  
  // Extract the title text from the rich text field
  const titleText = entry?.fields?.title1 ? extractTextFromRichText(entry.fields.title1) : 'Liesbeth van Keulen';
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Slideshow as full background */}
      <div className="fixed inset-0 w-full h-full">
        <Slideshow images={mediaAssets} />
      </div>
      
      {/* Header - now fully transparent */}
      <header className="relative p-6 w-full z-20">
        <div className="text-left">
          <h2 
            className="text-3xl text-white tracking-wide drop-shadow-md" 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}
          >
            {titleText}
          </h2>
        </div>
      </header>
      
      {/* Empty main content */}
      <main className="flex-grow"></main>
    </div>
  );
}
