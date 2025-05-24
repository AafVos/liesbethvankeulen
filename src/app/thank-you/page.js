'use client';

import Header from '../components/Header';
import Image from 'next/image';
import { getThemeColors } from '../styles/theme';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

// Thank you page navigation items
const thankYouItems = [
  {
    label: '',
    href: '/thank-you'
  }
];

export default function ThankYouPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        workItems={thankYouItems}
      />
      <div className="container mx-auto px-4 md:px-8 py-4 md:py-8 flex-1">
        {/* Thank You Card */}
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
          {/* Right: Thank you message */}
          <div className="flex flex-col justify-center md:pr-8 md:pl-4 flex-1">
            <div className="p-4 md:p-8 flex-1 flex flex-col justify-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-normal mb-4 md:mb-6 text-center" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.heading }}>
                Bedankt voor je bericht!
              </h1>
              <div className="text-center space-y-4 mb-6">
                <p className="text-sm md:text-base lg:text-lg leading-relaxed" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text, opacity: 0.8 }}>
                  Je bericht is succesvol verzonden.
                </p>
                <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Courier New, Courier, monospace', color: theme.text, opacity: 0.8 }}>
                  Ik neem zo spoedig mogelijk contact met je op.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Link 
                  href="/home"
                  className="px-6 md:px-8 py-2 bg-[#6a7b4f] text-white text-base md:text-lg font-normal drop-shadow-md hover:opacity-80 transition-colors duration-300"
                  style={{ fontFamily: 'Courier New, Courier, monospace' }}
                >
                  Terug naar home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 