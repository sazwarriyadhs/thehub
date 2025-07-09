import { PageHeader } from '@/components/page-header';
import { inventoryItems } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Package, ShieldCheck, Tag, Edit } from 'lucide-react';
import type { InventoryItem } from '@/types';
import { TroubleshootingAssistant } from './components/troubleshooting-assistant';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const statusVariant: Record<InventoryItem['status'], 'default' | 'secondary' | 'destructive'> = {
  'In Stock': 'default',
  'Low Stock': 'secondary',
  'Out of Stock': 'destructive',
};

export default function InventoryDetailPage({ params }: { params: { id: string } }) {
  const item = inventoryItems.find((i) => i.id === params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader title={item.name} description={`Details for ${item.name}`} />
        <Button asChild>
          <Link href={`/admin/inventory/${item.id}/edit`}>
            <Edit />
            Edit Item
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card className="overflow-hidden">
            <div className="relative w-full h-64">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    data-ai-hint="medical device"
                />
            </div>
            <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                    <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium">{item.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Quantity: {item.quantity}</span>
              </div>
              <Separator />
               <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Purchased: {item.purchaseDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Warranty Ends: {item.warrantyEndDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.description}</p>
                </CardContent>
            </Card>
            {item.type === 'Device' && <TroubleshootingAssistant machineName={item.name} />}
        </div>
      </div>
    </div>
  );
}
