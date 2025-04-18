import { createClient } from 'contentful';

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

// Function to get the background image from Contentful
async function getContentfulBackgroundImage() {
  try {
    // Fetch the image asset directly
    const imageAsset = await client.getAsset('27Q1BBeeOwCqL3NdaNaNT');
    return imageAsset?.fields?.file?.url || null;
  } catch (error) {
    console.error('Error fetching background image from Contentful:', error);
    return null;
  }
}

export default async function Home() {
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  
  // Fetch background image from Contentful
  const backgroundImageUrl = await getContentfulBackgroundImage();
  
  // Extract the title text from the rich text field
  const titleText = entry?.fields?.title1 ? extractTextFromRichText(entry.fields.title1) : 'Liesbeth van Keulen';
  
  // Create background style with the Contentful image
  const backgroundStyle = {
    backgroundImage: backgroundImageUrl ? `url(https:${backgroundImageUrl})` : "url('/boot.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full" style={backgroundStyle}>
      {/* Header */}
      <header className="p-6 w-full">
        <div className="text-left">
          <h2 
            className="text-3xl text-white tracking-wide drop-shadow-md" 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 400,
              letterSpacing: '0.05em'
            }}
          >
            {titleText}
          </h2>
        </div>
      </header>
      
      {/* Main content area */}
      <main className="flex-grow flex items-center justify-center">
        {/* Main content can be added here if needed */}
      </main>
    </div>
  );
}
