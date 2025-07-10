
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryForm } from '../components/inventory-form';
import { fetchAllClients } from '@/lib/data';

export default async function AddInventoryItemPage() {
  const clients = await fetchAllClients();
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Add New Item"
        description="Fill out the form to add a new item to your inventory."
      />
      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InventoryForm clients={clients} />
        </CardContent>
      </Card>
    </div>
  );
}
