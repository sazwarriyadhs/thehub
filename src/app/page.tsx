'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="animate-fade-in-zoom">
        <Image
          src="/images/logo.png"
          alt="AesthetiCare Pro Logo"
          width={400}
          height={100}
          data-ai-hint="logo"
          className="object-contain"
          priority
        />
      </div>
    </main>
  );
}
