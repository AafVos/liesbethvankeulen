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
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Function to get all media assets from Contentful
async function getAllLandscapeMedia() {
  try {
    // Try to get assets with "Landscapes" tag directly
    try {
      const response = await client.getAssets({
        'metadata.tags.sys.id[in]': 'Landscapes',
        limit: 100
      });
      
      console.log(`Found ${response.items.length} assets with Landscapes tag in Contentful`);
      
      // If we found assets with the Landscapes tag
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
            height: asset.fields.file.details.image?.height || 600
          }));
      }
    } catch (tagError) {
      console.log('Error fetching assets with Landscapes tag:', tagError);
    }
    
    // Fetch all assets from Contentful as fallback
    const response = await client.getAssets({
      limit: 100, // Increase if you have more assets
      order: 'sys.createdAt'
    });
    
    console.log(`Found ${response.items.length} media assets in Contentful`);
    
    // Filter for just image assets and extract URLs
    // First, try to find images with landscape in title or description
    let mediaAssets = response.items
      .filter(asset => 
        asset.fields.file.contentType.startsWith('image/') && 
        (asset.fields.description?.toLowerCase().includes('landscape') || 
         asset.fields.title?.toLowerCase().includes('landscape'))
      )
      .map(asset => ({
        id: asset.sys.id,
        url: asset.fields.file.url,
        title: asset.fields.title || '',
        description: asset.fields.description || '',
        contentType: asset.fields.file.contentType,
        width: asset.fields.file.details.image?.width || 800,
        height: asset.fields.file.details.image?.height || 600
      }));
    
    // If we didn't find any landscapes by keyword, let's use image dimensions as a fallback
    // Images that are wider than they are tall are likely landscapes
    if (mediaAssets.length === 0) {
      mediaAssets = response.items
        .filter(asset => {
          if (!asset.fields.file.contentType.startsWith('image/')) return false;
          
          // Check if image dimensions indicate a landscape orientation
          const imageDetails = asset.fields.file.details.image;
          if (!imageDetails) return false;
          
          // If width > height, it's likely a landscape orientation
          return imageDetails.width > imageDetails.height;
        })
        .map(asset => ({
          id: asset.sys.id,
          url: asset.fields.file.url,
          title: asset.fields.title || '',
          description: asset.fields.description || '',
          contentType: asset.fields.file.contentType,
          width: asset.fields.file.details.image?.width || 800,
          height: asset.fields.file.details.image?.height || 600
        }));
    }
    
    // If we still don't have any, just grab all images (limited to 6 for a reasonable display)
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
          height: asset.fields.file.details.image?.height || 600
        }));
    }
      
    return mediaAssets;
  } catch (error) {
    console.error('Error fetching landscape media assets from Contentful:', error);
    return [];
  }
}

export default async function LandscapesGallery() {
  // Fetch data from Contentful
  const landscapeImages = await getAllLandscapeMedia();
  
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
          Landscapes
        </h1>
        
        {landscapeImages.length === 0 ? (
          <p className="text-center" style={{ color: theme.text }}>No landscape artwork found.</p>
        ) : (
          /* Image grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {landscapeImages.map((image, index) => (
              <Link 
                key={image.id} 
                href={`/gallery/landscapes/${image.id}`}
                className="block relative aspect-square overflow-hidden rounded hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Image 
                  src={`https:${image.url}`}
                  alt={image.title || "Liesbeth van Keulen landscape artwork"}
                  title={image.description || ""}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={index === 0}
                />

                {/* SOLD label if needed (example for first item) */}
                {image.description?.toLowerCase().includes('sold') && (
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