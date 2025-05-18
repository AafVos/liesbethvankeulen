import Header from '../../../components/Header';
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
      slug: encodeURIComponent(item.fields.title || item.sys.id)
    })).filter(painting => painting.url);
      
    return paintings;
  } catch (error) {
    console.error('Error fetching landscape paintings from Contentful:', error);
    return [];
  }
}

export default async function Landscapes() {
  const paintings = await getLandscapePaintings();

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="Landscapes" 
      />
      
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paintings.length > 0 ? (
            paintings.map(painting => (
              <Link 
                key={painting.id} 
                href={`/work/paintings/landscapes/${painting.slug}`} 
                className="group"
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
                  className="mt-2 text-lg font-light text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  {painting.title}
                </h3>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p style={{ color: theme.text }}>No landscape paintings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 