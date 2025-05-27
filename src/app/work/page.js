import { getThemeColors } from '../styles/theme';
import Link from 'next/link';
import Slideshow from '../components/Slideshow';
import { getEntries } from '@/lib/contentful';

// Function to get paintings with 'slideshow' tag from Contentful
async function getSlideshowPaintings() {
  try {
    // Fetch paintings with the 'slideshow' tag
    const response = await getEntries('paintings', {
      'metadata.tags.sys.id[in]': 'slideshow'
    });
    
    // Transform the data to match what the Slideshow component expects
    const paintings = response.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      description: item.fields.description || '',
      contentType: item.fields.image?.fields?.file?.contentType || 'image/jpeg'
    })).filter(painting => painting.url); // Only include paintings with images
      
    return paintings;
  } catch (error) {
    console.error('Error fetching slideshow paintings from Contentful:', error);
    return [];
  }
}

// Function to get sculptures from Contentful
async function getSculptures() {
  try {
    // Fetch sculptures content type
    const response = await getEntries('sculptures');
    
    // Transform the data to match what the Slideshow component expects
    const sculptures = response.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      description: item.fields.description || '',
      contentType: item.fields.image?.fields?.file?.contentType || 'image/jpeg'
    })).filter(sculpture => sculpture.url); // Only include sculptures with images
      
    return sculptures;
  } catch (error) {
    console.error('Error fetching sculptures from Contentful:', error);
    return [];
  }
}

const themeName = 'dark';
const theme = getThemeColors(themeName);

export default async function Work() {
  const slideshowPaintings = await getSlideshowPaintings();
  const sculptures = await getSculptures();

  return (
    <div className="h-[calc(100vh-12rem)] px-8 pt-8 pb-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <Link href="/work/paintings" className="w-full md:w-1/2 h-1/2 md:h-full relative group overflow-hidden animate-slide-in-left">
          {/* Slideshow background */}
          <div className="absolute inset-0 h-full w-full">
            <Slideshow images={slideshowPaintings} />
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 
              className="text-4xl font-light tracking-wide group-hover:opacity-100 transition-all duration-500 drop-shadow-md transform group-hover:scale-105"
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: "white"
              }}
            >
              Schilderijen
            </h2>
          </div>
        </Link>
        <Link href="/work/sculptures" className="w-full md:w-1/2 h-1/2 md:h-full relative group overflow-hidden animate-slide-in-right">
          {/* Slideshow background */}
          <div className="absolute inset-0 h-full w-full">
            <Slideshow images={sculptures} />
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 
              className="text-4xl font-light tracking-wide group-hover:opacity-100 transition-all duration-500 drop-shadow-md transform group-hover:scale-105"
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: "white"
              }}
            >
              Beelden
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
} 