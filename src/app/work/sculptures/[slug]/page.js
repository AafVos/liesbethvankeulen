import { getThemeColors } from '../../../styles/theme';
import { getEntries } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get a specific sculpture by title (slug)
async function getSculptureByTitle(title) {
  try {
    // Fetch sculpture with the matching title
    const response = await getEntries('sculptures', {
      'fields.title': title
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Get the sculpture data with all fields
    const sculpture = response.items[0];
    return sculpture;
  } catch (error) {
    console.error('Error fetching sculpture from Contentful:', error);
    return null;
  }
}

// Helper function to safely render field content
function renderFieldContent(field) {
  if (!field) return '';
  
  // If it's a rich text object (has nodeType), convert to HTML
  if (typeof field === 'object' && field.nodeType) {
    return documentToHtmlString(field);
  }
  
  // If it's a simple string or number, return as is
  return field;
}

export default async function SculptureDetail({ params }) {
  const { slug } = params;
  const decodedTitle = decodeURIComponent(slug);
  
  // Get the sculpture data
  const sculpture = await getSculptureByTitle(decodedTitle);
  
  // If no sculpture found, return 404
  if (!sculpture) {
    notFound();
  }
  
  // Access sculpture fields
  const { fields } = sculpture;
  
  // Get image URL
  const imageUrl = fields.image?.fields?.file?.url || '';
  
  return (
    <div className="min-h-screen animate-fade-in" style={{ backgroundColor: theme.background }}>
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
        <div className="relative mb-8 animate-slide-in-left">
          <Link href="/work/sculptures" className="text-4xl md:text-6xl hover:opacity-80 transition-opacity absolute left-0 top-1/2 -translate-y-1/2" style={{ color: theme.text }}>
            ←
          </Link>
          <h1 
            className="text-3xl md:text-4xl text-center"
            style={{ 
              fontFamily: theme.fontFamily,
              color: theme.text
            }}
          >
            {fields.title || 'Zonder titel'}
          </h1>
        </div>
        
        <div className="bg-white overflow-hidden border mt-6 animate-slide-in-right" style={{ borderColor: theme.text }}>
          <div className="md:flex flex-col md:flex-row">
            {/* Image section - larger on desktop */}
            <div className="md:w-2/3 relative">
              {imageUrl ? (
                <div className="relative h-[50vh] md:h-[70vh]">
                  <Image
                    src={`https:${imageUrl}`}
                    alt={fields.title || 'Beeld'}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-contain transition-transform duration-700 hover:scale-105"
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
                className="text-2xl md:text-3xl font-light mb-8 transition-all duration-300"
                style={{ 
                  fontFamily: theme.fontFamily,
                  color: theme.text
                }}
              >
                {fields.title || 'Zonder titel'}
              </h1>
              
              <div className="space-y-6 mb-auto">
                {fields.year && (
                  <div className="transition-all duration-300 hover:opacity-80">
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Jaar</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.year === 'object' && fields.year.nodeType ? (
                        <span dangerouslySetInnerHTML={{ __html: renderFieldContent(fields.year) }} />
                      ) : (
                        typeof fields.year === 'number' ? fields.year : fields.year
                      )}
                    </p>
                  </div>
                )}
                
                {fields.prijs !== undefined && (
                  <div className="transition-all duration-300 hover:opacity-80">
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Prijs</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.prijs === 'object' && fields.prijs.nodeType ? (
                        <span dangerouslySetInnerHTML={{ __html: renderFieldContent(fields.prijs) }} />
                      ) : (
                        fields.prijs === 0 ? 'In opdracht gemaakt' : (typeof fields.prijs === 'number' ? `€${fields.prijs}` : fields.prijs)
                      )}
                    </p>
                  </div>
                )}
                
                {fields.material && (
                  <div className="transition-all duration-300 hover:opacity-80">
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Materiaal</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.material === 'object' && fields.material.nodeType ? (
                        <span dangerouslySetInnerHTML={{ __html: renderFieldContent(fields.material) }} />
                      ) : (
                        fields.material
                      )}
                    </p>
                  </div>
                )}
                
                {fields.dimensions && (
                  <div className="transition-all duration-300 hover:opacity-80">
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Afmetingen</h3>
                    <p className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.dimensions === 'object' && fields.dimensions.nodeType ? (
                        <span dangerouslySetInnerHTML={{ __html: renderFieldContent(fields.dimensions) }} />
                      ) : (
                        fields.dimensions
                      )}
                    </p>
                  </div>
                )}
                
                {fields.description && (
                  <div className="transition-all duration-300 hover:opacity-80">
                    <h3 className="text-sm uppercase tracking-wider mb-1" style={{ color: theme.text, opacity: 0.7 }}>Beschrijving</h3>
                    <div className="text-lg" style={{ color: theme.text }}>
                      {typeof fields.description === 'object' && fields.description.nodeType ? (
                        <div dangerouslySetInnerHTML={{ __html: renderFieldContent(fields.description) }} />
                      ) : (
                        <p>{fields.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-12">
                <Link 
                  href={`mailto:liesbethvankeulen@gmail.com?subject=Interesse in beeld: ${fields.title || 'Zonder titel'}`}
                  className="inline-block border px-6 py-3 text-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                  style={{ borderColor: theme.text, color: theme.text }}
                >
                  Interesse in dit beeld
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 