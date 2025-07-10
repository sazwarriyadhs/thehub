'use server';

import { getProductRecommendations } from '@/ai/flows/ai-product-recommendations';
import { aiHelpAssistant } from '@/ai/flows/ai-help-assistant';
import { getTroubleshootingAssistance } from '@/ai/flows/ai-troubleshooting-assistant';
import { db } from '@/lib/db';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { inventoryFormSchema, clientFormSchema, workOrderConfirmationSchema } from '@/lib/schemas';
import type { ServiceRecord } from '@/types';
import { unstable_noStore as noStore } from 'next/cache';


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
    warrantyEndDate: formData.get('warrantyEndDate') || undefined,
    status: formData.get('status'),
    description: formData.get('description'),
    imageUrl: formData.get('imageUrl'),
    clientId: formData.get('clientId') || undefined,
  };
  
  const validatedFields = await inventoryFormSchema.safeParseAsync(data);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      error: 'Invalid fields submitted.',
    };
  }
  
  const { id, ...itemData } = validatedFields.data;

  try {
    if (id) {
      console.log(`Updating inventory item ${id}:`, itemData);
       await db.query(
          `UPDATE inventory
           SET name = $1, type = $2, quantity = $3, purchase_date = $4, warranty_end_date = $5, status = $6, description = $7, image_url = $8, client_id = $9
           WHERE id = $10`,
          [
            itemData.name, itemData.type, itemData.quantity, itemData.purchaseDate, 
            itemData.warrantyEndDate, itemData.status, itemData.description, 
            itemData.imageUrl, itemData.clientId, id
          ]
        );
    } else {
      console.log(`Creating new inventory item:`, itemData);
      await db.query(
          `INSERT INTO inventory (name, type, quantity, purchase_date, warranty_end_date, status, description, image_url, client_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            itemData.name, itemData.type, itemData.quantity, itemData.purchaseDate, 
            itemData.warrantyEndDate, itemData.status, itemData.description, 
            itemData.imageUrl, itemData.clientId
          ]
        );
    }
  } catch (e: any) {
    console.error('Failed to save inventory item:', e);
    return { error: 'Database Error: Failed to save inventory item.' };
  }
  
  revalidatePath('/admin/inventory');
  redirect('/admin/inventory');
}

export async function deleteInventoryItem(id: string) {
    try {
        if (!id) {
            return { error: 'Item ID is required.' };
        }
        await db.query(`DELETE FROM inventory WHERE id = $1`, [id]);
    } catch (e: any) {
        console.error('Failed to delete inventory item:', e);
        return { error: 'Database Error: Failed to delete inventory item.' };
    }
    
    revalidatePath('/admin/inventory');
}

export async function saveClient(formData: FormData) {
  const data = {
    id: formData.get('id') || undefined,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    joinDate: new Date(formData.get('joinDate') as string),
    avatar: formData.get('avatar'),
    penanggungJawabNama: formData.get('penanggungJawabNama'),
    penanggungJawabJabatan: formData.get('penanggungJawabJabatan'),
    treatmentHistory: formData.get('treatmentHistory'),
    preferences: formData.get('preferences'),
    locationAddress: formData.get('locationAddress'),
    locationLat: formData.get('locationLat'),
    locationLng: formData.get('locationLng'),
  };

  const validatedFields = await clientFormSchema.safeParseAsync(data);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      error: 'Invalid fields submitted.',
    };
  }

  const { id, ...clientData } = validatedFields.data;

  try {
    if (id) {
        console.log(`Updating client ${id}`);
        await db.query(
            `UPDATE clients
             SET name = $1, email = $2, phone = $3, join_date = $4, avatar = $5,
                 penanggung_jawab_nama = $6, penanggung_jawab_jabatan = $7,
                 treatment_history = $8, preferences = $9, location_address = $10,
                 location_lat = $11, location_lng = $12
             WHERE id = $13`,
            [
              clientData.name, clientData.email, clientData.phone, clientData.joinDate,
              clientData.avatar, clientData.penanggungJawabNama, clientData.penanggungJawabJabatan,
              clientData.treatmentHistory, clientData.preferences, clientData.locationAddress,
              clientData.locationLat, clientData.locationLng, id
            ]
        );
    } else {
      console.log(`Creating new client`);
      await db.query(
          `INSERT INTO clients (name, email, phone, join_date, avatar, penanggung_jawab_nama,
                               penanggung_jawab_jabatan, treatment_history, preferences,
                               location_address, location_lat, location_lng)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            clientData.name, clientData.email, clientData.phone, clientData.joinDate,
            clientData.avatar, clientData.penanggungJawabNama, clientData.penanggungJawabJabatan,
            clientData.treatmentHistory, clientData.preferences, clientData.locationAddress,
            clientData.locationLat, clientData.locationLng
          ]
      );
    }
  } catch (e: any) {
    console.error('Failed to save client:', e);
    return { error: 'Database Error: Failed to save client.' };
  }
  
  revalidatePath('/admin/clients');
  revalidatePath('/client/profile');
  redirect(formData.get('redirect_path') as string || '/admin/clients');
}

