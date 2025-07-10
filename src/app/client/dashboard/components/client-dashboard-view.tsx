
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import {
  Calendar,
  Mail,
  Phone,
  Heart,
  CheckCircle,
  AlertCircle,
  XCircle,
  ShieldAlert,
  Wrench,
  BrainCircuit,
} from 'lucide-react';
import type { Appointment, InventoryItem, Client } from '@/types';
import { ClientTroubleshootingAssistant } from './client-troubleshooting-assistant';
import { ClientServiceRequest } from './client-service-request';
import { format } from 'date-fns';

const statusConfig: Record<Appointment['status'], { variant: 'default' | 'secondary' | 'destructive', icon: React.ElementType }> = {
    'Confirmed': { variant: 'default', icon: CheckCircle },
    'Pending': { variant: 'secondary', icon: AlertCircle },
    'Cancelled': { variant: 'destructive', icon: XCircle },
};

const isWarrantyExpiringSoon = (endDate: string): boolean => {
    if (!endDate || endDate === 'N/A') return false;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 90;
};

type ClientDashboardViewProps = {
    client: Client;
    appointments: Appointment[];
    machines: InventoryItem[];
}

export function ClientDashboardView({ client, appointments, machines }: ClientDashboardViewProps) {
  const [troubleshootingMachine, setTroubleshootingMachine] = useState<InventoryItem | null>(null);
  const [serviceRequestMachine, setServiceRequestMachine] = useState<InventoryItem | null>(null);

  const upcomingAppointments = appointments.filter(apt => new Date(apt.date) >= new Date() && apt.status !== 'Cancelled');

  return (
    <div className="flex flex-col gap-8">
        <PageHeader
            title={`Welcome back, ${client.name}!`}
            description="Here's a summary of your account with us."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>My Machines</CardTitle>
                        <CardDescription>Monitor your purchased equipment, check warranties, and get help.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {machines.length > 0 ? (
                            <div className="space-y-4">
                                {machines.map(machine => (
                                    <div key={machine.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
                                        <Image
                                            src={machine.image_url}
                                            alt={machine.name}
                                            width={100}
                                            height={100}
                                            className="rounded-md object-cover w-full sm:w-24 sm:h-24"
                                            data-ai-hint="medical device"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{machine.name}</h3>
                                            <p className="text-sm text-muted-foreground">Status: <span className="text-green-600 font-medium">Operational</span></p>
                                            {machine.warranty_end_date && isWarrantyExpiringSoon(machine.warranty_end_date) && (
                                                <Badge variant="destructive" className="mt-2">
                                                    <ShieldAlert className="mr-2 h-4 w-4" />
                                                    Warranty Expiring Soon
                                                </Badge>
                                            )}
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Warranty Ends: {machine.warranty_end_date ? format(new Date(machine.warranty_end_date), 'PPP') : 'N/A'}
                                            </p>
                                        </div>
                                        <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                                            <Button size="sm" className="w-full justify-start" onClick={() => setTroubleshootingMachine(machine)}>
                                                <BrainCircuit className="mr-2 h-4 w-4" />
                                                Troubleshoot
                                            </Button>
                                            <Button size="sm" variant="outline" className="w-full justify-start" onClick={() => setServiceRequestMachine(machine)}>
                                                <Wrench className="mr-2 h-4 w-4" />
                                                Request Service
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                <p>You have not purchased any machines yet.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Demos &amp; Trainings</CardTitle>
                        <CardDescription>Your next scheduled sessions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {upcomingAppointments.length > 0 ? (
                            <ul className="space-y-4">
                                {upcomingAppointments.map(apt => {
                                    const config = statusConfig[apt.status];
                                    return (
                                        <li key={apt.id} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-md border bg-card">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                                    <Calendar className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold">{apt.service}</p>
                                                    <p className="text-sm text-muted-foreground">{format(new Date(apt.date), 'PPP')} at {apt.time}</p>
                                                </div>
                                            </div>
                                            <Badge variant={config.variant}>
                                                <config.icon className="mr-2 h-4 w-4" />
                                                {apt.status}
                                            </Badge>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <div className="text-center text-muted-foreground py-8">
                                <p>You have no upcoming appointments.</p>
                                <Button size="sm" className="mt-4">Request a Demo</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Card className="sticky top-8">
                    <CardHeader className="items-center text-center">
                        <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait"/>
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{client.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Joined on {format(new Date(client.join_date), 'PPP')}</p>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <Separator />
                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <span>{client.phone}</span>
                        </div>
                        <Separator />
                         <div className="flex items-start gap-3">
                            <Heart className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium">Focus Areas</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {client.preferences.map(pref => <Badge key={pref} variant="secondary">{pref}</Badge>)}
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-base">Purchase History</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.treatment_history}</p>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </div>
        <ClientTroubleshootingAssistant
            machine={troubleshootingMachine}
            isOpen={!!troubleshootingMachine}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    setTroubleshootingMachine(null);
                }
            }}
        />
        <ClientServiceRequest
            machine={serviceRequestMachine}
            isOpen={!!serviceRequestMachine}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    setServiceRequestMachine(null);
                }
            }}
            clientId={client.id}
            clientName={client.name}
        />
    </div>
  );
}
