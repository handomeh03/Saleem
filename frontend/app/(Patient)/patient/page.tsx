'use client';

import React, { useState } from 'react';
import { Search, Calendar, Clock, Stethoscope, FileText, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import Loader from '@/components/Loader';
import { useGetPatientRecord } from '@/features/Patient/hooks/useGetPatientRecord';

export default function PatientPortalPage() {
    const [inputCode, setInputCode] = useState<string>('');
    const [searchedCode, setSearchedCode] = useState<string>('');

    const { data: record, isLoading, refetch, isError } = useGetPatientRecord(searchedCode);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputCode.trim()) return;
        setSearchedCode(inputCode);
        setTimeout(() => {
            refetch();
        }, 0);
    };

    return (
        <div className="min-h-screen bg-main py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="text-center space-y-3 bg-card-custom border border-subtle p-8 rounded-3xl shadow-xs">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto shadow-xs font-black">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">Patient Appointment Tracker</h1>
                    <p className="text-xs sm:text-sm text-brand-muted">Enter your unique patient code below to check your appointment status and details.</p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="bg-card-custom border border-subtle p-6 rounded-3xl shadow-xs flex flex-col sm:flex-row gap-3 items-stretch">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            placeholder="e.g. PAT-6731"
                            className="w-full h-full pl-11 pr-4 py-3.5 bg-main border border-subtle rounded-2xl text-xs font-black uppercase text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !inputCode.trim()}
                        className={`h-[46px] px-8 rounded-2xl text-xs font-black transition flex items-center justify-center shrink-0 ${
                            isLoading 
                                ? 'bg-brand-primary/40 text-white cursor-not-allowed shadow-none' 
                                : 'bg-brand-primary text-white shadow-lg shadow-sky-500/20 hover:opacity-95 cursor-pointer'
                        } disabled:opacity-50`}
                    >
                        <span>Search Record</span>
                    </button>
                </form>

                {/* Results Section */}
                {searchedCode && (
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="py-12 bg-card-custom border border-subtle rounded-3xl text-center">
                                <Loader size="md" text="Searching for your appointment..." />
                            </div>
                        ) : isError || !record ? (
                            <div className="bg-card-custom border border-subtle p-10 rounded-3xl text-center space-y-2">
                                <p className="text-sm font-black text-brand-dark">No Appointment Found</p>
                                <p className="text-xs text-brand-muted">No records match the code &quot;{searchedCode}&quot;. Please check and try again.</p>
                            </div>
                        ) : (
                            <div className="bg-card-custom border border-subtle rounded-3xl p-6 sm:p-8 shadow-md space-y-6 animate-in fade-in duration-300">
                                
                                {/* Top: Code & Status */}
                                <div className="flex items-center justify-between border-b border-subtle pb-4">
                                    <div className="space-y-0.5">
                                        <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Patient Code</span>
                                        <h3 className="text-base font-black text-brand-primary">{record.patient_code}</h3>
                                    </div>

                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                                        record.status === 'COMPLETED' || record.status === 'CONFIRMED'
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                            : record.status === 'PENDING'
                                            ? 'bg-amber-50 text-amber-600 border-amber-200'
                                            : 'bg-red-50 text-red-600 border-red-200'
                                    }`}>
                                        {record.status === 'PENDING' ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                        {record.status}
                                    </span>
                                </div>

                                {/* Doctor Info */}
                                <div className="flex items-center gap-4 bg-main p-4 rounded-2xl border border-subtle">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black shrink-0">
                                        <Stethoscope className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-brand-dark">{record.doctor?.user?.name || 'Dr. Assigned'}</h4>
                                        <p className="text-xs text-brand-muted font-bold mt-0.5">{record.doctor?.specialization || 'General Practitioner'}</p>
                                    </div>
                                </div>

                                {/* Date & Time Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                                    <div className="bg-main p-4 rounded-2xl border border-subtle flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-brand-muted block font-bold uppercase">Appointment Date</span>
                                            <strong className="text-brand-dark text-sm">{record.date}</strong>
                                        </div>
                                    </div>

                                    <div className="bg-main p-4 rounded-2xl border border-subtle flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-brand-muted block font-bold uppercase">Time Slot</span>
                                            <strong className="text-brand-dark text-sm">{record.from_time} - {record.to_time}</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes / Description */}
                                {record.description && record.description !== 'N/A' && (
                                    <div className="space-y-1.5 pt-2">
                                        <span className="text-xs font-black text-brand-dark flex items-center gap-1.5">
                                            <FileText className="w-4 h-4 text-brand-primary" /> Notes & Description
                                        </span>
                                        <p className="text-xs text-brand-muted bg-main p-4 rounded-2xl border border-subtle font-medium leading-relaxed">
                                            {record.description}
                                        </p>
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}