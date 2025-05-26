import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import { getEntries, getClient } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Image from 'next/image';

// Choose a light theme for the lessons page
const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get lessons content from Contentful
async function getLessonsContent() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'lessons'
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
    console.error('Error fetching lessons content from Contentful:', error);
    return null;
  }
}

// Function to get workshop info from Contentful
async function getWorkshopInfo() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'workshop_info'
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
    console.error('Error fetching workshop info from Contentful:', error);
    return null;
  }
}

// Function to get lessons image from Contentful
async function getLessonsImage() {
  try {
    const client = getClient();
    const assets = await client.getAssets({
      'fields.title': 'lessons'
    });
    
    if (!assets.items || assets.items.length === 0) return null;

    const asset = assets.items[0];
    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching lessons image from Contentful:', error);
    return null;
  }
}

// Function to get workshop image from Contentful
async function getWorkshopImage() {
  try {
    const client = getClient();
    const assets = await client.getAssets({
      'fields.title': 'workshop'
    });
    
    if (!assets.items || assets.items.length === 0) return null;

    const asset = assets.items[0];
    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching workshop image from Contentful:', error);
    return null;
  }
}

// Lessons page navigation items
const lessonsItems = [
  {
    label: 'Lessen',
    href: '/lessons'
  }
];

export default async function LessonsPage() {
  const lessonsContent = await getLessonsContent();
  const workshopInfo = await getWorkshopInfo();
  const lessonsImage = await getLessonsImage();
  const workshopImage = await getWorkshopImage();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="Lessen"
        currentPage="lessons"
        workItems={lessonsItems}
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
            Lessen
          </h1>
        </div>
        
        {/* Section blocks */}
        <div className="space-y-16">
          {/* Lessons Block */}
          <section className="bg-white shadow-sm border" style={{ borderColor: theme.accent }}>
            <div className="flex flex-col">
              {/* Image - Full width at top */}
              {lessonsImage && (
                <div className="w-full">
                  <div className="aspect-[21/8] relative overflow-hidden">
                    <Image
                      src={`https:${lessonsImage.url}`}
                      alt="Lessen"
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                </div>
              )}
              {/* Text - Full width below image */}
              <div className="p-6 space-y-4 text-sm w-full" style={{ color: theme.text }}>
                <h2 className="text-xl mb-4" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.heading,
                  fontWeight: 400
                }}>
                  Schilderlessen
                </h2>
                {lessonsContent ? (
                  <div 
                    className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0" 
                    dangerouslySetInnerHTML={{ __html: lessonsContent }} 
                  />
                ) : (
                  <div className="space-y-4">
                    <p>Ontdek de wereld van het schilderen in mijn atelier in Amsterdam.</p>
                    <p>Ik geef persoonlijke schilderlessen voor beginners en gevorderden. Of je nu je eerste penseel oppakt of je techniek wilt verfijnen, samen ontdekken we jouw artistieke potentieel.</p>
                    <p>De lessen zijn afgestemd op jouw niveau en interesses. We werken met verschillende technieken en materialen, van olieverf tot acryl, van landschappen tot portretten.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
          
          {/* Workshop Block */}
          <section className="bg-white shadow-sm border" style={{ borderColor: theme.accent }}>
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              {workshopImage && (
                <div className="lg:w-1/2 lg:order-2">
                  <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                    <Image
                      src={`https:${workshopImage.url}`}
                      alt="Workshop"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
              {/* Text */}
              <div className={`p-6 space-y-4 text-sm ${workshopImage ? 'lg:w-1/2' : 'w-full'} lg:order-1`} style={{ color: theme.text }}>
                <h2 className="text-xl mb-4" style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.heading,
                  fontWeight: 400
                }}>
                  Workshops
                </h2>
                {workshopInfo ? (
                  <div 
                    className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0" 
                    dangerouslySetInnerHTML={{ __html: workshopInfo }} 
                  />
                ) : (
                  <div className="space-y-4">
                    <p>Naast individuele lessen organiseer ik ook groepsworkshops voor verschillende niveaus.</p>
                    <p>Deze workshops zijn perfect voor wie samen met anderen wil leren en inspiratie wil opdoen. We werken aan thematische projecten en delen kennis en ervaringen.</p>
                    <p>Workshops worden regelmatig georganiseerd. Neem contact op voor meer informatie over data en beschikbaarheid.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 