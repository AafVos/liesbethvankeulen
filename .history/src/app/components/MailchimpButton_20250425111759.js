'use client';

import { useState } from 'react';

export default function MailchimpButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const response = await fetch('/api/mailchimp?listId=list_id');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
      console.log('Mailchimp response:', data);
    } catch (error) {
      console.error('Error fetching Mailchimp data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="px-6 py-3 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50"
        style={{ 
          fontFamily: "'Courier New', Courier, monospace",
          letterSpacing: '0.05em'
        }}
      >
        {isLoading ? 'Loading...' : 'Get Mailchimp List'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          <p className="text-sm">Error: {error}</p>
        </div>
      )}
      
      {result && !error && (
        <div className="mt-4 p-4 bg-white/80 rounded-lg">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 