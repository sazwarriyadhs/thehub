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
import { inventoryItems, clients } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, Edit } from 'lucide-react';
import type { InventoryItem } from '@/types';
import Link from 'next/link';
import { DeleteItemButton } from './components/delete-item-button';

const statusVariant: Record<InventoryItem['status'], 'default' | 'secondary' | 'destructive'> = {
  'In Stock': 'default',
  'Low Stock': 'secondary',
  'Out of Stock': 'destructive',
};

export default function InventoryPage() {
  const clientMap = new Map(clients.map((c) => [c.id, c.name]));

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
                  <TableCell>{item.clientId ? clientMap.get(item.clientId) : 'N/A'}</TableCell>
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
