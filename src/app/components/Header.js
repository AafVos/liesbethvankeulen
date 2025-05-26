'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { getThemeColors } from '../styles/theme';
import DropdownNav from './DropdownNav';
import PageTitleDropdown from './PageTitleDropdown';
import SideDropdown from './SideDropdown';

// By default, use the dark theme if no theme is specified
const defaultTheme = getThemeColors('dark');

const Header = ({ title, subtitle, themeName, currentPage, workItems = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileIconsRef = useRef(null);
  const desktopIconsRef = useRef(null);
  const mobileHamburgerRef = useRef(null);
  const desktopHamburgerRef = useRef(null);
  
  // Use the provided theme name or default to dark
  const theme = themeName ? getThemeColors(themeName) : defaultTheme;

  // Always use theme text color, except when menu is open
  const headerColor = menuOpen ? '#ffffff' : theme.text;

  const toggleMenu = () => {
    setMenuOpen(prev => {
      const next = !prev;
      console.log('Hamburger clicked, menuOpen:', next);
      return next;
    });
  };

  // Handler for clicks on the overlay
  const handleOverlayClick = (e) => {
    // Don't close if clicking on the menu items, hamburger button, or social icons
    if (
      (navRef.current && navRef.current.contains(e.target)) ||
      (mobileIconsRef.current && mobileIconsRef.current.contains(e.target)) ||
      (desktopIconsRef.current && desktopIconsRef.current.contains(e.target)) ||
      (mobileHamburgerRef.current && mobileHamburgerRef.current.contains(e.target)) ||
      (desktopHamburgerRef.current && desktopHamburgerRef.current.contains(e.target))
    ) {
      return;
    }
    
    // Close the menu for clicks outside
    setMenuOpen(false);
  };

  // Style for menu overlay links
  const menuLinkStyle = {
    fontFamily: theme.fontFamily,
    fontWeight: 400,
    letterSpacing: '0.07em',
    color: '#ffffff' // Always white in the menu overlay
  };

  // Navigation items with nested structure
  const paintingsItems = [
    { 
      label: 'Landschappen', 
      href: '/work/paintings/landscapes',
      subItems: [
        { label: 'Stedelijke Landschappen', href: '/work/paintings/landscapes/urban' },
        { label: 'Natuur Landschappen', href: '/work/paintings/landscapes/nature' },
      ]
    },
    { 
      label: 'Portretten', 
      href: '/work/paintings/portraits',
      subItems: [
        { label: 'Zelfportretten', href: '/work/paintings/portraits/self' },
        { label: 'Familieportretten', href: '/work/paintings/portraits/family' },
      ]
    }
  ];

  const sculpturesItems = [
    // No subcategories for sculptures
  ];

  // const workItems = [
  //   { 
  //     label: 'Schilderijen', 
  //     href: '/work/paintings',
  //     subItems: paintingsItems
  //   },
  //   { 
  //     label: 'Beelden', 
  //     href: '/work/sculptures',
  //     subItems: sculpturesItems
  //   }
  // ];

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
          themeName={themeName}
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
        themeName={themeName}
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
            <div ref={mobileIconsRef} className="flex items-center gap-4 z-50">
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
                  className={`drop-shadow-md transition-colors duration-300`}
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/portretschool.amsterdam" 
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
                  className={`drop-shadow-md transition-colors duration-300`}
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
                  className={`drop-shadow-md transition-colors duration-300`}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
            <div ref={mobileHamburgerRef} className="cursor-pointer z-50 mr-2" onClick={toggleMenu}>
              <div className="w-6 h-px mb-1.5 drop-shadow-md transition-colors duration-300" style={{ backgroundColor: headerColor }}></div>
              <div className="w-6 h-px mb-1.5 drop-shadow-md transition-colors duration-300" style={{ backgroundColor: headerColor }}></div>
              <div className="w-6 h-px drop-shadow-md transition-colors duration-300" style={{ backgroundColor: headerColor }}></div>
            </div>
          </div>
          {/* Title row (always visible, even when menu open) */}
          <div className="flex items-center justify-center mt-2 relative z-50">
            <Link href="/home" className="cursor-pointer inline-block z-50" onClick={() => setMenuOpen(false)}>
              <h2 
                className="text-2xl tracking-wide drop-shadow-md text-center" 
                style={{ 
                  fontFamily: theme.fontFamily,
                  fontWeight: 550,
                  letterSpacing: '0.05em',
                  color: headerColor,
                  transition: 'color 0.3s ease'
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
            fontFamily: theme.fontFamily,
            color: headerColor,
            opacity: 0.8,
            letterSpacing: '0.03em',
            fontWeight: 550,
            transition: 'color 0.3s ease'
          }}>
            {subtitle}
          </div>
        )}
        {/* Add PageTitle dropdown for mobile */}
        <div className="flex items-center justify-center mt-3 w-full relative z-[60]">
          <div className="relative w-full px-4">
            <PageTitleDropdown 
              color={headerColor} 
              items={workItems}
              themeName={themeName}
            />
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center w-full relative z-50">
        {/* Left: Title */}
        <div className="flex-shrink-0 z-50">
          <div className="text-center">
            <Link href="/home" className="cursor-pointer inline-block z-50" onClick={() => setMenuOpen(false)}>
              <h2 
                className="text-3xl tracking-wide drop-shadow-md" 
                style={{ 
                  fontFamily: theme.fontFamily,
                  fontWeight: 550,
                  letterSpacing: '0.05em',
                  color: headerColor,
                  transition: 'color 0.3s ease'
                }}
              >
                {title}
              </h2>
              {subtitle && (
                <div className="text-base mt-1 tracking-wide z-50" style={{
                  fontFamily: theme.fontFamily,
                  color: headerColor,
                  opacity: 0.8,
                  letterSpacing: '0.03em',
                  fontWeight: 550,
                  transition: 'color 0.3s ease'
                }}>
                  {subtitle}
                </div>
              )}
            </Link>
          </div>
        </div>
        
        {/* Push everything else to the right (empty flex-grow div) */}
        <div className="flex-grow"></div>
        
        {/* Right: Navigation, Instagram, Facebook, Email and hamburger */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* Navigation links */}
          <div className="flex items-center justify-center">
            <PageTitleDropdown 
              color={headerColor} 
              items={workItems}
              themeName={themeName}
            />
          </div>
          
          {/* Social media icons */}
          <div ref={desktopIconsRef} className="flex items-center gap-4">
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
                className={`drop-shadow-md transition-colors duration-300`}
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/portretschool.amsterdam" 
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
                className={`drop-shadow-md transition-colors duration-300`}
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
                className={`drop-shadow-md transition-colors duration-300`}
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
          
          {/* Hamburger */}
          <div ref={desktopHamburgerRef} className="cursor-pointer z-50" onClick={toggleMenu}>
            <div className="w-6 h-px mb-1.5 drop-shadow-md transition-colors duration-300" style={{ backgroundColor: headerColor }}></div>
            <div className="w-6 h-px mb-1.5 drop-shadow-md transition-colors duration-300" style={{ backgroundColor: headerColor }}></div>
            <div className="w-6 h-px drop-shadow-md transition-colors duration-300" style={{ backgroundColor: headerColor }}></div>
          </div>
        </div>
      </div>

      {/* Fullscreen menu overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 flex items-center justify-center ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleOverlayClick}
      >
        <div className="absolute top-0 left-0 right-0 h-24 z-10"></div> {/* Space for header */}
        <nav ref={navRef} className="text-center">
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
                Werken
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                style={menuLinkStyle}
                onClick={toggleMenu}
              >
                Over Liesbeth
              </Link>
            </li>
            <li>
              <Link 
                href="/atelier" 
                className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                style={menuLinkStyle}
                onClick={toggleMenu}
              >
                Atelier
              </Link>
            </li>
            <li>
              <Link 
                href="/lessons" 
                className="text-3xl hover:opacity-80 transition-colors duration-300 drop-shadow-lg"
                style={menuLinkStyle}
                onClick={toggleMenu}
              >
                Lessen
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;