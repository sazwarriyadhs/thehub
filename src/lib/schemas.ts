import { z } from 'zod';

export const inventoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  type: z.enum(['Device', 'Skincare'], { required_error: 'Type is required.' }),
  quantity: z.coerce.number().min(0, { message: 'Quantity cannot be negative.' }),
  purchaseDate: z.date({ required_error: 'Purchase date is required.' }),
  warrantyEndDate: z.string().transform((val, ctx) => {
    if (val === '' || val === undefined || val === null) return undefined;
    const date = new Date(val);
    if (isNaN(date.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Invalid date',
      });
      return z.NEVER;
    }
    return date;
  }).optional(),
  status: z.enum(['In Stock', 'Low Stock', 'Out of Stock'], { required_error: 'Status is required.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  clientId: z.string().optional().transform(value => value === 'N/A' ? undefined : value),
});


export const clientFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
    joinDate: z.date({ required_error: 'Join date is required.' }),
    avatar: z.string().optional(),
    penanggungJawabNama: z.string().min(3, { message: 'Nama penanggung jawab harus diisi.' }),
    penanggungJawabJabatan: z.string().min(3, { message: 'Jabatan penanggung jawab harus diisi.' }),
    treatmentHistory: z.string().min(10, { message: 'History must be at least 10 characters.' }),
    preferences: z.string().transform((val) => val.split(',').map(s => s.trim())).optional(),
    locationAddress: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
    locationLat: z.coerce.number(),
    locationLng: z.coerce.number(),
});

export const workOrderConfirmationSchema = z.object({
  workOrderId: z.string().min(3, { message: 'Nomor Surat Tugas harus diisi.' }),
  technicianNotes: z.string().min(10, { message: 'Catatan harus memiliki setidaknya 10 karakter.' }),
  status: z.enum(['In Progress', 'Completed'], { required_error: 'Status pekerjaan harus dipilih.' }),
  photoProofUrl: z.string().url({ message: 'URL foto tidak valid.' }).optional().or(z.literal('')),
});
