'use server';

import { getProductRecommendations } from '@/ai/flows/ai-product-recommendations';
import { aiHelpAssistant } from '@/ai/flows/ai-help-assistant';
import { getTroubleshootingAssistance } from '@/ai/flows/ai-troubleshooting-assistant';
import { serviceRecords } from '@/lib/data';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

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

export async function generateWorkOrderPdf(
  serviceRecordId: string
): Promise<ActionResult<string>> {
  try {
    const record = serviceRecords.find((s) => s.id === serviceRecordId);
    if (!record) {
      return { error: 'Service record not found.' };
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    let y = height - 50;

    const drawText = (text: string, x: number, yPos: number, options: { font?: any; size?: number; color?: any } = {}) => {
        page.drawText(text, {
            x,
            y: yPos,
            font: options.font || font,
            size: options.size || 11,
            color: options.color || rgb(0, 0, 0),
        });
    };

    // Header
    drawText('AesthetiCare Pro', 50, y, { font: boldFont, size: 24, color: rgb(0.2, 0.1, 0.5) });
    drawText('SURAT TUGAS / WORK ORDER', 50, y - 25, { font: boldFont, size: 18 });
    y -= 70;
    
    // Line Separator
    page.drawLine({
        start: { x: 50, y: y },
        end: { x: width - 50, y: y },
        thickness: 1,
        color: rgb(0.8, 0.8, 0.8),
    });
    y -= 25;

    // Service Details
    const details = [
      { label: 'Service ID:', value: record.id },
      { label: 'Date:', value: record.date },
      { label: 'Technician:', value: record.technician },
      { label: 'Client:', value: record.clientName },
      { label: 'Location:', value: record.clientLocation },
      { label: 'Equipment:', value: record.equipment },
      { label: 'Duration:', value: record.duration },
    ];

    details.forEach(detail => {
      drawText(detail.label, 70, y, { font: boldFont });
      drawText(detail.value, 180, y);
      y -= 20;
    });
    
    y -= 15;
    page.drawLine({ start: { x: 50, y: y }, end: { x: width - 50, y: y }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) });
    y -= 25;

    // Problem and Solution
    drawText('Identifikasi Masalah:', 50, y, { font: boldFont, size: 14 });
    y -= 20;
    page.drawText(record.problemIdentification, { x: 60, y, font, size: 10, lineHeight: 14, maxWidth: width - 120 });
    y -= 60; // Approximate height for problem description
    
    drawText('Solusi / Pekerjaan yang Dilakukan:', 50, y, { font: boldFont, size: 14 });
    y -= 20;
    page.drawText(record.solution, { x: 60, y, font, size: 10, lineHeight: 14, maxWidth: width - 120 });

    // Footer for signatures
    y = 100;
    drawText('Technician Signature:', 70, y, { font: font, size: 10 });
    page.drawLine({ start: { x: 70, y: y - 10 }, end: { x: 250, y: y - 10 }, thickness: 0.5 });
    
    drawText('Client Signature:', width - 250, y, { font: font, size: 10 });
    page.drawLine({ start: { x: width - 250, y: y - 10 }, end: { x: width - 70, y: y - 10 }, thickness: 0.5 });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { data: pdfBase64 };
  } catch (e: any) {
    console.error('PDF Generation Error:', e);
    return { error: 'Failed to generate PDF. ' + e.message };
  }
}
