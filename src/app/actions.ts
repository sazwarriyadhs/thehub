'use server';

import { getProductRecommendations } from '@/ai/flows/ai-product-recommendations';
import { aiHelpAssistant } from '@/ai/flows/ai-help-assistant';
import { getTroubleshootingAssistance } from '@/ai/flows/ai-troubleshooting-assistant';
import { serviceRecords } from '@/lib/data';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { inventoryFormSchema } from '@/lib/schemas';

type ActionResult<T> = {
    data?: T;
    error?: string;
}

export async function saveInventoryItem(formData: FormData) {
  
  const data = {
    id: formData.get('id') || undefined,
    name: formData.get('name'),
    type: formData.get('type'),
    quantity: formData.get('quantity'),
    purchaseDate: new Date(formData.get('purchaseDate') as string),
    warrantyEndDate: formData.get('warrantyEndDate') || '',
    status: formData.get('status'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    clientId: formData.get('clientId') || undefined,
  };

  const validatedFields = await inventoryFormSchema.safeParseAsync(data);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    // In a real app, you would return these errors to the form.
    // For this prototype, we'll just log and redirect.
    return {
      error: 'Invalid fields submitted.',
    };
  }
  
  const { id, ...itemData } = validatedFields.data;

  try {
    if (id) {
      console.log(`Updating inventory item ${id}:`, itemData);
      // In a real app, you would update the database here.
      // e.g., await db.inventory.update({ where: { id }, data: itemData });
    } else {
      const newId = `inv-${Date.now()}`;
      console.log(`Creating new inventory item ${newId}:`, itemData);
      // In a real app, you would create a new record in the database.
      // e.g., await db.inventory.create({ data: { id: newId, ...itemData } });
    }
  } catch (e: any) {
    console.error('Failed to save inventory item:', e);
    return { error: 'Failed to save inventory item. Please try again.' };
  }
  
  revalidatePath('/admin/inventory');
  redirect('/admin/inventory');
}

