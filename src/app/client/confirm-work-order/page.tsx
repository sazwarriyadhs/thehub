import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ClientWorkOrderForm } from './components/client-work-order-form';

export default function ConfirmWorkOrderPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Konfirmasi Surat Tugas"
        description="Setelah tim teknisi menyelesaikan pekerjaan, mohon konfirmasi penyelesaiannya di sini."
      />
      <Card>
        <CardHeader>
          <CardTitle>Formulir Konfirmasi Pekerjaan</CardTitle>
          <CardDescription>Masukkan nomor surat tugas yang diberikan oleh teknisi untuk menyelesaikan proses.</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientWorkOrderForm />
        </CardContent>
      </Card>
    </div>
  );
}
