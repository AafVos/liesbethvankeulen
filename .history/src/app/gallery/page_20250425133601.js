import { createClient } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';
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

export default async function Gallery() {
  const titleText = 'Liesbeth van Keulen';
  
  // Fetch the specific image for Maastricht section
  const maastrichtImage = await getMediaAssetById('16zAmgLbilRFZ6kAfBkKdE');
  const maastrichtImageUrl = maastrichtImage ? `https:${maastrichtImage.url}` : "https://images.ctfassets.net/1z6huih0p4zo/3GjopkBdEuIAw9gvOz0Hvj/7cd5cd9f3aee8e04320fc84709fbab20/boy_portrait_1.jpg";
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title={titleText} 
        themeName={themeName} 
        showNavigation={false} 
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Maastricht Feature Section */}
          <div className="relative h-[80vh] w-full overflow-hidden">
            <div className="absolute inset-0 flex">
              {/* Image section (2/3 width) */}
              <div className="w-2/3 relative">
                <Image 
                  src={maastrichtImageUrl}
                  alt="Maastricht Gallery"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-4xl md:text-6xl text-white font-light tracking-widest"
                      style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                    MAASTRICHT
                  </h2>
                </div>
              </div>
              
              {/* Text section (1/3 width) */}
              <div className="w-1/3 bg-white p-8 flex flex-col justify-center">
                <h2 className="text-3xl mb-6 tracking-wide"
                    style={{ 
                      fontFamily: "'Courier New', Courier, monospace",
                      color: theme.text
                    }}>
                  CURRENT WORK
                </h2>
                <p className="text-lg mb-4" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}>
                  The house of cards is a subject matter that I keep coming back to.
                </p>
                <p className="text-lg mb-4" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}>
                  I painted my one about 15 years ago, and over the years they have come in many shapes and sizes.
                </p>
                <p className="text-lg" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}>
                  However, year on year, each tower seems to get bigger and bigger. I don't know if that is because the world seems more and more uncertain?
                </p>
              </div>
            </div>
          </div>

          {/* Portraits Block */}
          <Link href="/gallery/portraits" className="relative h-[40vh] w-full overflow-hidden group">
            <div className="absolute inset-0">
              <Image 
                src="https://images.ctfassets.net/1z6huih0p4zo/3GjopkBdEuIAw9gvOz0Hvj/7cd5cd9f3aee8e04320fc84709fbab20/boy_portrait_1.jpg"
                alt="Portraits Gallery"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl md:text-6xl text-white font-light tracking-widest"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                PORTRAITS
              </h2>
            </div>
          </Link>

          {/* Sculptures Block */}
          <Link href="/gallery/sculptures" className="relative h-[40vh] w-full overflow-hidden group">
            <div className="absolute inset-0">
              <Image 
                src="https://images.ctfassets.net/1z6huih0p4zo/6mRoKE13Y1vC0Jt4mZnKiB/3f17f5e930cd25e78d43c15a0a84c0c6/boy_portrait_2.jpg"
                alt="Sculptures Gallery"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl md:text-6xl text-white font-light tracking-widest"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}>
                SCULPTURES
              </h2>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
} 