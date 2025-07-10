'use client';

import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchAdminUser } from '@/lib/data';
import type { AdminUser } from '@/types';

function AdminLayoutClient({ admin, children }: { admin: AdminUser | null, children: React.ReactNode }) {
  return (
    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
            <SidebarTrigger className="md:hidden" />
            
            <div className="hidden md:flex items-center gap-2 relative">
                <Search className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input placeholder="Search..." className="w-64 bg-muted border-0 pl-10 focus-visible:ring-ring" />
            </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {admin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                          <AvatarImage src={admin.avatar} alt={admin.name} data-ai-hint="person portrait" />
                          <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-semibold">{admin.name}</p>
                  <p className="text-xs text-muted-foreground font-normal">{admin.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/login">Logout</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">{children}</main>
    </SidebarInset>
  );
}


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  useEffect(() => {
    async function getAdmin() {
      const adminData = await fetchAdminUser();
      setAdmin(adminData);
    }
    getAdmin();
  }, []);
  
  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarNav />
       <AdminLayoutClient admin={admin}>
        {children}
       </AdminLayoutClient>
    </SidebarProvider>
  );
}
