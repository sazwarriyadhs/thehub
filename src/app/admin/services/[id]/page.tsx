import { notFound } from 'next/navigation';
import { fetchServiceRecordById } from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Calendar, User, MapPin, HardHat, Clock, AlertTriangle, ShieldCheck, Settings } from 'lucide-react';
import type { ServiceRecord } from '@/types';
import { ServiceReportActions } from './components/service-report-actions';
import { format } from 'date-fns';

const statusVariant: Record<ServiceRecord['status'], 'default' | 'secondary' | 'destructive'> = {
  'Completed': 'default',
  'Scheduled': 'secondary',
  'In Progress': 'destructive',
};

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const serviceRecord = await fetchServiceRecordById(params.id);

  if (!serviceRecord) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title={`Service Report: ${serviceRecord.equipment}`}
          description={`Details for service ID #${serviceRecord.id}`}
        />
        <ServiceReportActions serviceRecord={serviceRecord} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Problem Identification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{serviceRecord.problem_identification}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Solution & Work Performed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{serviceRecord.solution}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Report Summary
              </CardTitle>
              <CardDescription>
                <Badge variant={statusVariant[serviceRecord.status]} className="mt-2">{serviceRecord.status}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>Client: <strong>{serviceRecord.client_name}</strong></span>
                </div>
                <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <span>Location: <strong>{serviceRecord.client_location}</strong></span>
                </div>
              <Separator />
                <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Date: <strong>{format(new Date(serviceRecord.date), 'PPP')}</strong></span>
                </div>
                 <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span>Service Type: <strong>{serviceRecord.service_type}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                    <HardHat className="w-4 h-4 text-muted-foreground" />
                    <span>Technician: <strong>{serviceRecord.technician}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Duration: <strong>{serviceRecord.duration}</strong></span>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
