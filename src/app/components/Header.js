'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getThemeColors } from '../styles/theme';
import DropdownNav from './DropdownNav';

// By default, use the dark theme if no theme is specified
const defaultTheme = getThemeColors('dark');

const Header = ({ title, subtitle, themeName, showNavigation = true, PageTitle, textColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Use the provided theme name or default to dark
  const theme = themeName ? getThemeColors(themeName) : defaultTheme;

  // Use textColor if provided, otherwise use theme text color
  const headerColor = textColor || theme.text;

  const toggleMenu = () => {
    setMenuOpen(prev => {
      const next = !prev;
      console.log('Hamburger clicked, menuOpen:', next);
      return next;
    });
  };

  // Style for navigation links
  const navLinkStyle = {
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: 400,
    letterSpacing: '0.07em',
    color: headerColor
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
      {/* Mobile layout */}
      <div className="md:hidden w-full flex flex-col items-center justify-center gap-1">
        {/* Top row: Instagram + Hamburger */}
        <div className="w-full flex flex-col mb-0">
          {/* Top row: Instagram + Hamburger */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <a 
                href="https://www.instagram.com/portretliesbeth/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-colors duration-300 z-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={headerColor}
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
                className="flex items-center hover:opacity-80 transition-colors duration-300 z-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={headerColor}
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
                className="flex items-center hover:opacity-80 transition-colors duration-300 z-50"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke={headerColor}
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
            <div className="cursor-pointer z-50 mr-2" onClick={toggleMenu}>
              <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: headerColor }}></div>
              <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: headerColor }}></div>
              <div className="w-6 h-px drop-shadow-md" style={{ backgroundColor: headerColor }}></div>
            </div>
          </div>
          {/* Title row (hide when menu open) */}
          {!menuOpen && (
            <div className="flex items-center justify-center mt-2">
              <Link href="/home" className="cursor-pointer inline-block">
                <h2 
                  className="text-2xl tracking-wide drop-shadow-md text-center" 
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    fontWeight: 400,
                    letterSpacing: '0.05em',
                    color: headerColor
                  }}
                >
                  {title}
                </h2>
              </Link>
            </div>
          )}
        </div>
        {/* Subtitle below, centered (hide when menu open) */}
        {!menuOpen && subtitle && (
          <div className="w-full text-center text-base mt-0 tracking-wide" style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: headerColor,
            opacity: 0.8,
            letterSpacing: '0.03em',
            fontWeight: 300
          }}>
            {subtitle}
          </div>
        )}
        {/* Navigation links below (hide when menu open) */}
        {!menuOpen && showNavigation && (
          <nav className="flex flex-row items-center justify-center gap-4 mt-2">
            <Link href="/work/paintings" className="text-2xl font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>Paintings</Link>
            <Link href="/sculptures" className="text-2xl font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>Sculptures</Link>
            <Link href="/exhibitions" className="text-2xl font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>Exhibitions</Link>
            <Link href="/ar-gallery" className="text-2xl font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>AR View</Link>
          </nav>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center w-full">
        {/* Left: Title */}
        <div className="flex-shrink-0">
          <div className="text-center">
            <Link href="/home" className="cursor-pointer inline-block">
              <h2 
                className="text-3xl tracking-wide drop-shadow-md" 
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: headerColor
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <div className="text-base mt-1 tracking-wide" style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: headerColor,
                  opacity: 0.8,
                  letterSpacing: '0.03em',
                  fontWeight: 300
                }}>
                  {subtitle}
                </div>
              )}
            </Link>
          </div>
        </div>
        {/* Center: Navigation links or PageTitle */}
        <div className="flex-1 flex items-center justify-center">
          {PageTitle ? (
            <div className="text-2xl md:text-3xl font-normal tracking-wide" style={{ fontFamily: "'Courier New', Courier, monospace", color: headerColor }}>
              {PageTitle}
            </div>
          ) : (
            showNavigation && (
              <nav>
                <ul className="flex space-x-12">
                  <li>
                    <DropdownNav
                      label="Paintings"
                      href="/work/paintings"
                      color={headerColor}
                      fontSize="text-3xl"
                      items={[
                        { label: 'Landscapes', href: '/work/paintings/landscapes' },
                        { label: 'Portraits', href: '/work/paintings/portraits' },
                      ]}
                    />
                  </li>
                  <li>
                    <DropdownNav
                      label="Sculptures"
                      href="/sculptures"
                      color={headerColor}
                      fontSize="text-3xl"
                      items={[
                        { label: 'Landscapes', href: '/sculptures/landscapes' },
                        { label: 'Birds', href: '/sculptures/birds' },
                        { label: 'Motherhood', href: '/sculptures/motherhood' },
                      ]}
                    />
                  </li>
                  <li>
                    <DropdownNav
                      label="Exhibitions"
                      href="/exhibitions"
                      color={headerColor}
                      fontSize="text-3xl"
                      items={[
                        { label: 'Current Exhibitions', href: '/exhibitions/current' },
                        { label: 'Past Exhibitions', href: '/exhibitions/past' },
                      ]}
                    />
                  </li>
                  <li>
                    <DropdownNav
                      label="AR Gallery"
                      href="/ar-gallery"
                      color={headerColor}
                      fontSize="text-3xl"
                      items={[]}
                    />
                  </li>
                </ul>
              </nav>
            )
          )}
        </div>
        {/* Right: Instagram, Facebook, Email and hamburger */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/portretliesbeth/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-colors duration-300 z-50"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={headerColor}
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
              className="flex items-center hover:opacity-80 transition-colors duration-300 z-50"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={headerColor}
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
              className="flex items-center hover:opacity-80 transition-colors duration-300 z-50"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={headerColor}
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
          <div className="cursor-pointer z-50" onClick={toggleMenu}>
            <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: headerColor }}></div>
            <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: headerColor }}></div>
            <div className="w-6 h-px drop-shadow-md" style={{ backgroundColor: headerColor }}></div>
          </div>
        </div>
      </div>

      {/* Fullscreen menu overlay - now transparent with backdrop blur */}
      <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="text-center">
            <ul className="space-y-8">
              <li>
                <Link 
                  href="/home" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/work" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Work
                </Link>
              </li>
              <li>
                <Link 
                  href="/news" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  News
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/studio" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Studio
                </Link>
              </li>
              <li>
                <Link 
                  href="/lessons" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/exhibitions" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link 
                  href="/ar-gallery" 
                  className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                  style={menuLinkStyle}
                  onClick={toggleMenu}
                >
                  AR Gallery
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