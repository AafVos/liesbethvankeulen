import Header from '../components/Header';
import NewsletterSubscription from '../components/NewsletterSubscription';
import Slideshow from '../components/Slideshow';
import { getThemeColors } from '../styles/theme';
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

const themeName = 'light';
const theme = getThemeColors(themeName);

export default async function Home() {
  const slideshowPaintings = await getSlideshowPaintings();

  return (
    <>
      {/* Slideshow as background */}
      <div className="fixed inset-0 w-full h-full">
        <Slideshow images={slideshowPaintings} />
      </div>

      {/* Content */}
      <div className="relative">
        <Header 
          title="Liesbeth van Keulen" 
          subtitle="In search of unexpected beauty" 
          themeName={themeName} 
          showNavigation={false}
          textColor="#ffffff"
        />
        <div className="mb-16">
          <NewsletterSubscription />
        </div>
      </div>
    </>
  );
} 