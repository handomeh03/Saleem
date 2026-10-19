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
    
    const adminMenu: MenuItem[] = [
        { 
            label: 'Doctors', 
            href: '/admin-dashboard/doctors',
            icon: Stethoscope    
        },
        { 
            label: 'Invite Doctor', 
            href: '/admin-dashboard/create-doctor', 
            icon: UserPlus       
        },
        { 
            label: 'Create Schedule', 
            href: '/admin-dashboard/create-doctor-schedule', 
            icon: CalendarClock  
        },
        { 
            label: 'Doctor Records', 
            href: '/admin-dashboard/doctor-recourds', 
            icon: ClipboardList  
        },
    ];

    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        
        <ProtectedRoute allowedRoles={['admin']} redirectTo="/">
            <div className="flex flex-col lg:flex-row min-h-screen bg-main w-full overflow-x-hidden">
                
                {/* Sidebar */}
                <Sidebar
                    roleTitle="Admin Portal" 
                    menuItems={adminMenu} 
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