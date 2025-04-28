'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import the map component with dynamic loading (no SSR)
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-80 bg-gray-100 animate-pulse rounded"></div>
});

export default function MapSection({ coordinates, zoom, locationName = "Maastricht, Netherlands" }) {
  return (
    <div>
      <div className="rounded overflow-hidden h-80">
        <MapComponent coordinates={coordinates} zoom={zoom} />
      </div>
      <p className="mt-2 text-xs italic">
        This landscape was inspired by the beautiful scenery of {locationName}.
      </p>
    </div>
  );
} 