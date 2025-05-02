'use client';

import Link from 'next/link';
import { getThemeColors } from '../styles/theme';

const Footer = ({ themeName = 'light' }) => {
  const theme = getThemeColors(themeName);

  return (
    <footer className="w-full py-0.5 mt-auto border-t backdrop-blur-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-0.5">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a 
              href="https://www.instagram.com/portretliesbeth/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ffffff"
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-md"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/portretliesbeth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ffffff"
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-md"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="mailto:liesbethvankeulen@gmail.com" 
              className="flex items-center hover:opacity-80 transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ffffff"
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="drop-shadow-md"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-2">
            <Link 
              href="/contact" 
              className="text-xs hover:opacity-80 transition-colors duration-300 drop-shadow-md"
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: '#ffffff'
              }}
            >
              Contact
            </Link>
            <Link 
              href="/about" 
              className="text-xs hover:opacity-80 transition-colors duration-300 drop-shadow-md"
              style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: '#ffffff'
              }}
            >
              About
            </Link>
          </div>

          {/* Copyright */}
          <div 
            className="text-[10px] drop-shadow-md"
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: '#ffffff',
              opacity: 0.8
            }}
          >
            © {new Date().getFullYear()} Liesbeth van Keulen
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 