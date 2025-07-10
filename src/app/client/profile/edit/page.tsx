
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientProfileForm } from '../components/client-profile-form';
import { clients } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Detail Profil</CardTitle>
                </CardHeader>
                <CardContent>
                <ClientProfileForm client={client} />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Foto Profil</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                     <Avatar className="w-40 h-40">
                        <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
