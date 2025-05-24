'use client';

import Header from '../components/Header';
import Image from 'next/image';
import { getThemeColors } from '../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Contact page navigation items
const contactItems = [
  {
    label: 'Contact',
    href: '/contact'
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="Contact"
        workItems={contactItems}
      />
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8 flex-1">
        {/* Contact Card */}
        <div className="border shadow-md bg-white/70 w-full max-w-5xl mx-auto flex flex-col md:flex-row p-0 mb-8 md:mb-12" style={{ borderColor: theme.text }}>
          {/* Left: Image area */}
          <div className="flex flex-col items-center md:items-start flex-1">
            <div className="w-full h-48 md:h-64 md:max-h-[600px] md:h-auto bg-gray-200 overflow-hidden flex-1 flex items-center justify-center">
              <Image
                src="/contact-studio.jpeg"
                alt="Artist in studio painting"
                width={600}
                height={800}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          {/* Right: Form area */}
          <div className="flex flex-col justify-center md:pr-8 md:pl-4 flex-1">
            <div className="p-4 md:p-8 flex-1 flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-normal mb-4 md:mb-2 text-center" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
                Neem contact op
              </h1>
              <p className="text-sm md:text-base lg:text-lg mb-6 text-center leading-relaxed" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text, opacity: 0.8 }}>
                voor verkoop vragen,<br />om een atelierbezoek te regelen,<br />of gewoon om te praten.
              </p>
              <form 
                action="https://formspree.io/f/xpwdgzab" 
                method="POST" 
                className="flex flex-col gap-4 md:gap-6 w-full max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="firstName" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>Voornaam</label>
                    <input type="text" id="firstName" name="firstName" className="border-b bg-transparent py-2 px-1 focus:outline-none" style={{ borderColor: theme.text, color: theme.text }} autoComplete="given-name" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="lastName" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>Achternaam</label>
                    <input type="text" id="lastName" name="lastName" className="border-b bg-transparent py-2 px-1 focus:outline-none" style={{ borderColor: theme.text, color: theme.text }} autoComplete="family-name" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>E-mail *</label>
                  <input type="email" id="email" name="email" required className="border-b bg-transparent py-2 px-1 focus:outline-none" style={{ borderColor: theme.text, color: theme.text }} autoComplete="email" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>Schrijf een bericht</label>
                  <textarea id="message" name="message" rows={3} className="border-b bg-transparent py-2 px-1 focus:outline-none resize-none" style={{ borderColor: theme.text, color: theme.text, fontFamily: 'inherit' }}></textarea>
                </div>
                <button type="submit" className="mt-2 md:mt-4 px-6 md:px-8 py-2 bg-[#6a7b4f] text-white text-base md:text-lg font-normal drop-shadow-md hover:opacity-80 transition-colors duration-300" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
                  Versturen
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 