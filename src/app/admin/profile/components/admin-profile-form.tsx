'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { saveAdminUser } from '@/app/actions';
import type { AdminUser } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const adminProfileFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  avatar: z.string().url().optional(),
});

type AdminProfileFormValues = z.infer<typeof adminProfileFormSchema>;

type AdminProfileFormProps = {
  admin: AdminUser;
};

export function AdminProfileForm({ admin }: AdminProfileFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState(admin.avatar);
  
  const defaultValues: AdminProfileFormValues = {
    name: admin.name,
    email: admin.email,
    avatar: admin.avatar,
  };

  const form = useForm<AdminProfileFormValues>({
    resolver: zodResolver(adminProfileFormSchema),
    defaultValues,
  });

  const { formState, handleSubmit, setValue } = form;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setValue('avatar', result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: AdminProfileFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
        await saveAdminUser(formData);
        toast({
            title: `Profile updated`,
            description: `Your profile has been successfully updated.`,
        });
        router.push('/admin/profile');
    } catch (error: any) {
        if (!error.message.includes('NEXT_REDIRECT')) {
             toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred."
            });
        }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={avatarPreview} alt={admin.name} data-ai-hint="person portrait" />
            <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="avatar-upload">Change Profile Photo</Label>
            <Input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} />
            <FormMessage>{form.formState.errors.avatar?.message}</FormMessage>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Admin User" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="e.g., admin@aestheticare.pro" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={formState.isSubmitting}>
             {formState.isSubmitting && <Loader2 className="animate-spin mr-2" />}
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
