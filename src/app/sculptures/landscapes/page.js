import Header from '../../components/Header';
import { getThemeColors } from '../../styles/theme';

const themeName = 'light';
const theme = getThemeColors(themeName);

export default function SculptureLandscapes() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        showNavigation={true} 
        PageTitle="Sculpture Landscapes" 
      />
    </div>
  );
} 