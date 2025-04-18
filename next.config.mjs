/** @type {import('next').NextConfig} */
import nextVideos from 'next-videos';

const nextConfig = {
  ...nextVideos(),
  images: {
    domains: ['images.ctfassets.net'],
    formats: ['image/avif', 'image/webp'],
  }
};

export default nextConfig;
