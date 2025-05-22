import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

// Define the work items structure
const workItems = [
  {
    label: 'Werken',
    href: '/work',
    subItems: [
      { 
        label: 'Schilderijen', 
        href: '/work/paintings',
        subItems: [
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
        ]
      },
      { 
        label: 'Beelden', 
        href: '/work/sculptures',
        subItems: []
      }
    ]
  }
];

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function WorkLayout({ children }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        currentPage="work"
        workItems={workItems}
      />
      {children}
    </div>
  );
} 