import Header from '../../../components/Header';
import { getThemeColors } from '../../../styles/theme';
import Link from 'next/link';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function SculptureMotherhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={false} 
        PageTitle="Work" 
        currentPage="work"
      />
      
      <div className="container mx-auto px-8 py-8">
        <Link href="/work/sculptures" className="text-xl mb-8 inline-block hover:opacity-80 transition-opacity" style={{ color: theme.text }}>
          ←
        </Link>
        
        <h1 
          className="text-3xl md:text-4xl mb-8 text-center"
          style={{ 
            fontFamily: "'Courier New', Courier, monospace",
            color: theme.text
          }}
        >
          Motherhood Sculptures
        </h1>
        
        <div className="text-center py-12">
          <p style={{ color: theme.text }}>Content coming soon</p>
        </div>
      </div>
    </div>
  );
} 