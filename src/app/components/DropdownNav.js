import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { getThemeColors } from '../styles/theme';

export default function DropdownNav({ label, items, href, color, fontSize = "text-xl", themeName = 'dark' }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const theme = getThemeColors(themeName);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keep dropdown open when hovering over the dropdown itself (desktop)
  const handleMouseEnter = () => { if (!isMobile) setOpen(true); };
  const handleMouseLeave = () => { if (!isMobile) setOpen(false); };

  // Toggle dropdown on mobile
  const handleCaretClick = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <div className="flex items-center justify-center">
        <Link
          href={href}
          className={`${fontSize} hover:opacity-80 transition-colors duration-300 drop-shadow-md px-2 py-1 block text-center cursor-pointer`}
          style={{ fontFamily: theme.fontFamily, fontWeight: 400, letterSpacing: '0.07em', color }}
        >
          {label}
        </Link>
        {/* Caret for mobile */}
        <button
          type="button"
          className="ml-1 md:hidden flex items-center focus:outline-none"
          aria-label="Open dropdown"
          onClick={handleCaretClick}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8L10 12L14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div
        className={`absolute left-1/2 -translate-x-1/2 min-w-[180px] bg-white border border-gray-200 z-50 transition-all duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}${isMobile ? ' top-full mt-1' : ''}`}
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-base text-center cursor-pointer"
                style={{ fontFamily: theme.fontFamily }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 