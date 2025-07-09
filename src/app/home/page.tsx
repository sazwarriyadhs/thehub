import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4 sm:p-6 lg:p-8">
      <div className="container max-w-5xl text-center">
        <div className="mb-8 flex justify-center">
          <Image 
            src="/images/logo.png" 
            alt="AesthetiCare Pro Logo" 
            width={300} 
            height={80} 
            data-ai-hint="logo"
            className="object-contain"
          />
        </div>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
          Platform lengkap untuk distributor mesin dan produk estetika.
          Optimalkan operasi Anda, dari inventaris hingga manajemen klien.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-left overflow-hidden flex flex-col">
                <Image 
                    src="/images/admin.jpeg"
                    alt="Distributor Dashboard"
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint="medical equipment"
                />
                <CardContent className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-semibold mb-2">Untuk Distributor</h2>
                    <p className="text-muted-foreground mb-6 flex-grow">
                        Kelola inventaris, layanan, klien, dan analitik dalam satu dasbor canggih.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/login">
                            <LogIn className="mr-2"/>
                            Masuk Portal Admin
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card className="text-left overflow-hidden flex flex-col">
                <Image 
                    src="https://placehold.co/600x400.png"
                    alt="Client Portal"
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint="clinic reception"
                />
                <CardContent className="p-6 flex flex-col flex-grow">
                     <h2 className="text-2xl font-semibold mb-2">Untuk Klinik & Dokter</h2>
                    <p className="text-muted-foreground mb-6 flex-grow">
                        Akses riwayat pembelian, jadwalkan pelatihan, dan lihat janji temu dengan mudah.
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href="/login">
                            <LogIn className="mr-2"/>
                            Masuk Portal Klien
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
