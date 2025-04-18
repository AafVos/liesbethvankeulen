'use client';

import { useState, useEffect } from 'react';

export default function Slideshow({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // Change image every 5 seconds if there are multiple images (don't rotate for videos)
    if (images.length > 1 && !images.some(item => item.contentType.startsWith('video/'))) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [images.length, images]);
  
  // If no images, show nothing
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-white text-center bg-black/50 p-6 rounded">
          <p>No media available from Contentful</p>
          <p className="text-sm mt-2">Please check your Contentful space for media assets</p>
        </div>
      </div>
    );
  }
  
  // Check if we're dealing with a video
  const isVideo = images[0]?.contentType?.startsWith('video/');
  
  // For videos, just display the first one
  if (isVideo) {
    return (
      <div className="w-full h-full bg-black">
        <video 
          src={`https:${images[0].url}`}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  // For images, use slideshow
  return (
    <div className="relative w-full h-full">
      {images.map((image, index) => (
        <div 
          key={image.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={`https:${image.url}`}
            alt={image.title || 'Slideshow image'}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
} 