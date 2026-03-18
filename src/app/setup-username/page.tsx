'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SetupUsername() {
  const router = useRouter();

  useEffect(() => {
    // Reverted mandatory flow - redirecting to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
