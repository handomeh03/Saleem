'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User, Search, Check, ChevronDown, Stethoscope } from 'lucide-react';

interface Doctor {
    id: number;
    name: string;
    email: string;
    doctor?: {
        specialization: string;
    };
    hasSchedule?: boolean; 
}

interface DoctorSelectDropdownProps {
    doctors: Doctor[];
    selectedDoctorId: string;
    onSelect: (id: string) => void;
    isLoading: boolean;
}

export function DoctorSelectDropdown({ doctors, selectedDoctorId, onSelect, isLoading }: DoctorSelectDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    
    const filteredDoctors = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.doctor?.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedDoctor = doctors.find((doc) => String(doc.id) === selectedDoctorId);

    return (
        <div className="relative space-y-2" ref={dropdownRef}>
            <label className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-primary" /> Select Doctor
            </label>

            {/* Trigger Button */}
            <div
                onClick={() => !isLoading && setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-main border border-subtle rounded-2xl text-xs font-bold text-brand-dark flex items-center justify-between cursor-pointer transition-all hover:border-brand-primary"
            >
                <div className="flex items-center gap-2 truncate">
                    {selectedDoctor ? (
                        <>
                            <span className="font-black text-brand-dark">{selectedDoctor.name}</span>
                            <span className="text-[10px] text-brand-muted bg-brand-primary/10 px-2 py-0.5 rounded-md">
                                {selectedDoctor.doctor?.specialization || 'General'}
                            </span>
                        </>
                    ) : (
                        <span className="text-brand-muted">
                            {isLoading ? 'Loading doctors...' : '-- Choose a Doctor --'}
                        </span>
                    )}
                </div>
                <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu Box */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-card-custom border border-subtle rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    
                    {/* Search Input inside Dropdown */}
                    <div className="p-3 border-b border-subtle bg-main flex items-center gap-2">
                        <Search className="w-4 h-4 text-brand-muted shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search doctor by name or specialization..."
                            className="w-full bg-transparent text-xs font-bold text-brand-dark placeholder-brand-muted focus:outline-none"
                            autoFocus
                        />
                    </div>

                    {/* Doctors List */}
                    <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                        {filteredDoctors.length === 0 ? (
                            <div className="py-6 text-center text-xs text-brand-muted font-bold">
                                No doctors found.
                            </div>
                        ) : (
                            filteredDoctors.map((doc) => {
                                const isSelected = String(doc.id) === selectedDoctorId;
                                return (
                                    <div
                                        key={doc.id}
                                        onClick={() => {
                                            onSelect(String(doc.id));
                                            setIsOpen(false);
                                            setSearchQuery('');
                                        }}
                                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                                            isSelected ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-main text-brand-dark'
                                        }`}
                                    >
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-2">
                                                <span className="font-black">{doc.name}</span>
                                               
                                            </div>
                                            <span className="text-[11px] text-brand-muted flex items-center gap-1 font-medium">
                                                <Stethoscope className="w-3 h-3 text-brand-primary" /> {doc.doctor?.specialization || 'General'}
                                            </span>
                                        </div>

                                        {isSelected && <Check className="w-4 h-4 text-brand-primary" />}
                                    </div>
                                );
                            })
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}