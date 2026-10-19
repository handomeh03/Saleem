'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LucideIcon, Menu, X } from 'lucide-react';

export interface MenuItem {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string | number; 
}

interface SidebarProps {
    roleTitle: string; 
    menuItems: MenuItem[];
    onLogout?: () => void; 
}

export default function Sidebar({ roleTitle, menuItems, onLogout }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <>
            
            <div className="lg:hidden flex items-center justify-between bg-card-custom border-b border-subtle px-4 py-3.5 sticky top-0 z-45 shadow-xs">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-primary text-white flex items-center justify-center font-black text-sm shadow-md">
                        {roleTitle.charAt(0)}
                    </div>
                    <h2 className="text-sm font-black text-brand-dark">{roleTitle}</h2>
                </div>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-xl bg-main border border-subtle text-brand-dark hover:bg-brand-primary/10 transition-all cursor-pointer"
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
                />
            )}

            
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-64 
                bg-card-custom border-r border-subtle 
                flex flex-col justify-between p-6 shrink-0 shadow-xs
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                
                
                <div>
                    <div className="flex items-center justify-between px-2 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-sky-500/20">
                                {roleTitle.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Portal</span>
                                <h2 className="text-base font-black text-brand-dark">{roleTitle}</h2>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="lg:hidden p-1.5 rounded-xl text-brand-muted hover:bg-main transition-all cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    
                    <nav className="space-y-2">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-black transition-all duration-300 ${
                                        isActive
                                            ? 'bg-brand-primary text-white shadow-lg shadow-sky-500/25 scale-[1.02]'
                                            : 'text-brand-muted hover:bg-main hover:text-brand-dark'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-brand-primary'}`} />
                                        <span>{item.label}</span>
                                    </div>
                                    
                                    {item.badge && (
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                            isActive ? 'bg-white/20 text-white' : 'bg-brand-primary/10 text-brand-primary'
                                        }`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                
                <div className="pt-6 border-t border-subtle">
                    {onLogout && (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-black text-red-500 hover:bg-red-50 transition-all duration-300 cursor-pointer"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    )}
                </div>

            </aside>
        </>
    );
}