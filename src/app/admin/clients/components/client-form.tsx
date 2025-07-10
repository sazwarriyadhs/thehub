'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { saveClient } from '@/app/actions';
import { clientFormSchema } from '@/lib/schemas';
import type { Client } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type ClientFormValues = z.infer<typeof clientFormSchema>;

type ClientFormProps = {
  client?: Client;
};

export function ClientForm({ client }: ClientFormProps) {
  const { toast } = useToast();
  
  const defaultValues: Partial<ClientFormValues> = client ? {
    ...client,
    joinDate: new Date(client.join_date),
    preferences: client.preferences.join(', '),
    penanggungJawabNama: client.penanggung_jawab.nama,
    penanggungJawabJabatan: client.penanggung_jawab.jabatan,
    treatmentHistory: client.treatment_history,
    locationAddress: client.location.address,
    locationLat: client.location.lat,
    locationLng: client.location.lng,
  } : {
    name: '',
    email: '',
    phone: '',
    joinDate: new Date(),
    avatar: 'https://placehold.co/100x100.png',
    penanggungJawabNama: '',
    penanggungJawabJabatan: '',
    treatmentHistory: '',
    preferences: '',
    locationAddress: '',
    locationLat: 0,
    locationLng: 0,
  };

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues,
  });

  const { formState, handleSubmit } = form;

  const onSubmit = async (data: ClientFormValues) => {
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
     if (client?.id) {
        formData.append('id', client.id);
    }

    try {
        await saveClient(formData);
        toast({
            title: `Client ${client ? 'updated' : 'created'}`,
            description: `The client has been successfully ${client ? 'updated' : 'saved'}.`,
        });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred."
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Dermaster Clinic" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 021-555-1111" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="joinDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Join Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                            >
                            {field.value ? (format(field.value, 'PPP')) : (<span>Pick a date</span>)}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
         <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                    <Input placeholder="https://placehold.co/100x100.png" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
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

        <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Preferences / Focus Areas</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., HIFU, CoolSculpting, Filler" {...field} />
                </FormControl>
                <FormDescription>Comma-separated list of client preferences.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
        />

        <FormField
          control={form.control}
          name="treatmentHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase History & Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of client purchase history, notes, shipment info etc."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 rounded-md border p-4">
            <h3 className="font-medium">Location</h3>
            <FormField
                control={form.control}
                name="locationAddress"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Full address of the client" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="locationLat"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                            <Input type="number" step="any" placeholder="e.g., -6.262846" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="locationLng"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                            <Input type="number" step="any" placeholder="e.g., 106.812211" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
             {formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
            {client ? 'Update' : 'Create'} Client
          </Button>
        </div>
      </form>
    </Form>
  );
}
