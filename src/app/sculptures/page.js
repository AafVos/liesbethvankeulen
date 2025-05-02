import { createClient } from 'contentful';
import Slideshow from '../components/Slideshow';
import Header from '../components/Header';
import NewsletterSubscription from '../components/NewsletterSubscription';
import Link from 'next/link';
import { getThemeColors } from '../styles/theme';

// Configure Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '1z6huih0p4zo',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'Txn-WQTpRlMJOgPkZu-ifKIM1x52cW95lwJ3-I6DKWY',
});

// Helper function to extract text from rich text field
function extractTextFromRichText(richTextField) {
  if (!richTextField || !richTextField.content) return '';
  
  let extractedText = '';
  
  // Process each content block
  richTextField.content.forEach(block => {
    if (block.nodeType === 'paragraph' && block.content) {
      // Process each text node in the paragraph
      block.content.forEach(textNode => {
        if (textNode.nodeType === 'text') {
          extractedText += textNode.value;
        }
      });
    }
  });
  
  return extractedText;
}

// Use async/await for data fetching
async function getContentfulEntry() {
  try {
    const entryId = process.env.CONTENTFUL_ENTRY_ID || 'VK4FUyRfriPg9Aa2UP2Rc';
    console.log('Fetching Contentful entry with ID:', entryId);
    console.log('Using Contentful space:', process.env.CONTENTFUL_SPACE_ID || '1z6huih0p4zo');
    
    const entry = await client.getEntry(entryId);
    return entry;
  } catch (error) {
    console.error('Error fetching Contentful data:', error);
    return null;
  }
}

// Function to get the specific sculpture video asset
async function getSculptureVideo() {
  try {
    // Fetch the specific asset with ID 53FQoUiUIGTOLTAsRLW6RH
    const assetId = '53FQoUiUIGTOLTAsRLW6RH';
    console.log(`Fetching specific sculpture video asset with ID: ${assetId}`);
    
    const asset = await client.getAsset(assetId);
    
    if (!asset || !asset.fields || !asset.fields.file) {
      console.error('Asset not found or incomplete');
      return null;
    }
    
    // Return the asset in the expected format for the Slideshow component
    return [{
      id: asset.sys.id,
      url: asset.fields.file.url,
      title: asset.fields.title || '',
      description: asset.fields.description || '',
      contentType: asset.fields.file.contentType
    }];
  } catch (error) {
    console.error(`Error fetching sculpture video with ID 53FQoUiUIGTOLTAsRLW6RH:`, error);
    return [];
  }
}

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function Sculptures() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="Sculptures" 
      />
      
      <div className="h-[calc(100vh-12rem)] px-8 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {/* Landscapes */}
          <Link href="/sculptures/landscapes" className="w-full h-full relative group">
            <div 
              className="h-full w-full" 
              style={{ 
                backgroundColor: theme.text,
                opacity: 0.1
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide transition-opacity duration-300 group-hover:opacity-80"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                Landscapes
              </h2>
            </div>
          </Link>
          
          {/* Birds */}
          <Link href="/sculptures/birds" className="w-full h-full relative group">
            <div 
              className="h-full w-full" 
              style={{ 
                backgroundColor: theme.text,
                opacity: 0.1
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide transition-opacity duration-300 group-hover:opacity-80"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                Birds
              </h2>
            </div>
          </Link>
          
          {/* Motherhood */}
          <Link href="/sculptures/motherhood" className="w-full h-full relative group">
            <div 
              className="h-full w-full" 
              style={{ 
                backgroundColor: theme.text,
                opacity: 0.1
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide transition-opacity duration-300 group-hover:opacity-80"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                Motherhood
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 