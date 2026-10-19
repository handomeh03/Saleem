import { z } from 'zod';
export const appointmentSchema = z.object({
    slot: z.object({
        from_time: z.string(),
        end_time: z.string(),
    }).nullable().refine((val) => val !== null, {
        message: "Please select a time slot.",
    }),
    description: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;