'use client';

import React, { useState } from 'react';
import { Search, Calendar, Clock, Stethoscope, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import Loader from '@/components/Loader';
import { Pagination } from '@/components/Pagenation';
import { useGetDoctorRecords } from '@/features/Doctor/hooks/useGetDoctorRecords';

export default function page() {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');

    
    const { data: responseData, isLoading, isError } = useGetDoctorRecords({
        page,
        searchQuery,
        limit: 10,
    });

    const records = responseData?.data || [];
    const totalPages = responseData?.totalPages || 1;
    const totalCount = responseData?.totalCount || 0;
    const hasNextPage = responseData?.hasNextPage || false;
    const hasPreviousPage = responseData?.hasPreviousPage || false;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    if (isError) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="bg-card-custom border border-red-200 p-8 rounded-3xl text-center shadow-lg max-w-md">
                    <p className="text-red-500 font-bold text-lg mb-2">Failed to load doctor records</p>
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
                    <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">Doctor Records & Appointments</h1>
                    <p className="text-xs sm:text-sm text-brand-muted mt-1">View and track all doctor appointments, completed or pending.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search by patient code or doctor..."
                            className="w-full sm:w-72 pl-11 pr-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                    </div>

                    <div className="bg-brand-primary/10 text-brand-primary px-4 py-3 rounded-2xl text-xs font-black text-center border border-brand-primary/20 shrink-0">
                        Total Records: {totalCount}
                    </div>
                </div>
            </div>

            {/* Content / Grid */}
            {isLoading && !responseData ? (
                <Loader fullScreen={true} text="Loading records..." />
            ) : records.length === 0 ? (
                <div className="text-center py-20 bg-card-custom border border-subtle rounded-3xl">
                    <p className="text-brand-muted font-bold text-sm">No appointment records found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {records.map((record) => (
                        <div 
                            key={record.id} 
                            className="bg-card-custom border border-subtle rounded-3xl p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md space-y-4"
                        >
                            <div>
                                {/* Top: Patient Code & Status */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="text-xs font-black bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-xl border border-brand-primary/20">
                                        {record.patient_code}
                                    </span>

                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                        record.status === 'COMPLETED' || record.status === 'CONFIRMED'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                            : record.status === 'PENDING'
                                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                                            : 'bg-red-50 text-red-600 border-red-200'
                                    }`}>
                                        {record.status === 'PENDING' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                        {record.status}
                                    </span>
                                </div>

                                {/* Doctor Details */}
                                <div className="flex items-center gap-3 py-3 border-b border-subtle">
                                    <div className="w-10 h-10 rounded-2xl bg-main text-brand-primary flex items-center justify-center font-black shrink-0 border border-subtle">
                                        <Stethoscope className="w-4 h-4" />
                                    </div>
                                    <div className="truncate">
                                        <h3 className="text-sm font-black text-brand-dark truncate">
                                            {record.doctor?.user?.name || 'Unknown Doctor'}
                                        </h3>
                                        <p className="text-[11px] text-brand-muted font-bold">
                                            {record.doctor?.specialization || 'General'}
                                        </p>
                                    </div>
                                </div>

                                {/* Appointment Date & Time */}
                                <div className="space-y-2 py-3 text-xs font-medium text-brand-muted">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                                        <span>Date: <strong className="text-brand-dark">{record.date}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                                        <span>Time: <strong className="text-brand-dark">{record.from_time} - {record.to_time}</strong></span>
                                    </div>
                                    <div className="flex items-start gap-2 pt-1">
                                        <FileText className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                                        <span className="line-clamp-2">Notes: <strong className="text-brand-dark">{record.description}</strong></span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer: Created At */}
                            <div className="pt-2 border-t border-subtle flex items-center justify-between text-[10px] font-bold text-brand-muted">
                                <span>Booked on:</span>
                                <span>{new Date(record.created_at).toLocaleDateString()}</span>
                            </div>

                        </div>
                    ))}
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