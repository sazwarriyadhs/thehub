
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, Upload } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { saveInventoryItem } from '@/app/actions';
import { inventoryFormSchema } from '@/lib/schemas';
import type { InventoryItem, Client } from '@/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

type InventoryFormProps = {
  item?: InventoryItem;
  clients: Client[];
};

export function InventoryForm({ item, clients }: InventoryFormProps) {
  const { toast } = useToast();
  
  const defaultValues: Partial<InventoryFormValues> = item ? {
    ...item,
    purchaseDate: new Date(item.purchase_date),
    warrantyEndDate: item.warranty_end_date ? new Date(item.warranty_end_date) : undefined,
    clientId: item.client_id || 'N/A',
    imageUrl: item.image_url,
  } : {
    type: 'Device',
    status: 'In Stock',
    quantity: 1,
    clientId: 'N/A',
    imageUrl: '',
  };
  
  const [imagePreview, setImagePreview] = useState(item?.image_url || 'https://placehold.co/600x400.png');


  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues,
  });

  const { formState, handleSubmit, setValue, watch } = form;
  
  const imageUrlValue = watch('imageUrl');

  React.useEffect(() => {
    if (imageUrlValue) {
      setImagePreview(imageUrlValue);
    }
  }, [imageUrlValue]);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setValue('imageUrl', result, { shouldValidate: true });
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = async (data: InventoryFormValues) => {
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
    
    if (item?.id) {
        formData.append('id', item.id);
    }

    try {
        await saveInventoryItem(formData);
        toast({
            title: `Item ${item ? 'updated' : 'created'}`,
            description: `The inventory item has been successfully ${item ? 'updated' : 'saved'}.`,
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
        <input type="hidden" {...form.register('id')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Item Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Sofwave™" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="e.g., 5" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select item type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="Device">Device</SelectItem>
                        <SelectItem value="Skincare">Skincare</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                 <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select item status" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Purchase Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={'outline'}
                            className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                            )}
                            >
                            {field.value ? (
                                format(field.value, 'PPP')
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="warrantyEndDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Warranty End Date (Optional)</FormLabel>
                     <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={'outline'}
                            className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                            )}
                            >
                            {field.value ? (
                                format(field.value, 'PPP')
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
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
            name="clientId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Assign to Client (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a client to assign this item to" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="N/A">N/A (In Warehouse)</SelectItem>
                            {clients.map(client => (
                                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormDescription>Assigning a device to a client will make it appear on their portal.</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of the item..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
            <FormLabel>Item Image</FormLabel>
            {imagePreview && (
                <div className="relative w-full max-w-sm h-48 rounded-md overflow-hidden border">
                    <Image
                        src={imagePreview}
                        alt="Image preview"
                        fill
                        className="object-contain"
                        data-ai-hint="medical device"
                    />
                </div>
            )}
            <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="sr-only">Image URL</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-2">
                            <Input 
                                placeholder="https://placehold.co/600x400.png" 
                                className="flex-grow"
                                {...field}
                                value={field.value || ''}
                            />
                            <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                                <Upload/>
                                Upload File
                            </Button>
                            <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
             {formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
            {item ? 'Update' : 'Create'} Item
          </Button>
        </div>
      </form>
    </Form>
  );
}
