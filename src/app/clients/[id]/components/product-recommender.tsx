'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generateRecommendations } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  history: z.string().min(20, {
    message: 'Treatment history must be at least 20 characters.',
  }),
});

type ProductRecommenderProps = {
  treatmentHistory: string;
};

export function ProductRecommender({ treatmentHistory }: ProductRecommenderProps) {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      history: treatmentHistory || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);

    const result = await generateRecommendations(values.history);
    
    if (result.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
        });
    } else {
        setRecommendations(result.data?.productRecommendations ?? 'No recommendations available.');
    }
    
    setIsLoading(false);
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>AI Product Recommendations</CardTitle>
            <CardDescription>
              Generate personalized skincare product recommendations based on the client&apos;s treatment history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Treatment History</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Client has received two sessions of micro-needling..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {recommendations && !isLoading &&(
              <Card className="mt-4 bg-accent">
                <CardHeader>
                  <CardTitle className="text-base">Recommended Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{recommendations}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Wand2 />
              )}
              Generate
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
