import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { appointments } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Appointment } from '@/types';

const statusConfig: Record<Appointment['status'], { variant: 'default' | 'secondary' | 'destructive', icon: React.ElementType }> = {
    'Confirmed': { variant: 'default', icon: CheckCircle },
    'Pending': { variant: 'secondary', icon: AlertCircle },
    'Cancelled': { variant: 'destructive', icon: XCircle },
};

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Appointments"
          description="Manage bookings for client demos, training sessions, and consultations."
        />
        <Button>
          <PlusCircle />
          New Appointment
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {appointments.map((apt) => {
            const config = statusConfig[apt.status];
            return (
                <Card key={apt.id} className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-lg">{apt.service}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{apt.clientName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{apt.time}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Badge variant={config.variant} className="w-full justify-center py-2">
                            <config.icon className="w-4 h-4 mr-2" />
                            {apt.status}
                        </Badge>
                    </CardFooter>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
