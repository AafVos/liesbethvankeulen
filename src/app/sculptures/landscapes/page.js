"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SculptureLandscapesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/sculptures/landscapes');
  }, [router]);

  return null;
} 