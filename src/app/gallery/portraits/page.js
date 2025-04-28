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

// Function to get all portrait media assets from Contentful
async function getAllPortraitMedia() {
  try {
    // Try to get assets with "Portraits" tag directly
    try {
      const response = await client.getAssets({
        'metadata.tags.sys.id[in]': 'Portraits',
        limit: 100
      });
      
      console.log(`Found ${response.items.length} assets with Portraits tag in Contentful`);
      
      // If we found assets with the Portraits tag
      if (response.items.length > 0) {
        return response.items
          .filter(asset => asset.fields.file.contentType.startsWith('image/'))
          .map(asset => ({
            id: asset.sys.id,
            url: asset.fields.file.url,
            title: asset.fields.title || '',
            description: asset.fields.description || '',
            contentType: asset.fields.file.contentType,
            width: asset.fields.file.details.image?.width || 800,
            height: asset.fields.file.details.image?.height || 600,
            sold: asset.fields.description?.toLowerCase().includes('sold') || false
          }));
      }
    } catch (tagError) {
      console.log('Error fetching assets with Portraits tag:', tagError);
    }
    
    // If we reach here, the tag approach didn't work
    // Use the fallback method to find portraits by characteristics
    return getFallbackPortraitMedia();
  } catch (error) {
    console.error('Error fetching portrait media assets from Contentful:', error);
    return [];
  }
}

// Fallback function that searches for "portrait" in asset metadata or uses orientation
async function getFallbackPortraitMedia() {
  try {
    // Fetch all assets from Contentful
    const response = await client.getAssets({
      limit: 100,
      order: 'sys.createdAt'
    });
    
    // First try: Filter for image assets with portrait in title or description
    let mediaAssets = response.items
      .filter(asset => 
        asset.fields.file.contentType.startsWith('image/') && 
        (asset.fields.description?.toLowerCase().includes('portrait') || 
         asset.fields.title?.toLowerCase().includes('portrait'))
      )
      .map(asset => ({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title || '',
        description: asset.fields.description || '',
        contentType: asset.fields.file.contentType,
        width: asset.fields.file.details.image?.width || 800,
        height: asset.fields.file.details.image?.height || 600,
        sold: asset.fields.description?.toLowerCase().includes('sold') || false
      }));
    
    // Second try: If no portraits found by keyword, use image orientation
    // Images that are taller than they are wide are likely portraits
    if (mediaAssets.length === 0) {
      mediaAssets = response.items
        .filter(asset => {
          if (!asset.fields.file.contentType.startsWith('image/')) return false;
          
          // Check if image dimensions indicate a portrait orientation
          const imageDetails = asset.fields.file.details.image;
          if (!imageDetails) return false;
          
          // If height > width, it's likely a portrait orientation
          return imageDetails.height > imageDetails.width;
        })
        .map(asset => ({
          id: asset.sys.id,
          url: asset.fields.file.url,
          title: asset.fields.title || '',
          description: asset.fields.description || '',
          contentType: asset.fields.file.contentType,
          width: asset.fields.file.details.image?.width || 800,
          height: asset.fields.file.details.image?.height || 600,
          sold: asset.fields.description?.toLowerCase().includes('sold') || false
        }));
    }
    
    // Third try: If we still don't have any, just grab all images (limited to 6)
    if (mediaAssets.length === 0) {
      mediaAssets = response.items
        .filter(asset => asset.fields.file.contentType.startsWith('image/'))
        .slice(0, 6)
        .map(asset => ({
          id: asset.sys.id,
          url: asset.fields.file.url,
          title: asset.fields.title || '',
          description: asset.fields.description || '',
          contentType: asset.fields.file.contentType,
          width: asset.fields.file.details.image?.width || 800,
          height: asset.fields.file.details.image?.height || 600,
          sold: asset.fields.description?.toLowerCase().includes('sold') || false
        }));
    }
    
    return mediaAssets;
  } catch (error) {
    console.error('Error in fallback portrait media fetch:', error);
    return [];
  }
}

export default async function PortraitsGallery() {
  // Fetch data from Contentful
  const portraitImages = await getAllPortraitMedia();
  
  // Use hardcoded title
  const titleText = 'Liesbeth van Keulen';
  
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
          <Link href="/gallery" className="text-2xl hover:opacity-80 transition-opacity" style={{ color: theme.link }}>
            ←
          </Link>
        </div>

        <h1 className="text-3xl mb-8 text-center" 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
          Portraits
        </h1>
        
        {portraitImages.length === 0 ? (
          <p className="text-center" style={{ color: theme.text }}>No portrait artwork found.</p>
        ) : (
          /* Image grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {portraitImages.map((image, index) => (
              <Link 
                key={image.id} 
                href={`/gallery/portraits/${image.id}`}
                className="block relative aspect-square overflow-hidden rounded hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Image 
                  src={`https:${image.url}`}
                  alt={image.title || "Liesbeth van Keulen portrait artwork"}
                  title={image.description || ""}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={index === 0}
                />

                {/* SOLD label if needed */}
                {(image.sold || image.description?.toLowerCase().includes('sold')) && (
                  <div className="absolute top-2 right-2 bg-white text-black py-1 px-3 rounded-sm z-10"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        fontWeight: 400,
                        letterSpacing: '0.05em'
                      }}>
                    SOLD
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 