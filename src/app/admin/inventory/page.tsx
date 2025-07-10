
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, Edit } from 'lucide-react';
import type { InventoryItem, Client } from '@/types';
import Link from 'next/link';
import { DeleteItemButton } from './components/delete-item-button';
import { useEffect, useState } from 'react';

const statusVariant: Record<InventoryItem['status'], 'default' | 'secondary' | 'destructive'> = {
  'In Stock': 'default',
  'Low Stock': 'secondary',
  'Out of Stock': 'destructive',
};

// This is a temporary solution to fetch data on the client side until server components are updated.
async function fetchInventoryAndClients(): Promise<{ inventoryItems: InventoryItem[], clients: Client[] }> {
    const resInv = await fetch('/api/inventory');
    const inventoryItems = await resInv.json();
    const resClients = await fetch('/api/clients');
    const clients = await resClients.json();
    return { inventoryItems, clients };
}


export default function InventoryPage() {
  // Client-side data fetching as a temporary measure.
  // In a real app, this would be a server component fetching data directly.
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [clientMap, setClientMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    async function loadData() {
        const res = await fetch('/api/data?q=inventory');
        const { inventoryItems, clients } = await res.json();
        setInventoryItems(inventoryItems);
        setClientMap(new Map(clients.map((c: any) => [c.id, c.name])));
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Inventory"
          description="Track and manage your devices and skincare products."
        />
        <Button asChild>
          <Link href="/admin/inventory/add">
            <PlusCircle />
            Add Item
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.client_id ? clientMap.get(item.client_id) : 'N/A'}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/inventory/${item.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                     <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/inventory/${item.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <DeleteItemButton id={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
