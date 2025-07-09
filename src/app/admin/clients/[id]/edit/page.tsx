import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientForm } from '../../components/client-form';
import { clients } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function EditClientPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Edit Client"
        description={`Editing details for ${client.name}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm client={client} />
        </CardContent>
      </Card>
    </div>
  );
}
