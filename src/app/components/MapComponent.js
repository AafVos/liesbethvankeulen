'use client';

import { useEffect, useRef } from 'react';

// This component uses Leaflet to display a map with multiple markers
export default function MapComponent({ 
  markers = [], 
  defaultCenter = [52.1326, 5.2913], // Default to the Netherlands
  zoom = 7 
}) {
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
      }).setView(markers.length > 0 ? markers[0].coordinates : defaultCenter, zoom);
      
      mapInstanceRef.current = map;
      
      // Add the OpenStreetMap tile layer with a cleaner style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: ''  // Empty attribution
      }).addTo(map);
      
      // Add markers with popups if provided
      if (markers.length > 0) {
        markers.forEach(marker => {
          const leafletMarker = L.marker(marker.coordinates).addTo(map);
          
          // Add popup if title or description is provided
          if (marker.title || marker.description) {
            const popupContent = `
              <div style="font-family: 'Courier New', monospace;">
                ${marker.title ? `<h3 style="margin: 0 0 5px; font-size: 16px;">${marker.title}</h3>` : ''}
                ${marker.description ? `<p style="margin: 0; font-size: 14px;">${marker.description}</p>` : ''}
              </div>
            `;
            leafletMarker.bindPopup(popupContent);
          }
        });
        
        // If we have multiple markers, adjust bounds to fit all markers
        if (markers.length > 1) {
          const bounds = L.latLngBounds(markers.map(m => m.coordinates));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    };
    
    initializeMap();
    
    // Cleanup function to remove the map when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers, defaultCenter, zoom]);
  
  return <div ref={mapRef} style={{ width: '100%', height: '100%', minHeight: '400px' }} />;
} 