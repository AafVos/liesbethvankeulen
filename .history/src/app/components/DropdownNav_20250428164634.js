import Link from 'next/link';
import { useState } from 'react';

export default function DropdownNav({ label, items, href }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="text-xl hover:opacity-80 transition-colors duration-300 drop-shadow-md px-2 py-1 block text-center"
        style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 400, letterSpacing: '0.07em' }}
      >
        {label}
      </Link>
      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-white border border-gray-200 shadow-lg rounded z-50 transition-all duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-base text-center"
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
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