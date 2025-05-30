import Header from '../components/Header';
import NewsletterSubscription from '../components/NewsletterSubscription';
import Slideshow from '../components/Slideshow';
import { getThemeColors } from '../styles/theme';
import { getEntries } from '@/lib/contentful';

// Define the work items structure
const workItems = [
  { 
    label: 'Home', 
    href: '/home',
  }
];

// Function to get paintings and sculptures with 'slideshow' tag from Contentful
async function getSlideshowItems() {
  try {
    // Fetch both paintings and sculptures with the 'slideshow' tag
    const [paintingsResponse, sculpturesResponse] = await Promise.all([
      getEntries('paintings', {
        'metadata.tags.sys.id[in]': 'slideshow'
      }),
      getEntries('sculptures', {
        'metadata.tags.sys.id[in]': 'slideshow'
      })
    ]);
    
    console.log('Raw paintings response:', paintingsResponse.items.length, 'items');
    console.log('Raw sculptures response:', sculpturesResponse.items.length, 'items');
    
    // Transform paintings data
    const paintings = paintingsResponse.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      description: item.fields.description || '',
      contentType: item.fields.image?.fields?.file?.contentType || 'image/jpeg',
      type: 'painting'
    })).filter(item => item.url);

    // Transform sculptures data
    const sculptures = sculpturesResponse.items.map(item => ({
      id: item.sys.id,
      url: item.fields.image?.fields?.file?.url || '',
      title: item.fields.title || '',
      description: item.fields.description || '',
      contentType: item.fields.image?.fields?.file?.contentType || 'image/jpeg',
      type: 'sculpture'
    })).filter(item => item.url);
    
    console.log('Processed paintings:', paintings.length, 'items');
    console.log('Paintings details:', paintings.map(p => ({ id: p.id, title: p.title, type: p.type })));
    
    console.log('Processed sculptures:', sculptures.length, 'items');
    console.log('Sculptures details:', sculptures.map(s => ({ id: s.id, title: s.title, type: s.type })));
    
    // Combine the items for variety
    const allItems = [...paintings, ...sculptures];
    
    console.log('Combined items (no shuffle):', allItems.length, 'total items');
    
    console.log('Final slideshow items:', allItems.map(item => ({ 
      id: item.id, 
      title: item.title, 
      type: item.type,
      hasImage: !!item.url 
    })));
      
    return allItems;
  } catch (error) {
    console.error('Error fetching slideshow items from Contentful:', error);
    return [];
  }
}

const themeName = 'dark';
const theme = getThemeColors(themeName);

export default async function Home() {
  const slideshowItems = await getSlideshowItems();

  return (
    <>
      {/* Slideshow as background */}
      <div className="fixed inset-0 w-full h-full">
        <Slideshow images={slideshowItems} />
      </div>

      {/* Content */}
      <div className="relative">
        <Header 
          title="Liesbeth van Keulen" 
          subtitle="In search of unexpected beauty" 
          themeName={themeName} 
          workItems={workItems}
        />
        <div className="mb-16">
          <NewsletterSubscription />
        </div>
      </div>
    </>
  );
} 