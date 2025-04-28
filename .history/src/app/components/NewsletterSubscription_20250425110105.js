import React from 'react';

export default function NewsletterSubscription() {
  return (
    <div className="fixed bottom-4 left-4 p-4 bg-white" style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}>
      <h3 className="text-lg font-normal mb-2" style={{ color: '#6a7b4f' }}>Subscribe to Newsletter</h3>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white"
          style={{ 
            fontFamily: "'Courier New', Courier, monospace", 
            letterSpacing: '0.07em',
            color: '#6a7b4f',
            borderColor: '#6a7b4f',
            focusRingColor: '#6a7b4f'
          }}
        />
        <button
          className="px-4 py-2 transition-colors"
          style={{ 
            fontFamily: "'Courier New', Courier, monospace", 
            letterSpacing: '0.07em',
            color: '#ffffff',
            backgroundColor: '#6a7b4f',
            border: '1px solid #6a7b4f'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.color = '#6a7b4f';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#6a7b4f';
            e.currentTarget.style.color = '#ffffff';
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
} 