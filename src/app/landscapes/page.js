import { createClient } from 'contentful';
import Slideshow from '../components/Slideshow';
import Link from 'next/link';

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

export default async function Landscapes() {
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  const mediaAssets = await getAllContentfulMedia();
  
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
        <Slideshow images={mediaAssets} />
      </div>
      
      {/* Header with navigation - structure differs between mobile and desktop */}
      <header className="relative w-full z-20 py-6 px-6">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Title on the left */}
          <div>
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
          
          {/* Navigation links in the center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <nav>
              <ul className="flex space-x-12">
                <li>
                  <Link 
                    href="/landscapes" 
                    className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md underline"
                    style={navLinkStyle}
                  >
                    Landscapes
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/sculptures" 
                    className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                    style={navLinkStyle}
                  >
                    Sculptures
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/portraits" 
                    className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                    style={navLinkStyle}
                  >
                    Portraits
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Home link */}
          <div>
            <Link
              href="/"
              className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
              style={navLinkStyle}
            >
              Home
            </Link>
          </div>
        </div>

        {/* Mobile layout - stacked with title at top and centered nav below */}
        <div className="flex flex-col md:hidden w-full space-y-6">
          <div className="text-center">
            <h2 
              className="text-2xl text-white tracking-wide drop-shadow-md" 
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 400,
                letterSpacing: '0.05em'
              }}
            >
              {titleText}
            </h2>
          </div>
          
          <nav className="flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/landscapes" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md underline"
                  style={navLinkStyle}
                >
                  Landscapes
                </Link>
              </li>
              <li>
                <Link 
                  href="/sculptures" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                  style={navLinkStyle}
                >
                  Sculptures
                </Link>
              </li>
              <li>
                <Link 
                  href="/portraits" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                  style={navLinkStyle}
                >
                  Portraits
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
              style={navLinkStyle}
            >
              Home
            </Link>
          </div>
        </div>
      </header>
      
      {/* Empty main content */}
      <main className="flex-grow"></main>
    </div>
  );
} 