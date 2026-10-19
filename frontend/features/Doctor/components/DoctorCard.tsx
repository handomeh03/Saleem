import { Button } from '@/components/Button';
import { Calendar, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DoctorCardProps {
    doctor: {
        id: number;
        name?: string;
        phone?: string;
        doctor?: {
            specialization?: string;
        };
    };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
    const router=useRouter();
    return (
        <div
            className="bg-card-custom border border-subtle rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
        >

            <div className="relative h-48 overflow-hidden bg-sky-50 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-2xl">
                    {doctor.name?.charAt(0) || 'D'}
                </div>
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    Active
                </div>
            </div>


            <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-semibold text-brand-primary mb-1">
                    {doctor.doctor?.specialization || 'General Practitioner'}
                </span>
                <h3 className="text-lg font-extrabold text-brand-dark mb-2">
                    {doctor.name}
                </h3>

                <div className="space-y-1.5 mb-6 flex-grow">
                    <p className="text-xs text-brand-muted flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-brand-primary" />
                        {doctor.phone || 'No phone provided'}
                    </p>
                </div>


                <Button
                    variant="outline"
                    className="w-full justify-center group-hover:bg-brand-primary  group-hover:border-brand-primary transition-colors"
                    icon={<Calendar className="w-4 h-4" />}
                   onClick={()=>{router.push(`/DoctorDetils/${doctor.id}`)}}
                >
                    Book Appointment
                </Button>
            </div>
        </div>
    );
}