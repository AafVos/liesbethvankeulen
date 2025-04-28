'use client';

import { useEffect, useRef } from 'react';

// This component uses Leaflet to display a map
export default function MapComponent({ coordinates, zoom = 13 }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;

    // Dynamically import Leaflet only on the client side
    const initializeMap = async () => {
      const L = await import('leaflet');
      
      // Import the Leaflet CSS
      import('leaflet/dist/leaflet.css');
      
      // Fix marker icon issues in Next.js
      const { Icon } = L;
      
      // Override default icon
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
      
      // If the map is already initialized, clean it up first
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      
      // Create a new map instance with zoom control only
      const map = L.map(mapRef.current, {
        zoomControl: true,  // Only show zoom controls
        attributionControl: false  // Hide attribution
      }).setView(coordinates, zoom);
      
      mapInstanceRef.current = map;
      
      // Add the OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: ''  // Empty attribution
      }).addTo(map);
      
      // Add a marker at the specified coordinates, but without a popup
      L.marker(coordinates).addTo(map);
    };
    
    initializeMap();
    
    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, zoom]);
  
  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
} 