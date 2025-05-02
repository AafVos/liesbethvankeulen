'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';

// The painting frame component
function PaintingFrame({ painting, position = [0, 0, -2], rotation = [0, 0, 0] }) {
  const imageUrl = painting.url.startsWith('/') ? painting.url : `https:${painting.url}`;
  const texture = useTexture(imageUrl);
  const frameRef = useRef();
  
  // Calculate aspect ratio
  const aspectRatio = painting.width / painting.height;
  
  // Fixed height for the painting (in 3D units, roughly meters)
  const height = 1;
  const width = height * aspectRatio;
  
  // Add a small border for the frame
  const frameThickness = 0.05;
  const frameBorder = 0.03;
  const frameWidth = width + frameBorder * 2;
  const frameHeight = height + frameBorder * 2;
  
  // Allow dragging the painting
  const { camera } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [initialPosition, setInitialPosition] = useState([...position]);
  
  useFrame((state, delta) => {
    // Add subtle movement to make it more realistic
    if (frameRef.current && !isDragging) {
      frameRef.current.rotation.y += Math.sin(state.clock.elapsedTime * 0.1) * 0.0005;
    }
  });
  
  return (
    <group
      ref={frameRef}
      position={position}
      rotation={rotation}
      onPointerDown={(e) => {
        e.stopPropagation();
        setIsDragging(true);
        setInitialPosition([frameRef.current.position.x, frameRef.current.position.y, frameRef.current.position.z]);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerMissed={() => setIsDragging(false)}
      onPointerMove={(e) => {
        if (isDragging) {
          // Move in the camera's plane
          const offset = new THREE.Vector3(e.movementX, -e.movementY, 0)
            .applyQuaternion(camera.quaternion)
            .multiplyScalar(0.01);
          
          frameRef.current.position.x += offset.x;
          frameRef.current.position.y += offset.y;
          frameRef.current.position.z += offset.z;
        }
      }}
    >
      {/* Frame */}
      <mesh position={[0, 0, -frameThickness / 2]}>
        <boxGeometry args={[frameWidth, frameHeight, frameThickness]} />
        <meshStandardMaterial color="#f1e9db" roughness={0.5} metalness={0.05} />
      </mesh>
      
      {/* Painting */}
      <mesh position={[0, 0, frameThickness / 2 + 0.001]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      
      {/* Shadow catcher */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -frameHeight / 2 - 0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[frameWidth * 1.5, frameWidth * 1.5]} />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

// Scene component to handle video background
function ARScene({ painting, videoRef }) {
  const { gl, scene } = useThree();
  
  // Set up video texture as background
  useEffect(() => {
    if (!videoRef.current) return;
    
    // Create video texture - ensuring it's properly loaded
    const checkVideoTexture = () => {
      if (videoRef.current.readyState < 2) {
        // Video not ready yet, check again in 100ms
        setTimeout(checkVideoTexture, 100);
        return;
      }
      
      // Video is ready, create texture
      try {
        const videoTexture = new THREE.VideoTexture(videoRef.current);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        
        // Safari compatibility fix
        if (videoTexture.format === undefined) {
          videoTexture.format = THREE.RGBAFormat;
        } else {
          videoTexture.format = THREE.RGBFormat;
        }
        
        // Create background
        scene.background = videoTexture;
      } catch (error) {
        console.error('Error creating video texture:', error);
      }
    };
    
    checkVideoTexture();
    
    return () => {
      scene.background = null;
    };
  }, [videoRef, scene]);
  
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      />
      <PaintingFrame painting={painting} />
    </>
  );
}

export default function ThreeARViewer({ painting, onExit }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [error, setError] = useState(null);
  const [isSafari, setIsSafari] = useState(false);
  
  // Check if we're on Safari
  useEffect(() => {
    const checkSafari = () => {
      const ua = navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) || 
             /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };
    
    setIsSafari(checkSafari());
  }, []);
  
  // Start camera when component mounts
  useEffect(() => {
    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access is not supported by your browser');
        }

        // Safari has specific camera constraints requirements
        const videoConstraints = {
          facingMode: 'environment', // Use back camera if available
        };
        
        if (isSafari) {
          Object.assign(videoConstraints, {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          });
        } else {
          Object.assign(videoConstraints, {
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          });
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          
          // For Safari, we need to handle video loading differently
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().then(() => {
              setVideoReady(true);
            }).catch(err => {
              console.error('Error playing video:', err);
              setError(`Error playing video: ${err.message}`);
            });
          };
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        
        // Provide more specific error messages
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setError('Camera access was denied. Please enable camera permissions to use AR.');
        } else {
          setError(`Error accessing camera: ${err.message}`);
        }
      }
    }
    
    startCamera();
    
    // Clean up on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isSafari]);
  
  return (
    <div className="relative w-full h-full">
      {/* Video element that will be used as texture */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="hidden"
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
      
      {!videoReady ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <Canvas
            shadows
            camera={{ position: [0, 0, 2], fov: 75 }}
            style={{ touchAction: 'none' }} // Prevent browser touches from interfering with our controls
            gl={{ 
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: true // Helps with some Safari rendering issues
            }}
          >
            <Suspense fallback={null}>
              <ARScene painting={painting} videoRef={videoRef} />
              <OrbitControls enableZoom={true} enablePan={false} />
            </Suspense>
          </Canvas>
          
          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded text-sm">
            Drag to move • Pinch to zoom • Rotate to position
          </div>
        </>
      )}
      
      {/* Exit button */}
      <button 
        onClick={onExit}
        className="absolute top-4 right-4 bg-white/80 text-black p-2 rounded-full shadow-md z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
} 