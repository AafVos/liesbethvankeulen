import Header from '../../../../components/Header';
import { getThemeColors } from '../../../../styles/theme';
import { getEntries } from '@/lib/contentful';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get a specific painting by title (slug)
async function getPaintingByTitle(title) {
  try {
    // Fetch painting with the matching title
    const response = await getEntries('paintings', {
      'fields.title': title,
      'metadata.tags.sys.id[in]': 'landscapes'
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Get the painting data with all fields
    const painting = response.items[0];
    return painting;
  } catch (error) {
    console.error('Error fetching painting from Contentful:', error);
    return null;
  }
}

export default async function LandscapePainting({ params }) {
  const { slug } = params;
  const decodedTitle = decodeURIComponent(slug);
  
  // Get the painting data
  const painting = await getPaintingByTitle(decodedTitle);
  
  // If no painting found, return 404
  if (!painting) {
    notFound();
  }
  
  // Access painting fields
  const { fields } = painting;
  
  // Get image URL
  const imageUrl = fields.image?.fields?.file?.url || '';
  
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
      
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
        <Link href="/work/paintings/landscapes" className="text-xl mb-8 inline-block hover:opacity-80 transition-opacity" style={{ color: theme.text }}>
          ←
        </Link>
        
        <div className="bg-white overflow-hidden border mt-6" style={{ borderColor: theme.text }}>
          <div className="md:flex flex-col md:flex-row">
            {/* Image section - larger on desktop */}
            <div className="md:w-2/3 relative">
              {imageUrl ? (
                <div className="relative h-[50vh] md:h-[70vh]">
                  <Image
                    src={`https:${imageUrl}`}
                    alt={fields.title || 'Landscape painting'}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div 
                  className="h-[50vh] md:h-[70vh]" 
                  style={{ backgroundColor: theme.text, opacity: 0.1 }}
                />
              )}
            </div>
            
            {/* Details section - minimal information */}
            <div className="md:w-1/3 p-8 flex flex-col">
              <h1 
                className="text-2xl md:text-3xl font-light mb-8"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                {fields.title || 'Untitled'}
              </h1>
              
              <div className="space-y-6 mb-auto">
                {fields.year && (
                  <div>
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Year</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.year === 'number' ? fields.year : fields.year}
                    </p>
                  </div>
                )}
                
                {fields.price !== undefined && (
                  <div>
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Price</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.price === 'number' ? `€${fields.price}` : fields.price}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-12">
                <Link 
                  href="mailto:liesbethvankeulen@gmail.com?subject=Inquiry about painting: {{fields.title}}" 
                  className="inline-block border px-6 py-3 text-center hover:bg-gray-50 transition-colors"
                  style={{ borderColor: theme.text, color: theme.text }}
                >
                  Inquire about this painting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 