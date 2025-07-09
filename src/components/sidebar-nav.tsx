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
  Moon,
  Sun,
  Bot,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HelpAssistant } from './help-assistant';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/inventory', label: 'Inventory', icon: Box },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/monitoring', label: 'Monitoring', icon: Activity },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/map', label: 'Technician Map', icon: Map },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold tracking-tight font-headline">
              Serenity
            </h2>
            <p className="text-sm text-muted-foreground -mt-1">AesthetiCare</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={
                  item.href === '/'
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
          <SidebarMenuButton>
            <LifeBuoy />
            <span>Help</span>
          </SidebarMenuButton>
        </HelpAssistant>
      </SidebarFooter>
    </Sidebar>
  );
}
