import { PageHeader } from '@/components/page-header';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Edit, User } from 'lucide-react';
import { fetchAdminUser } from '@/lib/data';

export default async function AdminProfilePage() {
  const admin = await fetchAdminUser();

  if (!admin) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Admin Profile" description="Manage your admin account information." />
        <Button asChild>
            <Link href={`/admin/profile/edit`}>
                <Edit />
                Edit Profile
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                    <AvatarImage src={admin.avatar} alt={admin.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-3xl">{admin.name}</CardTitle>
                </div>
            </div>
        </CardHeader>
        <CardContent className="mt-4">
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <User className="w-5 h-5 text-muted-foreground" />
                            <span>{admin.name}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <span>{admin.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
