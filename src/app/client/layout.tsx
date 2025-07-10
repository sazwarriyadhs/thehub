import { SidebarProvider } from '@/components/ui/sidebar';
import { ClientSidebarNav } from './components/client-sidebar-nav';
import ClientLayoutContent from './components/client-layout-content';
import { fetchClientById } from '@/lib/data';
import ClientDataFetcher from './components/client-data-fetcher';


export default async function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted/40">
      <SidebarProvider defaultOpen={true}>
        <ClientSidebarNav />
        <ClientLayoutContent client={client}>
            {children}
        </ClientLayoutContent>
      </SidebarProvider>
    </div>
  );
}
