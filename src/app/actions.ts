'use server';

import { getProductRecommendations } from '@/ai/flows/ai-product-recommendations';
import { aiHelpAssistant } from '@/ai/flows/ai-help-assistant';
import { getTroubleshootingAssistance } from '@/ai/flows/ai-troubleshooting-assistant';

type ActionResult<T> = {
    data?: T;
    error?: string;
}

export async function generateRecommendations(
  clientProfile: string
): Promise<ActionResult<Awaited<ReturnType<typeof getProductRecommendations>>>> {
  try {
    if (!clientProfile) {
      return { error: 'Client profile is required.' };
    }
    const result = await getProductRecommendations({ clientProfile });
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

export async function getTroubleshootingSteps(
  machineName: string,
  problemDescription: string
): Promise<ActionResult<Awaited<ReturnType<typeof getTroubleshootingAssistance>>>> {
  try {
    if (!machineName || !problemDescription) {
      return { error: 'Machine name and problem description are required.' };
    }
    const result = await getTroubleshootingAssistance({ machineName, problemDescription });
    return { data: result };
  } catch (e: any) {
    console.error(e);
    return { error: 'Failed to generate troubleshooting steps. Please try again.' };
  }
}

type ServiceRequestInput = {
    clientId: string;
    clientName: string;
    details: string;
}

export async function requestService(
  input: ServiceRequestInput
): Promise<ActionResult<{ success: boolean }>> {
  try {
    if (!input.clientId || !input.clientName || !input.details) {
      return { error: 'Client ID, name, and details are required.' };
    }
    // In a real application, you would save this to a database.
    // For this prototype, we'll just log it and return success.
    // A new request has been manually added to lib/data.ts to demonstrate how it would appear on the dashboard.
    console.log('New Service Request:', {
        id: `req-${Date.now()}`,
        ...input,
        requestType: 'Service',
        status: 'New',
        date: new Date().toISOString().split('T')[0],
    });
    
    return { data: { success: true } };
  } catch (e: any) {
    console.error(e);
    return { error: 'Failed to submit service request. Please try again.' };
  }
}
