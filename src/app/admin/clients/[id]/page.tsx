import { PageHeader } from '@/components/page-header';
import { clients } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ProductRecommender } from './components/product-recommender';
import { Mail, Phone, Calendar as CalendarIcon, Tag } from 'lucide-react';

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const client = clients.find((c) => c.id === params.id);

  if (!client) {
    notFound();
  }

  const clientProfile = `Client: ${client.name}\nHistory and Focus: ${client.treatmentHistory}`;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title={client.name} description={`Client Profile & History`} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-semibold font-headline">{client.name}</h2>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <CardTitle>Client Notes / History</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{client.treatmentHistory}</p>
                </CardContent>
            </Card>
            <ProductRecommender clientProfile={clientProfile} />
        </div>
      </div>
    </div>
  );
}
