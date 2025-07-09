'use client';

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
  Box,
  Wrench,
  Users,
  CalendarDays,
  Map,
  LifeBuoy,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelpAssistant } from './help-assistant';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SidebarNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/inventory', label: 'Inventory', icon: Box },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/monitoring', label: 'Monitoring', icon: Activity },
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
    { href: '/admin/map', label: 'Technician Map', icon: Map }
  ];

  const renderLinks = (links: typeof navLinks) =>
    links.map((item) => (
      <SidebarMenuItem key={item.label}>
        <SidebarMenuButton
          asChild
          isActive={
            item.href === '/admin/dashboard'
              ? pathname === item.href
              : pathname.startsWith(item.href)
          }
          tooltip={item.label}
        >
          <Link href={item.href}>
            <item.icon />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

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
              <p className="text-sm text-muted-foreground -mt-1">Pro</p>
            </div>
          </div>
          <SidebarTrigger className="group-data-[collapsible=icon]:mx-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <div className="p-2 flex flex-col items-center text-center gap-2 group-data-[collapsible=icon]:hidden">
            <Avatar className="w-20 h-20">
                <AvatarImage src="https://placehold.co/100x100.png" alt="Admin User" data-ai-hint="person portrait" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold">Admin</p>
                <p className="text-xs text-muted-foreground">admin@aestheticare.pro</p>
            </div>
        </div>
        <SidebarSeparator className="my-2" />

        <SidebarMenu>{renderLinks(navLinks)}</SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <HelpAssistant>
          <SidebarMenuButton>
            <LifeBuoy />
            <span>Help</span>
          </SidebarMenuButton>
        </HelpAssistant>
      </SidebarFooter>
    </Sidebar>
  );
}
