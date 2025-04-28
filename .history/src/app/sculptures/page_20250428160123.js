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
      <Header title="Liesbeth van Keulen" subtitle="In search of unexpected beauty" themeName={themeName} showNavigation={true} />
      <NewsletterSubscription />
      {/* Add your content here */}
    </div>
  );
} 