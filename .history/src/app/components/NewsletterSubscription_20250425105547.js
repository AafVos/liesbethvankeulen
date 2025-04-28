import React from 'react';

export default function NewsletterSubscription() {
  return (
    <div className="fixed bottom-4 left-4 p-4">
      <h3 className="text-lg font-semibold mb-2 text-white">Subscribe to Newsletter</h3>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 border border-white border-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-white placeholder-white placeholder-opacity-70"
        />
        <button
          className="px-4 py-2 bg-transparent text-white border border-white border-opacity-50 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
} 