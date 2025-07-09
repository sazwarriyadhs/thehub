import { clients, appointments } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import Link from 'next/link';
import {
  Calendar,
  Mail,
  Phone,
  LogOut,
  Heart,
  Bot,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import type { Appointment } from '@/types';

// Hardcode client ID for demonstration. In a real app, this would come from auth.
const LOGGED_IN_CLIENT_ID = 'cli-001';

const statusConfig: Record<Appointment['status'], { variant: 'default' | 'secondary' | 'destructive', icon: React.ElementType }> = {
    'Confirmed': { variant: 'default', icon: CheckCircle },
    'Pending': { variant: 'secondary', icon: AlertCircle },
    'Cancelled': { variant: 'destructive', icon: XCircle },
};

export default function ClientDashboardPage() {
  const client = clients.find((c) => c.id === LOGGED_IN_CLIENT_ID);
  
  if (!client) {
    notFound();
  }

  const clientAppointments = appointments.filter(apt => apt.clientId === client.id);
  const upcomingAppointments = clientAppointments.filter(apt => new Date(apt.date) >= new Date() && apt.status !== 'Cancelled');

  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-foreground">AesthetiCare Pro Portal</h1>
            </div>
            <Button variant="ghost" asChild>
                <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Link>
            </Button>
        </header>

        <PageHeader
            title={`Welcome back, ${client.name}!`}
            description="Here's a summary of your account with us."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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
                                                    <p className="text-sm text-muted-foreground">{apt.date} at {apt.time}</p>
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

                <Card>
                    <CardHeader>
                        <CardTitle>Notes &amp; History</CardTitle>
                        <CardDescription>A log of your purchase history and our notes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.treatmentHistory}</p>
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
                        <p className="text-sm text-muted-foreground">Joined on {client.joinDate}</p>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
