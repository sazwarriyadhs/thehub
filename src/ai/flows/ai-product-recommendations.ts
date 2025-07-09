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

Distributor's Product Catalog:
- Sofwave™: Non-invasive ultrasound for skin lifting, fine line removal, and skin tightening, including face and neck.
- Indiba Deep Care: Radio-frequency for body treatments, helps in circumference reduction & faster recovery.
- Vbeam Perfecta®: PDL laser for treating pigmentation, spots, acne scars, rosacea, stretch marks, and more.
- PicoWay®: Pico-second laser for melasma, pigmentation, and tattoo removal.
- BiAxis QS™: Multidimensional laser for pigments, tattoos, rejuvenation, and hair removal.
- Ultra V: Polydioxanone (PDO) threads for nose augmentation, volumizing, and collagen stimulation.
- Morpheus8: Combination of microneedling and RF to address fine lines and cellulite.
- Coolfase: Monopolar RF with Direct Cooling technology for skin tightening and contouring.
- Lipodefine™: Endolifting technology using fat melting and collagen stimulation for double chin and facial contouring.
- Laser Biaxis QS: Laser for improving melasma, pigmentation, and tattoo removal with minimal downtime.
- Hydrafacial: A multi-step facial treatment that cleanses, exfoliates, extracts, and hydrates the skin.
- Pico Laser: Advanced pico-second laser for tattoo removal and skin revitalization.
- Geneskin® Serum: Skincare product for post-procedure care.

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
