import { createClient } from 'contentful';

// Configure Contentful client
const client = createClient({
  space: '1z6huih0p4zo',
  accessToken: 'Txn-WQTpRlMJOgPkZu-ifKIM1x52cW95lwJ3-I6DKWY',
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
    const entry = await client.getEntry('VK4FUyRfriPg9Aa2UP2Rc');
    return entry;
  } catch (error) {
    console.error('Error fetching Contentful data:', error);
    return null;
  }
}

export default async function Home() {
  // Fetch data from Contentful
  const entry = await getContentfulEntry();
  
  // Extract the title text from the rich text field
  const titleText = entry?.fields?.title1 ? extractTextFromRichText(entry.fields.title1) : 'Liesbeth van Keulen';
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <h1 className="text-[10rem] font-extrabold text-white drop-shadow-2xl tracking-tight text-center">
        {titleText}
      </h1>
    </div>
  );
}
