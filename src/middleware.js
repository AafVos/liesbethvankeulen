import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || '*';
  
  // Define the allowed origins (you can customize this)
  const allowedOrigins = [
    'http://localhost:3000',
    'https://liesbethvankeulen.nl',
    'https://liesbethvankeulen-git-v0-aafvos-projects.vercel.app',
    'https://liesbethvankeulen-git-main-aafvos-projects.vercel.app'
  ];
  
  // Check if the origin is allowed
  const isAllowedOrigin = allowedOrigins.includes(origin) || origin === '*';
  
  // Create response with CORS headers
  const response = NextResponse.next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', isAllowedOrigin ? origin : allowedOrigins[0]);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}

// Only run middleware on API routes
export const config = {
  matcher: '/api/:path*',
}; 