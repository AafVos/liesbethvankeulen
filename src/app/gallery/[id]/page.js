import { createClient } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import { getThemeColors } from '../../styles/theme';

// Choose theme option 2 (light theme)
const themeName = 'light';
const theme = getThemeColors(themeName);

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
      limit: 100,
      order: 'sys.createdAt'
    });
    
    // Filter for just image assets and extract URLs
    const mediaAssets = response.items
      .filter(asset => asset.fields.file.contentType.startsWith('image/'))
      .map(asset => ({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title || '',
        description: asset.fields.description || '',
        contentType: asset.fields.file.contentType,
        width: asset.fields.file.details.image?.width || 800,
        height: asset.fields.file.details.image?.height || 600
      }));
      
    return mediaAssets;
  } catch (error) {
    console.error('Error fetching media assets from Contentful:', error);
    return [];
  }
}

// Function to get a single media asset by ID
async function getMediaAssetById(id) {
  try {
    const asset = await client.getAsset(id);
    
    if (!asset || !asset.fields) {
      throw new Error('Asset not found');
    }
    
    return {
      id: asset.sys.id,
      url: asset.fields.file.url,
      title: asset.fields.title || '',
      description: asset.fields.description || '',
      contentType: asset.fields.file.contentType,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 600
    };
  } catch (error) {
    console.error('Error fetching media asset:', error);
    return null;
  }
}

export default async function GalleryItem({ params }) {
  // Extract the ID from the params
  const { id } = params;
  
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  const item = await getMediaAssetById(id);
  
  // If the item doesn't exist, show a message
  if (!item) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
        <Header 
          title="Liesbeth van Keulen" 
          themeName={themeName} 
          showNavigation={false} 
        />
        <main className="container mx-auto px-4 py-12 mt-8">
          <h1 className="text-3xl mb-8 text-center" style={{ 
            fontFamily: "'Courier New', Courier, monospace",
            color: theme.heading,
            fontWeight: 400
          }}>
            Artwork not found
          </h1>
          <p className="text-center mb-8">
            <Link href="/gallery" className="underline" style={{ color: theme.link }}>
              Return to gallery
            </Link>
          </p>
        </main>
      </div>
    );
  }
  
  // Extract the title text from the rich text field
  const titleText = entry?.fields?.title1 ? extractTextFromRichText(entry.fields.title1) : 'Liesbeth van Keulen';
  
  // Check if the item is sold (first item)
  const isSold = id === '0'; // Replace with actual logic to determine if sold
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Header with theme name passed and navigation hidden */}
      <Header 
        title={titleText} 
        themeName={themeName} 
        showNavigation={false} 
      />
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-12 mt-8">
        <div className="mb-6">
          <Link href="/gallery" className="text-xl" style={{ color: theme.link }}>
            ←
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image on the left */}
          <div className="md:w-1/2 relative">
            <div className="relative aspect-square overflow-hidden rounded shadow-lg">
              <Image 
                src={`https:${item.url}`}
                alt={item.title || "Liesbeth van Keulen artwork"}
                title={item.description || ""}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              
              {/* SOLD label if applicable */}
              {isSold && (
                <div className="absolute top-2 right-2 bg-white text-black py-1 px-3 rounded-sm shadow-lg z-10"
                     style={{ 
                       fontFamily: "'Courier New', Courier, monospace",
                       fontWeight: 400,
                       letterSpacing: '0.05em'
                     }}>
                  SOLD
                </div>
              )}
            </div>
          </div>
          
          {/* Text content on the right */}
          <div className="md:w-1/2">
            <h1 className="text-2xl mb-4" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              {item.title || "Untitled"}
            </h1>
            
            <div className="prose" style={{ color: theme.text }}>
              <p className="mb-4">{item.description || "No description available."}</p>
              
              {/* Additional artwork details can be added here */}
              <div className="mt-8">
                <p><strong>Medium:</strong> Oil on canvas</p>
                <p><strong>Dimensions:</strong> 60 × 80 cm</p>
                <p><strong>Year:</strong> 2023</p>
                
                {isSold ? (
                  <p className="mt-4"><strong>Status:</strong> Sold</p>
                ) : (
                  <p className="mt-4"><strong>Price:</strong> €1,200</p>
                )}
                
                <p className="mt-6">
                  <a href="mailto:info@liesbethvankeulen.nl" className="inline-block bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                    Inquire about this piece
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 