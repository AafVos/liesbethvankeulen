import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function Work() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header title="Liesbeth van Keulen" subtitle="In search of unexpected beauty" themeName={themeName} showNavigation={true} PageTitle="Work" />
      <div className="h-[calc(100vh-12rem)] px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row gap-8 h-full">
          <Link href="/work/paintings" className="w-full md:w-1/2 h-1/2 md:h-full relative group">
            <div 
              className="h-full w-full" 
              style={{ 
                backgroundColor: theme.text,
                opacity: 0.1
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide transition-opacity duration-300 group-hover:opacity-80"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                Paintings
              </h2>
            </div>
          </Link>
          <Link href="/work/sculptures" className="w-full md:w-1/2 h-1/2 md:h-full relative group">
            <div 
              className="h-full w-full" 
              style={{ 
                backgroundColor: theme.text,
                opacity: 0.1
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 
                className="text-4xl font-light tracking-wide transition-opacity duration-300 group-hover:opacity-80"
                style={{ 
                  fontFamily: "'Courier New', Courier, monospace",
                  color: theme.text
                }}
              >
                Sculptures
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 