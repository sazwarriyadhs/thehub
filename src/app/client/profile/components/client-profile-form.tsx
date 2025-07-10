
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { saveClient } from '@/app/actions';
import type { Client } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Simplified schema for client-side editing
const clientProfileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Nama harus memiliki setidaknya 3 karakter.' }),
  email: z.string().email({ message: 'Silakan masukkan alamat email yang valid.' }),
  phone: z.string().min(10, { message: 'Silakan masukkan nomor telepon yang valid.' }),
  avatar: z.string().url({ message: 'Silakan masukkan URL yang valid untuk avatar.' }).optional().or(z.literal('')),
  penanggungJawabNama: z.string().min(3, { message: 'Nama penanggung jawab harus diisi.' }),
  penanggungJawabJabatan: z.string().min(3, { message: 'Jabatan penanggung jawab harus diisi.' }),
  locationAddress: z.string().min(10, { message: 'Alamat harus memiliki setidaknya 10 karakter.' }),
  // Hidden fields that must be passed along
  joinDate: z.date(),
  preferences: z.string().optional(),
  treatmentHistory: z.string(),
  locationLat: z.coerce.number(),
  locationLng: z.coerce.number(),
});

type ClientProfileFormValues = z.infer<typeof clientProfileFormSchema>;

type ClientProfileFormProps = {
  client: Client;
};

export function ClientProfileForm({ client }: ClientProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  
  const defaultValues: ClientProfileFormValues = {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    avatar: client.avatar,
    penanggungJawabNama: client.penanggungJawab.nama,
    penanggungJawabJabatan: client.penanggungJawab.jabatan,
    locationAddress: client.location.address,
    // Pass through hidden/readonly values
    joinDate: new Date(client.joinDate),
    preferences: client.preferences.join(', '),
    treatmentHistory: client.treatmentHistory,
    locationLat: client.location.lat,
    locationLng: client.location.lng,
  };

  const form = useForm<ClientProfileFormValues>({
    resolver: zodResolver(clientProfileFormSchema),
    defaultValues,
  });

  const { formState, handleSubmit } = form;

  const onSubmit = async (data: ClientProfileFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
           formData.append(key, String(value));
        }
      }
    });

    try {
        await saveClient(formData);
        toast({
            title: `Profil diperbarui`,
            description: `Profil Anda telah berhasil diperbarui.`,
        });
        // Redirect to the profile view page after saving
        router.push('/client/profile');
    } catch (error: any) {
        // Since redirect() throws an error, we catch it here.
        // This is expected behavior for Next.js Server Actions with redirect.
        if (!error.message.includes('NEXT_REDIRECT')) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Terjadi kesalahan tak terduga."
            });
        }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Nama Klinik</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Dermaster Clinic" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="e.g., info@dermaster.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Telepon</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 021-555-1111" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="space-y-4 rounded-md border p-4">
            <h3 className="font-medium">Penanggung Jawab</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="penanggungJawabNama"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Dr. Andreas" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="penanggungJawabJabatan"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Jabatan</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Kepala Cabang" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        
        <div className="space-y-4 rounded-md border p-4">
            <h3 className="font-medium">Lokasi</h3>
            <FormField
                control={form.control}
                name="locationAddress"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Alamat lengkap klinik" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
             {formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
            Perbarui Profil
          </Button>
        </div>
      </form>
    </Form>
  );
}
