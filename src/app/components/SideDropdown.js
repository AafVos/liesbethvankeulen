'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function SideDropdown({ label, items = [], color, href }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const itemTimeoutRefs = useRef({});
  const dropdownRef = useRef(null);
  
  // Check if global menu is open
  useEffect(() => {
    const checkIsMenuOpen = () => {
      const menuOverlay = document.querySelector('.backdrop-blur-md.opacity-100');
      const isOpen = !!menuOverlay;
      
      setIsMainMenuOpen(isOpen);
      
      if (isOpen && isHovered) {
        setIsHovered(false); // Close this dropdown if main menu is open
      }
    };

    // Run check initially and set up mutation observer
    checkIsMenuOpen();
    
    const observer = new MutationObserver(checkIsMenuOpen);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [isHovered]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setHoveredItemIndex(null);
    }, 100); // Small delay to prevent menu flickering when moving between parent and dropdown
  };

  const handleItemMouseEnter = (index) => {
    if (itemTimeoutRefs.current[index]) {
      clearTimeout(itemTimeoutRefs.current[index]);
    }
    setHoveredItemIndex(index);
    console.log('Side item hovered:', index); // Debugging
  };

  const handleItemMouseLeave = (index) => {
    itemTimeoutRefs.current[index] = setTimeout(() => {
      if (hoveredItemIndex === index) {
        setHoveredItemIndex(null);
      }
    }, 100);
  };

  // Fix hover event propagation issues
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`relative flex items-center ${isMainMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main navigation item */}
      <Link 
        href={href}
        className="text-xl md:text-2xl hover:opacity-80 transition-colors duration-300 drop-shadow-md flex items-center"
        style={{ 
          fontFamily: "'Courier New', Courier, monospace",
          fontWeight: 400,
          letterSpacing: '0.07em',
          color
        }}
      >
        {label}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-1 transition-transform duration-300"
          style={{ transform: isHovered ? 'rotate(-90deg)' : 'rotate(0)' }}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke={color}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
      
      {/* Side dropdown menu */}
      <div 
        className={`absolute top-1/2 -translate-y-1/2 left-full ml-2 z-50 bg-white border shadow-md transition-all duration-200 ${
          isHovered ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-2'
        }`}
        style={{ borderColor: color }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Arrow pointing to the main item */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -left-2 w-0 h-0" 
          style={{ 
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: `6px solid ${color}`,
          }}
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 -left-1 w-0 h-0" 
          style={{ 
            borderTop: '5px solid transparent',
            borderBottom: '5px solid transparent',
            borderRight: '5px solid white',
          }}
        />
        
        <div className="py-2">
          {items.map((item, index) => (
            <div 
              key={index}
              className="relative"
              onMouseEnter={(e) => { stopPropagation(e); handleItemMouseEnter(index); }}
              onMouseLeave={(e) => { stopPropagation(e); handleItemMouseLeave(index); }}
            >
              <Link 
                href={item.href}
                className="block px-6 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap text-base flex items-center justify-between"
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
                  className={`absolute top-0 left-full ml-2 z-60 bg-white border shadow-md transition-all duration-200 ${
                    hoveredItemIndex === index ? 'opacity-100 pointer-events-auto translate-x-0' : 'opacity-0 pointer-events-none -translate-x-2'
                  }`}
                  style={{ borderColor: color }}
                  onMouseEnter={(e) => { stopPropagation(e); handleItemMouseEnter(index); }}
                >
                  {/* Arrow pointing to the parent item */}
                  <div 
                    className="absolute top-3 -left-2 w-0 h-0" 
                    style={{ 
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderRight: `6px solid ${color}`,
                    }}
                  />
                  <div 
                    className="absolute top-3 -left-1 w-0 h-0" 
                    style={{ 
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      borderRight: '5px solid white',
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