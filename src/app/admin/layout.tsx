import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/sidebar-nav';
import { fetchAdminUser } from '@/lib/data';
import AdminLayoutClient from './components/admin-layout-client';


export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const admin = await fetchAdminUser();

  return (
    <SidebarProvider defaultOpen={true}>
      <SidebarNav />
       <AdminLayoutClient admin={admin}>
        {children}
       </AdminLayoutClient>
    </SidebarProvider>
  );
}
