import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientForm } from '../components/client-form';

export default function AddClientPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Add New Client"
        description="Fill out the form to add a new client to your records."
      />
      <Card>
        <CardHeader>
          <CardTitle>Client Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm />
        </CardContent>
      </Card>
    </div>
  );
}
