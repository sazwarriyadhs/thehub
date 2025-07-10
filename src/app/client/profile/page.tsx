
import { PageHeader } from '@/components/page-header';
import { clients } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
    Mail, 
    Phone, 
    Calendar as CalendarIcon, 
    MapPin, 
    Edit,
    User,
    Building
} from 'lucide-react';

const LOGGED_IN_CLIENT_ID = 'cli-001';

export default function ClientProfilePage() {
  const client = clients.find((c) => c.id === LOGGED_IN_CLIENT_ID);

  if (!client) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Profil Saya" description="Kelola informasi akun dan kontak Anda." />
        <Button asChild>
            <Link href={`/client/profile/edit`}>
                <Edit />
                Edit Profil
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-3xl">{client.name}</CardTitle>
                    <p className="text-muted-foreground">Bergabung pada {client.joinDate}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="mt-4">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Informasi Kontak</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <span>{client.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <span>{client.phone}</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-semibold mb-2">Penanggung Jawab</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <User className="w-5 h-5 text-muted-foreground" />
                            <span>{client.penanggungJawab.nama}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <Building className="w-5 h-5 text-muted-foreground" />
                            <span>{client.penanggungJawab.jabatan}</span>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h3 className="text-lg font-semibold mb-2">Alamat Klinik</h3>
                     <div className="flex items-start gap-3 p-3 bg-muted rounded-md text-sm">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-1 shrink-0" />
                        <span>{client.location.address}</span>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
