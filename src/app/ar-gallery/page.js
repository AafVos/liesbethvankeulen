'use client';

import { useState, useEffect } from 'react';
import { getEntries } from '@/lib/contentful';
import Header from '../components/Header';
import ARViewer from '../components/ARViewer';
import { getThemeColors } from '../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function ARGalleryPage() {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPainting, setSelectedPainting] = useState(null);
  const [error, setError] = useState(null);

  // Sample painting using local image.png from public folder
  const samplePainting = {
    id: 'sample-1',
    title: 'Landscape Painting',
    description: 'A beautiful landscape painting by Liesbeth van Keulen.',
    url: '/image.png', // Local path from public folder
    width: 80,
    height: 60
  };

  useEffect(() => {
    // First, set the sample painting as default
    setPaintings([samplePainting]);
    setSelectedPainting(samplePainting);
    
    // Then try to fetch from Contentful in the background
    async function fetchPaintings() {
      try {
        const response = await getEntries('paintings');
        
        const formattedPaintings = response.items.map(item => ({
          id: item.sys.id,
          title: item.fields.title || 'Untitled',
          description: item.fields.description || '',
          url: item.fields.image?.fields?.file?.url || '',
          width: item.fields.width || 100, // in cm
          height: item.fields.height || 100 // in cm
        })).filter(painting => painting.url);
        
        // If we have paintings from Contentful, add them to the list (keeping sample at the beginning)
        if (formattedPaintings.length > 0) {
          setPaintings([samplePainting, ...formattedPaintings]);
        }
      } catch (err) {
        console.error('Error fetching paintings:', err);
        setError('Could not fetch additional paintings from Contentful.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPaintings();
    setLoading(false); // Set loading to false immediately since we already have the sample
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="AR Gallery" 
      />
      
      <div className="container mx-auto px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-normal mb-6 text-center" 
            style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
            See paintings in your space
          </h1>
          
          <p className="mb-8 text-center" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>
            Select a painting and use your device's camera to place it on your wall.
            <br />
            <span className="text-sm opacity-70">
              Note: AR features require a device with AR capabilities and permission to use your camera.
            </span>
          </p>
          
          {error && (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {/* Painting selection */}
              <div className="mb-8">
                <h2 className="text-xl font-normal mb-4" 
                  style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
                  Select a painting:
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paintings.map(painting => (
                    <div 
                      key={painting.id}
                      className={`cursor-pointer border-2 rounded overflow-hidden transition-all duration-300 ${
                        selectedPainting?.id === painting.id 
                          ? 'border-[#6a7b4f] scale-105 shadow-md' 
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPainting(painting)}
                    >
                      <img 
                        src={painting.url.startsWith('/') ? painting.url : `https:${painting.url}?w=200`}
                        alt={painting.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 text-sm text-center truncate" style={{ color: theme.text }}>
                        {painting.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* AR viewer */}
              {selectedPainting && (
                <div className="border rounded-lg overflow-hidden shadow-md p-4 bg-white/80">
                  <h3 className="text-lg font-normal mb-2" 
                    style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
                    {selectedPainting.title}
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2" style={{ color: theme.text }}>
                      <span>Dimensions: {selectedPainting.width} × {selectedPainting.height} cm</span>
                    </div>
                    
                    <p className="text-sm mb-4" style={{ color: theme.text }}>
                      {selectedPainting.description}
                    </p>
                  </div>
                  
                  <ARViewer painting={selectedPainting} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 