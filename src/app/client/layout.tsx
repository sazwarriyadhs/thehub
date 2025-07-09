'use client';

import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { ClientSidebarNav } from './components/client-sidebar-nav';
import Image from 'next/image';
import Link from 'next/link';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
        <Link href="/client/dashboard" className="flex items-center gap-2">
          <Image 
            src="/images/logo.png" 
            alt="AesthetiCare Pro Logo"
            width={24}
            height={24}
            className="rounded-md object-contain"
            data-ai-hint="logo"
          />
          <span className="font-semibold">Client Portal</span>
        </Link>
        <SidebarTrigger />
      </header>
      <div className="p-4 sm:p-6 lg:p-8">{children}</div>
    </SidebarInset>
  );
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted/40">
      <SidebarProvider defaultOpen={true}>
        <ClientSidebarNav />
        <ClientLayoutContent>
          {children}
        </ClientLayoutContent>
      </SidebarProvider>
    </div>
  );
}
