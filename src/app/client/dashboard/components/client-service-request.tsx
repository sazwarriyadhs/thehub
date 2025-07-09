'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { requestService } from '@/app/actions';
import { Loader2, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { InventoryItem } from '@/types';

const formSchema = z.object({
  details: z.string().min(10, {
    message: 'Please describe the service needed in at least 10 characters.',
  }),
});

type ClientServiceRequestProps = {
  machine: InventoryItem | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  clientId: string;
  clientName: string;
};

export function ClientServiceRequest({ machine, isOpen, onOpenChange, clientId, clientName }: ClientServiceRequestProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      details: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setIsLoading(false);
    }
  }, [isOpen, form]);

  if (!machine) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await requestService({
        clientId: clientId,
        clientName: clientName,
        details: `Service for ${machine?.name}: ${values.details}`,
    });

    if (result.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
        });
    } else {
        toast({
            title: "Service Requested",
            description: "Your service request has been sent. We will contact you shortly.",
        });
        onOpenChange(false);
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Request Service: {machine.name}</DialogTitle>
              <DialogDescription>
                Please describe the service you require for this machine.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 space-y-4">
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Details</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Annual maintenance, handpiece replacement..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Wrench />
                )}
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
