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
        title: response.items[0].fields.title || '',
        description: response.items[0].fields.description || 'A collection of beautiful paintings capturing moments and emotions.'
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
        showNavigation={false} 
        PageTitle="Work" 
        currentPage="work"
      />
      
      <div className="container mx-auto px-8 py-12 max-w-5xl">
        <Link href="/work" className="text-xl mb-6 inline-block hover:opacity-80 transition-opacity" style={{ color: theme.text }}>
          ←
        </Link>
        
        <h1 
          className="text-3xl md:text-4xl mb-10 text-center"
          style={{ 
            fontFamily: "'Courier New', Courier, monospace",
            color: theme.text
          }}
        >
          Paintings
        </h1>
        
        <div className="flex flex-col gap-16">
          {/* Landscapes */}
          <div className="bg-white shadow-lg overflow-hidden border" style={{ borderColor: theme.text }}>
            <Link href="/work/paintings/landscapes" className="block relative group">
              <div className="flex flex-col md:flex-row">
                {/* Image side with overlay title - full width on small screens */}
                <div className="w-full md:w-1/2 relative">
                  {landscapeImage ? (
                    <div className="relative h-80 md:h-96">
                      <Image
                        src={landscapeImage.url}
                        alt={landscapeImage.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Title overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h2 
                          className="text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-lg transition-opacity duration-300 z-10"
                          style={{ 
                            fontFamily: "'Courier New', Courier, monospace",
                          }}
                        >
                          Landscapes
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative h-80 md:h-96" 
                      style={{ 
                        backgroundColor: theme.text,
                        opacity: 0.1
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h2 
                          className="text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-lg"
                          style={{ 
                            fontFamily: "'Courier New', Courier, monospace",
                          }}
                        >
                          Landscapes
                        </h2>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Text side - full width on small screens */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <p className="mb-6 text-lg" style={{ color: theme.text, opacity: 0.8 }}>
                    Explore the beauty of natural and urban landscapes captured through Liesbeth's unique perspective. Her landscapes reveal the delicate interplay between human presence and natural environments.
                  </p>
                  <div className="flex justify-end">
                    <span 
                      className="inline-block border px-4 py-2 group-hover:bg-gray-100 transition-colors duration-300"
                      style={{ borderColor: theme.text, color: theme.text }}
                    >
                      View Collection →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Portraits */}
          <div className="bg-white shadow-lg overflow-hidden border" style={{ borderColor: theme.text }}>
            <Link href="/work/paintings/portraits" className="block relative group">
              <div className="flex flex-col md:flex-row-reverse"> {/* Reverse flex for second item */}
                {/* Image side with overlay title - full width on small screens */}
                <div className="w-full md:w-1/2 relative">
                  {portraitImage ? (
                    <div className="relative h-80 md:h-96">
                      <Image
                        src={portraitImage.url}
                        alt={portraitImage.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                      
                      {/* Title overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h2 
                          className="text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-lg transition-opacity duration-300 z-10"
                          style={{ 
                            fontFamily: "'Courier New', Courier, monospace",
                          }}
                        >
                          Portraits
                        </h2>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative h-80 md:h-96" 
                      style={{ 
                        backgroundColor: theme.text,
                        opacity: 0.1
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h2 
                          className="text-3xl md:text-4xl font-light tracking-wide text-white drop-shadow-lg"
                          style={{ 
                            fontFamily: "'Courier New', Courier, monospace",
                          }}
                        >
                          Portraits
                        </h2>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Text side - full width on small screens */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                  <p className="mb-6 text-lg" style={{ color: theme.text, opacity: 0.8 }}>
                    Discover Liesbeth's intimate portrait work, where each painting reveals something of the interior life of her subjects. These portraits create a dialogue between subject and viewer, bridging personal experiences.
                  </p>
                  <div className="flex justify-end">
                    <span 
                      className="inline-block border px-4 py-2 group-hover:bg-gray-100 transition-colors duration-300"
                      style={{ borderColor: theme.text, color: theme.text }}
                    >
                      View Collection →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 