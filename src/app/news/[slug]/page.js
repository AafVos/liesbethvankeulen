import Header from '../../components/Header';
import { getThemeColors } from '../../styles/theme';
import { getEntries } from '@/lib/contentful';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to extract HTML content from Contentful rich text
function extractHtmlFromRichText(richTextField) {
  if (!richTextField || !richTextField.content) return '';
  
  let html = '';
  
  // Process each content block
  richTextField.content.forEach(block => {
    // Different handling based on node type
    switch (block.nodeType) {
      case 'paragraph':
        html += processParagraph(block);
        break;
      case 'heading-1':
        html += processHeading(block, 'h1');
        break;
      case 'heading-2':
        html += processHeading(block, 'h2');
        break;
      case 'heading-3':
        html += processHeading(block, 'h3');
        break;
      case 'heading-4':
        html += processHeading(block, 'h4');
        break;
      case 'heading-5':
        html += processHeading(block, 'h5');
        break;
      case 'heading-6':
        html += processHeading(block, 'h6');
        break;
      case 'unordered-list':
        html += processUnorderedList(block);
        break;
      case 'ordered-list':
        html += processOrderedList(block);
        break;
      case 'hr':
        html += '<hr />';
        break;
      case 'blockquote':
        html += processBlockquote(block);
        break;
      case 'embedded-asset-block':
        html += processEmbeddedAsset(block);
        break;
      default:
        // Try to extract text from unknown node type
        if (block.content) {
          html += `<div>${extractTextContent(block)}</div>`;
        }
    }
  });
  
  return html;
}

// Helper functions for processing different node types
function processParagraph(node) {
  if (!node.content) return '<p></p>';
  return `<p>${extractTextContent(node)}</p>`;
}

function processHeading(node, headingType) {
  if (!node.content) return `<${headingType}></${headingType}>`;
  return `<${headingType}>${extractTextContent(node)}</${headingType}>`;
}

function processUnorderedList(node) {
  if (!node.content) return '<ul></ul>';
  
  let listItems = '';
  node.content.forEach(item => {
    if (item.nodeType === 'list-item' && item.content) {
      listItems += '<li>';
      item.content.forEach(content => {
        if (content.nodeType === 'paragraph') {
          listItems += extractTextContent(content);
        } else {
          // Try to extract text directly
          listItems += extractTextContent(content);
        }
      });
      listItems += '</li>';
    }
  });
  
  return `<ul>${listItems}</ul>`;
}

function processOrderedList(node) {
  if (!node.content) return '<ol></ol>';
  
  let listItems = '';
  node.content.forEach(item => {
    if (item.nodeType === 'list-item' && item.content) {
      listItems += '<li>';
      item.content.forEach(content => {
        if (content.nodeType === 'paragraph') {
          listItems += extractTextContent(content);
        } else {
          // Try to extract text directly
          listItems += extractTextContent(content);
        }
      });
      listItems += '</li>';
    }
  });
  
  return `<ol>${listItems}</ol>`;
}

function processBlockquote(node) {
  if (!node.content) return '<blockquote></blockquote>';
  return `<blockquote>${extractTextContent(node)}</blockquote>`;
}

function processEmbeddedAsset(node) {
  // For embedded assets, we would need the asset data which may not be available
  // So we just add a placeholder
  return '<div>[Embedded Asset]</div>';
}

// Extract text content from a node, handling marks (bold, italic, etc.)
function extractTextContent(node) {
  if (!node.content) return '';
  
  let textContent = '';
  
  node.content.forEach(contentNode => {
    if (contentNode.nodeType === 'text') {
      // Apply marks if any (bold, italic, etc.)
      let text = contentNode.value || '';
      if (contentNode.marks && contentNode.marks.length > 0) {
        contentNode.marks.forEach(mark => {
          switch (mark.type) {
            case 'bold':
              text = `<strong>${text}</strong>`;
              break;
            case 'italic':
              text = `<em>${text}</em>`;
              break;
            case 'underline':
              text = `<u>${text}</u>`;
              break;
            case 'code':
              text = `<code>${text}</code>`;
              break;
          }
        });
      }
      textContent += text;
    } else if (contentNode.nodeType === 'hyperlink' && contentNode.data && contentNode.data.uri) {
      // Handle links
      textContent += `<a href="${contentNode.data.uri}" target="_blank">${extractTextContent(contentNode)}</a>`;
    } else if (contentNode.content) {
      // Recursively process nested content
      textContent += extractTextContent(contentNode);
    }
  });
  
  return textContent;
}

// Function to get a specific news item from Contentful by ID
async function getNewsItem(id) {
  try {
    // Query for news item with matching ID
    const response = await getEntries('news', {
      'sys.id': id
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Transform the data for our component
    const item = response.items[0];
    
    // Get the HTML field
    const htmlField = item.fields.html || '';
    
    // Process the html content based on its type
    let htmlContent = '';
    
    console.log('HTML field type:', typeof htmlField);
    
    if (typeof htmlField === 'string') {
      // It's already a string, use directly
      htmlContent = htmlField;
    } else if (typeof htmlField === 'object') {
      if (htmlField.nodeType === 'document') {
        // It's rich text, process it
        htmlContent = extractHtmlFromRichText(htmlField);
      } else {
        // Some other object, stringify it
        try {
          htmlContent = JSON.stringify(htmlField);
        } catch (err) {
          htmlContent = "Could not convert HTML content to string";
        }
      }
    } else {
      // Fallback
      htmlContent = String(htmlField);
    }
    
    return {
      id: item.sys.id,
      title: item.fields.title || '',
      html: htmlContent,
      rawHtml: htmlField // Include raw data for debugging
    };
  } catch (error) {
    console.error('Error fetching news item from Contentful:', error);
    return null;
  }
}

export default async function NewsItem({ params }) {
  // In Next.js dynamic routes, the param is named after the folder [slug]
  // but we're using it as an ID
  const id = params.slug;
  const newsItem = await getNewsItem(id);
  
  // If no news item found, return 404
  if (!newsItem) {
    notFound();
  }
  
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="News" 
      />
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/news" className="text-sm mb-4 inline-block hover:underline" style={{ color: theme.text }}>
            &larr; Back to News
          </Link>
          
          <article className="bg-white shadow-md rounded-lg overflow-hidden border p-6" style={{ borderColor: theme.text }}>
            <h1 
              className="text-2xl md:text-3xl mb-6 font-light tracking-wide"
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: theme.text
              }}
            >
              {newsItem.title}
            </h1>
            
            {newsItem.html ? (
              <div 
                className="prose max-w-none"
                style={{ color: theme.text }}
                dangerouslySetInnerHTML={{ __html: newsItem.html }}
              />
            ) : (
              <p style={{ color: theme.text }}>No content available for this news item.</p>
            )}
            
            {/* Debug info - DEV only */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 border border-red-300 bg-red-50 rounded">
                <h3 className="text-red-700 font-bold mb-2">Debug Info (dev only)</h3>
                <p className="text-sm text-red-600 mb-2">Raw HTML type: {typeof newsItem.rawHtml}</p>
                <details>
                  <summary className="text-sm text-red-600 cursor-pointer">Raw HTML data structure</summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                    {JSON.stringify(newsItem.rawHtml, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
} 