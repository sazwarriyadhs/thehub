'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Upload, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { confirmWorkOrder } from '@/app/actions';
import { workOrderConfirmationSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type FormValues = z.infer<typeof workOrderConfirmationSchema>;

export function WorkOrderConfirmationForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(workOrderConfirmationSchema),
    defaultValues: {
      workOrderId: '',
      technicianNotes: '',
      status: 'In Progress',
      photoProofUrl: 'https://placehold.co/600x400.png'
    },
  });

  const { formState, handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value);
        }
    });

    try {
        const result = await confirmWorkOrder(formData);
        if (result?.error) {
             toast({
                variant: "destructive",
                title: "Error",
                description: result.error,
            });
        } else {
            toast({
                title: "Surat Tugas Diperbarui",
                description: "Status surat tugas telah berhasil diperbarui.",
            });
            // The action will handle redirection, but we can push here as a fallback
            router.push('/admin/services');
        }
    } catch (error: any) {
        if (!error.message.includes('NEXT_REDIRECT')) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Terjadi kesalahan saat memperbarui surat tugas."
            });
        }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="workOrderId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nomor Surat Tugas</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., ser-001" {...field} />
                </FormControl>
                <FormDescription>Masukkan ID unik dari surat tugas yang ingin dikonfirmasi.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Status Pekerjaan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormDescription>Perbarui status pekerjaan. Status "Completed" hanya dapat diatur oleh klien.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="technicianNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan Teknisi</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Contoh: Kalibrasi ulang berhasil, perangkat berfungsi normal..."
                  className="resize-y min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Tambahkan catatan detail tentang pekerjaan yang telah dilakukan.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="photoProofUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Unggah Foto Bukti (Opsional)</FormLabel>
                <FormControl>
                    <div className="flex items-center gap-2">
                        <Input type="file" className="hidden" id="photo-upload" />
                        <Input 
                            placeholder="https://placehold.co/600x400.png" 
                            className="flex-grow"
                            {...field}
                        />
                         <Button type="button" variant="outline" onClick={() => document.getElementById('photo-upload')?.click()}>
                            <Upload/>
                            Pilih File
                        </Button>
                    </div>
                </FormControl>
                 <FormDescription>Unggah gambar sebagai bukti pekerjaan (misalnya, layar perangkat, komponen yang diganti).</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
             {formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
            <Send />
            Kirim Konfirmasi
          </Button>
        </div>
      </form>
    </Form>
  );
}
