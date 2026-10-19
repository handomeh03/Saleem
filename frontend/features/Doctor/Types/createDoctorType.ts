import * as z from 'zod';
export const createDoctorSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(
            /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
        ),
    phone: z
        .string()
        .min(1, 'Phone is required')
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format. (e.g. +962791234567)'),
    specialization: z.string().min(1, 'Specialization is required'),
    bio: z.string().optional(),
});

export type CreateDoctorFormValues = z.infer<typeof createDoctorSchema>;