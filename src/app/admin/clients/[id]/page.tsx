import { PageHeader } from '@/components/page-header';
import { clients, inventoryItems, clientRequests } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProductRecommender } from './components/product-recommender';
import Link from 'next/link';
import { 
    Mail, 
    Phone, 
    Calendar as CalendarIcon, 
    Tag, 
    MapPin, 
    Package, 
    Eye,
    Wrench,
    BrainCircuit,
    HelpCircle,
    Edit,
    User,
    Building,
    History,
} from 'lucide-react';
import type { ClientRequest } from '@/types';

const requestIcons: Record<ClientRequest['requestType'], React.ElementType> = {
  'Service': Wrench,
  'Troubleshoot': BrainCircuit,
  'Inquiry': HelpCircle,
};

const requestStatusVariant: Record<ClientRequest['status'], 'default' | 'secondary' | 'destructive'> = {
  'New': 'destructive',
  'In Progress': 'secondary',
  'Resolved': 'default',
};

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    notFound();
  }

  const deployedMachines = inventoryItems.filter(item => item.clientId === client.id && item.type === 'Device');
  const clientSpecificRequests = clientRequests.filter(req => req.clientId === client.id);

  const clientProfile = `Client: ${client.name}\nHistory and Focus: ${client.treatmentHistory}`;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader title={client.name} description={`Client Profile & History`} />
        <Button asChild>
            <Link href={`/admin/clients/${client.id}/edit`}>
                <Edit />
                Edit Client
            </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{client.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                <div>
                    <p className="text-sm font-medium">{client.penanggungJawab.nama}</p>
                    <p className="text-xs text-muted-foreground">{client.penanggungJawab.jabatan}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{client.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Joined on {client.joinDate}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                <span className="text-sm">{client.location.address}</span>
              </div>
              <Separator />
               <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-muted-foreground mt-1" />
                <div className="flex flex-wrap gap-2">
                    {client.preferences.map(pref => <Badge key={pref} variant="secondary">{pref}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><History className="w-5 h-5" /> Purchase History & Notes</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.treatmentHistory}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Package className="w-5 h-5" /> Deployed Machines ({deployedMachines.length})</CardTitle>
                    <CardDescription>Equipment currently installed and active at this client's location.</CardDescription>
                </CardHeader>
                <CardContent>
                    {deployedMachines.length > 0 ? (
                        <ul className="space-y-3">
                            {deployedMachines.map(machine => (
                                <li key={machine.id} className="flex items-center justify-between p-3 rounded-lg border">
                                    <div className="flex items-center gap-3">
                                        <Image src={machine.imageUrl} alt={machine.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="medical device" />
                                        <div>
                                            <span className="font-medium">{machine.name}</span>
                                            <p className="text-xs text-muted-foreground">Purchased: {machine.purchaseDate}</p>
                                        </div>
                                    </div>
                                    <Button asChild variant="ghost" size="icon">
                                        <Link href={`/admin/inventory/${machine.id}`}>
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View Machine</span>
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No machines deployed to this client.</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Service Requests</CardTitle>
                    <CardDescription>Recent service and help requests from this client.</CardDescription>
                </CardHeader>
                <CardContent>
                    {clientSpecificRequests.length > 0 ? (
                        <div className="space-y-4">
                            {clientSpecificRequests.map((request) => {
                                const Icon = requestIcons[request.requestType];
                                return (
                                    <div key={request.id} className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary shrink-0 mt-1">
                                            <Icon className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">{request.details}</p>
                                                <Badge variant={requestStatusVariant[request.status]}>{request.status}</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">{request.date} &bull; {request.requestType}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No service requests from this client.</p>
                    )}
                </CardContent>
            </Card>

            <ProductRecommender clientProfile={clientProfile} />
        </div>
      </div>
    </div>
  );
}
