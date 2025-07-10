import { fetchClientById } from '@/lib/data';
import ClientLayoutContent from './client-layout-content';

// In a real app, this would come from user authentication
const LOGGED_IN_CLIENT_ID = 'cli-001';

export default async function ClientDataFetcher({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = await fetchClientById(LOGGED_IN_CLIENT_ID);

  return (
    <ClientLayoutContent client={client}>
      {children}
    </ClientLayoutContent>
  );
}