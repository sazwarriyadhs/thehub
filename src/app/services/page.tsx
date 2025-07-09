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
import { serviceRecords } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { ServiceRecord } from '@/types';

const statusVariant: Record<ServiceRecord['status'], 'default' | 'secondary' | 'destructive'> = {
  'Completed': 'default',
  'Scheduled': 'secondary',
  'In Progress': 'destructive',
};


export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-8">
       <div className="flex items-center justify-between">
        <PageHeader
          title="Service Management"
          description="Log and schedule equipment maintenance and repairs."
        />
        <Button>
          <PlusCircle />
          Schedule Service
        </Button>
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
                <TableHead>Service Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead className="text-right">Cost</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.equipment}</TableCell>
                  <TableCell>{record.serviceType}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.technician}</TableCell>
                  <TableCell className="text-right">${record.cost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[record.status]}>
                        {record.status}
                    </Badge>
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
