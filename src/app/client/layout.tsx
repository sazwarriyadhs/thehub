
import { SidebarProvider } from '@/components/ui/sidebar';
import { ClientSidebarNav } from './components/client-sidebar-nav';
import ClientLayoutContent from './components/client-layout-content';
import { fetchClientById } from '@/lib/data';

const LOGGED_IN_CLIENT_ID = 'cli-001';

export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await fetchClientById(LOGGED_IN_CLIENT_ID);

  return (
    <div className="bg-muted/40">
      <SidebarProvider defaultOpen={true}>
        <ClientSidebarNav client={client} />
        <ClientLayoutContent client={client}>
            {children}
        </ClientLayoutContent>
      </SidebarProvider>
    </div>
  );
}
