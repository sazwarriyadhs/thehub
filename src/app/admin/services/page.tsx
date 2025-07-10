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
import { fetchAllServiceRecords } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, CheckSquare } from 'lucide-react';
import type { ServiceRecord } from '@/types';
import Link from 'next/link';
import { format } from 'date-fns';

const statusVariant: Record<ServiceRecord['status'], 'default' | 'secondary' | 'destructive'> = {
  'Completed': 'default',
  'Scheduled': 'secondary',
  'In Progress': 'destructive',
};

export default async function ServicesPage() {
  const serviceRecords = await fetchAllServiceRecords();

  return (
    <div className="flex flex-col gap-8">
       <div className="flex items-center justify-between gap-4">
        <PageHeader
          title="Service Management"
          description="Log and schedule equipment maintenance and repairs."
        />
        <div className="flex gap-2">
            <Button asChild>
                <Link href="/admin/services/confirm">
                    <CheckSquare />
                    Konfirmasi Surat Tugas
                </Link>
            </Button>
            <Button>
                <PlusCircle />
                Schedule Service
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.equipment}</TableCell>
                  <TableCell>{record.client_name}</TableCell>
                  <TableCell>{format(new Date(record.date), 'PPP')}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[record.status]}>
                        {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/services/${record.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Link>
                    </Button>
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
