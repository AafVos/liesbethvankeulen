'use client';

import Header from '../components/Header';
import { useState } from 'react';

export default function TestNavigationPage() {
  const [hoverMessage, setHoverMessage] = useState('Hover over the navigation items to test the dropdowns');

  // Define painting items with a console log on hover
  const paintingsItems = [
    { 
      label: 'Landscapes', 
      href: '/work/paintings/landscapes',
      subItems: [
        { label: 'Urban Landscapes', href: '/work/paintings/landscapes/urban' },
        { label: 'Nature Landscapes', href: '/work/paintings/landscapes/nature' },
      ]
    },
    { 
      label: 'Portraits', 
      href: '/work/paintings/portraits',
      subItems: [
        { label: 'Self Portraits', href: '/work/paintings/portraits/self' },
        { label: 'Family Portraits', href: '/work/paintings/portraits/family' },
      ]
    }
  ];

  // Define sculptures items with a console log on hover
  const sculpturesItems = [
    { 
      label: 'Landscapes', 
      href: '/sculptures/landscapes',
      subItems: [
        { label: 'Metal Landscapes', href: '/sculptures/landscapes/metal' },
        { label: 'Wood Landscapes', href: '/sculptures/landscapes/wood' },
      ]
    },
    { 
      label: 'Birds', 
      href: '/sculptures/birds',
      subItems: [
        { label: 'Metal Birds', href: '/sculptures/birds/metal' },
        { label: 'Clay Birds', href: '/sculptures/birds/clay' },
      ]
    },
    { 
      label: 'Motherhood', 
      href: '/sculptures/motherhood'
    }
  ];

  const workItems = [
    { 
      label: 'Paintings', 
      href: '/work/paintings',
      subItems: paintingsItems
    },
    { 
      label: 'Sculptures', 
      href: '/sculptures',
      subItems: sculpturesItems
    }
  ];

  return (
    <div className="min-h-screen">
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="Artist"
        themeName="light"
        PageTitle="Work"
        textColor="#333"
        currentPage="work"
      />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Navigation Test Page</h1>
        
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg mb-8">
          <p className="text-lg mb-2">{hoverMessage}</p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Navigation Structure</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(workItems, null, 2)}
            </pre>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Debugging Tips</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Check the browser console for any errors</li>
              <li>Make sure z-index values are correct</li>
              <li>Verify the hover timing on dropdowns</li>
              <li>Test on different browsers</li>
              <li>Ensure nested items have subItems prop properly defined</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 