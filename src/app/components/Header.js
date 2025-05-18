'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getThemeColors } from '../styles/theme';
import DropdownNav from './DropdownNav';
import PageTitleDropdown from './PageTitleDropdown';
import SideDropdown from './SideDropdown';

// By default, use the dark theme if no theme is specified
const defaultTheme = getThemeColors('dark');

const Header = ({ title, subtitle, themeName, showNavigation = true, PageTitle, textColor, currentPage }) => {
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

  // Navigation items with nested structure
  const paintingsItems = [
    { 
      label: 'Landscapes', 
      href: '/work/paintings/landscapes',
      subItems: [
        { label: 'Urban Landscapes', href: '/work/paintings/landscapes/urban' },
        { label: 'Nature Landscapes', href: '/work/paintings/landscapes/nature' },
      ]
    },
    { 
      label: 'Portraits', 
      href: '/work/paintings/portraits',
      subItems: [
        { label: 'Self Portraits', href: '/work/paintings/portraits/self' },
        { label: 'Family Portraits', href: '/work/paintings/portraits/family' },
      ]
    }
  ];

  const sculpturesItems = [
    { 
      label: 'Landscapes', 
      href: '/sculptures/landscapes',
      subItems: [
        { label: 'Metal Landscapes', href: '/sculptures/landscapes/metal' },
        { label: 'Wood Landscapes', href: '/sculptures/landscapes/wood' },
      ]
    },
    { 
      label: 'Birds', 
      href: '/sculptures/birds',
      subItems: [
        { label: 'Metal Birds', href: '/sculptures/birds/metal' },
        { label: 'Clay Birds', href: '/sculptures/birds/clay' },
      ]
    },
    { 
      label: 'Motherhood', 
      href: '/sculptures/motherhood'
    }
  ];

  const workItems = [
    { 
      label: 'Paintings', 
      href: '/work/paintings',
      subItems: paintingsItems
    },
    { 
      label: 'Sculptures', 
      href: '/sculptures',
      subItems: sculpturesItems
    }
  ];

  // Add a special case for the Work page where we should use SideDropdown
  // This function determines which type of nav component to use
  const getNavComponent = (label, href, items, showSide = false) => {
    // On the work page, we use SideDropdown for horizontal dropdowns
    if (currentPage === 'work' && showSide) {
      return (
        <SideDropdown
          label={label}
          href={href}
          color={headerColor}
          items={items}
        />
      );
    }
    // Otherwise use the standard DropdownNav
    return (
      <DropdownNav
        label={label}
        href={href}
        color={headerColor}
        fontSize="text-3xl"
        items={items}
      />
    );
  };

  return (
    <header className="relative w-full z-50 py-6 px-6">
      {/* Mobile layout */}
      <div className="md:hidden w-full flex flex-col items-center justify-center gap-1 relative z-50">
        {/* Top row: Instagram + Hamburger */}
        <div className="w-full flex flex-col mb-0">
          {/* Top row: Instagram + Hamburger */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 z-50">
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
          {/* Title row (always visible, even when menu open) */}
          <div className="flex items-center justify-center mt-2 relative z-50">
            <Link href="/home" className="cursor-pointer inline-block z-50">
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
        </div>
        {/* Subtitle below, centered (always visible) */}
        {subtitle && (
          <div className="w-full text-center text-base mt-0 tracking-wide z-50 relative" style={{
            fontFamily: "'Courier New', Courier, monospace",
            color: headerColor,
            opacity: 0.8,
            letterSpacing: '0.03em',
            fontWeight: 300
          }}>
            {subtitle}
          </div>
        )}
        {/* Add PageTitle dropdown for mobile if it exists (hide when menu open) */}
        {!menuOpen && PageTitle && (
          <div className="flex items-center justify-center mt-3">
            {PageTitle === "Work" ? (
              <PageTitleDropdown 
                title="Work" 
                color={headerColor} 
                items={workItems}
              />
            ) : PageTitle === "Paintings" ? (
              <PageTitleDropdown 
                title="Paintings" 
                color={headerColor} 
                items={paintingsItems}
              />
            ) : PageTitle === "Sculptures" ? (
              <PageTitleDropdown 
                title="Sculptures" 
                color={headerColor} 
                items={sculpturesItems}
              />
            ) : (
              <div className="text-2xl font-normal tracking-wide" style={{ fontFamily: "'Courier New', Courier, monospace", color: headerColor }}>
                {PageTitle}
              </div>
            )}
          </div>
        )}
        {/* Navigation links below (hide when menu open) */}
        {!menuOpen && showNavigation && (
          <nav className="flex flex-row items-center justify-center gap-4 mt-2">
            <DropdownNav
              label="Paintings"
              href="/work/paintings"
              color={headerColor}
              fontSize="text-2xl"
              items={paintingsItems}
            />
            <DropdownNav
              label="Sculptures"
              href="/sculptures"
              color={headerColor}
              fontSize="text-2xl"
              items={sculpturesItems}
            />
            <Link href="/exhibitions" className="text-2xl font-normal hover:opacity-80 transition-colors duration-300 drop-shadow-md text-center" style={{...navLinkStyle}}>Exhibitions</Link>
          </nav>
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center w-full relative z-50">
        {/* Left: Title */}
        <div className="flex-shrink-0 z-50">
          <div className="text-center">
            <Link href="/home" className="cursor-pointer inline-block z-50">
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
                <div className="text-base mt-1 tracking-wide z-50" style={{
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
            PageTitle === "Work" ? (
              <PageTitleDropdown 
                title="Work" 
                color={headerColor} 
                items={workItems}
              />
            ) : PageTitle === "Paintings" ? (
              <PageTitleDropdown 
                title="Paintings" 
                color={headerColor} 
                items={paintingsItems}
              />
            ) : PageTitle === "Sculptures" ? (
              <PageTitleDropdown 
                title="Sculptures" 
                color={headerColor} 
                items={sculpturesItems}
              />
            ) : (
              <div className="text-2xl md:text-3xl font-normal tracking-wide" style={{ fontFamily: "'Courier New', Courier, monospace", color: headerColor }}>
                {PageTitle}
              </div>
            )
          ) : (
            showNavigation && (
              <nav>
                <ul className="flex space-x-12">
                  <li>
                    {getNavComponent(
                      "Paintings", 
                      "/work/paintings", 
                      paintingsItems,
                      true
                    )}
                  </li>
                  <li>
                    {getNavComponent(
                      "Sculptures", 
                      "/sculptures", 
                      sculpturesItems,
                      true
                    )}
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
      <div className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300 flex items-center justify-center ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute top-0 left-0 right-0 h-24 z-10"></div> {/* Space for header */}
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;