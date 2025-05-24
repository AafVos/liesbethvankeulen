import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import { getEntries, getClient } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Image from 'next/image';

// Choose a light theme for the atelier page
const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get inspiration text from Contentful
async function getInspiration() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'inspiration'
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Get the rich text content
    const richTextContent = response.items[0].fields.text;
    if (!richTextContent) return null;

    // Convert rich text to HTML
    return documentToHtmlString(richTextContent);
  } catch (error) {
    console.error('Error fetching inspiration from Contentful:', error);
    return null;
  }
}

// Function to get creative process text from Contentful
async function getCreativeProcess() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'creative_process'
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Get the rich text content
    const richTextContent = response.items[0].fields.text;
    if (!richTextContent) return null;

    // Convert rich text to HTML
    return documentToHtmlString(richTextContent);
  } catch (error) {
    console.error('Error fetching creative process from Contentful:', error);
    return null;
  }
}

// Function to get inspiration image from Contentful
async function getInspirationImage() {
  try {
    const client = getClient();
    const assets = await client.getAssets({
      'fields.title': 'inspiration'
    });
    
    if (!assets.items || assets.items.length === 0) return null;

    const asset = assets.items[0];
    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching inspiration image from Contentful:', error);
    return null;
  }
}

// Function to get little liesbeth image from Contentful
async function getLittleLiesbethImage() {
  try {
    const client = getClient();
    const assets = await client.getAssets({
      'fields.title': 'little_liesbeth'
    });
    
    if (!assets.items || assets.items.length === 0) return null;

    const asset = assets.items[0];
    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching little liesbeth image from Contentful:', error);
    return null;
  }
}

// Atelier page navigation items
const atelierItems = [
  {
    label: 'Atelier',
    href: '/atelier'
  }
];

export default async function AtelierPage() {
  const inspiration = await getInspiration();
  const creativeProcess = await getCreativeProcess();
  const inspirationImage = await getInspirationImage();
  const littleLiesbethImage = await getLittleLiesbethImage();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="Atelier"
        currentPage="atelier"
        workItems={atelierItems}
      />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 
            className="text-3xl md:text-4xl text-center"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.text
            }}
          >
            Atelier
          </h1>
        </div>
        
        {/* Section blocks */}
        <div className="space-y-16">
          {/* Creatief Process Block */}
          <section className="bg-white shadow-sm border" style={{ borderColor: theme.accent }}>
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              {littleLiesbethImage && (
                <div className="lg:w-1/2 lg:order-2">
                  <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                    <Image
                      src={`https:${littleLiesbethImage.url}`}
                      alt="Little Liesbeth"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
              {/* Text */}
              <div className={`p-6 space-y-4 text-sm ${littleLiesbethImage ? 'lg:w-1/2' : 'w-full'} lg:order-1`} style={{ color: theme.text }}>
                <h2 className="text-xl mb-4" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.heading,
                  fontWeight: 400
                }}>
                  Creatief proces
                </h2>
                {creativeProcess ? (
                  <div 
                    className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0" 
                    dangerouslySetInnerHTML={{ __html: creativeProcess }} 
                  />
                ) : (
                  <p>Creatief proces content not available</p>
                )}
              </div>
            </div>
          </section>
          
          {/* Inspiratie Block */}
          <section className="bg-white shadow-sm border" style={{ borderColor: theme.accent }}>
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              {inspirationImage && (
                <div className="lg:w-1/3">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={`https:${inspirationImage.url}`}
                      alt="Inspiratie"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
              )}
              {/* Text */}
              <div className={`p-6 space-y-4 text-sm ${inspirationImage ? 'lg:w-2/3' : 'w-full'}`} style={{ color: theme.text }}>
                <h2 className="text-xl mb-4" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.heading,
                  fontWeight: 400
                }}>
                  Inspiratie
                </h2>
                {inspiration ? (
                  <div 
                    className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0" 
                    dangerouslySetInnerHTML={{ __html: inspiration }} 
                  />
                ) : (
                  <p>Inspiratie content not available</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 