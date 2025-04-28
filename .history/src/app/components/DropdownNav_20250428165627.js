import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function DropdownNav({ label, items, href, color }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

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
  const handleMobileToggle = (e) => {
    if (isMobile) {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      {/* On mobile, the whole row toggles the dropdown. On desktop, label is a link. */}
      <div
        className={`flex items-center justify-center ${isMobile ? 'cursor-pointer' : ''}`}
        onClick={handleMobileToggle}
      >
        {isMobile ? (
          <span
            className="text-xl px-2 py-1 block text-center select-none"
            style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 400, letterSpacing: '0.07em', color }}
          >
            {label}
          </span>
        ) : (
          <Link
            href={href}
            className="text-xl hover:opacity-80 transition-colors duration-300 drop-shadow-md px-2 py-1 block text-center cursor-pointer"
            style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 400, letterSpacing: '0.07em', color }}
          >
            {label}
          </Link>
        )}
        {/* Caret always visible on mobile */}
        {isMobile && (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M6 8L10 12L14 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div
        className={`absolute left-1/2 -translate-x-1/2 min-w-[180px] bg-white border border-gray-200 shadow-lg rounded z-50 transition-all duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}${isMobile ? ' top-full mt-1' : ''}`}
      >
        <ul className="flex flex-col">
          {/* On mobile, add the main link as the first item */}
          {isMobile && (
            <li key="main-link">
              <Link
                href={href}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-base text-center cursor-pointer font-bold border-b border-gray-200"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          )}
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-base text-center cursor-pointer"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
                onClick={() => setOpen(false)}
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