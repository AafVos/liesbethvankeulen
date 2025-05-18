"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SculpturesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/sculptures');
  }, [router]);

  return null;
} 