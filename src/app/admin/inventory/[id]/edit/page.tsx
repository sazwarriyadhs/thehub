
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryForm } from '../../components/inventory-form';
import { notFound } from 'next/navigation';
import { fetchInventoryItemById, fetchAllClients } from '@/lib/data';

export default async function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const [item, clients] = await Promise.all([
    fetchInventoryItemById(params.id),
    fetchAllClients()
  ]);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Edit Item"
        description={`Editing details for ${item.name}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryForm item={item} clients={clients} />
        </CardContent>
      </Card>
    </div>
  );
}
