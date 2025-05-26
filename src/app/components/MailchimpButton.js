'use client';

import { useState } from 'react';

export default function MailchimpButton() {
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

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white"
          style={{ 
            fontFamily: "'Courier New', Courier, monospace", 
            letterSpacing: '0.07em',
            color: '#6a7b4f',
            borderColor: '#6a7b4f'
          }}
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white"
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
          className="px-3 py-2 border focus:outline-none focus:ring-2 bg-white"
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
          className="px-6 py-3 hover:bg-opacity-80 transition-colors"
          style={{ 
            fontFamily: "'Courier New', Courier, monospace", 
            letterSpacing: '0.07em',
            color: '#ffffff',
            backgroundColor: '#6a7b4f',
            border: '1px solid #6a7b4f'
          }}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-white/80 rounded-lg">
          {result.success ? (
            <p className="text-green-600">{result.message}</p>
          ) : (
            <p className="text-red-600">{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
} 