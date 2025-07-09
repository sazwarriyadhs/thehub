'use client';

import { SidebarProvider, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { SidebarInset } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';

// Inner component to safely use the client-side hook.
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar(); // Hook to check for mobile viewport.

  return (
    <SidebarInset>
      {/* This header is only rendered on mobile devices */}
      {isMobile && (
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image 
              src="/images/logo.png" 
              alt="AesthetiCare Pro Logo"
              width={24}
              height={24}
              className="rounded-md object-contain"
              data-ai-hint="logo"
            />
            <span className="font-semibold">AesthetiCare Pro</span>
          </Link>
          <SidebarTrigger /> {/* The button to open the sidebar sheet */}
        </header>
      )}
      <div className="p-4 sm:p-6 lg:p-8">{children}</div>
    </SidebarInset>
  );
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarNav />
      <AdminLayoutContent>
        {children}
      </AdminLayoutContent>
    </SidebarProvider>
  );
}
