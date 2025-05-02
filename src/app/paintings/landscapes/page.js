"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandscapesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/paintings/landscapes');
  }, [router]);

  return null;
} 