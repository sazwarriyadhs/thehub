'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Client } from '@/types';

export default function ClientLayoutContent({
  client,
  children,
}: {
  client: Client | null | undefined;
  children: React.ReactNode;
}) {
  const [currentClient, setCurrentClient] = useState(client);

  useEffect(() => {
    setCurrentClient(client);
  }, [client]);

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

          {currentClient && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar>
                          <AvatarImage src={currentClient.avatar} alt={currentClient.name} data-ai-hint="person portrait"/>
                          <AvatarFallback>{currentClient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-semibold">{currentClient.name}</p>
                  <p className="text-xs text-muted-foreground font-normal">{currentClient.email}</p>
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
