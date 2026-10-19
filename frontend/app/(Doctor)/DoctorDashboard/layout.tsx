'use client';

import React from 'react';
import { 
    Stethoscope,      
    UserPlus,         
    CalendarClock,   
    ClipboardList, 
} from 'lucide-react';

import Sidebar, { MenuItem } from '@/components/Sidebar';
import { useAuth } from '@/store/context/userContext';
import ProtectedRoute from '@/components/ProtectedRoute';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    
    const doctorMenu: MenuItem[] = [
               { 
            label: 'Doctor Records', 
            href: '/DoctorDashboard/doctor-recourds', 
            icon: ClipboardList  
        },
           { 
            label: 'Doctor Schedule', 
            href: '/DoctorDashboard/doctor-schedules', 
            icon: ClipboardList  
        },
    ];

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        
        <ProtectedRoute allowedRoles={['doctor']} redirectTo="/">
            <div className="flex flex-col lg:flex-row min-h-screen bg-main w-full overflow-x-hidden">
                
                {/* Sidebar */}
                <Sidebar
                    roleTitle="doctor Portal" 
                    menuItems={doctorMenu} 
                    onLogout={handleLogout} 
                />

                {/* Main Content */}
                <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}