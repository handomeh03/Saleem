import * as z from 'zod';
export const scheduleSchema = z.object({
    doctorId: z.string().min(1, 'Please select a doctor'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().min(1, 'End date is required'),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;