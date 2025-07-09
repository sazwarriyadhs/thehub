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
- PicoWay® (by Candela), BiAxis Pico™ (by BiAxis): Picosecond Laser for pigmentation (melasma, nevi), tattoo removal, and collagen remodeling.
- Vbeam Perfecta® (by Candela): Pulsed-Dye Laser (PDL) for rosacea, vascular issues, pigmentation, acne scars, and keloids.
- BiAxis QS™ (by BiAxis): Q-switched Laser for acne scars, freckles, pigmentation, and tattoo removal.
- Frax Pro (by Ellipse / Candela): Non-ablative fractional laser for skin resurfacing, improving texture, and collagen stimulation.
- Morpheus8 (by InMode): RF Microneedling for wrinkles, skin laxity, and cellulite.
- Sofwave™ (by Sofwave Medical): 3D Ultrasound for face/neck lifting, fine lines, and cellulite.
- Indiba Deep Care (by INDIBA®): Radio Frequency for body contouring, cellulite, post-surgery care, and circumference reduction.
- Divine Pro (by Pollogen / Lumenis): Multi-treatment platform for facial rejuvenation, dermal volumizing, and skin firming.
- OxyGeneo & Pollogen (by Pollogen / Lumenis): Combines Oxygenation, RF, and Ultrasound for skin brightening, pigmentation, and anti-aging.
- Geneskin® Serum: Skincare product for post-procedure care.
- Other skincare products like cleansers and creams.

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
