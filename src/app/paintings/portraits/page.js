"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortraitsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/work/paintings/portraits');
  }, [router]);

  return null;
} 