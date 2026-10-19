'use client';

import Loader from '@/components/Loader';
import DoctorDetailsContent from '@/features/Doctor/components/DoctorDetailsContent';
import { Suspense } from 'react';
export default function DoctorDetailsPage() {
    return (
        <Suspense fallback={<Loader fullScreen text="Loading page..." />}>
            <DoctorDetailsContent />
        </Suspense>
    );
}