export async function deleteClient(id: string) {
    try {
        if (!id) {
            return { error: 'Client ID is required.' };
        }
        await db.query(`DELETE FROM clients WHERE id = $1`, [id]);
    } catch (e: any) {
        console.error('Failed to delete client:', e);
        return { error: 'Database Error: Failed to delete client.' };
    }
    
    revalidatePath('/admin/clients');
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
  noStore();
  try {
    if (!input.clientId || !input.clientName || !input.details) {
      return { error: 'Client ID, name, and details are required.' };
    }
    
    await db.query(
        `INSERT INTO client_requests (client_id, client_name, request_type, details, status, date)
         VALUES ($1, $2, 'Service', $3, 'New', NOW())`,
        [input.clientId, input.clientName, input.details]
    );

    revalidatePath('/admin/dashboard');
    return { data: { success: true } };
  } catch (e: any) {
    console.error(e);
    return { error: 'Database Error: Failed to submit service request.' };
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
    const result = await db.query<ServiceRecord>('SELECT * FROM service_records WHERE id = $1', [serviceRecordId]);
    const record = result.rows[0];
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
    const noSurat = `No: ${String(record.id).padStart(3, '0')}/ST/SAH/${monthRoman}/${year}`;
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
        { label: 'Nama Klien / Cabang', value: record.client_name },
        { label: 'Lokasi', value: record.client_location },
        { label: 'Jenis Masalah', value: record.problem_identification },
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
    drawText(`Tanggal ${new Date(record.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} s.d. (selesai)`, 50, y);
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

export async function confirmWorkOrder(formData: FormData) {
  const data = {
    workOrderId: formData.get('workOrderId'),
    technicianNotes: formData.get('technicianNotes'),
    status: formData.get('status'),
    photoProofUrl: formData.get('photoProofUrl'),
  };

  const validatedFields = workOrderConfirmationSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return {
      error: 'Invalid fields submitted.',
    };
  }

  const { workOrderId, status, technicianNotes, photoProofUrl } = validatedFields.data;

  try {
    const result = await db.query('SELECT id FROM service_records WHERE id = $1', [workOrderId]);
    if (result.rowCount === 0) {
        return { error: 'Work order not found.' };
    }
    
    await db.query(
        `UPDATE service_records
         SET status = $1, technician_notes = CONCAT(COALESCE(technician_notes, ''), '\n', $2), photo_proof_url = $3
         WHERE id = $4`,
        [status, technicianNotes, photoProofUrl, workOrderId]
    );

  } catch (e: any) {
    console.error('Failed to confirm work order:', e);
    return { error: 'Database Error: Failed to confirm work order.' };
  }

  revalidatePath('/admin/services');
  redirect('/admin/services');
}
