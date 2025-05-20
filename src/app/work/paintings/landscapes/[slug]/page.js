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

// Helper function to handle rich text or string fields
function getTextFromField(field) {
  if (!field) return '';
  
  // Check if it's a rich text field
  if (typeof field === 'object' && field.nodeType === 'document') {
    // Basic extraction of text from rich text
    try {
      return field.content
        .map(item => {
          if (item.nodeType === 'paragraph') {
            return item.content
              .map(node => node.value || '')
              .join('');
          }
          return '';
        })
        .join('\n')
        .trim();
    } catch (e) {
      console.error('Error parsing rich text:', e);
      return '';
    }
  }
  
  // Return as is if it's a simple string or number
  return field;
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
  
  // Check if painting has the "wide" tag
  const isWide = painting.metadata?.tags?.some(tag => tag.sys.id === 'wide') || false;
  
  // Enhanced debug logging - show full painting data
  console.log('Painting slug:', decodedTitle);
  console.log('Painting fields:', JSON.stringify({
    title: fields.title,
    medium: fields.medium,
    dimensions: fields.dimensions,
    price: fields.price,
    priceType: typeof fields.price
  }, null, 2));
  
  // For ENCI-groeve specifically, log even more details
  if (fields.title === 'ENCI-groeve in de winter') {
    console.log('FOUND ENCI PAINTING, complete data:', JSON.stringify(fields, null, 2));
  }
  
  // Process potentially rich text fields
  const mediumText = getTextFromField(fields.medium);
  const dimensionsText = getTextFromField(fields.dimensions);
  
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
        <Link href="/work/paintings/landscapes" className="text-2xl md:text-3xl mb-8 inline-block hover:opacity-80 transition-opacity" style={{ color: theme.text }}>
          ←
        </Link>
        
        <div className="bg-white overflow-hidden border mt-6" style={{ borderColor: theme.text }}>
          <div className={`${isWide ? '' : 'md:flex flex-col md:flex-row'}`}>
            {/* Image section - larger on desktop, full width if it has wide tag */}
            <div className={isWide ? "w-full" : "md:w-2/3 relative"}>
              {imageUrl ? (
                <div className={`relative ${isWide ? 'h-auto w-full' : 'h-[50vh] md:h-[70vh]'}`}>
                  <Image
                    src={`https:${imageUrl}`}
                    alt={fields.title || 'Landscape painting'}
                    fill={!isWide}
                    width={isWide ? 1600 : undefined}
                    height={isWide ? 900 : undefined}
                    sizes={isWide ? "100vw" : "(max-width: 768px) 100vw, 66vw"}
                    className={`${isWide ? 'object-contain w-full h-auto' : 'object-contain'}`}
                    priority
                  />
                </div>
              ) : (
                <div 
                  className={`${isWide ? 'h-[70vh]' : 'h-[50vh] md:h-[70vh]'}`}
                  style={{ backgroundColor: theme.text, opacity: 0.1 }}
                />
              )}
            </div>
            
            {/* Details section - minimal information */}
            {isWide ? (
              <div className="p-8 flex flex-col">
                <h1 
                  className="text-2xl md:text-3xl font-light mb-8"
                  style={{ 
                    fontFamily: theme.fontFamily,
                    color: theme.text
                  }}
                >
                  {fields.title || 'Untitled'}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-auto">
                  {fields.year && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Year</h3>
                      <p className="text-lg" style={{ color: theme.text }}>
                        {typeof fields.year === 'number' ? fields.year : fields.year}
                      </p>
                    </div>
                  )}
                  
                  {dimensionsText && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Dimensions</h3>
                      <p className="text-lg" style={{ color: theme.text }}>
                        {dimensionsText}
                      </p>
                    </div>
                  )}
                  
                  {mediumText && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Medium</h3>
                      <p className="text-lg" style={{ color: theme.text }}>
                        {mediumText}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Price</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {fields.price === undefined || fields.price === 0 ? "On inquiry" : 
                       typeof fields.price === 'number' ? `€${fields.price}` : fields.price}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    href={`mailto:liesbethvankeulen@gmail.com?subject=Inquiry about painting: ${fields.title || 'Untitled'}`}
                    className="inline-block border px-6 py-3 text-center hover:bg-gray-50 transition-colors"
                    style={{ borderColor: theme.text, color: theme.text }}
                  >
                    Inquire about this painting
                  </Link>
                </div>
              </div>
            ) : (
              <div className="md:w-1/3 p-8 flex flex-col">
                <h1 
                  className="text-2xl md:text-3xl font-light mb-8"
                  style={{ 
                    fontFamily: theme.fontFamily,
                    color: theme.text
                  }}
                >
                  {fields.title || 'Untitled'}
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-auto">
                  {fields.year && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Year</h3>
                      <p className="text-lg" style={{ color: theme.text }}>
                        {typeof fields.year === 'number' ? fields.year : fields.year}
                      </p>
                    </div>
                  )}
                  
                  {dimensionsText && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Dimensions</h3>
                      <p className="text-lg" style={{ color: theme.text }}>
                        {dimensionsText}
                      </p>
                    </div>
                  )}
                  
                  {mediumText && (
                    <div>
                      <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Medium</h3>
                      <p className="text-lg" style={{ color: theme.text }}>
                        {mediumText}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Price</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {fields.price === undefined || fields.price === 0 ? "On inquiry" : 
                       typeof fields.price === 'number' ? `€${fields.price}` : fields.price}
                    </p>
                  </div>
                </div>
                
                <div className="mt-12">
                  <Link 
                    href={`mailto:liesbethvankeulen@gmail.com?subject=Inquiry about painting: ${fields.title || 'Untitled'}`}
                    className="inline-block border px-6 py-3 text-center hover:bg-gray-50 transition-colors"
                    style={{ borderColor: theme.text, color: theme.text }}
                  >
                    Inquire about this painting
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 