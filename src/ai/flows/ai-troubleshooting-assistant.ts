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
- Sofwave™: Non-invasive ultrasound for skin lifting, fine line removal, and skin tightening.
- Indiba Deep Care: Radio-frequency for body treatments.
- Vbeam Perfecta®: PDL laser for treating pigmentation, spots, acne scars, rosacea.
- PicoWay®: Pico-second laser for melasma, pigmentation, and tattoo removal.
- BiAxis QS™: Multidimensional laser for pigments, tattoos, rejuvenation, and hair removal.
- Ultra V: Polydioxanone (PDO) threads for nose augmentation.
- Morpheus8: Combination of microneedling and RF.
- Coolfase: Monopolar RF with Direct Cooling technology.
- Lipodefine™: Endolifting technology for facial contouring.
- Laser Biaxis QS: Laser for melasma and tattoo removal.
- Hydrafacial: Multi-step facial treatment machine.
- Pico Laser: Pico-second laser for tattoo removal.

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
