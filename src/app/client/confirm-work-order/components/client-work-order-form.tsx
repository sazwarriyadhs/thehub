
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { confirmWorkOrder } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Simplified schema for client confirmation
const clientWorkOrderSchema = z.object({
  workOrderId: z.string().min(3, { message: 'Nomor Surat Tugas harus diisi.' }),
  technicianNotes: z.string().optional(), // Client notes are optional
  status: z.literal('Completed', {
    errorMap: () => ({ message: 'Status must be "Completed".' })
  }),
  photoProofUrl: z.string().optional(),
});


type FormValues = z.infer<typeof clientWorkOrderSchema>;

export function ClientWorkOrderForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(clientWorkOrderSchema),
    defaultValues: {
      workOrderId: '',
      technicianNotes: '',
      status: 'Completed',
      photoProofUrl: '',
    },
  });

  const { formState, handleSubmit } = form;

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    // We only send the fields that matter from the client side
    formData.append('workOrderId', data.workOrderId);
    formData.append('status', data.status);
    if(data.technicianNotes) {
        formData.append('technicianNotes', `Client Note: ${data.technicianNotes}`);
    }

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
                title: "Konfirmasi Berhasil",
                description: "Terima kasih, pekerjaan telah ditandai sebagai selesai.",
            });
            router.push('/client/dashboard');
        }
    } catch (error: any) {
        if (!error.message.includes('NEXT_REDIRECT')) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Terjadi kesalahan saat mengirim konfirmasi."
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
                <FormDescription>Masukkan ID unik dari surat tugas yang diberikan oleh teknisi.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="technicianNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan (Opsional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Jika ada catatan tambahan, Anda bisa menuliskannya di sini."
                  className="resize-y min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Catatan Anda akan ditambahkan ke laporan kerja.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <input type="hidden" {...form.register('status')} />

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
