import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Function to get news items from Contentful
async function getNewsItems() {
  try {
    // Fetch news with appropriate sorting
    const response = await getEntries('news', {
      order: '-fields.date', // Sort by date descending (newest first)
      limit: 10
    });
    
    // Check if response and items exist
    if (!response || !response.items || !Array.isArray(response.items)) {
      console.warn('Invalid response from Contentful for news items');
      return [];
    }
    
    // Transform the data for our component
    const newsItems = response.items
      .filter(item => item && item.fields && item.fields.title) // Filter out invalid items
      .map(item => ({
        id: item.sys?.id || '',
        title: item.fields?.title || '',
        date: item.fields?.date || '',
        image: item.fields?.image?.fields?.file?.url || '',
        excerpt: item.fields?.excerpt || ''
      }))
      .filter(item => item.id && item.title); // Only include items with id and title
      
    return newsItems;
  } catch (error) {
    console.error('Error fetching news from Contentful:', error);
    return [];
  }
}

// News page navigation items
const newsNavItems = [
  {
    label: 'Nieuws',
    href: '/news'
  }
];

export default async function News() {
  let newsItems = [];
  
  try {
    newsItems = await getNewsItems();
  } catch (error) {
    console.error('Error loading news items:', error);
    newsItems = [];
  }
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="Nieuws"
        currentPage="news"
        workItems={newsNavItems}
      />
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(newsItems) && newsItems.length > 0 ? (
            newsItems.map((item, index) => {
              // Additional safety check for each item
              if (!item || !item.id || !item.title) {
                return null;
              }
              
              return (
                <Link 
                  key={item.id}
                  href={`/news/${item.id}`}
                  className={`flex flex-col ${index % 3 === 0 ? 'h-96' : 'h-80'} border hover:shadow-md transition-shadow duration-300`} 
                  style={{ borderColor: theme.text }}
                >
                  <div className={`w-full ${index % 3 === 0 ? 'h-72' : 'h-64'} overflow-hidden relative`}>
                    {item.image ? (
                      <Image
                        src={`https:${item.image}`}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                <div 
                        className="w-full h-full bg-gray-200" 
                  style={{ 
                    backgroundColor: theme.text,
                    opacity: 0.1
                  }}
                />
                    )}
                  </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                      {formatDate(item.date)}
                  </div>
                  <h2 
                    className="text-xl font-light tracking-wide text-center"
                    style={{ 
                      fontFamily: "'Courier New', Courier, monospace",
                      color: theme.text
                    }}
                  >
                      {item.title}
                  </h2>
                    {item.excerpt && (
                      <p className="mt-2 text-sm" style={{ color: theme.text }}>
                        {item.excerpt.length > 100 
                          ? `${item.excerpt.substring(0, 100)}...` 
                          : item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              );
            }).filter(Boolean) // Remove any null items
          ) : (
            <div className="col-span-full text-center py-12">
              <p style={{ color: theme.text }}>No news items found. Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 