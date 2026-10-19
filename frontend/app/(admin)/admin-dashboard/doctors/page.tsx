'use client';

import React, { useState } from 'react';
import { Stethoscope, Mail, Phone, CheckCircle2, XCircle, UserCheck, UserX, Search } from 'lucide-react';
import Loader from '@/components/Loader'; 
import { Pagination } from '@/components/Pagenation';
import { useGetDoctors } from '@/features/Doctor/hooks/useGetDoctors';
import { useActivateDoctor } from '@/features/Doctor/hooks/useActivateDoctor';



export default function AdminDoctorsPage() {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>(''); 
    

    
    const { data: responseData, isLoading, isError } = useGetDoctors({page,searchQuery});

    
  const toggleActiveMutation = useActivateDoctor();
  

    const doctors = responseData?.data || [];
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
                    <p className="text-red-500 font-bold text-lg mb-2">Failed to load doctors list</p>
                    <p className="text-xs text-brand-muted">Please check your connection or try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-16">
            
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card-custom border border-subtle p-6 sm:p-8 rounded-3xl shadow-xs">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">Manage Doctors</h1>
                    <p className="text-xs sm:text-sm text-brand-muted mt-1">View, manage, and toggle active status for registered doctors.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search doctors..."
                            className="w-full sm:w-64 pl-11 pr-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all"
                        />
                    </div>

                    <div className="bg-brand-primary/10 text-brand-primary px-4 py-3 rounded-2xl text-xs font-black text-center border border-brand-primary/20 shrink-0">
                        Total: {totalCount}
                    </div>
                </div>
            </div>

            
            {isLoading && !responseData ? (
                <Loader fullScreen={true} text="Loading doctors..." />
            ) : doctors.length === 0 ? (
                <div className="text-center py-20 bg-card-custom border border-subtle rounded-3xl">
                    <p className="text-brand-muted font-bold text-sm">No doctors found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {doctors.map((doc) => (
                        <div 
                            key={doc.id} 
                            className="bg-card-custom border border-subtle rounded-3xl p-6 shadow-xs flex flex-col justify-between transition-all hover:shadow-md"
                        >
                            <div>
                                
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-black text-lg shadow-inner border border-brand-primary/20 shrink-0">
                                            {doc.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-brand-dark">{doc.name}</h3>
                                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-primary bg-brand-primary/10 px-2.5 py-0.5 rounded-full mt-0.5">
                                                <Stethoscope className="w-3 h-3" /> {doc.doctor?.specialization || 'General'}
                                            </span>
                                        </div>
                                    </div>

                                    
                                    {doc.isActive ? (
                                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            <CheckCircle2 className="w-3 h-3" /> Active
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                                            <XCircle className="w-3 h-3" /> Inactive
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="space-y-2 py-4 border-t border-b border-subtle my-4 text-xs font-medium text-brand-muted">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                                        <span className="truncate">{doc.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                                        <span>{doc.phone}</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="pt-2 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-brand-muted">
                                    Joined: {new Date(doc.createdAt).toLocaleDateString()}
                                </span>

                                <button
                                    onClick={() => toggleActiveMutation.mutate({ doctorId: doc.id })}
                                    disabled={toggleActiveMutation.isPending}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                                        doc.isActive 
                                            ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' 
                                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100'
                                    }`}
                                >
                                    {doc.isActive ? (
                                        <>
                                            <UserX className="w-3.5 h-3.5" /> Deactivate
                                        </>
                                    ) : (
                                        <>
                                            <UserCheck className="w-3.5 h-3.5" /> Activate
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            
              {responseData && responseData.totalPages > 1 && (
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