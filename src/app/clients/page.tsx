import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { clients } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Clients"
          description="Manage your client relationships and view their history."
        />
        <Button>
          <PlusCircle />
          Add Client
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardHeader className="items-center">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{client.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4"/>
                <span>{client.email}</span>
              </div>
               <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
                <Phone className="w-4 h-4"/>
                <span>{client.phone}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/clients/${client.id}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
