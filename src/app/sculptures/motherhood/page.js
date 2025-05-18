"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SculpturesMoterhoodRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/sculptures/motherhood');
  }, [router]);

  return null;
} 