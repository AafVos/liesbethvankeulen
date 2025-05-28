'use client';

import Header from '../components/Header';
import { getThemeColors } from '../styles/theme';
import { getEntries, getClient } from '@/lib/contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Choose a light theme for the lessons page
const themeName = 'light';
const theme = getThemeColors(themeName);

// Function to get lessons content from Contentful
async function getLessonsContent() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'lessons'
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Get the rich text content
    const richTextContent = response.items[0].fields.text;
    if (!richTextContent) return null;

    // Convert rich text to HTML
    return documentToHtmlString(richTextContent);
  } catch (error) {
    console.error('Error fetching lessons content from Contentful:', error);
    return null;
  }
}

// Function to get workshop info from Contentful
async function getWorkshopInfo() {
  try {
    const response = await getEntries('textField', {
      'fields.title': 'workshops'
    });
    
    if (response.items.length === 0) {
      return null;
    }
    
    // Get the rich text content
    const richTextContent = response.items[0].fields.text;
    if (!richTextContent) return null;

    // Convert rich text to HTML
    return documentToHtmlString(richTextContent);
  } catch (error) {
    console.error('Error fetching workshop info from Contentful:', error);
    return null;
  }
}

// Function to get lessons image from Contentful
async function getLessonsImage() {
  try {
    const client = getClient();
    const assets = await client.getAssets({
      'fields.title': 'lesson_image_2'
    });
    
    if (!assets.items || assets.items.length === 0) return null;

    const asset = assets.items[0];
    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching lessons image from Contentful:', error);
    return null;
  }
}

// Function to get workshop image from Contentful
async function getWorkshopImage() {
  try {
    const client = getClient();
    const assets = await client.getAssets({
      'fields.title': 'workshop_image'
    });
    
    if (!assets.items || assets.items.length === 0) return null;

    const asset = assets.items[0];
    return {
      url: asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 800,
      height: asset.fields.file.details.image?.height || 800
    };
  } catch (error) {
    console.error('Error fetching workshop image from Contentful:', error);
    return null;
  }
}

// Lessons page navigation items
const lessonsItems = [
  {
    label: 'Lessen',
    href: '/lessons'
  }
];

export default function LessonsPage() {
  const [lessonsContent, setLessonsContent] = useState(null);
  const [workshopInfo, setWorkshopInfo] = useState(null);
  const [lessonsImage, setLessonsImage] = useState(null);
  const [workshopImage, setWorkshopImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const [lessons, workshop, lessonImg, workshopImg] = await Promise.all([
          getLessonsContent(),
          getWorkshopInfo(),
          getLessonsImage(),
          getWorkshopImage()
        ]);
        
        setLessonsContent(lessons);
        setWorkshopInfo(workshop);
        setLessonsImage(lessonImg);
        setWorkshopImage(workshopImg);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadContent();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col animate-fade-in" style={{ backgroundColor: theme.background }}>
        <Header 
          title="Liesbeth van Keulen" 
          subtitle="In search of unexpected beauty" 
          themeName={themeName} 
          PageTitle="Lessen"
          currentPage="lessons"
          workItems={lessonsItems}
        />
        <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto">
          <div className="space-y-16">
            <div className="text-center py-12">
              <p style={{ color: theme.text }}>Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col animate-fade-in" style={{ backgroundColor: theme.background }}>
      <Header 
        title="Liesbeth van Keulen" 
        subtitle="In search of unexpected beauty" 
        themeName={themeName} 
        PageTitle="Lessen"
        currentPage="lessons"
        workItems={lessonsItems}
      />
      
      <main className="flex-1 px-4 md:px-8 py-6 max-w-5xl mx-auto">
        {/* Section blocks */}
        <div className="space-y-16">
          {/* Lessons Block */}
          <Link href="https://www.portretschoolamsterdam.nl/" target="_blank" rel="noopener noreferrer" className="block">
            <section className="bg-white md:shadow-sm md:border animate-slide-in-left cursor-pointer hover:shadow-lg transition-all duration-300" style={{ borderColor: theme.accent }}>
              <div className="flex flex-col">
                {/* Image - Full width at top */}
                {lessonsImage && (
                  <div className="w-full">
                    <div className="aspect-[21/8] relative overflow-hidden">
                      <Image
                        src={`https:${lessonsImage.url}`}
                        alt="Lessen"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="100vw"
                      />
                    </div>
                  </div>
                )}
                {/* Text - Full width below image */}
                <div className="p-6 space-y-4 text-sm w-full" style={{ color: theme.text }}>
                  <h2 className="text-xl mb-4 transition-all duration-300 hover:opacity-80" style={{ 
                    fontFamily: theme.fontFamily,
                    color: theme.heading,
                    fontWeight: 400
                  }}>
                    Schilderlessen
                  </h2>
                  {lessonsContent && (
                    <div className="space-y-4 transition-all duration-300 hover:opacity-90">
                      <div 
                        className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800" 
                        dangerouslySetInnerHTML={{ __html: lessonsContent }} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </Link>
          
          {/* Workshop Block */}
          <Link href="https://www.portretschoolamsterdam.nl/" target="_blank" rel="noopener noreferrer" className="block">
            <section className="bg-white md:shadow-sm md:border animate-slide-in-right cursor-pointer hover:shadow-lg transition-all duration-300" style={{ borderColor: theme.accent }}>
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                {workshopImage && (
                  <div className="lg:w-1/2 lg:order-2">
                    <div className="aspect-square lg:aspect-auto lg:h-full relative overflow-hidden">
                      <Image
                        src={`https:${workshopImage.url}`}
                        alt="Workshop"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
                {/* Text */}
                <div className={`p-6 space-y-4 text-sm ${workshopImage ? 'lg:w-1/2' : 'w-full'} lg:order-1`} style={{ color: theme.text }}>
                  <h2 className="text-xl mb-4 transition-all duration-300 hover:opacity-80" style={{ 
                    fontFamily: theme.fontFamily,
                    color: theme.heading,
                    fontWeight: 400
                  }}>
                    Workshops
                  </h2>
                  {workshopInfo && (
                    <div className="space-y-4 transition-all duration-300 hover:opacity-90">
                      <div 
                        className="prose prose-sm max-w-none [&>p]:mb-4 [&>p:last-child]:mb-0 [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800" 
                        dangerouslySetInnerHTML={{ __html: workshopInfo }} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </Link>
        </div>
      </main>
    </div>
  );
} 