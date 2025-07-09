'use server';

import { getProductRecommendations } from '@/ai/flows/ai-product-recommendations';
import { aiHelpAssistant } from '@/ai/flows/ai-help-assistant';

type ActionResult<T> = {
    data?: T;
    error?: string;
}

export async function generateRecommendations(
  clientTreatmentHistory: string
): Promise<ActionResult<Awaited<ReturnType<typeof getProductRecommendations>>>> {
  try {
    if (!clientTreatmentHistory) {
      return { error: 'Treatment history is required.' };
    }
    const result = await getProductRecommendations({ clientTreatmentHistory });
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: 'Failed to generate recommendations. Please try again.' };
  }
}

export async function getHelp(
    query: string
): Promise<ActionResult<Awaited<ReturnType<typeof aiHelpAssistant>>>> {
    try {
        if (!query) {
            return { error: 'Query is required.' };
        }
        const result = await aiHelpAssistant({ query });
        return { data: result };
    } catch (e: any) {
        console.error(e);
        return { error: 'Failed to get help. Please try again.' };
    }
}
