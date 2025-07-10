import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProfileForm } from '../components/admin-profile-form';
import { notFound } from 'next/navigation';
import { fetchAdminUser } from '@/lib/data';

export default async function EditAdminProfilePage() {
  const admin = await fetchAdminUser();

  if (!admin) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Edit Profile"
        description={`Updating details for ${admin.name}`}
      />
      <Card>
          <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
          <AdminProfileForm admin={admin} />
          </CardContent>
      </Card>
    </div>
  );
}
