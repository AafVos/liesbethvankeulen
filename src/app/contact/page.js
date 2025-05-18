'use client';

import Header from '../components/Header';
import Image from 'next/image';
import { getThemeColors } from '../styles/theme';
import MapComponent from '../components/MapComponent';

const themeName = 'light';
const theme = getThemeColors(themeName);

export const metadata = {
  title: 'Contact | Liesbeth van Keulen',
  description: 'Contact page for Liesbeth van Keulen',
};

export default function ContactPage() {
  // Studio location data
  const studioLocation = {
    coordinates: [52.0907, 5.1214], // Utrecht coordinates
    title: 'Studio Liesbeth van Keulen',
    description: 'Please contact to arrange a studio visit'
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header title="Liesbeth van Keulen" subtitle="In search of unexpected beauty" themeName={themeName} showNavigation={true} PageTitle="Contact" />
      <div className="container mx-auto px-8 py-8 flex-1">
        {/* Contact Card */}
        <div className="border shadow-md bg-white/70 w-full max-w-5xl mx-auto flex flex-col md:flex-row p-0 mb-12" style={{ borderColor: theme.text }}>
          {/* Left: Image area */}
          <div className="flex flex-col items-center md:items-start justify-center pb-8 md:pb-0 md:pl-8 md:pr-4 flex-1">
            <div className="w-full h-64 md:max-h-[600px] md:h-auto bg-gray-200 overflow-hidden flex-1 flex items-center justify-center">
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
          <div className="flex flex-col justify-center pb-8 md:pb-0 md:pr-8 md:pl-4 flex-1">
            <div className="p-8 flex-1 flex flex-col justify-center">
              <h1 className="text-2xl md:text-3xl font-normal mb-2 text-center" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
                Please get in touch;
              </h1>
              <p className="text-base md:text-lg mb-6 text-center" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text, opacity: 0.8 }}>
                for sales enquiries,<br />to arrange a studio visit,<br />or just to chat.
              </p>
              <form 
                action="https://formspree.io/f/xwkgyyqg" 
                method="POST" 
                className="flex flex-col gap-6 w-full max-w-xl mx-auto"
              >
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="firstName" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>First Name</label>
                    <input type="text" id="firstName" name="firstName" className="border-b bg-transparent py-2 px-1 focus:outline-none" style={{ borderColor: theme.text, color: theme.text }} autoComplete="given-name" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <label htmlFor="lastName" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="border-b bg-transparent py-2 px-1 focus:outline-none" style={{ borderColor: theme.text, color: theme.text }} autoComplete="family-name" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>Email *</label>
                  <input type="email" id="email" name="email" required className="border-b bg-transparent py-2 px-1 focus:outline-none" style={{ borderColor: theme.text, color: theme.text }} autoComplete="email" />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="message" className="mb-1 text-sm" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text }}>Write a message</label>
                  <textarea id="message" name="message" rows={4} className="border-b bg-transparent py-2 px-1 focus:outline-none resize-none" style={{ borderColor: theme.text, color: theme.text, fontFamily: 'inherit' }}></textarea>
                </div>
                <button type="submit" className="mt-4 px-8 py-2 rounded-full bg-[#6a7b4f] text-white text-lg font-normal drop-shadow-md hover:opacity-80 transition-colors duration-300" style={{ fontFamily: 'Courier New, Courier, monospace' }}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Studio Map Section */}
        <div className="border shadow-md bg-white/70 w-full max-w-5xl mx-auto p-6" style={{ borderColor: theme.text }}>
          <h2 className="text-xl md:text-2xl font-normal mb-4 text-center" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
            Studio Location
          </h2>
          <div className="h-[400px] w-full">
            <MapComponent markers={[studioLocation]} zoom={14} />
          </div>
        </div>
      </div>
    </div>
  );
} 