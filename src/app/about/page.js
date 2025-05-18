import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';

// Choose a light theme for the about page
const themeName = 'light';
const theme = getThemeColors(themeName);

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        themeName={themeName} 
        showNavigation={true} 
      />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-2xl hover:opacity-80 transition-opacity" style={{ color: theme.link }}>
            ←
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl mb-8" style={{ 
          fontFamily: "'Courier New', Courier, monospace",
          color: theme.heading,
          fontWeight: 400
        }}>
          About Me
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Artist photo */}
          <div className="md:w-1/3 relative">
            <div className="aspect-square relative rounded overflow-hidden">
              {/* Replace this with your actual image */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Artist Photo</p>
              </div>
            </div>
          </div>
          
          {/* Quick intro */}
          <div className="md:w-2/3" style={{ color: theme.text }}>
            <h2 className="text-xl mb-4" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Liesbeth van Keulen
            </h2>
            
            <div className="space-y-4 text-sm">
              <p>
                Welcome to my artistic world. I am a Dutch painter with a passion for capturing the beauty of landscapes, 
                creating evocative portraits, and exploring form through sculpture.
              </p>
            </div>
          </div>
        </div>
        
        {/* Section blocks */}
        <div className="space-y-16">
          {/* Biography Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Biography
            </h2>
            
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              <p>
                Born in a small town near Amsterdam, Liesbeth van Keulen discovered her passion for art at an early age. 
                The daughter of a carpenter and a textile artist, she grew up surrounded by creativity and craftsmanship, 
                influences that would later shape her artistic vision.
              </p>
              
              <p>
                After completing her formal education in fine arts, Liesbeth spent several years traveling through Europe, 
                absorbing different artistic traditions and developing her unique style. She returned to the Netherlands in 
                2010 and established her studio in a converted warehouse overlooking the canals of Amsterdam.
              </p>
              
              <p>
                Her work has evolved over the years, moving from strict realism toward a more interpretive approach that 
                captures the emotional essence of her subjects. Liesbeth is particularly known for her ability to evoke mood 
                through her masterful use of light and shadow.
              </p>
            </div>
          </section>
          
          {/* Statement Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Statement
            </h2>
            
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              <p>
                "My work explores the delicate relationship between humanity and the natural world. I am fascinated by 
                landscapes that bear the subtle imprint of human presence – a path worn through a field, a distant farmhouse, 
                or the geometric patterns of agricultural land.
              </p>
              
              <p>
                Through my paintings, I seek to capture not just the visual reality of a place, but its emotional resonance. 
                Each landscape carries a mood, a history, and a sense of time passing. I strive to distill these elements into 
                compositions that invite the viewer to pause and contemplate their own relationship with the natural environment.
              </p>
              
              <p>
                My portraits aim to reveal something of the interior life of my subjects – a momentary emotion, a characteristic 
                gesture, or a hint of their personal story. I believe that a successful portrait creates a dialogue between subject 
                and viewer, bridging the gap between their separate experiences of the world.
              </p>
              
              <p>
                In all my work, I am searching for unexpected beauty – those quiet moments of visual poetry that might otherwise 
                go unnoticed in our fast-paced world."
              </p>
            </div>
          </section>
          
          {/* Education Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Education
            </h2>
            
            <div className="space-y-4 text-sm" style={{ color: theme.text }}>
              <ul className="space-y-3">
                <li>
                  <p className="font-medium">2005-2009</p>
                  <p>MFA in Painting, Royal Academy of Art, The Hague</p>
                  <p className="text-gray-600">Thesis: "Light as Narrative: Storytelling Through Illumination in Dutch Landscape Painting"</p>
                </li>
                
                <li>
                  <p className="font-medium">2001-2005</p>
                  <p>BFA in Fine Arts, Gerrit Rietveld Academy, Amsterdam</p>
                </li>
                
                <li>
                  <p className="font-medium">2010</p>
                  <p>Artist Residency, Florence Trust, London</p>
                </li>
                
                <li>
                  <p className="font-medium">2012</p>
                  <p>Master Class in Portraiture with Martin Yeoman, Royal Drawing School, London</p>
                </li>
              </ul>
            </div>
          </section>
          
          {/* Exhibitions Block */}
          <section className="bg-white p-6 rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${theme.accent}` }}>
            <h2 className="text-2xl mb-6" style={{ 
              fontFamily: "'Courier New', Courier, monospace",
              color: theme.heading,
              fontWeight: 400
            }}>
              Exhibitions
            </h2>
            
            <div className="space-y-6 text-sm" style={{ color: theme.text }}>
              <div>
                <h3 className="font-medium text-base mb-2">Solo Exhibitions</h3>
                <ul className="space-y-2">
                  <li>
                    <p className="font-medium">2023</p>
                    <p>"Shifting Horizons," Gallery Amsterdam, Amsterdam</p>
                  </li>
                  <li>
                    <p className="font-medium">2021</p>
                    <p>"Silent Dialogues," Kunsthal Rotterdam, Rotterdam</p>
                  </li>
                  <li>
                    <p className="font-medium">2019</p>
                    <p>"The Hidden Landscape," Museum of Modern Art, Utrecht</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-2">Group Exhibitions</h3>
                <ul className="space-y-2">
                  <li>
                    <p className="font-medium">2022</p>
                    <p>"Contemporary Dutch Landscapes," Van Gogh Museum, Amsterdam</p>
                  </li>
                  <li>
                    <p className="font-medium">2020</p>
                    <p>"New Perspectives," International Art Fair, Maastricht</p>
                  </li>
                  <li>
                    <p className="font-medium">2018</p>
                    <p>"European Masters," Galerie d'Art Contemporain, Paris</p>
                  </li>
                  <li>
                    <p className="font-medium">2016</p>
                    <p>"Northern Light," Scandinavian Art Collective, Copenhagen</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
} 