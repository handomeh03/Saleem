'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Calendar, ChevronDown, Stethoscope, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Loader from '@/components/Loader';
import { Pagination } from '@/components/Pagenation';
import { DailyAvailability, useGetSchedules } from '@/features/Doctor/hooks/useGetSchedules';
import { useToggleAvailabilityStatus } from '@/features/Doctor/hooks/useToggleAvailabilityStatus';


export default function AdminSchedulesPage() {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [openAccordions, setOpenAccordions] = useState<Record<number, boolean>>({});
    

    
    const { data: responseData, isLoading, isError } = useGetSchedules({
        page,
        searchQuery,
        limit: 5,
    });

    const schedules = responseData?.data || [];
    const totalPages = responseData?.totalPages || 1;
    const totalCount = responseData?.totalCount || 0;
    const hasNextPage = responseData?.hasNextPage || false;
    const hasPreviousPage = responseData?.hasPreviousPage || false;

    
    const toggleStatusMutation = useToggleAvailabilityStatus();

    
    const toggleAccordion = (scheduleId: number) => {
        setOpenAccordions((prev) => ({
            ...prev,
            [scheduleId]: !prev[scheduleId],
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    if (isError) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-card-custom border border-red-200 p-8 rounded-3xl text-center shadow-lg max-w-md">
                    <p className="text-red-500 font-bold text-lg mb-2">Failed to load schedules</p>
                    <p className="text-xs text-brand-muted">Please check your connection or try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-16">
            
            {/* Header & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card-custom border border-subtle p-6 sm:p-8 rounded-3xl shadow-xs">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">Doctor Schedules & Availability</h1>
                    <p className="text-xs sm:text-sm text-brand-muted mt-1">Manage doctor schedules and toggle daily availability slots.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by date or time..."
                            className="w-full sm:w-72 pl-11 pr-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                    </div>

                    <div className="bg-brand-primary/10 text-brand-primary px-4 py-3 rounded-2xl text-xs font-black text-center border border-brand-primary/20 shrink-0">
                        Total Schedules: {totalCount}
                    </div>
                </div>
            </div>

            {/* Content List */}
            {isLoading && !responseData ? (
                <Loader fullScreen={true} text="Loading schedules..." />
            ) : schedules.length === 0 ? (
                <div className="text-center py-20 bg-card-custom border border-subtle rounded-3xl">
                    <p className="text-brand-muted font-bold text-sm">No schedules found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {schedules.map((schedule) => {
                        const isOpen = openAccordions[schedule.id] || false;
                        return (
                            <div 
                                key={schedule.id}
                                className="bg-card-custom border border-subtle rounded-3xl shadow-xs overflow-hidden transition-all"
                            >
                                {/* Accordion Header */}
                                <div 
                                    onClick={() => toggleAccordion(schedule.id)}
                                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-main/50 transition"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black shrink-0">
                                            <Stethoscope className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-brand-dark">
                                                {schedule.doctor?.user?.name || 'Unknown Doctor'}
                                            </h3>
                                            <p className="text-xs text-brand-muted flex items-center gap-2 mt-0.5 font-medium">
                                                <span>{schedule.doctor?.specialization || 'General'}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {schedule.doctor?.user?.email}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-6">
                                        <div className="text-xs font-bold text-brand-dark bg-main px-4 py-2 rounded-xl border border-subtle flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-brand-primary" />
                                            <span>{new Date(schedule.start_date).toLocaleDateString()} → {new Date(schedule.end_date).toLocaleDateString()}</span>
                                        </div>

                                        <div className="w-8 h-8 rounded-xl bg-main border border-subtle flex items-center justify-center text-brand-dark">
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion Body (Daily Availability) */}
                                {isOpen && (
                                    <div className="border-t border-subtle p-6 bg-main/30 space-y-4 animate-in fade-in duration-200">
                                        <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider mb-2">Daily Availability Slots ({schedule.daily_availability.length})</h4>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {schedule.daily_availability.map((slot: DailyAvailability) => (
                                                <div 
                                                    key={slot.id}
                                                    className="bg-card-custom border border-subtle p-4 rounded-2xl flex items-center justify-between shadow-2xs"
                                                >
                                                    <div className="space-y-1">
                                                        <span className="text-xs font-black text-brand-dark flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5 text-brand-primary" /> {slot.date}
                                                        </span>
                                                        <p className="text-[11px] text-brand-muted font-medium">
                                                            🕒 {slot.start_time} - {slot.end_time}
                                                        </p>
                                                    </div>

                                                    {/* زر تغيير حالة الإتاحة لكل يوم */}
                                                    <button
                                                        onClick={() => toggleStatusMutation.mutate({ availabilityId: slot.id, currentStatus: slot.status })}
                                                        disabled={toggleStatusMutation.isPending}
                                                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition cursor-pointer ${
                                                            slot.status 
                                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100' 
                                                                : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                                                        }`}
                                                    >
                                                        {slot.status ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                        {slot.status ? 'Available' : 'Closed'}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination Component */}
            {totalPages > 1 && (
                <div className="pt-4">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalCount={totalCount}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPreviousPage}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            )}

        </div>
    );
}