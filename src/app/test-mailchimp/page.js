'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import Image from 'next/image';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Test page navigation items
const testItems = [
  {
    label: 'Test Mailchimp',
    href: '/test-mailchimp'
  }
];

// Function to extract the first image URL from HTML content
function extractFirstImage(htmlContent) {
  if (!htmlContent) return null;
  
  try {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    // Find the first img tag
    const firstImg = tempDiv.querySelector('img');
    
    if (firstImg && firstImg.src) {
      return {
        src: firstImg.src,
        alt: firstImg.alt || 'Campaign image'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting image from HTML:', error);
    return null;
  }
}

export default function TestMailchimp() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true);
        setError(null);
        
        // Call our API route to fetch campaigns
        const response = await fetch('/api/mailchimp/campaigns');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setCampaigns(data);
        
        console.log('Fetched campaigns:', data);
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
        <Header 
          title="Liesbeth van Keulen" 
          subtitle="In search of unexpected beauty" 
          themeName={themeName} 
          PageTitle="Test Mailchimp"
          currentPage="test-mailchimp"
          workItems={testItems}
        />
        <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p style={{ color: theme.text }}>Loading Mailchimp campaigns...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
        <Header 
          title="Liesbeth van Keulen" 
          subtitle="In search of unexpected beauty" 
          themeName={themeName} 
          PageTitle="Test Mailchimp"
          currentPage="test-mailchimp"
          workItems={testItems}
        />
        <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-xl mb-4" style={{ color: theme.heading }}>Error Loading Campaigns</h2>
            <p style={{ color: theme.text }} className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="Test Mailchimp"
        currentPage="test-mailchimp"
        workItems={testItems}
      />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl mb-4" style={{ color: theme.heading, fontFamily: theme.fontFamily }}>
            Mailchimp Campaigns Test
          </h1>
          <p style={{ color: theme.text }}>
            Found {campaigns.length} campaigns since 2025-01-01
          </p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: theme.text }}>No campaigns found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {campaigns.map((campaign, index) => {
              const firstImage = extractFirstImage(campaign.html);
              
              return (
                <div 
                  key={campaign.id} 
                  className="bg-white border rounded-lg shadow-sm overflow-hidden"
                  style={{ borderColor: theme.accent }}
                >
                  {/* Campaign Header with Image */}
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    {firstImage && (
                      <div className="md:w-1/3 lg:w-1/4">
                        <div className="aspect-video md:aspect-square relative">
                          <img
                            src={firstImage.src}
                            alt={firstImage.alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Campaign Info Section */}
                    <div className={`p-6 ${firstImage ? 'md:w-2/3 lg:w-3/4' : 'w-full'}`}>
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2" style={{ color: theme.heading }}>
                          {campaign.title || `Campaign #${index + 1}`}
                        </h2>
                        <div className="space-y-1">
                          <p className="text-sm" style={{ color: theme.text, opacity: 0.7 }}>
                            ID: {campaign.id}
                          </p>
                          {campaign.send_time && (
                            <p className="text-sm" style={{ color: theme.text, opacity: 0.7 }}>
                              Sent: {new Date(campaign.send_time).toLocaleString()}
                            </p>
                          )}
                        </div>
                        {campaign.error && (
                          <p className="text-sm text-red-600 mt-2">
                            Error: {campaign.error}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Campaign Content */}
                  {campaign.html ? (
                    <div className="border-t p-6" style={{ borderColor: theme.accent }}>
                      <h3 className="text-lg mb-3" style={{ color: theme.heading }}>
                        Campaign Content:
                      </h3>
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: campaign.html }}
                        style={{ color: theme.text }}
                      />
                    </div>
                  ) : (
                    <div className="border-t p-6 text-center" style={{ borderColor: theme.accent }}>
                      <p style={{ color: theme.text, opacity: 0.7 }}>
                        No content available for this campaign
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
} 