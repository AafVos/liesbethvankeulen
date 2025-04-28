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
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Artist photo */}
          <div className="md:w-1/3 relative">
            <div className="aspect-square relative rounded overflow-hidden">
              {/* Replace this with your actual image */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Artist Photo</p>
              </div>
            </div>
          </div>
          
          {/* Artist bio */}
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
              
              <p>
                My work is inspired by the rich tradition of Dutch painting, the vibrant colors of impressionism, 
                and the ever-changing landscapes of the Netherlands. Each piece tells a story of a place, a moment, 
                or an emotion that resonated deeply with me.
              </p>
              
              <p>
                I began my artistic journey in Maastricht, where I studied fine arts and developed my distinct style. 
                Over the years, I have exhibited my work in galleries across the Netherlands and Europe.
              </p>
              
              <p>
                When creating a landscape, I often visit the location multiple times to understand how light changes 
                throughout the day and how the seasons transform the scene. This intimate knowledge of place allows me 
                to capture not just the visual elements, but also the feeling and atmosphere of each unique location.
              </p>
              
              <p>
                I work primarily with oil on canvas, appreciating the rich textures and depth that can be achieved 
                with this medium. My paintings often feature bold brushstrokes and a careful attention to the play 
                of light across different surfaces.
              </p>
              
              <h3 className="text-lg mt-6 mb-2" style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: theme.heading,
                fontWeight: 400
              }}>
                Exhibitions
              </h3>
              
              <ul className="list-disc pl-5">
                <li>Solo Exhibition, Gallery Amsterdam, 2023</li>
                <li>Dutch Landscapes, Collective Exhibition, Maastricht, 2022</li>
                <li>Modern Impressions, Art Fair Rotterdam, 2021</li>
                <li>New Perspectives, Gallery Utrecht, 2020</li>
              </ul>
              
              <h3 className="text-lg mt-6 mb-2" style={{ 
                fontFamily: "'Courier New', Courier, monospace",
                color: theme.heading,
                fontWeight: 400
              }}>
                Artist Statement
              </h3>
              
              <p>
                "In my work, I seek to capture the essence of a place or person, distilling the complex emotions and 
                atmosphere into a visual language that speaks directly to the viewer. I believe art should create a 
                connection, inviting the audience to see the world through new eyes and experience the beauty that 
                surrounds us daily."
              </p>
              
              <p className="mt-8">
                Thank you for your interest in my work. If you would like to discuss commissions, exhibitions, or 
                purchase inquiries, please don't hesitate to contact me.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 