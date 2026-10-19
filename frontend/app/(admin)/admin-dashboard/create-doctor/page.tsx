'use client';


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '@/config/axoisConfig';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, Stethoscope, FileText, Loader2, UserPlus } from 'lucide-react';
import { CreateDoctorFormValues, createDoctorSchema } from '@/features/Doctor/Types/createDoctorType';
import { useCreateDoctor } from '@/features/Doctor/hooks/useCreateDoctor';




export default function CreateDoctorPage() {
         const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateDoctorFormValues>({
        resolver: zodResolver(createDoctorSchema),
    });

    
    const{createDoctor,isPending}=useCreateDoctor();

    const onSubmit = (data: CreateDoctorFormValues) => {
        createDoctor(data);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-16">
            
            {/* Header */}
            <div className="bg-card-custom border border-subtle p-6 sm:p-8 rounded-3xl shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">Create New Doctor</h1>
                        <p className="text-xs sm:text-sm text-brand-muted mt-1">Fill in the details below to register a new doctor account in the system.</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-card-custom border border-subtle p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                            <User className="w-4 h-4 text-brand-primary" /> Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Dr. John Doe"
                            {...register('name')}
                            className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                        {errors.name && <p className="text-[11px] font-bold text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                            <Mail className="w-4 h-4 text-brand-primary" /> Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="doctor@example.com"
                            {...register('email')}
                            className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                        {errors.email && <p className="text-[11px] font-bold text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                            <Lock className="w-4 h-4 text-brand-primary" /> Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                        {errors.password && <p className="text-[11px] font-bold text-red-500">{errors.password.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                            <Phone className="w-4 h-4 text-brand-primary" /> Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="+962791234567"
                            {...register('phone')}
                            className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                        {errors.phone && <p className="text-[11px] font-bold text-red-500">{errors.phone.message}</p>}
                    </div>

                </div>

                {/* Specialization */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                        <Stethoscope className="w-4 h-4 text-brand-primary" /> Specialization
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Cardiology, Neurology, Eyes"
                        {...register('specialization')}
                        className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                    />
                    {errors.specialization && <p className="text-[11px] font-bold text-red-500">{errors.specialization.message}</p>}
                </div>

                {/* Bio (Optional) */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-brand-primary" /> Bio (Optional)
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Write a short bio about the doctor..."
                        {...register('bio')}
                        className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all resize-none"
                    />
                    {errors.bio && <p className="text-[11px] font-bold text-red-500">{errors.bio.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.push("admin-dashboard/doctors")}
                        className="px-6 py-3 rounded-2xl text-xs font-bold bg-main border border-subtle text-brand-dark hover:bg-slate-100 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-3 rounded-2xl text-xs font-black bg-brand-primary text-white shadow-lg shadow-sky-500/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2 cursor-pointer"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        Create Doctor
                    </button>
                </div>

            </form>

        </div>
    );
}