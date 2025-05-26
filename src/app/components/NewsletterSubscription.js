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
      
      // Clear form only on successful new subscription
      if (data.success) {
        setFormData({ email: '', firstName: '', lastName: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ 
        success: false, 
        message: "Er is een fout opgetreden. Probeer het later opnieuw." 
      });
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
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 p-4" style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 min-w-[220px] whitespace-nowrap hover:bg-opacity-80 transition-colors cursor-pointer"
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            letterSpacing: '0.07em',
            color: '#6a7b4f',
            backgroundColor: '#fff',
            border: '1px solid #6a7b4f'
          }}
        >
          Abonneer op Nieuwsbrief
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 p-4 max-w-full" style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.07em' }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Voornaam"
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
            placeholder="Achternaam"
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
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Voer je e-mailadres in"
            required
            className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white w-full"
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
            className="px-4 py-2 hover:bg-opacity-80 transition-colors w-full sm:w-auto mt-2 sm:mt-0"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              letterSpacing: '0.07em',
              color: '#ffffff',
              backgroundColor: '#6a7b4f',
              border: '1px solid #6a7b4f'
            }}
          >
            {isLoading ? '...' : 'Abonneer'}
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-2 w-full">
          <div 
            className="px-3 py-2 border bg-white w-full text-sm"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace", 
              letterSpacing: '0.07em',
              color: result.success ? '#22c55e' : '#ef4444',
              borderColor: '#6a7b4f'
            }}
          >
            {result.message}
          </div>
        </div>
      )}
    </div>
  );
} 