'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function PageTitleDropdown({ items = [], color }) {
  const [open, setOpen] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const itemTimeoutRefs = useRef({});
  const [isMobile, setIsMobile] = useState(false);

  // Get the title from the highest level item
  const title = items[0]?.label || '';

  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setExpandedItems({});
      }
    };

    // Add event listener when dropdown is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };
  
  const handleMouseLeave = () => {
    if (isMobile) return; // Don't auto-close on mobile
    
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setHoveredItemIndex(null);
    }, 150); // Small delay to prevent menu flickering
  };

  const handleItemMouseEnter = (index) => {
    if (isMobile) return; // Don't use hover on mobile
    
    if (itemTimeoutRefs.current[index]) {
      clearTimeout(itemTimeoutRefs.current[index]);
    }
    setHoveredItemIndex(index);
  };

  const handleItemMouseLeave = (index) => {
    if (isMobile) return; // Don't use hover on mobile
    
    itemTimeoutRefs.current[index] = setTimeout(() => {
      if (hoveredItemIndex === index) {
        setHoveredItemIndex(null);
      }
    }, 100);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event from bubbling to document
    setOpen(!open);
  };

  const toggleSubItems = (index, e) => {
    // Prevent navigating to the parent link on mobile
    if (isMobile && items[index].subItems && items[index].subItems.length > 0) {
      e.preventDefault();
      e.stopPropagation(); // Prevent event from bubbling to document
      setExpandedItems(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    }
  };


  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Title that serves as dropdown button */}
      <div 
        className="flex items-center justify-center text-2xl md:text-3xl font-normal tracking-wide"
        style={{ 
          fontFamily: "'Courier New', Courier, monospace",
          color
        }}
      >
        {items[0]?.subItems?.length > 0 ? (
          <div 
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            {title}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-2 transition-transform duration-300 ease-in-out ${open ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke={color}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        ) : (
          <Link href={items[0]?.href || '#'}>
            {title}
          </Link>
        )}
      </div>
      
      {/* Dropdown menu */}
      {items[0]?.subItems?.length > 0 && (
        <div 
          className={`${isMobile ? 'absolute left-0 right-0' : 'absolute left-1/2 -translate-x-1/2 min-w-[180px]'} z-[100] mt-2 bg-white border shadow-md transition-all duration-300 ease-in-out ${
            open 
              ? 'opacity-100 pointer-events-auto translate-y-0 scale-100' 
              : 'opacity-0 pointer-events-none translate-y-1 scale-95 origin-top'
          }`}
          style={{ borderColor: color }}
          onClick={(e) => e.stopPropagation()} // Prevent clicking inside dropdown from closing it
        >
          <div className="py-2">
            {items[0]?.subItems?.map((item, index) => (
              <div 
                key={index}
                className="relative"
                onMouseEnter={() => handleItemMouseEnter(index)}
                onMouseLeave={() => handleItemMouseLeave(index)}
              >
                <Link 
                  href={item.href}
                  className={`block px-4 py-2 text-gray-800 hover:bg-gray-100 text-center flex items-center justify-center whitespace-nowrap ${isMobile ? 'justify-start' : 'justify-center'} transition-all duration-200`}
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                  onClick={(e) => toggleSubItems(index, e)}
                >
                  {item.label}
                  {item.subItems && item.subItems.length > 0 && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3 w-3 ml-2 transition-transform duration-300 ease-in-out"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      style={{
                        transform: `${
                          (isMobile && expandedItems[index]) || (!isMobile && hoveredItemIndex === index)
                            ? 'rotate(-90deg)' 
                            : 'rotate(0deg)'
                        }`
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                
                {/* Desktop: Nested dropdown for subitems */}
                {!isMobile && item.subItems && item.subItems.length > 0 && (
                  <div 
                    className={`absolute top-0 left-full bg-white border shadow-md transition-all duration-300 ease-in-out z-60 ${
                      hoveredItemIndex === index 
                        ? 'opacity-100 pointer-events-auto translate-x-0' 
                        : 'opacity-0 pointer-events-none translate-x-2'
                    }`}
                    style={{ borderColor: color }}
                  >
                    <div className="py-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link 
                          key={subIndex} 
                          href={subItem.href}
                          className="block px-6 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap text-base transition-colors duration-200"
                          style={{ fontFamily: "'Courier New', Courier, monospace" }}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Mobile: Vertical indented subitems */}
                {isMobile && item.subItems && item.subItems.length > 0 && (
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-b border-gray-100 ${
                      expandedItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <Link 
                        key={subIndex} 
                        href={subItem.href}
                        className="block pl-8 pr-4 py-2 text-gray-800 hover:bg-gray-100 whitespace-nowrap text-base text-left transition-colors duration-200"
                        style={{ fontFamily: "'Courier New', Courier, monospace" }}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 