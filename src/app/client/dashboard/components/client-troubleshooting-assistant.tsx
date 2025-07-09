'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getTroubleshootingSteps } from '@/app/actions';
import { Loader2, BrainCircuit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { InventoryItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  problemDescription: z.string().min(10, {
    message: 'Please describe the problem in at least 10 characters.',
  }),
});

type ClientTroubleshootingAssistantProps = {
  machine: InventoryItem | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function ClientTroubleshootingAssistant({ machine, isOpen, onOpenChange }: ClientTroubleshootingAssistantProps) {
  const [steps, setSteps] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemDescription: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setSteps(null);
      setIsLoading(false);
    }
  }, [isOpen, form]);

  if (!machine) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSteps(null);

    const result = await getTroubleshootingSteps(machine!.name, values.problemDescription);

    if (result.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
        });
    } else {
        setSteps(result.data?.troubleshootingSteps ?? 'No troubleshooting steps available.');
    }

    setIsLoading(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>AI Troubleshooter: {machine.name}</DialogTitle>
              <DialogDescription>
                Describe the issue you're facing, and we'll provide step-by-step guidance.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 space-y-4">
              <FormField
                control={form.control}
                name="problemDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., The machine is not turning on..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {steps && !isLoading && (
                <Card className="bg-accent max-h-60 overflow-y-auto">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Recommended Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="py-3">
                    <p className="text-sm whitespace-pre-wrap">{steps}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <BrainCircuit />
                )}
                Get Help
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