export async function deleteInventoryItem(id: string) {
    try {
        if (!id) {
            return { error: 'Item ID is required.' };
        }
        console.log(`Deleting inventory item ${id}`);
        // In a real app, you would delete the item from the database.
        // e.g., await db.inventory.delete({ where: { id } });
    } catch (e: any) {
        console.error('Failed to delete inventory item:', e);
        return { error: 'Failed to delete inventory item. Please try again.' };
    }
    
    revalidatePath('/admin/inventory');
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
  } catch (e: any)
  {
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

function toRoman(num: number): string {
    const roman: { [key: string]: number } = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let str = '';
    for (const i of Object.keys(roman)) {
        const q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }
    return str;
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
    
    const textWidth = (text: string, size: number, f: any) => f.widthOfTextAtSize(text, size);

    const drawText = (text: string, x: number, yPos: number, options: { font?: any; size?: number; color?: any; align?: 'left' | 'center' | 'right', maxWidth?: number, lineHeight?: number } = {}) => {
        const size = options.size || 11;
        const f = options.font || font;
        let xPos = x;
        if (options.align === 'center') {
            xPos = (width - textWidth(text, size, f)) / 2;
        } else if (options.align === 'right') {
            xPos = width - x - textWidth(text, size, f);
        }
        page.drawText(text, {
            x: xPos,
            y: yPos,
            font: f,
            size: size,
            color: options.color || rgb(0, 0, 0),
            maxWidth: options.maxWidth,
            lineHeight: options.lineHeight
        });
    };

    let y = height - 50;

    // Header
    drawText('SURAT TUGAS', 0, y, { font: boldFont, size: 16, align: 'center' });
    y -= 18;

    const recordDate = new Date(record.date);
    const monthRoman = toRoman(recordDate.getMonth() + 1);
    const year = recordDate.getFullYear();
    const noSurat = `No: ${record.id.replace('ser-', '002')}/ST/SAH/${monthRoman}/${year}`;
    drawText(noSurat, 0, y, { size: 11, align: 'center' });
    
    const noSuratWidth = textWidth(noSurat, 11, font);
    page.drawLine({
        start: { x: (width - noSuratWidth) / 2, y: y - 2 },
        end: { x: (width + noSuratWidth) / 2, y: y - 2 },
        thickness: 1,
    });
    y -= 40;

    drawText('Yang bertanda tangan di bawah ini:', 50, y);
    y -= 25;

    // Signatory Details
    const signatoryDetails = [
      { label: 'Nama', value: 'Tri Endah Ariwati' },
      { label: 'Jabatan', value: 'Direktur Utama' },
      { label: 'Instansi', value: 'Serenity Aestheticare Hub' },
    ];
    signatoryDetails.forEach(detail => {
      drawText(detail.label, 60, y);
      drawText(':', 140, y);
      drawText(detail.value, 150, y);
      y -= 15;
    });
    y -= 15;

    drawText('Dengan ini memberikan tugas kepada tim berikut:', 50, y);
    y -= 25;

    // Team Details
    const teamDetails = [
        { label: 'Nama', value: record.technician },
        { label: 'Jabatan', value: 'Supervisor' }
    ];
    teamDetails.forEach(detail => {
      drawText(detail.label, 60, y);
      drawText(':', 140, y);
      drawText(detail.value, 150, y);
      y -= 15;
    });

    drawText('Nama Anggota Tim:', 60, y);
    y -= 15;
    drawText('- ..................................', 60, y); y-=15;
    drawText('- ..................................', 60, y); y-=15;
    drawText('- ..................................', 60, y); y-=15;
    drawText('- ..................................', 60, y); y-=15;
    y -= 15;

    // Assignment Details
    drawText('Maksud dan Tujuan Penugasan', 50, y, { font: boldFont });
    y -= 20;
    drawText('Melaksanakan kegiatan troubleshooting teknis dan pemantauan sistem pelayanan pada unit/klien berikut:', 50, y, { font, size: 11, lineHeight: 14, maxWidth: width - 100 });
    y -= 35;

    const assignmentDetails = [
        { label: 'Nama Klien / Cabang', value: record.clientName },
        { label: 'Lokasi', value: record.clientLocation },
        { label: 'Jenis Masalah', value: record.problemIdentification },
    ];
    assignmentDetails.forEach(detail => {
      drawText(detail.label, 60, y);
      drawText(':', 200, y);
      const valueLines = Math.ceil(textWidth(detail.value, 11, font) / (width - 270));
      drawText(detail.value, 210, y, { font, size: 11, lineHeight: 14, maxWidth: width - 270 });
      y -= (valueLines * 14) + 6;
    });
    y -= 10;

    // Duration
    drawText('Durasi Penugasan', 50, y, { font: boldFont });
    y -= 20;
    drawText(`Tanggal ${record.date} s.d. (selesai)`, 50, y);
    y-=15;
    drawText('(dapat diperpanjang sesuai kebutuhan penyelesaian masalah)', 50, y, { font, size: 10, lineHeight: 12, maxWidth: width - 100 });
    y -= 30;

    // Obligations
    drawText('Kewajiban Tim', 50, y, { font: boldFont });
    y -= 20;
    const obligations = [
        'Melaksanakan pemeriksaan dan tindakan troubleshooting sesuai SOP.',
        'Menyusun laporan harian dan berita acara troubleshooting.',
        'Menginformasikan progres pekerjaan secara berkala kepada koordinator teknis.',
        'Melaporkan hasil akhir penanganan melalui dokumentasi tertulis.'
    ];
    obligations.forEach((item, index) => {
        drawText(`${index + 1}.`, 50, y);
        const itemLines = Math.ceil(textWidth(item, 11, font) / (width - 130));
        drawText(item, 70, y, { font, size: 11, lineHeight: 14, maxWidth: width - 130 });
        y -= (itemLines * 14) + 4;
    });
    y -= 15;
    
    // Closing
    drawText('Penutup', 50, y, { font: boldFont });
    y -= 20;
    drawText('Demikian surat tugas ini disampaikan. Diharapkan dapat dilaksanakan dengan penuh tanggung jawab dan dilaporkan hasilnya kepada pihak manajemen.', 50, y, { font, size: 11, lineHeight: 14, maxWidth: width - 100 });

    // Signature
    let signatureY = 150;
    const today = new Date();
    const formattedDate = `${today.getDate()} ${today.toLocaleString('id-ID', { month: 'long' })} ${today.getFullYear()}`;
    drawText(`Jakarta, ${formattedDate}`, width - 250, signatureY);
    signatureY -= 15;
    drawText('Serenity Aestheticare Hub', width - 250, signatureY);
    signatureY -= 60;
    drawText('( Ttd & Stempel )', width - 250, signatureY);
    signatureY -= 25;
    drawText('Tri Endah Ariwati', width - 250, signatureY, { font: boldFont });
    signatureY -= 15;
    drawText('Direktur Utama', width - 250, signatureY);

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    return { data: pdfBase64 };
  } catch (e: any) {
    console.error('PDF Generation Error:', e);
    return { error: 'Failed to generate PDF. ' + e.message };
  }
}
