// 'use server'
'use server';

/**
 * @fileOverview AI-powered product recommendation flow for a distributor's clients.
 *
 * This file defines a Genkit flow that provides product recommendations from a distributor's catalog to its clients (clinics and doctors).
 * - `getProductRecommendations` -  A function that takes a client's profile and returns personalized product recommendations.
 * - `ProductRecommendationsInput` - The input type for the `getProductRecommendations` function.
 * - `ProductRecommendationsOutput` - The output type for the `getProductRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const ProductRecommendationsInputSchema = z.object({
  clientProfile: z
    .string()
    .describe("A profile of the client (an aesthetic clinic or doctor), including their focus areas and purchase history."),
});

export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

// Define the output schema for the flow
const ProductRecommendationsOutputSchema = z.object({
  productRecommendations: z
    .string()
    .describe("A list of recommended products from the distributor's catalog, tailored to the client's practice."),
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
  prompt: `You are an expert sales assistant for an aesthetic device and product distributor. Your clients are aesthetic clinics and doctors.
Based on the following client profile, recommend products from the distributor's catalog that this client should consider purchasing.
Explain why each product is a good fit for their practice. Format the response for clarity.

Client Profile:
{{{clientProfile}}}`,
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
