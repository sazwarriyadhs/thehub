'use server';
/**
 * @fileOverview An AI-powered assistant for troubleshooting aesthetic machines.
 *
 * - getTroubleshootingAssistance - A function that provides troubleshooting steps for a given machine and problem.
 * - TroubleshootingInput - The input type for the getTroubleshootingAssistance function.
 * - TroubleshootingOutput - The return type for the getTroubleshootingAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TroubleshootingInputSchema = z.object({
  machineName: z.string().describe('The name of the aesthetic machine.'),
  problemDescription: z.string().describe('A description of the problem the user is facing with the machine.'),
});
export type TroubleshootingInput = z.infer<typeof TroubleshootingInputSchema>;

const TroubleshootingOutputSchema = z.object({
  troubleshootingSteps: z.string().describe('A step-by-step guide to troubleshoot the issue.'),
});
export type TroubleshootingOutput = z.infer<typeof TroubleshootingOutputSchema>;

export async function getTroubleshootingAssistance(input: TroubleshootingInput): Promise<TroubleshootingOutput> {
  return troubleshootingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'troubleshootingPrompt',
  input: {schema: TroubleshootingInputSchema},
  output: {schema: TroubleshootingOutputSchema},
  prompt: `You are a senior service technician for a distributor of high-end aesthetic machines. A client needs help troubleshooting an issue.
Provide clear, step-by-step instructions to help them diagnose and potentially resolve the problem. Always prioritize safety and suggest contacting a certified technician for any complex repairs.

The user is having an issue with the following machine:
Machine: {{{machineName}}}

Problem Description:
{{{problemDescription}}}

Distributor's Product Catalog (for context on machine capabilities):
- PicoWay®, BiAxis Pico™: Picosecond Laser for pigmentation (melasma, nevi), tattoo removal, and collagen remodeling.
- Vbeam Perfecta®: Pulsed-Dye Laser (PDL) for rosacea, vascular issues, pigmentation, acne scars, and keloids.
- BiAxis QS™: Q-switched Laser for acne scars, freckles, pigmentation, and tattoo removal.
- Frax Pro: Non-ablative fractional laser for skin resurfacing, improving texture, and collagen stimulation.
- Morpheus8: RF Microneedling for wrinkles, skin laxity, and cellulite.
- Sofwave™: 3D Ultrasound for face/neck lifting, fine lines, and cellulite.
- Indiba Deep Care: Radio Frequency for body contouring, cellulite, post-surgery care, and circumference reduction.
- Divine Pro: Multi-treatment platform for facial rejuvenation, dermal volumizing, and skin firming.
- OxyGeneo & Pollogen: Combines Oxygenation, RF, and Ultrasound for skin brightening, pigmentation, and anti-aging.

Based on the problem description, provide a structured troubleshooting guide.
`,
});

const troubleshootingFlow = ai.defineFlow(
  {
    name: 'troubleshootingFlow',
    inputSchema: TroubleshootingInputSchema,
    outputSchema: TroubleshootingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
