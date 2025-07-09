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
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  CalendarDays,
  LifeBuoy,
  LogOut,
  User,
  Package,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelpAssistant } from '@/components/help-assistant';
import Image from 'next/image';

export function ClientSidebarNav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/client/appointments', label: 'My Appointments', icon: CalendarDays },
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
        <SidebarMenu>
          {navLinks.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/client/dashboard'
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
