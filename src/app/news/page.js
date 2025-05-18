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
    
    // Transform the data for our component
    const newsItems = response.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title || '',
      date: item.fields.date || '',
      image: item.fields.image?.fields?.file?.url || '',
      excerpt: item.fields.excerpt || ''
    })).filter(item => item.title); // Only include items with titles
      
    return newsItems;
  } catch (error) {
    console.error('Error fetching news from Contentful:', error);
    return [];
  }
}

export default async function News() {
  const newsItems = await getNewsItems();
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header title="Liesbeth van Keulen" subtitle="In search of unexpected beauty" themeName={themeName} showNavigation={true} PageTitle="News" />
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsItems.length > 0 ? (
            newsItems.map((item, index) => (
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
            ))
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