'use client';

import { useState } from 'react';

export default function NewsletterSubscription() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/mailchimp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
      if (!data.error) {
        setFormData({ email: '', firstName: '', lastName: '' });
        setTimeout(() => setResult(null), 3000); // Clear success message after 3 seconds
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 p-4" style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 hover:bg-opacity-80 transition-colors"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: '0.07em',
            color: '#ffffff',
            backgroundColor: '#6a7b4f',
            border: '1px solid #6a7b4f'
          }}
        >
          Subscribe
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 p-4" style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}>
      <h3 className="text-lg font-normal mb-2 text-white">Subscribe to Newsletter</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white w-1/2"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              letterSpacing: '0.07em',
              color: '#6a7b4f',
              borderColor: '#6a7b4f'
            }}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white w-1/2"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              letterSpacing: '0.07em',
              color: '#6a7b4f',
              borderColor: '#6a7b4f'
            }}
          />
        </div>
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white flex-grow"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              letterSpacing: '0.07em',
              color: '#6a7b4f',
              borderColor: '#6a7b4f'
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 hover:bg-opacity-80 transition-colors"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              letterSpacing: '0.07em',
              color: '#ffffff',
              backgroundColor: '#6a7b4f',
              border: '1px solid #6a7b4f'
            }}
          >
            {isLoading ? '...' : 'Subscribe'}
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-2">
          {result.error ? (
            <p className="text-red-400 text-sm">Error: {result.error}</p>
          ) : (
            <p className="text-green-400 text-sm">Successfully subscribed!</p>
          )}
        </div>
      )}
    </div>
  );
} 