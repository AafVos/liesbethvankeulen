'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

export default function Wout() {
  // Use light theme for this page
  const theme = getThemeColors('light');
  
  // Sample images for Wout - in a real scenario, you'd use actual images
  const woutImages = [
    { id: 'img1', url: '//images.ctfassets.net/1z6huih0p4zo/3GjopkBdEuIAw9gvOz0Hvj/7cd5cd9f3aee8e04320fc84709fbab20/boy_portrait_1.jpg', title: 'Wout Portrait 1' },
    { id: 'img2', url: '//images.ctfassets.net/1z6huih0p4zo/6mRoKE13Y1vC0Jt4mZnKiB/3f17f5e930cd25e78d43c15a0a84c0c6/boy_portrait_2.jpg', title: 'Wout Portrait 2' },
    { id: 'img3', url: '//images.ctfassets.net/1z6huih0p4zo/2RcnkDdxQVhEWDKRrLLEwq/ac59d7edb4c79fcc51e7fbe3ce475849/boy_portrait_3.jpg', title: 'Wout Portrait 3' },
  ];

  // Current slide state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === woutImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [woutImages.length]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Background color overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-90"></div>
      
      {/* Slideshow as background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="relative w-full h-full">
          {woutImages.map((image, index) => (
            <div 
              key={image.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={`https:${image.url}`}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Header */}
      <Header title="Wout" themeName="light" />
      
      {/* Main content */}
      <main className="flex-grow flex items-center justify-center z-10 px-6 py-12">
        <div className="max-w-4xl bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl">
          <h1 className="text-4xl md:text-5xl mb-6 font-light" style={{ 
            fontFamily: "'Courier New', Courier, monospace",
            color: theme.heading,
            letterSpacing: '0.05em'
          }}>
            Meet Wout
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6" style={{ color: theme.text }}>
              Wout is a beautiful, energetic boy with a bright smile that lights up every room. 
              His curious nature and playful spirit make him the joy of everyone who knows him.
            </p>
            
            <p className="text-lg mb-8" style={{ color: theme.text }}>
              With sparkling eyes and a heart full of adventure, Wout reminds us of the wonder and 
              beauty in everyday moments. His laughter is contagious, and his kindness knows no bounds.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 mt-10">
              <div className="flex-1 bg-white/70 p-6 rounded-lg shadow">
                <h3 className="text-2xl mb-3" style={{ color: theme.heading }}>Playful Spirit</h3>
                <p style={{ color: theme.text }}>
                  Wout brings joy and laughter wherever he goes, always ready for the next adventure.
                </p>
              </div>
              
              <div className="flex-1 bg-white/70 p-6 rounded-lg shadow">
                <h3 className="text-2xl mb-3" style={{ color: theme.heading }}>Gentle Heart</h3>
                <p style={{ color: theme.text }}>
                  His kindness and empathy shine through in how he cares for others around him.
                </p>
              </div>
              
              <div className="flex-1 bg-white/70 p-6 rounded-lg shadow">
                <h3 className="text-2xl mb-3" style={{ color: theme.heading }}>Bright Mind</h3>
                <p style={{ color: theme.text }}>
                  Always curious and eager to learn, Wout's creativity and intelligence are boundless.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/landscapes" className="inline-block px-8 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors duration-300">
              Return to Gallery
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center bg-white/30 backdrop-blur-sm">
        <p style={{ color: theme.text }}>
          The wonderful world of Wout © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
