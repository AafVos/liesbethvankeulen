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

// Extract text from rich text field
function extractTextFromRichText(richTextField) {
  if (!richTextField || !richTextField.content) return '';
  
  let extractedText = '';
  
  // Process each content block
  try {
    richTextField.content.forEach(block => {
      if (block.nodeType === 'paragraph' && block.content) {
        // Process each text node in the paragraph
        block.content.forEach(textNode => {
          if (textNode.nodeType === 'text') {
            extractedText += textNode.value + ' ';
          }
        });
        extractedText += '\n\n';
      }
    });
  } catch (err) {
    console.error('Error extracting text from rich text:', err);
    return '[Complex rich text content]';
  }
  
  return extractedText || '[Empty rich text]';
}

// Format various field types for display
function formatContentfulField(field, fieldName) {
  if (field === undefined || field === null) {
    return 'Not provided';
  }
  
  // Handle different field types
  if (typeof field === 'string') {
    return field;
  } else if (typeof field === 'number') {
    if (fieldName === 'price') {
      return `€${field.toFixed(2)}`;
    }
    return field.toString();
  } else if (typeof field === 'boolean') {
    return field ? 'Yes' : 'No';
  } else if (field instanceof Date) {
    return field.toLocaleDateString();
  } else if (typeof field === 'object') {
    // Handle specific object types
    if (fieldName === 'image' && field.fields && field.fields.file) {
      return 'Image file (displayed above)';
    }
    
    // Handle rich text fields from Contentful
    if (field.nodeType === 'document' && field.content) {
      return extractTextFromRichText(field);
    }
    
    // Safely handle arrays
    if (Array.isArray(field)) {
      return `[Array with ${field.length} items]`;
    }
    
    // Generic object handling
    try {
      const str = JSON.stringify(field, (key, value) => {
        // Handle circular references and complex objects
        if (typeof value === 'object' && value !== null) {
          if (key === 'fields' || key === 'sys') {
            return '[Object]';
          }
        }
        return value;
      }, 2);
      
      if (str.length > 100) {
        return str.substring(0, 100) + '... [truncated]';
      }
      return str;
    } catch (err) {
      console.error('Error stringifying object:', err);
      return '[Complex object]';
    }
  }
  
  return 'Unsupported field type';
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
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="Work" 
        currentPage="work"
      />
      
      <div className="container mx-auto px-4 md:px-8 py-8">
        <Link href="/work/paintings/landscapes" className="text-sm mb-4 inline-block hover:underline" style={{ color: theme.text }}>
          &larr; Back to Landscapes
        </Link>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border mt-4" style={{ borderColor: theme.text }}>
          <div className="md:flex">
            {/* Image section */}
            <div className="md:w-1/2 relative">
              {imageUrl ? (
                <div className="aspect-w-4 aspect-h-3 md:h-full">
                  <Image
                    src={`https:${imageUrl}`}
                    alt={fields.title || 'Landscape painting'}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div 
                  className="aspect-w-4 aspect-h-3 md:h-full bg-gray-200" 
                  style={{ backgroundColor: theme.text, opacity: 0.1 }}
                />
              )}
            </div>
            
            {/* Details section */}
            <div className="md:w-1/2 p-6">
              <h1 
                className="text-2xl md:text-3xl font-light mb-4"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                {fields.title || 'Untitled'}
              </h1>
              
              {fields.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-1" style={{ color: theme.text, opacity: 0.7 }}>Description</h3>
                  <div style={{ color: theme.text }}>
                    {typeof fields.description === 'string' 
                      ? fields.description 
                      : formatContentfulField(fields.description, 'description')}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {fields.dimensions && (
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: theme.text, opacity: 0.7 }}>Dimensions</h3>
                    <p style={{ color: theme.text }}>
                      {typeof fields.dimensions === 'string' 
                        ? fields.dimensions 
                        : formatContentfulField(fields.dimensions, 'dimensions')}
                    </p>
                  </div>
                )}
                
                {fields.medium && (
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: theme.text, opacity: 0.7 }}>Medium</h3>
                    <p style={{ color: theme.text }}>
                      {typeof fields.medium === 'string' 
                        ? fields.medium 
                        : formatContentfulField(fields.medium, 'medium')}
                    </p>
                  </div>
                )}
                
                {fields.year && (
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: theme.text, opacity: 0.7 }}>Year</h3>
                    <p style={{ color: theme.text }}>
                      {typeof fields.year === 'number' 
                        ? fields.year 
                        : formatContentfulField(fields.year, 'year')}
                    </p>
                  </div>
                )}
                
                {fields.location && (
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: theme.text, opacity: 0.7 }}>Location</h3>
                    <p style={{ color: theme.text }}>
                      {typeof fields.location === 'string' 
                        ? fields.location 
                        : formatContentfulField(fields.location, 'location')}
                    </p>
                  </div>
                )}
                
                {fields.price !== undefined && (
                  <div>
                    <h3 className="text-sm font-semibold" style={{ color: theme.text, opacity: 0.7 }}>Price</h3>
                    <p style={{ color: theme.text }}>
                      {typeof fields.price === 'number' 
                        ? `€${fields.price}` 
                        : formatContentfulField(fields.price, 'price')}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                <h3 
                  className="text-xl mb-4 font-light"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  All Fields
                </h3>
                <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left pb-2 px-2" style={{ color: theme.text }}>Field</th>
                        <th className="text-left pb-2 px-2" style={{ color: theme.text }}>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(fields).map(([key, value]) => (
                        <tr key={key} className="border-t border-gray-200">
                          <td className="py-2 px-2 font-medium align-top" style={{ color: theme.text }}>{key}</td>
                          <td className="py-2 px-2 whitespace-pre-wrap" style={{ color: theme.text }}>
                            {formatContentfulField(value, key)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 