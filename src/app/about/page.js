import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import { getEntries, getClient } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// Choose a light theme for the about page
const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get biography text from Contentful
async function getBiography() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'biography'
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
    console.error('Error fetching biography from Contentful:', error);
    return null;
  }
}

// Function to get headshot image from Contentful
async function getHeadshot() {
  try {
    const client = getClient();
    const asset = await client.getAsset('Qfl2fMXCHRBw3Zkw4VUhv');
    
    if (!asset) return null;

    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching headshot from Contentful:', error);
    return null;
  }
}

export default async function AboutPage() {
  const biography = await getBiography();
  const headshot = await getHeadshot();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        themeName={themeName} 
        showNavigation={true}
        PageTitle="About"
        currentPage="about"
        items={[]}
      />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-2xl hover:opacity-80 transition-opacity" style={{ color: theme.link }}>
            ←
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl mb-8" style={{ 
          fontFamily: "'Courier New', Courier, monospace",
          color: theme.heading,
          fontWeight: 400
        }}>
          About Me
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Artist photo */}
          <div className="md:w-1/3 relative">
            <div className="aspect-square relative overflow-hidden">
              {headshot ? (
                <Image
                  src={`https:${headshot.url}`}
                  alt="Liesbeth van Keulen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Artist Photo</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick intro */}
          <div className="md:w-2/3" style={{ color: theme.text }}>
            <h2 className="text-xl mb-4" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Liesbeth van Keulen
            </h2>
            
            <div className="space-y-4 text-sm">
              {biography ? (
                <div 
                  className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0" 
                  dangerouslySetInnerHTML={{ __html: biography }} 
                />
              ) : (
                <p>Biography not available</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Section blocks */}
        <div className="space-y-16">
          {/* Statement Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Statement
            </h2>
            
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              {/* Content will be added later */}
            </div>
          </section>
          
          {/* Education Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Education
            </h2>
            
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              {/* Content will be added later */}
            </div>
          </section>
          
          {/* Exhibitions Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Exhibitions
            </h2>
            
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              {/* Content will be added later */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 