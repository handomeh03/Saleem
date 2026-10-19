'use client';

import { useState } from 'react';
import { Search, Sparkles, ShieldCheck, Users, Award } from 'lucide-react';

import { useBrowseDoctor } from '@/features/Doctor/hooks/useBrowseDoctor';
import DoctorLoadingCom from '@/features/Doctor/components/DoctorLoadingCom';
import NoDoctorFound from '@/features/Doctor/components/NoDoctorFound';
import DoctorCard from '@/features/Doctor/components/DoctorCard';
import { useAos } from '@/Hooks/useAos';
import { Pagination } from '@/components/Pagenation';

export default function DoctorsPage() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
     useAos();
    const { data, isLoading, isFetching, isError } = useBrowseDoctor({ 
        currentPage, 
        searchQuery 
    });

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-main pb-24">

            
            <section className="relative overflow-hidden bg-card-custom border-b border-subtle py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center">
                
              
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative max-w-4xl mx-auto">
                    
                    
                    <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-xs font-black tracking-wider uppercase mb-6 shadow-xs border border-brand-primary/20">
                        <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                        Elite Healthcare Network
                    </div>
                    
                    
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-brand-dark tracking-tight mb-6 leading-tight">
                        Your Health, Our Priority. <br />
                        Find Your <span className="text-brand-primary underline decoration-brand-primary/30 decoration-wavy underline-offset-8">Specialist</span> Today.
                    </h1>
                    
                    
                    <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
                        Connect instantly with certified doctors, top-tier medical consultants, and book your appointments seamlessly.
                    </p>

                    
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-bold text-brand-muted">
                        <div className="flex items-center gap-2 bg-card-custom px-4 py-2 rounded-2xl border border-subtle shadow-xs">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span>100% Verified Doctors</span>
                        </div>

                        <div className="flex items-center gap-2 bg-card-custom px-4 py-2 rounded-2xl border border-subtle shadow-xs">
                            <Users className="w-4 h-4 text-brand-primary" />
                            <span>Trusted Patients Network</span>
                        </div>

                        <div className="flex items-center gap-2 bg-card-custom px-4 py-2 rounded-2xl border border-subtle shadow-xs">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span>Top Rated Specialists</span>
                        </div>
                    </div>

                </div>
            </section>

            
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="relative shadow-xl rounded-3xl p-2 bg-card-custom border border-subtle focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10 transition-all duration-300">
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-brand-primary">
                                <Search className="w-5 h-5" />
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search by doctor name or specialization (e.g. Dermatology)..."
                                className="w-full pl-12 pr-4 py-3.5 bg-transparent text-sm sm:text-base text-brand-dark placeholder-brand-muted focus:outline-none font-semibold"
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="px-4 py-1.5 mr-1 text-xs font-extrabold bg-brand-primary/10 text-brand-primary rounded-xl hover:bg-brand-primary hover:text-white transition-all"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/*  List of Doctor Cards */}
                {isLoading || isFetching ? (
                    <DoctorLoadingCom />
                ) : isError ? (
                    <div className="text-center py-20 bg-card-custom border border-red-200 rounded-3xl shadow-xs">
                        <p className="text-red-500 font-bold text-base mb-1">Failed to load doctors catalog.</p>
                        <p className="text-xs text-brand-muted">Please check your network connection and try again.</p>
                    </div>
                ) : data?.data?.length === 0 ? (
                    <NoDoctorFound />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data?.data?.map((doctor: any) => (
                            <DoctorCard key={doctor?.id} doctor={doctor} />
                        ))}
                    </div>
                )}

                {/*  Pagination Component */}
                {data && data.totalPages > 1 && (
                    <div className="mt-16 flex justify-center">
                        <Pagination
                            currentPage={data.currentPage}
                            totalPages={data.totalPages}
                            totalCount={data.totalCount}
                            hasNextPage={data.hasNextPage}
                            hasPreviousPage={data.hasPreviousPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}

            </section>

        </div>
    );
}