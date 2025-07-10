
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientForm } from '../../components/client-form';
import { notFound } from 'next/navigation';
import { fetchClientById } from '@/lib/data';

export default async function EditClientPage({ params }: { params: { id: string } }) {
  const client = await fetchClientById(params.id);

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
