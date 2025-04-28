'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getThemeColors } from '../styles/theme';
import DropdownNav from './DropdownNav';

// By default, use the dark theme if no theme is specified
const defaultTheme = getThemeColors('dark');

const Header = ({ title, subtitle, themeName, showNavigation = true, PageTitle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Use the provided theme name or default to dark
  const theme = themeName ? getThemeColors(themeName) : defaultTheme;

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
      {/* Mobile layout */}
      <div className="md:hidden w-full flex flex-col items-center justify-center gap-1">
        {/* Top row: Instagram + Hamburger */}
        <div className="w-full flex flex-col mb-0">
          {/* Top row: Instagram + Hamburger */}
          <div className="flex items-center justify-between w-full">
            <a 
              href="https://www.instagram.com/portretliesbeth/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:opacity-80 transition-colors duration-300 z-50 ml-0.5"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={theme.text}
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
            <div className="cursor-pointer z-50 mr-2" onClick={toggleMenu}>
              <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
              <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
              <div className="w-6 h-px drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
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
                    color: theme.text
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
            color: theme.text,
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
            <Link href="/paintings" className="text-lg font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>Paintings</Link>
            <Link href="/sculptures" className="text-lg font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>Sculptures</Link>
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
                  color: theme.text
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <div className="text-base mt-1 tracking-wide" style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text,
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
            <div className="text-2xl md:text-3xl font-normal tracking-wide" style={{ fontFamily: "'Courier New', Courier, monospace", color: theme.text }}>
              {PageTitle}
            </div>
          ) : (
            showNavigation && (
              <nav>
                <ul className="flex space-x-12">
                  <li>
                    <DropdownNav
                      label="Paintings"
                      href="/paintings"
                      color={theme.text}
                      items={[
                        { label: 'Landscapes', href: '/paintings/landscapes' },
                        { label: 'Birds', href: '/paintings/birds' },
                        { label: 'Portraits', href: '/paintings/portraits' },
                        { label: 'Abstract works', href: '/paintings/abstract' },
                      ]}
                    />
                  </li>
                  <li>
                    <DropdownNav
                      label="Sculptures"
                      href="/sculptures"
                      color={theme.text}
                      items={[
                        { label: 'Landscapes', href: '/sculptures/landscapes' },
                        { label: 'Birds', href: '/sculptures/birds' },
                        { label: 'Motherhood', href: '/sculptures/motherhood' },
                      ]}
                    />
                  </li>
                </ul>
              </nav>
            )
          )}
        </div>
        {/* Right: Instagram and hamburger */}
        <div className="flex items-center gap-6 flex-shrink-0">
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
              stroke={theme.text}
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
          <div className="cursor-pointer z-50" onClick={toggleMenu}>
            <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
            <div className="w-6 h-px mb-1.5 drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
            <div className="w-6 h-px drop-shadow-md" style={{ backgroundColor: theme.text }}></div>
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
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;