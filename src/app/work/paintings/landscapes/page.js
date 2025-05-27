import { getThemeColors } from '../../../styles/theme';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get landscape paintings from Contentful
async function getLandscapePaintings() {
  try {
    // Fetch paintings with the 'landscapes' tag
    const response = await getEntries('paintings', {
      'metadata.tags.sys.id[in]': 'landscapes'
    });
    
    // Transform the data for our component
    const paintings = response.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      slug: encodeURIComponent(item.fields.title || item.sys.id),
      isWide: item.metadata?.tags?.some(tag => tag.sys.id === 'wide') || false
    })).filter(painting => painting.url);
      
    return paintings;
  } catch (error) {
    console.error('Error fetching landscape paintings from Contentful:', error);
    return [];
  }
}

export default async function Landscapes() {
  const paintings = await getLandscapePaintings();

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

  // For mobile/tablet, redistribute column3 items into column1 and column2
  const mobileColumn1 = [...column1];
  const mobileColumn2 = [...column2];
  
  // Add column3 items alternately to column1 and column2 for mobile
  column3.forEach((painting, index) => {
    if (index % 2 === 0) {
      mobileColumn1.push(painting);
    } else {
      mobileColumn2.push(painting);
    }
  });

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-8 py-8">
        <div className="relative mb-8 animate-slide-in-left">
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
            Landschappen
          </h1>
        </div>
        
        {paintings.length > 0 ? (
          <div className="flex flex-col gap-16">
            {/* Wide paintings at the top */}
            {widePaintings.length > 0 && (
              <div className="w-full animate-slide-in-left">
                {widePaintings.map((painting, index) => (
                  <Link 
                    key={painting.id} 
                    href={`/work/paintings/landscapes/${painting.slug}`} 
                    className="group block mb-16 last:mb-0"
                  >
                    <div className="aspect-w-16 aspect-h-7 overflow-hidden">
                      <Image
                        src={`https:${painting.url}`}
                        alt={painting.title}
                        width={1200}
                        height={525}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        color: theme.text
                      }}
                    >
                      {painting.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}

            {/* Regular paintings in columns */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-8 animate-slide-in-left">
                {/* Show original column1 on desktop, mobileColumn1 on mobile/tablet */}
                <div className="lg:hidden">
                  {mobileColumn1.map((painting, index) => (
                    <Link 
                      key={painting.id} 
                      href={`/work/paintings/landscapes/${painting.slug}`} 
                      className="group mb-8"
                    >
                      <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                        <Image
                          src={`https:${painting.url}`}
                          alt={painting.title}
                          width={600}
                          height={450}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 
                        className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    </Link>
                  ))}
                </div>
                <div className="hidden lg:block">
                  {column1.map((painting, index) => (
                    <Link 
                      key={painting.id} 
                      href={`/work/paintings/landscapes/${painting.slug}`} 
                      className="group mb-8"
                    >
                      <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                        <Image
                          src={`https:${painting.url}`}
                          alt={painting.title}
                          width={600}
                          height={450}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 
                        className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-8 animate-slide-in-right">
                {/* Show original column2 on desktop, mobileColumn2 on mobile/tablet */}
                <div className="lg:hidden">
                  {mobileColumn2.map((painting, index) => (
                    <Link 
                      key={painting.id} 
                      href={`/work/paintings/landscapes/${painting.slug}`} 
                      className={`group mb-8 ${index > 0 ? 'mt-16' : ''}`}
                    >
                      <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                        <Image
                          src={`https:${painting.url}`}
                          alt={painting.title}
                          width={600}
                          height={450}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 
                        className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    </Link>
                  ))}
                </div>
                <div className="hidden lg:block">
                  {column2.map((painting, index) => (
                    <Link 
                      key={painting.id} 
                      href={`/work/paintings/landscapes/${painting.slug}`} 
                      className={`group mb-8 ${index > 0 ? 'mt-16' : ''}`}
                    >
                      <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                        <Image
                          src={`https:${painting.url}`}
                          alt={painting.title}
                          width={600}
                          height={450}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <h3 
                        className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                        style={{ 
                          fontFamily: "'Courier New', Courier, monospace",
                          color: theme.text
                        }}
                      >
                        {painting.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Column 3 - Only show on large screens */}
              <div className="flex-1 flex flex-col gap-8 hidden lg:flex animate-slide-in-right">
                {column3.map((painting, index) => (
                  <Link 
                    key={painting.id} 
                    href={`/work/paintings/landscapes/${painting.slug}`} 
                    className={`group mb-8 ${index > 0 ? 'mt-24' : ''}`}
                  >
                    <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                      <Image
                        src={`https:${painting.url}`}
                        alt={painting.title}
                        width={600}
                        height={450}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        color: theme.text
                      }}
                    >
                      {painting.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: theme.text }}>No landscape paintings found.</p>
          </div>
        )}
      </div>
    </div>
  );
} 