import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { clients } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import { DeleteClientButton } from './components/delete-client-button';

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Clients"
          description="Manage your client relationships and view their history."
        />
        <Button asChild>
          <Link href="/admin/clients/add">
            <PlusCircle />
            Add Client
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarImage src={client.avatar} alt={client.name} data-ai-hint="person portrait" />
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{client.email}</div>
                    <div className="text-xs text-muted-foreground">{client.phone}</div>
                  </TableCell>
                  <TableCell>{client.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/clients/${client.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/clients/${client.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <DeleteClientButton id={client.id} />
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
