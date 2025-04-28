import React from 'react';
import NewsletterSubscription from '../components/NewsletterSubscription';

export default function TempPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Temporary Test Page</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="mb-4">This is a temporary page to test the newsletter subscription component.</p>
          <NewsletterSubscription />
        </div>
      </div>
    </div>
  );
} 