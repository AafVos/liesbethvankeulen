import React from 'react';

export default function NewsletterSubscription() {
  return (
    <div className="fixed bottom-4 left-4 bg-white bg-opacity-80 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
} 