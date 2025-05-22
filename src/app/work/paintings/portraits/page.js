import Header from '../../../components/Header';
import { getThemeColors } from '../../../styles/theme';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get portrait paintings from Contentful
async function getPortraitPaintings() {
  try {
    // Fetch paintings with the 'portraits' tag
    const response = await getEntries('paintings', {
      'metadata.tags.sys.id[in]': 'portraits'
    });
    
    // Transform the data for our component - only include image data
    const paintings = response.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      isWide: item.metadata?.tags?.some(tag => tag.sys.id === 'wide') || false
    })).filter(painting => painting.url);
      
    return paintings;
  } catch (error) {
    console.error('Error fetching portrait paintings from Contentful:', error);
    return [];
  }
}

export default async function Portraits() {
  const paintings = await getPortraitPaintings();

  // Separate wide paintings from regular ones
  const widePaintings = paintings.filter(painting => painting.isWide);
  const regularPaintings = paintings.filter(painting => !painting.isWide);

  // Create column arrays for a masonry-like layout (only for regular paintings)
  const column1 = [];
  const column2 = [];
  const column3 = [];
  
  // Distribute regular paintings across columns
  regularPaintings.forEach((painting, index) => {
    if (index % 3 === 0) {
      column1.push(painting);
    } else if (index % 3 === 1) {
      column2.push(painting);
    } else {
      column3.push(painting);
    }
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={false} 
        PageTitle="Werken" 
        currentPage="work"
      />
      
      <div className="container mx-auto px-8 py-8">
        <div className="relative mb-8">
          <Link href="/work/paintings" className="text-4xl md:text-6xl hover:opacity-80 transition-opacity absolute left-0 top-1/2 -translate-y-1/2" style={{ color: theme.text }}>
            ←
          </Link>
          <h1 
            className="text-3xl md:text-4xl text-center"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.text
            }}
          >
            Portretten
          </h1>
        </div>
        
        {paintings.length > 0 ? (
          <div className="flex flex-col gap-16">
            {/* Wide paintings at the top */}
            {widePaintings.length > 0 && (
              <div className="w-full">
                {widePaintings.map(painting => (
                  <div key={painting.id} className="group block mb-16 last:mb-0">
                    <div className="aspect-w-16 aspect-h-7 overflow-hidden">
                      <Image
                        src={`https:${painting.url}`}
                        alt={painting.title}
                        width={1200}
                        height={525}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {painting.title && (
                      <h3 
                        className="mt-2 text-lg font-light text-center"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Regular paintings in columns */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-8">
                {column1.map((painting, index) => (
                  <div key={painting.id} className="group">
                    <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                      <Image
                        src={`https:${painting.url}`}
                        alt={painting.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {painting.title && (
                      <h3 
                        className="mt-2 text-lg font-light text-center"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-8">
                {column2.map((painting, index) => (
                  <div key={painting.id} className={`group ${index > 0 ? 'mt-16' : ''}`}>
                    <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                      <Image
                        src={`https:${painting.url}`}
                        alt={painting.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {painting.title && (
                      <h3 
                        className="mt-2 text-lg font-light text-center"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Column 3 - Only show on large screens */}
              <div className="flex-1 flex flex-col gap-8 hidden lg:flex">
                {column3.map((painting, index) => (
                  <div key={painting.id} className={`group ${index > 0 ? 'mt-24' : ''}`}>
                    <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                      <Image
                        src={`https:${painting.url}`}
                        alt={painting.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {painting.title && (
                      <h3 
                        className="mt-2 text-lg font-light text-center"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: theme.text }}>No portrait paintings found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 