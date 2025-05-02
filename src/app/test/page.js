"use client";

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Example locations for studios/exhibitions (you can replace these with actual locations)
const locations = [
  { 
    position: { lat: 52.3676, lng: 4.9041 }, 
    title: "Amsterdam Studio",
    info: "Main studio location in Amsterdam"
  },
  { 
    position: { lat: 52.0116, lng: 4.3571 }, 
    title: "The Hague Exhibition",
    info: "Current exhibition running until December 2023"
  },
  { 
    position: { lat: 51.9244, lng: 4.4777 }, 
    title: "Rotterdam Workshop",
    info: "Regular workshops held here every month"
  },
];

export default function TestPage() {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        // Get API key from environment variable
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          setError("Google Maps API key is missing. Please add it to your environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.");
          return;
        }

        // Initialize the Google Maps loader
        const loader = new Loader({
          apiKey,
          version: "weekly",
        });

        // Load the Google Maps API
        const google = await loader.load();
        
        // Center map on Netherlands
        const center = { lat: 52.1326, lng: 5.2913 };
        
        // Create the map with custom styling
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 8,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              "elementType": "geometry",
              "stylers": [{ "color": "#f5f5f5" }]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#616161" }]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{ "color": "#e9e9e9" }]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [{ "color": "#9e9e9e" }]
            }
          ]
        });

        // Add markers for each location with info windows
        const infoWindow = new google.maps.InfoWindow();
        
        locations.forEach((location) => {
          const marker = new google.maps.Marker({
            position: location.position,
            map,
            title: location.title,
            animation: google.maps.Animation.DROP
          });
          
          // Add click listener to show info window
          marker.addListener("click", () => {
            infoWindow.setContent(`
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 8px; font-size: 16px;">${location.title}</h3>
                <p style="margin: 0;">${location.info}</p>
              </div>
            `);
            infoWindow.open(map, marker);
          });
        });
        
      } catch (error) {
        console.error("Error loading Google Maps:", error);
        setError("Error loading Google Maps. Please check the console for more details.");
      }
    };

    if (mapRef.current) {
      initMap();
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="Locations" 
      />
      
      <div className="container mx-auto px-8 py-8">
        <h1 className="text-2xl mb-4" style={{ color: theme.text }}>Studio & Exhibition Locations</h1>
        
        {error ? (
          <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
            {error}
          </div>
        ) : null}
        
        <p className="mb-4" style={{ color: theme.text }}>
          Explore the map below to find studio locations and current exhibitions. 
          Click on markers for more information.
        </p>
        
        {/* Google Maps container */}
        <div 
          ref={mapRef} 
          className="w-full h-[500px] border rounded-md shadow-md"
          style={{ borderColor: theme.text }}
        ></div>
        
        <div className="mt-6 text-sm" style={{ color: theme.text }}>
          <h2 className="text-xl mb-2">Locations List</h2>
          <ul className="space-y-2">
            {locations.map((location, index) => (
              <li key={index} className="p-3 bg-white rounded shadow-sm">
                <h3 className="font-medium">{location.title}</h3>
                <p>{location.info}</p>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Note: To make this map work, you need to add a Google Maps API key to your environment variables.</p>
          <p>Create a <code>.env.local</code> file in the root of your project with:</p>
          <pre className="bg-gray-100 p-2 rounded mt-2">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</pre>
        </div>
      </div>
    </div>
  );
} 