'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function PageTitleDropdown({ title, items = [], color }) {
  const [open, setOpen] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const itemTimeoutRefs = useRef({});

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredItemIndex(null);
    }, 150); // Small delay to prevent menu flickering
  };

  const handleItemMouseEnter = (index) => {
    if (itemTimeoutRefs.current[index]) {
      clearTimeout(itemTimeoutRefs.current[index]);
    }
    setHoveredItemIndex(index);
    console.log('Item hovered:', index); // Debugging
  };

  const handleItemMouseLeave = (index) => {
    itemTimeoutRefs.current[index] = setTimeout(() => {
      if (hoveredItemIndex === index) {
        setHoveredItemIndex(null);
      }
    }, 100);
  };

  // Check if this is in Work menu to determine submenu position
  const isWorkMenu = title === "Work";

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title that serves as dropdown button */}
      <div 
        className="flex items-center text-2xl md:text-3xl font-normal tracking-wide cursor-pointer"
        style={{ 
          fontFamily: "'Courier New', Courier, monospace",
          color
        }}
      >
        {title}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke={color}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {/* Dropdown menu */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 z-50 mt-2 bg-white border shadow-md transition-all duration-200 min-w-[180px] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ borderColor: color }}
      >
        <div className="py-2">
          {items.map((item, index) => (
            <div 
              key={index}
              className="relative"
              onMouseEnter={() => handleItemMouseEnter(index)}
              onMouseLeave={() => handleItemMouseLeave(index)}
            >
              <Link 
                href={item.href}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center flex items-center justify-center whitespace-nowrap"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                {item.label}
                {item.subItems && item.subItems.length > 0 && (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3 ml-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>
              
              {/* Nested dropdown for subitems */}
              {item.subItems && item.subItems.length > 0 && (
                <div 
                  className={`absolute top-0 ${isWorkMenu ? 'left-full' : 'right-full'} ml-2 -mr-2 bg-white border shadow-md transition-all duration-200 z-60 ${
                    hoveredItemIndex === index ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none translate-x-2'
                  }`}
                  style={{ borderColor: color }}
                >
                  {/* Arrow pointing to the parent item */}
                  <div 
                    className={`absolute top-3 ${isWorkMenu ? '-left-2' : '-right-2'} w-0 h-0`} 
                    style={{ 
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderRight: isWorkMenu ? `6px solid ${color}` : 'none',
                      borderLeft: !isWorkMenu ? `6px solid ${color}` : 'none',
                    }}
                  />
                  <div 
                    className={`absolute top-3 ${isWorkMenu ? '-left-1' : '-right-1'} w-0 h-0`}
                    style={{ 
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderRight: isWorkMenu ? '5px solid white' : 'none',
                      borderLeft: !isWorkMenu ? '5px solid white' : 'none',
                    }}
                  />
                  
                  <div className="py-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex} 
                        href={subItem.href}
                        className="block px-6 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap text-base"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 