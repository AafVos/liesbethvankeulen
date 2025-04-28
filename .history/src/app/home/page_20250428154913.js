import Header from '../components/Header';
import NewsletterSubscription from '../components/NewsletterSubscription';
import { getThemeColors } from '../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header title="Liesbeth van Keulen" themeName={themeName} showNavigation={true} />
      <NewsletterSubscription />
      {/* Add your content here */}
    </div>
  );
} 