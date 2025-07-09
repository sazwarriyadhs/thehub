// 'use server'
'use server';

/**
 * @fileOverview AI-powered skincare product recommendation flow.
 *
 * This file defines a Genkit flow that provides skincare product recommendations based on a client's treatment history.
 * - `getProductRecommendations` -  A function that takes a client's treatment history as input and returns personalized product recommendations.
 * - `ProductRecommendationsInput` - The input type for the `getProductRecommendations` function.
 * - `ProductRecommendationsOutput` - The output type for the `getProductRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const ProductRecommendationsInputSchema = z.object({
  clientTreatmentHistory: z
    .string()
    .describe("A detailed history of the client's past aesthetic treatments and skincare products used."),
});

export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

// Define the output schema for the flow
const ProductRecommendationsOutputSchema = z.object({
  productRecommendations: z
    .string()
    .describe("A list of skincare product recommendations tailored to the client's treatment history."),
});

export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

// Exported function to get product recommendations
export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

// Define the prompt for the AI model
const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `Based on the following client treatment history:\n\n{{{clientTreatmentHistory}}}\n\nRecommend skincare products that would be most effective for the client. Explain why each product is recommended in relation to their treatment history.\n\nFormat your response as a list of product names with a short explanation for each.`,
});

// Define the Genkit flow
const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);
