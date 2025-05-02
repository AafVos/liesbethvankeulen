import Header from '../../components/Header';
import { getThemeColors } from '../../styles/theme';
import Link from 'next/link';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get the first image from a category
async function getFirstImageFromCategory(tag) {
  try {
    const response = await getEntries('paintings', {
      'metadata.tags.sys.id[in]': tag,
      limit: 1
    });
    
    if (response.items.length > 0 && response.items[0].fields.image?.fields?.file?.url) {
      return {
        url: `https:${response.items[0].fields.image.fields.file.url}`,
        title: response.items[0].fields.title || ''
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching image for ${tag}:`, error);
    return null;
  }
}

export default async function Paintings() {
  // Get first images for each category
  const landscapeImage = await getFirstImageFromCategory('landscapes');
  const portraitImage = await getFirstImageFromCategory('portraits');

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="Paintings" 
      />
      
      <div className="h-[calc(100vh-12rem)] px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          {/* Landscapes */}
          <Link href="/work/paintings/landscapes" className="w-full h-full relative group overflow-hidden">
            {landscapeImage ? (
              <>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={landscapeImage.url}
                    alt={landscapeImage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              </>
            ) : (
              <div 
                className="h-full w-full" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide text-white drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100 z-10"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                Landscapes
              </h2>
            </div>
          </Link>
          
          {/* Portraits */}
          <Link href="/work/paintings/portraits" className="w-full h-full relative group overflow-hidden">
            {portraitImage ? (
              <>
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={portraitImage.url}
                    alt={portraitImage.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              </>
            ) : (
              <div 
                className="h-full w-full" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide text-white drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100 z-10"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                Portraits
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 