'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 4000); // Increased delay slightly for video

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 animate-fade-in-zoom bg-black/50 p-8 rounded-lg">
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
