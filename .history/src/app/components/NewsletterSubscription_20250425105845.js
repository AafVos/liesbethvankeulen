import React from 'react';

export default function NewsletterSubscription() {
  return (
    <div className="fixed bottom-4 left-4 p-4" style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}>
      <h3 className="text-lg font-normal mb-2 text-white">Subscribe to Newsletter</h3>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 border border-white border-opacity-50 focus:outline-none focus:ring-2 focus:ring-white bg-white text-black placeholder-black placeholder-opacity-70"
          style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}
        />
        <button
          className="px-4 py-2 bg-white text-black border border-white border-opacity-50 hover:bg-opacity-80 transition-colors"
          style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}
        >
          Submit
        </button>
      </div>
    </div>
  );
} 