
'use client';

import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  CalendarDays,
  LifeBuoy,
  LogOut,
  User,
  CheckSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelpAssistant } from '@/components/help-assistant';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Client } from '@/types';

const LOGGED_IN_CLIENT_ID = 'cli-001';

export function ClientSidebarNav() {
  const pathname = usePathname();
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    async function getClient() {
      try {
        const response = await fetch(`/api/clients/${LOGGED_IN_CLIENT_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }
        const clientData = await response.json();
        setClient(clientData);
      } catch (error) {
        console.error(error);
        setClient(null);
      }
    }
    getClient();
  }, []);

  const navLinks = [
    { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/client/profile', label: 'Profil Saya', icon: User },
    { href: '/client/appointments', label: 'Janji Temu Saya', icon: CalendarDays },
    { href: '/client/confirm-work-order', label: 'Konfirmasi Surat Tugas', icon: CheckSquare },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex w-full items-center justify-between px-1">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Image 
              src="/images/logo.png" 
              alt="AesthetiCare Pro Logo"
              width={32}
              height={32}
              className="rounded-md object-contain"
              data-ai-hint="logo"
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold tracking-tight font-headline">
                AesthetiCare
              </h2>
              <p className="text-sm text-muted-foreground -mt-1">Client Portal</p>
            </div>
          </div>
          <SidebarTrigger className="group-data-[collapsible=icon]:mx-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {client && (
            <>
                <div className="p-2 flex flex-col items-center text-center gap-2 group-data-[collapsible=icon]:hidden">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                </div>
                <SidebarSeparator className="my-2" />
            </>
        )}
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/client/dashboard' && pathname === item.href
                    ? true
                    : item.href !== '/client/dashboard' && pathname.startsWith(item.href)
                }
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <HelpAssistant>
            <SidebarMenuButton tooltip="Help">
                <LifeBuoy />
                <span>Help</span>
            </SidebarMenuButton>
         </HelpAssistant>
         <SidebarMenuButton asChild tooltip="Logout">
            <Link href="/login">
                <LogOut />
                <span>Logout</span>
            </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
