'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { getTroubleshootingSteps } from '@/app/actions';
import { Loader2, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  problemDescription: z.string().min(10, {
    message: 'Please describe the problem in at least 10 characters.',
  }),
});

type TroubleshootingAssistantProps = {
  machineName: string;
};

export function TroubleshootingAssistant({ machineName }: TroubleshootingAssistantProps) {
  const [steps, setSteps] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSteps(null);

    const result = await getTroubleshootingSteps(machineName, values.problemDescription);

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
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>AI Troubleshooting Assistant</CardTitle>
            <CardDescription>
              Get step-by-step help for issues with your &quot;{machineName}&quot;.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="problemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., The machine is not turning on, I've checked the power cable..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {steps && !isLoading &&(
              <Card className="mt-4 bg-accent">
                <CardHeader>
                  <CardTitle className="text-base">Troubleshooting Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{steps}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Wrench />
              )}
              Get Help
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
