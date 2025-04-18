'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from 'contentful';

// Configure Contentful client
const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export default function Sculptures() {
  // Style for navigation links
  const navLinkStyle = {
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 400,
    letterSpacing: '0.07em'
  };

  const [isMounted, setIsMounted] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch the video from Contentful
  useEffect(() => {
    async function fetchVideo() {
      try {
        setIsLoading(true);
        const videoAsset = await client.getAsset('53FQoUiUIGTOLTAsRLW6RH');
        if (videoAsset && videoAsset.fields && videoAsset.fields.file) {
          const videoFileUrl = videoAsset.fields.file.url;
          setVideoUrl(`https:${videoFileUrl}`);
        }
      } catch (error) {
        console.error('Error fetching video from Contentful:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVideo();
  }, []);
  
  // Ensure component is mounted before playing video (for hydration)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full relative overflow-hidden">
      {/* Video Background */}
      {isMounted && videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-5 bg-black">
          <div className="text-white">Loading video...</div>
        </div>
      )}
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
      
      {/* Header with navigation */}
      <header className="relative w-full z-20 py-6 px-6">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Title on the left */}
          <div>
            <h2 
              className="text-3xl text-white tracking-wide drop-shadow-md" 
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 400,
                letterSpacing: '0.05em'
              }}
            >
              Liesbeth van Keulen
            </h2>
          </div>
          
          {/* Navigation links in the center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <nav>
              <ul className="flex space-x-12">
                <li>
                  <Link 
                    href="/landscapes" 
                    className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                    style={navLinkStyle}
                  >
                    Landscapes
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/sculptures" 
                    className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md underline"
                    style={navLinkStyle}
                  >
                    Sculptures
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/portraits" 
                    className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                    style={navLinkStyle}
                  >
                    Portraits
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Home link */}
          <div>
            <Link
              href="/"
              className="text-white text-xl hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
              style={navLinkStyle}
            >
              Home
            </Link>
          </div>
        </div>

        {/* Mobile layout - stacked with title at top and centered nav below */}
        <div className="flex flex-col md:hidden w-full space-y-6">
          <div className="text-center">
            <h2 
              className="text-2xl text-white tracking-wide drop-shadow-md" 
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 400,
                letterSpacing: '0.05em'
              }}
            >
              Liesbeth van Keulen
            </h2>
          </div>
          
          <nav className="flex justify-center">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/landscapes" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                  style={navLinkStyle}
                >
                  Landscapes
                </Link>
              </li>
              <li>
                <Link 
                  href="/sculptures" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md underline"
                  style={navLinkStyle}
                >
                  Sculptures
                </Link>
              </li>
              <li>
                <Link 
                  href="/portraits" 
                  className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
                  style={navLinkStyle}
                >
                  Portraits
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex justify-center">
            <Link
              href="/"
              className="text-white text-lg hover:text-gray-300 transition-colors duration-300 drop-shadow-md"
              style={navLinkStyle}
            >
              Home
            </Link>
          </div>
        </div>
      </header>
      
      {/* Page Content - Removed the text */}
      <main className="flex-grow flex items-center justify-center z-20">
        {/* Content area left empty intentionally */}
      </main>
    </div>
  );
} 