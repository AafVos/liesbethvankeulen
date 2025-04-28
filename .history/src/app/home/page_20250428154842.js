import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header title="Liesbeth van Keulen" themeName={themeName} showNavigation={true} />
      {/* Add your content here */}
    </div>
  );
} 