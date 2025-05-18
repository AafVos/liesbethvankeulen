"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SculptureBirdsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/sculptures/birds');
  }, [router]);

  return null;
} 