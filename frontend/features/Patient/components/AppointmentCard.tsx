import React from 'react';
import { Calendar, Clock, FileText, Hash, Stethoscope, CheckCircle, AlertCircle, XCircle, Camera } from 'lucide-react';

interface AppointmentDetailsProps {
    appointment: {
        id: number;
        doctorId: number;
        patient_code: string;
        date: string;
        from_time: string;
        to_time: string;
        status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | string;
        description: string;
        created_at: string;
        updatedAt: string;
    };
}

export default function AppointmentCard({ appointment }: AppointmentDetailsProps) {
    
    const getStatusBadge = (status: string) => {
        switch (status.toUpperCase()) {
            case 'CONFIRMED':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                    </span>
                );
            case 'PENDING':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 border border-amber-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" /> Pending
                    </span>
                );
            case 'CANCELLED':
                return (
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        <XCircle className="w-3.5 h-3.5" /> Cancelled
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 bg-sky-50 text-brand-primary border border-brand-primary/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                        {status}
                    </span>
                );
        }
    };

    return (
        <div className="bg-card-custom border border-subtle rounded-3xl p-6 sm:p-8 shadow-xs max-w-xl mx-auto">
            
            {/* Header: Patient Code & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-subtle">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-lg shadow-inner border border-brand-primary/20">
                        <Hash className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Patient Code</span>
                        <h3 className="text-lg font-black text-brand-dark">{appointment.patient_code}</h3>
                    </div>
                </div>
                <div>
                    {getStatusBadge(appointment.status)}
                </div>
            </div>

            {/* Appointment Details Grid */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Doctor ID */}
                <div className="flex items-center gap-3 bg-main p-4 rounded-2xl border border-subtle shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <Stethoscope className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Doctor ID</span>
                        <span className="text-sm font-extrabold text-brand-dark">Dr. #{appointment.doctorId}</span>
                    </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3 bg-main p-4 rounded-2xl border border-subtle shadow-xs">
                    <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Appointment Date</span>
                        <span className="text-sm font-extrabold text-brand-dark">{appointment.date}</span>
                    </div>
                </div>

                {/* Time Slot */}
                <div className="flex items-center gap-3 bg-main p-4 rounded-2xl border border-subtle shadow-xs sm:col-span-2">
                    <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Time Slot</span>
                        <span className="text-sm font-extrabold text-emerald-600">
                            {appointment.from_time} - {appointment.to_time}
                        </span>
                    </div>
                </div>

            </div>

            {/* Description Section */}
            <div className="bg-main/60 border border-subtle p-4 rounded-2xl mb-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-primary mb-1.5 uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    Patient Condition / Description
                </div>
                <p className="text-sm text-brand-muted font-medium leading-relaxed">
                    {appointment.description}
                </p>
            </div>

            {/* Screenshot Notice Box */}
            <div className="bg-brand-primary/5 border border-brand-primary/20 p-4 rounded-2xl mb-6 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Camera className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-black text-brand-dark">Important Notice</span>
                    <p className="text-xs text-brand-muted mt-0.5 leading-relaxed font-medium">
                        Please take a screenshot of this card to easily access your appointment details later.
                    </p>
                </div>
            </div>

            {/* Footer / Timestamps */}
            <div className="pt-4 border-t border-subtle flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold text-brand-muted gap-2">
                <span>Booked: {new Date(appointment.created_at).toLocaleString()}</span>
                <span>Ref ID: #{appointment.id}</span>
            </div>

        </div>
    );
}