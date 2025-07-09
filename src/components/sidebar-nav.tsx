'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
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

export function SidebarNav() {
  const pathname = usePathname();

  const mainLinks = [{ href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard }];
  const operationsLinks = [
    { href: '/admin/inventory', label: 'Inventory', icon: Box },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/monitoring', label: 'Monitoring', icon: Activity },
  ];
  const clientLinks = [
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  ];
  const mapLink = [{ href: '/admin/map', label: 'Technician Map', icon: Map }];

  const renderLinks = (links: typeof mainLinks) =>
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
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>{renderLinks(mainLinks)}</SidebarMenu>
        
        <div>
          <div className="px-3 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Operations</div>
          <SidebarMenu>{renderLinks(operationsLinks)}</SidebarMenu>
        </div>

        <div>
            <div className="px-3 mb-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Clients</div>
            <SidebarMenu>{renderLinks(clientLinks)}</SidebarMenu>
        </div>

        <SidebarMenu>{renderLinks(mapLink)}</SidebarMenu>
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
