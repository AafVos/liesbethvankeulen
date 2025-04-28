import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function News() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header title="Liesbeth van Keulen" subtitle="In search of unexpected beauty" themeName={themeName} showNavigation={true} PageTitle="News" />
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            <div className="flex flex-col h-64 border" style={{ borderColor: theme.text }}>
              <div 
                className="w-full h-48 bg-gray-200" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                  12 March 2024
                </div>
                <h2 
                  className="text-xl font-light tracking-wide text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  New Exhibition
                </h2>
              </div>
            </div>
            <div className="flex flex-col h-96 border" style={{ borderColor: theme.text }}>
              <div 
                className="w-full h-80 bg-gray-200" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                  5 March 2024
                </div>
                <h2 
                  className="text-xl font-light tracking-wide text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  Artist Talk
                </h2>
              </div>
            </div>
            <div className="flex flex-col h-80 border" style={{ borderColor: theme.text }}>
              <div 
                className="w-full h-64 bg-gray-200" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                  28 February 2024
                </div>
                <h2 
                  className="text-xl font-light tracking-wide text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  Workshop Series
                </h2>
              </div>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-8">
            <div className="flex flex-col h-80 border" style={{ borderColor: theme.text }}>
              <div 
                className="w-full h-64 bg-gray-200" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                  20 February 2024
                </div>
                <h2 
                  className="text-xl font-light tracking-wide text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  Gallery Feature
                </h2>
              </div>
            </div>
            <div className="flex flex-col h-64 border" style={{ borderColor: theme.text }}>
              <div 
                className="w-full h-48 bg-gray-200" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                  15 February 2024
                </div>
                <h2 
                  className="text-xl font-light tracking-wide text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  Studio Update
                </h2>
              </div>
            </div>
            <div className="flex flex-col h-96 border" style={{ borderColor: theme.text }}>
              <div 
                className="w-full h-80 bg-gray-200" 
                style={{ 
                  backgroundColor: theme.text,
                  opacity: 0.1
                }}
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="text-sm" style={{ color: theme.text, opacity: 0.6 }}>
                  10 February 2024
                </div>
                <h2 
                  className="text-xl font-light tracking-wide text-center"
                  style={{ 
                    fontFamily: "'Courier New', Courier, monospace",
                    color: theme.text
                  }}
                >
                  Press Release
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 