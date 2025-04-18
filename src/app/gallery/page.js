import { createClient } from 'contentful';
import Image from 'next/image';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

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

export default async function Gallery() {
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  const allImages = await getAllContentfulMedia();
  
  // Extract the title text from the rich text field
  const titleText = entry?.fields?.title1 ? extractTextFromRichText(entry.fields.title1) : 'Liesbeth van Keulen';
  
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
        <h1 className="text-3xl mb-8 text-center" 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
          Gallery
        </h1>
        
        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.map((image, index) => (
            <div 
              key={image.id} 
              className="relative aspect-square overflow-hidden rounded shadow-lg hover:opacity-90 transition-opacity"
            >
              <Image 
                src={`https:${image.url}`}
                alt={image.title || "Liesbeth van Keulen artwork"}
                title={image.description || ""}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={index === 0}
              />

              {/* SOLD label for the first item */}
              {index === 0 && (
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
          ))}
        </div>
      </main>
    </div>
  );
} 