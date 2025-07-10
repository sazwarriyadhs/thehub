
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientProfileForm } from '../components/client-profile-form';
import { clients } from '@/lib/data';
import { notFound } from 'next/navigation';

const LOGGED_IN_CLIENT_ID = 'cli-001';

export default function EditClientProfilePage() {
  const client = clients.find((c) => c.id === LOGGED_IN_CLIENT_ID);

  if (!client) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Edit Profil"
        description={`Memperbarui detail untuk ${client.name}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Detail Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientProfileForm client={client} />
        </CardContent>
      </Card>
    </div>
  );
}
