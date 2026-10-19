'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/config/axoisConfig';
import { toast } from 'sonner';
import { Calendar, Loader2, CalendarPlus } from 'lucide-react';
import { useGetDoctors } from '@/features/Doctor/hooks/useGetDoctors';
import { DoctorSelectDropdown } from '@/features/Doctor/components/DoctorSelectDropdown';


const scheduleSchema = z.object({
    doctorId: z.string().min(1, 'Please select a doctor'),
    start_date: z.string().min(1, 'Start date is required'),
    end_date: z.string().min(1, 'End date is required'),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

export default function CreateDoctorSchedulePage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const { data: doctorsData, isLoading: isLoadingDoctors } = useGetDoctors({
        page: 1,
        searchQuery: '',
        limit: 50,
    });

    const doctors = doctorsData?.data || [];

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ScheduleFormValues>({
        resolver: zodResolver(scheduleSchema),
    });

    const createScheduleMutation = useMutation({
        mutationFn: async (data: { doctorId: number; payload: { start_date: string; end_date: string } }) => {
            const res = await api.post(`doctor/Create-Schedule/${data.doctorId}`, data.payload);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Doctor schedule created successfully!');
            queryClient.invalidateQueries({ queryKey: ['admin-doctors'] });
            router.push('/admin-dashboard/doctors');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Failed to create schedule';
            toast.error(Array.isArray(message) ? message[0] : message);
        },
    });

    const onSubmit = (data: ScheduleFormValues) => {
        createScheduleMutation.mutate({
            doctorId: Number(data.doctorId),
            payload: {
                start_date: data.start_date,
                end_date: data.end_date,
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-card-custom border border-subtle p-6 sm:p-8 rounded-3xl shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black">
                        <CalendarPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">Create Doctor Schedule</h1>
                        <p className="text-xs sm:text-sm text-brand-muted mt-1">Set up active date range schedule for a specific doctor.</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card-custom border border-subtle p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                
                {/* Custom Select Dropdown with React Hook Form Controller */}
                <Controller
                    name="doctorId"
                    control={control}
                    render={({ field }) => (
                        <DoctorSelectDropdown
                            doctors={doctors}
                            selectedDoctorId={field.value}
                            onSelect={field.onChange}
                            isLoading={isLoadingDoctors}
                        />
                    )}
                />
                {errors.doctorId && <p className="text-[11px] font-bold text-red-500">{errors.doctorId.message}</p>}

                {/* Start Date */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-primary" /> Start Date
                    </label>
                    <input
                        type="date"
                        {...register('start_date')}
                        className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:border-brand-primary transition-all"
                    />
                    {errors.start_date && <p className="text-[11px] font-bold text-red-500">{errors.start_date.message}</p>}
                </div>

                {/* End Date */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-primary" /> End Date
                    </label>
                    <input
                        type="date"
                        {...register('end_date')}
                        className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark focus:outline-none focus:border-brand-primary transition-all"
                    />
                    {errors.end_date && <p className="text-[11px] font-bold text-red-500">{errors.end_date.message}</p>}
                </div>

                {/* Actions */}
                <div className="pt-4 flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 rounded-2xl text-xs font-bold bg-main border border-subtle text-brand-dark hover:bg-slate-100 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={createScheduleMutation.isPending}
                        className="px-8 py-3 rounded-2xl text-xs font-black bg-brand-primary text-white shadow-lg shadow-sky-500/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
                    >
                        {createScheduleMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        Create Schedule
                    </button>
                </div>

            </form>

        </div>
    );
}