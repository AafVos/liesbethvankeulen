import { getThemeColors } from '../../styles/theme';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get all sculptures from Contentful
async function getAllSculptures() {
  try {
    // Fetch all entries with content type 'sculptures'
    const response = await getEntries('sculptures');
    
    // Transform the data for our component
    const sculptures = response.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      slug: encodeURIComponent(item.fields.title || item.sys.id),
      isWide: item.metadata?.tags?.some(tag => tag.sys.id === 'wide') || false
    })).filter(sculpture => sculpture.url);
      
    return sculptures;
  } catch (error) {
    console.error('Error fetching sculptures from Contentful:', error);
    return [];
  }
}

export default async function Sculptures() {
  const sculptures = await getAllSculptures();

  // Separate wide sculptures from regular ones
  const wideSculptures = sculptures.filter(sculpture => sculpture.isWide);
  const regularSculptures = sculptures.filter(sculpture => !sculpture.isWide);

  // Create column arrays for a masonry-like layout (only for regular sculptures)
  const column1 = [];
  const column2 = [];
  const column3 = [];
  
  // Distribute regular sculptures across columns
  regularSculptures.forEach((sculpture, index) => {
    if (index % 3 === 0) {
      column1.push(sculpture);
    } else if (index % 3 === 1) {
      column2.push(sculpture);
    } else {
      column3.push(sculpture);
    }
  });

  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-8 py-8">
        <div className="relative mb-8 animate-slide-in-left">
          <Link href="/work" className="text-4xl md:text-6xl hover:opacity-80 transition-opacity absolute left-0 top-1/2 -translate-y-1/2" style={{ color: theme.text }}>
            ←
          </Link>
          <h1 
            className="text-3xl md:text-4xl text-center transition-all duration-300 hover:opacity-80"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.text
            }}
          >
            Beelden
          </h1>
        </div>
        
        {sculptures.length > 0 ? (
          <div className="flex flex-col gap-16">
            {/* Wide sculptures at the top */}
            {wideSculptures.length > 0 && (
              <div className="w-full animate-slide-in-left">
                {wideSculptures.map(sculpture => (
                  <Link 
                    key={sculpture.id} 
                    href={`/work/sculptures/${sculpture.slug}`}
                    className="group block mb-16 last:mb-0"
                  >
                    <div className="aspect-w-16 aspect-h-7 overflow-hidden">
                      <Image
                        src={`https:${sculpture.url}`}
                        alt={sculpture.title}
                        width={1200}
                        height={525}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        color: theme.text
                      }}
                    >
                      {sculpture.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}

            {/* Regular sculptures in columns */}
            <div className="flex flex-col md:flex-row gap-8 animate-slide-in-right">
              {/* Column 1 */}
              <div className="flex-1 flex flex-col gap-8">
                {column1.map((sculpture, index) => (
                  <Link 
                    key={sculpture.id} 
                    href={`/work/sculptures/${sculpture.slug}`}
                    className="group"
                  >
                    <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                      <Image
                        src={`https:${sculpture.url}`}
                        alt={sculpture.title}
                        width={600}
                        height={750}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        color: theme.text
                      }}
                    >
                      {sculpture.title}
                    </h3>
                  </Link>
                ))}
              </div>
              
              {/* Column 2 */}
              <div className="flex-1 flex flex-col gap-8">
                {column2.map((sculpture, index) => (
                  <Link 
                    key={sculpture.id} 
                    href={`/work/sculptures/${sculpture.slug}`}
                    className={`group ${index > 0 ? 'mt-16' : ''}`}
                  >
                    <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                      <Image
                        src={`https:${sculpture.url}`}
                        alt={sculpture.title}
                        width={600}
                        height={750}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        color: theme.text
                      }}
                    >
                      {sculpture.title}
                    </h3>
                  </Link>
                ))}
              </div>
              
              {/* Column 3 - Only show on large screens */}
              <div className="flex-1 flex flex-col gap-8 hidden lg:flex">
                {column3.map((sculpture, index) => (
                  <Link 
                    key={sculpture.id} 
                    href={`/work/sculptures/${sculpture.slug}`}
                    className={`group ${index > 0 ? 'mt-24' : ''}`}
                  >
                    <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                      <Image
                        src={`https:${sculpture.url}`}
                        alt={sculpture.title}
                        width={600}
                        height={750}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="mt-2 text-lg font-light text-center transition-all duration-300 group-hover:opacity-80"
                      style={{ 
                        fontFamily: "'Courier New', Courier, monospace",
                        color: theme.text
                      }}
                    >
                      {sculpture.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: theme.text }}>No sculptures found.</p>
          </div>
        )}
      </div>
    </div>
  );
}