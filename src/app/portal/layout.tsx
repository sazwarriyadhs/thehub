import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Client Portal - Serenity AesthetiCare Hub',
  description: 'Manage your appointments and view your history.',
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-muted/40">
        <div className="p-4 sm:p-6 lg:p-8 container mx-auto max-w-7xl">
            {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
