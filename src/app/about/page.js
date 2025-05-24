import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import { getEntries, getClient } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// Choose a light theme for the about page
const themeName = 'light';
const theme = getThemeColors(themeName);

// Timeline data
const timeline = [
  {
    "date": "1981–1982",
    "highlight": "Studie aan Accademia di Belle Arti, Perugia (Italië)"
  },
  {
    "date": "1982–1988",
    "highlight": "Opleiding tekenen, schilderen en grafiek aan KABK, Den Haag"
  },
  {
    "date": "Vanaf 1988",
    "highlight": "Werkzaam als professioneel portretschilder in Amsterdam"
  },
  {
    "date": "2007",
    "highlight": "Deelname aan *Sterren op het Doek* met portret van Marco Borsato"
  },
  {
    "date": "2011",
    "highlight": "Oprichting van Portretschool Amsterdam"
  },
  {
    "date": "2016",
    "highlight": "Publicatie van het boek *Portretschilderen in olieverf – de basis*"
  },
  {
    "date": "2022",
    "highlight": "Opening van een tweede atelier in Maastricht"
  },
  {
    "date": "2023–heden",
    "highlight": "Boetseerscholing bij Barbara Kletter en Christien Claassen"
  }
];

// About page navigation items
const aboutItems = [
  {
    label: 'Over mij',
    href: '/about',
    subItems: [
      { 
        label: 'Biografie', 
        href: '/about#biography'
      },
      { 
        label: 'Statement', 
        href: '/about#statement'
      },
      { 
        label: 'Opleiding', 
        href: '/about#education'
      }
    ]
  }
];

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

// Function to get statement text from Contentful
async function getStatement() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'statement'
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
    console.error('Error fetching statement from Contentful:', error);
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
  const statement = await getStatement();
  const headshot = await getHeadshot();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="About"
        currentPage="about"
        workItems={aboutItems}
      />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="relative mb-8">
          <Link href="/" className="text-4xl md:text-6xl hover:opacity-80 transition-opacity absolute left-0 top-1/2 -translate-y-1/2" style={{ color: theme.text }}>
            ←
          </Link>
          <h1 
            className="text-3xl md:text-4xl text-center"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.text
            }}
          >
            Over mij
          </h1>
        </div>
        
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
          <div id="biography" className="md:w-2/3" style={{ color: theme.text }}>
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
          <section id="statement" className="bg-white p-6 shadow-sm border" style={{ borderColor: theme.accent }}>
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              {statement ? (
                <div 
                  className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0" 
                  dangerouslySetInnerHTML={{ __html: statement }} 
                />
              ) : (
                <p>Statement not available</p>
              )}
            </div>
          </section>
          
          {/* Education Block */}
          <section id="education" className="bg-white p-6 shadow-sm border" style={{ borderColor: theme.accent }}>
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:gap-4">
                    <span className="font-medium min-w-[120px] text-base">{item.date}</span>
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: item.highlight.replace(/\*(.*?)\*/g, '<em>$1</em>') 
                      }} 
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
          

        </div>
      </main>
    </div>
  );
} 