import { z } from 'zod';

export const inventoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  type: z.enum(['Device', 'Skincare'], { required_error: 'Type is required.' }),
  quantity: z.coerce.number().min(0, { message: 'Quantity cannot be negative.' }),
  purchaseDate: z.date({ required_error: 'Purchase date is required.' }),
  warrantyEndDate: z.string().transform(async (val, ctx) => {
    if (val === '') return undefined;
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
  clientId: z.string().optional(),
});
