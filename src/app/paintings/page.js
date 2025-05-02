"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaintingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/paintings');
  }, [router]);

  return null;
} 