import React from 'react';

interface AppointmentSummaryProps {
    doctorName?: string;
    specialization?: string;
    targetDate: string;
    selectedSlot: {
        from_time: string;
        end_time: string;
    } | null;
}

export default function AppointmentSummary({
    doctorName,
    specialization,
    targetDate,
    selectedSlot,
}: AppointmentSummaryProps) {
    return (
        <div className="space-y-4 text-xs sm:text-sm mb-8">
            <div className="flex justify-between items-center text-brand-muted">
                <span>Doctor:</span>
                <span className="font-bold text-brand-dark">{doctorName || 'Not specified'}</span>
            </div>
            
            <div className="flex justify-between items-center text-brand-muted">
                <span>Specialty:</span>
                <span className="font-bold text-brand-primary">{specialization || 'General'}</span>
            </div>
            
            <div className="flex justify-between items-center text-brand-muted">
                <span>Date:</span>
                <span className="font-bold text-brand-dark">{targetDate}</span>
            </div>
            
            <div className="flex justify-between items-center text-brand-muted">
                <span>Time Slot:</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {selectedSlot 
                        ? `${selectedSlot.from_time} - ${selectedSlot.end_time}` 
                        : 'Not Selected'}
                </span>
            </div>
        </div>
    );
}