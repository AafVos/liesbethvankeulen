'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Three.js components to prevent SSR issues
const ThreeARViewer = dynamic(() => import('./ThreeARViewer'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
});

export default function ARViewer({ painting }) {
  const containerRef = useRef(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [useAdvancedMode, setUseAdvancedMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check device and if AR is supported in this browser
  useEffect(() => {
    // Check if we're on a mobile device
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
    
    // Check if the browser supports the features we need
    const isWebXRSupported = 'xr' in navigator;
    const isWebRTCSupported = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    const isWebGLSupported = (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    })();
    
    // Prioritize simpler version on mobile for better performance
    if (isWebGLSupported && isWebRTCSupported) {
      setUseAdvancedMode(!checkMobile()); // Use basic mode on mobile for better performance
    }
    
    setIsARSupported(isWebRTCSupported); // We'll use WebRTC for a simpler version first
    
    if (!isWebRTCSupported) {
      setErrorMessage('Your browser does not support AR features required for this experience.');
    }
    
    // Clean up when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  // Start camera access when user clicks the button
  const startARExperience = async () => {
    // If we're using the advanced mode, we'll handle camera access there
    if (useAdvancedMode) {
      setIsCameraActive(true);
      return;
    }
    
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use the back camera if available
          width: { ideal: isMobile ? 1280 : 1920 },
          height: { ideal: isMobile ? 720 : 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
        setShowInstructions(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setErrorMessage(`Error accessing camera: ${err.message}`);
    }
  };

  // Handle canvas drawing and painting overlays when camera is active (basic mode)
  useEffect(() => {
    if (useAdvancedMode || !isCameraActive || !videoRef.current || !canvasRef.current || !painting) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Create image element for the painting
    const paintingImg = new Image();
    paintingImg.crossOrigin = 'anonymous';
    paintingImg.src = painting.url.startsWith('/') ? painting.url : `https:${painting.url}`;
    
    let isDragging = false;
    let paintingPosition = { x: canvas.width / 2 - 100, y: canvas.height / 2 - 100 };
    let paintingSize = { width: 200, height: 200 * (painting.height / painting.width) };
    let startPosition = { x: 0, y: 0 };
    
    // Draw function to render video and painting overlay
    const draw = () => {
      // Ensure canvas dimensions match video dimensions
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      // Clear canvas and draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Draw painting
      if (paintingImg.complete) {
        ctx.drawImage(
          paintingImg, 
          paintingPosition.x, 
          paintingPosition.y, 
          paintingSize.width, 
          paintingSize.height
        );
        
        // Draw a frame around the painting
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeRect(
          paintingPosition.x, 
          paintingPosition.y, 
          paintingSize.width, 
          paintingSize.height
        );
      }
      
      requestAnimationFrame(draw);
    };
    
    // Start animation loop
    const animationId = requestAnimationFrame(draw);
    
    // Handle interactions
    const handleTouchStart = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      startPosition = { 
        x: touch.clientX - canvas.getBoundingClientRect().left, 
        y: touch.clientY - canvas.getBoundingClientRect().top 
      };
      
      // Check if touch is within painting bounds
      if (
        startPosition.x >= paintingPosition.x && 
        startPosition.x <= paintingPosition.x + paintingSize.width && 
        startPosition.y >= paintingPosition.y && 
        startPosition.y <= paintingPosition.y + paintingSize.height
      ) {
        isDragging = true;
      }
    };
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!isDragging) return;
      
      const touch = e.touches[0];
      const currentPosition = { 
        x: touch.clientX - canvas.getBoundingClientRect().left, 
        y: touch.clientY - canvas.getBoundingClientRect().top 
      };
      
      const deltaX = currentPosition.x - startPosition.x;
      const deltaY = currentPosition.y - startPosition.y;
      
      paintingPosition = {
        x: paintingPosition.x + deltaX,
        y: paintingPosition.y + deltaY
      };
      
      startPosition = currentPosition;
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
    };
    
    // Handle pinch to resize
    let initialDistance = 0;
    
    const handlePinchStart = (e) => {
      if (e.touches.length !== 2) return;
      
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      initialDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
    };
    
    const handlePinchMove = (e) => {
      if (e.touches.length !== 2 || initialDistance === 0) return;
      
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      
      // Calculate scale factor
      const scale = currentDistance / initialDistance;
      
      // Adjust size but maintain aspect ratio
      const newWidth = paintingSize.width * scale;
      paintingSize = {
        width: newWidth,
        height: newWidth * (painting.height / painting.width)
      };
      
      initialDistance = currentDistance;
    };
    
    // Add event listeners
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchstart', handlePinchStart);
    canvas.addEventListener('touchmove', handlePinchMove);
    
    // Remove instructions after 5 seconds
    const instructionsTimer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchstart', handlePinchStart);
      canvas.removeEventListener('touchmove', handlePinchMove);
      clearTimeout(instructionsTimer);
    };
  }, [isCameraActive, painting, useAdvancedMode]);

  // Stop camera when component unmounts or when the user exits AR mode
  const stopARExperience = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      
      {!isCameraActive ? (
        <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gray-100 rounded-lg">
          <p className="text-center text-gray-700">
            Experience how this painting would look on your wall using augmented reality.
          </p>
          
          <button 
            onClick={startARExperience}
            disabled={!isARSupported}
            className={`px-6 py-3 rounded-full ${
              isARSupported 
                ? 'bg-[#6a7b4f] text-white hover:opacity-90' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-colors duration-300 font-normal`}
            style={{ fontFamily: 'Courier New, Courier, monospace' }}
          >
            {isARSupported ? 'Start AR Experience' : 'AR Not Supported'}
          </button>
          
          {!isARSupported && (
            <p className="text-sm text-red-600 text-center">
              Your browser doesn't support AR features. Try using Chrome or Safari on a modern device.
            </p>
          )}
          
          {isMobile && (
            <p className="text-sm text-gray-600 text-center mt-2">
              For best results, hold your device upright and point at a wall with good lighting.
            </p>
          )}
        </div>
      ) : useAdvancedMode ? (
        <div className="relative h-[500px] rounded-lg overflow-hidden">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          }>
            <ThreeARViewer painting={painting} onExit={stopARExperience} />
          </Suspense>
        </div>
      ) : (
        <div className="relative">
          {/* Hidden video element for camera feed */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="hidden" 
          />
          
          {/* Canvas for AR rendering */}
          <canvas 
            ref={canvasRef} 
            className="w-full h-full rounded-lg object-contain touch-manipulation"
          />
          
          {/* Instructions overlay */}
          {showInstructions && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4 rounded-lg">
              <div className="bg-black/70 p-4 rounded-lg text-center max-w-xs">
                <p className="mb-2">Drag to position the painting</p>
                <p className="mb-2">Pinch to resize</p>
                <p>Find a wall to place your painting</p>
              </div>
            </div>
          )}
          
          {/* Exit button */}
          <button 
            onClick={stopARExperience}
            className="absolute top-4 right-4 bg-white/80 text-black p-2 rounded-full shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
} 