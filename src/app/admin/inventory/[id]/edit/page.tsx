import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InventoryForm } from '../../components/inventory-form';
import { inventoryItems } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const item = inventoryItems.find((i) => i.id === params.id);

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
          <InventoryForm item={item} />
        </CardContent>
      </Card>
    </div>
  );
}
