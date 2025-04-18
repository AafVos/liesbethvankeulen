'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getThemeColors } from '../styles/theme';

// By default, use the dark theme if no theme is specified
const defaultTheme = getThemeColors('dark');

const Header = ({ title, themeName }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Use the provided theme name or default to dark
  const theme = themeName ? getThemeColors(themeName) : defaultTheme;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Style for navigation links
  const navLinkStyle = {
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 400,
    letterSpacing: '0.07em',
    color: theme.text
  };

  // Style for menu overlay links
  const menuLinkStyle = {
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 400,
    letterSpacing: '0.07em',
    color: '#ffffff' // Always white in the menu overlay
  };

  return (
    <header className="relative w-full z-30 py-6 px-6">
      {/* Desktop layout */}
      <div className="flex items-center justify-between w-full">
        {/* Title on the left */}
        <div>
          <h2 
            className="text-3xl tracking-wide drop-shadow-md" 
            style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              fontWeight: 400,
              letterSpacing: '0.05em',
              color: theme.text
            }}
          >
            {title}
          </h2>
        </div>
        
        {/* Navigation links in the center visible on large screens */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <nav>
            <ul className="flex space-x-12">
              <li>
                <Link 
                  href="/landscapes" 
                  className="text-xl hover:opacity-80 transition-colors duration-300 drop-shadow-md"
                  style={{...navLinkStyle}}
                >
                  Landscapes
                </Link>
              </li>
              <li>
                <Link 
                  href="/sculptures" 
                  className="text-xl hover:opacity-80 transition-colors duration-300 drop-shadow-md"
                  style={{...navLinkStyle}}
                >
                  Sculptures
                </Link>
              </li>
              <li>
                <Link 
                  href="/portraits" 
                  className="text-xl hover:opacity-80 transition-colors duration-300 drop-shadow-md"
                  style={{...navLinkStyle}}
                >
                  Portraits
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Hamburger menu icon on the right */}
        <div className="cursor-pointer z-50" onClick={toggleMenu}>
          <div className="w-8 h-1 mb-1.5 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
          <div className="w-8 h-1 mb-1.5 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
          <div className="w-8 h-1 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
        </div>
      </div>

      {/* Fullscreen menu overlay - now transparent with backdrop blur */}
      <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="text-center">
            <ul className="space-y-8">
              <li>
                <Link 
                  href="/landscapes" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Webshop
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 