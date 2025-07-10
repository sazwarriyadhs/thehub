import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WorkOrderConfirmationForm } from './components/work-order-confirmation-form';

export default function ConfirmWorkOrderPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Konfirmasi Surat Tugas"
        description="Isi formulir untuk memperbarui status dan menambahkan catatan pada surat tugas."
      />
      <Card>
        <CardHeader>
          <CardTitle>Detail Pekerjaan</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkOrderConfirmationForm />
        </CardContent>
      </Card>
    </div>
  );
}
