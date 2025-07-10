
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { appointments } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Appointment } from '@/types';

// Hardcode client ID for demonstration. In a real app, this would come from auth.
const LOGGED_IN_CLIENT_ID = 'cli-001';

const statusConfig: Record<Appointment['status'], { variant: 'default' | 'secondary' | 'destructive', icon: React.ElementType }> = {
    'Confirmed': { variant: 'default', icon: CheckCircle },
    'Pending': { variant: 'secondary', icon: AlertCircle },
    'Cancelled': { variant: 'destructive', icon: XCircle },
};

export default function ClientAppointmentsPage() {
  const clientAppointments = appointments.filter(apt => apt.clientId === LOGGED_IN_CLIENT_ID);
  
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Janji Temu Saya"
        description="Lihat riwayat janji temu Anda yang akan datang dan yang sudah lalu."
      />

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Janji Temu</CardTitle>
        </CardHeader>
        <CardContent>
          {clientAppointments.length > 0 ? (
            <div className="space-y-4">
              {clientAppointments.map((apt) => {
                  const config = statusConfig[apt.status];
                  return (
                      <div key={apt.id} className="flex flex-col sm:flex-row items-start justify-between gap-4 p-4 border rounded-lg">
                          <div>
                              <h3 className="font-semibold text-lg">{apt.service}</h3>
                              <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{apt.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{apt.time}</span>
                              </div>
                          </div>
                          <Badge variant={config.variant} className="mt-2 sm:mt-0 py-2 px-4">
                              <config.icon className="w-4 h-4 mr-2" />
                              {apt.status}
                          </Badge>
                      </div>
                  )
              })}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
                <p>Anda tidak memiliki janji temu yang dijadwalkan.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
