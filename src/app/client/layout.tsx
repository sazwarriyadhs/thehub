'use client';

import { useEffect, useState } from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { ClientSidebarNav } from './components/client-sidebar-nav';
import { Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchClientById } from '@/lib/data';
import type { Client } from '@/types';
import Link from 'next/link';

const LOGGED_IN_CLIENT_ID = 'cli-001';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function getClient() {
        const clientData = await fetchClientById(LOGGED_IN_CLIENT_ID);
        if(clientData) {
            setClient(clientData);
        }
    }
    getClient();
  }, []);

  return (
    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        
        <div className="hidden md:block"></div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          {client && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                          <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait"/>
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-semibold">{client.name}</p>
                  <p className="text-xs text-muted-foreground font-normal">{client.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/client/profile">Profil Saya</Link>
                </DropdownMenuItem>
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
