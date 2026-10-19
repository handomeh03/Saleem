'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Clock, Phone, Mail, CheckCircle2, Sparkles, UserCheck, Calendar, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/Button';
import { useAos } from '@/Hooks/useAos';
import Loader from '@/components/Loader';
import Slot from '@/features/Doctor/components/Slot';
import AppointmentSummary from '@/features/Doctor/components/AppointmentSummary';
import AppointmentCard from '@/features/Patient/components/AppointmentCard'; // الكومبوننت الذي يعرض تفاصيل الموعد
import { useGetdoctorDetails } from '../hooks/useGetdoctorDetails';
import { useMakeAppointment } from '@/features/Patient/hooks/useMakeAppointment';
import { AppointmentFormValues, appointmentSchema } from '@/features/Patient/Types/CreateAppointmentType';

export default function DoctorDetailsContent() {
    const params = useParams();
    useAos();

    
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [appointmentData, setAppointmentData] = useState<any>(null);

    const rawId = params?.id;
    const doctorId = Array.isArray(rawId) ? Number(rawId[0]) : Number(rawId ?? 0);

    // get doc details
    const { responseData, isLoading, isError } = useGetdoctorDetails({
        doctorId: String(doctorId)
    });


    // make appointment
    const { makeAppointment, isPending } = useMakeAppointment(String(doctorId));

    const doctorData = responseData?.data;
    const targetDate = responseData?.targetDate;

    const {  register,  handleSubmit,  setValue,  watch,  formState: { errors } } = useForm({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            slot: null,
            description: '',
        }
    });

    const selectedSlot = watch('slot');

    const onSubmit = (data: AppointmentFormValues) => {
        const payload = {
            doctorId: doctorId,
            from_time: data.slot?.from_time || '',
            to_time: data.slot?.end_time || '',
            description: data.description?.trim() ? data.description : "N/A"
        };

       
        makeAppointment(payload, {
            onSuccess: (res) => {
                
                setAppointmentData(res?.data || {
                    id: res?.id || 3,
                    doctorId: doctorId,
                    patient_code: res?.patient_code || "PAT-9801",
                    date: targetDate,
                    from_time: data.slot?.from_time,
                    to_time: data.slot?.end_time,
                    status: "PENDING",
                    description: data.description || "N/A",
                    created_at: res?.created_at,
                    updatedAt:res?.updatedAt
                });

                setIsSuccess(true);
            }
        });
    };

    if (isLoading) {
        return <Loader fullScreen={true} text='Loading doctor profile...' />;
    }

    if (isError || !doctorData) {
        return (
            <div className="min-h-screen bg-main flex items-center justify-center px-4">
                <div className="bg-card-custom border border-red-200 p-8 rounded-3xl text-center max-w-md shadow-lg">
                    <p className="text-red-500 font-bold text-lg mb-2">Failed to load doctor details</p>
                    <p className="text-xs text-brand-muted">Please check your connection or try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-main pb-24">

            {/* Header / Hero Section */}
            <section className="relative overflow-hidden bg-card-custom border-b border-subtle py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto relative flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div data-aos="zoom-in" className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 text-brand-primary flex items-center justify-center font-black text-5xl shadow-inner border border-brand-primary/20 shrink-0">
                        {doctorData.name?.charAt(0) || 'D'}
                    </div>

                    <div data-aos="fade-up" className="flex-grow text-center md:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mb-3 border border-brand-primary/20">
                            <Sparkles className="w-3.5 h-3.5" />
                            {doctorData.specialization}
                        </div>

                        <h1 className="text-3xl sm:text-5xl font-black text-brand-dark tracking-tight mb-4">
                            {doctorData.name}
                        </h1>

                        <div className="bg-main/60 border border-subtle p-4 rounded-2xl mb-6 shadow-xs">
                            <div className="flex items-center gap-2 text-xs font-bold text-brand-primary mb-1 uppercase tracking-wider">
                                <FileText className="w-3.5 h-3.5" />
                                Professional Bio & Description
                            </div>
                            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-medium">
                                {doctorData.bio || 'No professional description provided yet.'}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-brand-muted">
                            <div className="flex items-center gap-2 bg-main px-3.5 py-2 rounded-xl border border-subtle shadow-xs">
                                <Phone className="w-4 h-4 text-brand-primary" />
                                <span>{doctorData.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-main px-3.5 py-2 rounded-xl border border-subtle shadow-xs">
                                <Mail className="w-4 h-4 text-brand-primary" />
                                <span>{doctorData.email || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* الشرط بناءً على الـ State: إذا نجحت العملية اعرض الكومبوننت، وإلا اعرض النموذج */}
            {isSuccess ? (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                    <div className="text-center mb-8" data-aos="fade-up">
                        <h2 className="text-2xl sm:text-3xl font-black text-brand-dark mb-2">Appointment Details</h2>
                        <p className="text-xs sm:text-sm text-brand-muted">Your appointment has been created successfully.</p>
                    </div>

                    <div data-aos="fade-up" data-aos-delay="100">
                        {/* عرض الكومبوننت وتمرير الداتا له */}
                        <AppointmentCard appointment={appointmentData} />
                    </div>

                    <div className="text-center mt-8">
                        <Button 
                            onClick={() => setIsSuccess(false)}
                            className="bg-brand-primary text-white px-8 py-3 rounded-2xl font-bold text-xs"
                        >
                            Book Another Appointment
                        </Button>
                    </div>
                </section>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div data-aos="fade-up" className="lg:col-span-2 space-y-8">
                            
                            <div className="bg-card-custom border border-subtle rounded-3xl p-6 sm:p-8 shadow-xs">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-subtle">
                                    <div>
                                        <h2 className="text-xl font-black text-brand-dark flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-brand-primary" />
                                            Available Time Slots
                                        </h2>
                                        <p className="text-xs text-brand-muted mt-1">
                                            Select an appropriate time slot for your appointment on <span className="font-bold text-brand-primary">{targetDate}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 bg-main px-4 py-3 rounded-2xl border border-subtle shadow-xs">
                                        <div className="w-8 h-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col text-left">
                                            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider">Target Date</span>
                                            <span className="text-xs sm:text-sm font-extrabold text-brand-dark">{targetDate}</span>
                                        </div>
                                    </div>
                                </div>

                                {doctorData.availableSlots?.length === 0 ? (
                                    <div className="text-center py-16">
                                        <p className="text-brand-muted font-bold">No available slots for this date.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {doctorData.availableSlots.map((slot: any, index: number) => {
                                            const isSelected = selectedSlot?.from_time === slot.from_time;
                                            return (
                                                <Slot
                                                    key={index}
                                                    slot={slot}
                                                    isSelected={isSelected}
                                                    onSelect={() => setValue('slot', slot, { shouldValidate: true })}
                                                />
                                            );
                                        })}
                                    </div>
                                )}

                                {errors.slot && (
                                    <p className="text-red-500 text-xs font-bold mt-4 text-center">
                                         {errors.slot.message}
                                    </p>
                                )}
                            </div>

                            <div className="bg-card-custom border border-subtle rounded-3xl p-6 sm:p-8 shadow-xs">
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare className="w-5 h-5 text-brand-primary" />
                                    <h3 className="text-lg font-black text-brand-dark">Describe Your Condition (Optional)</h3>
                                </div>
                                <p className="text-xs text-brand-muted mb-4">
                                    Provide brief details about your symptoms or reason for visit.
                                </p>
                                <textarea
                                    {...register('description')}
                                    placeholder="E.g., Experiencing mild skin rash for 3 days..."
                                    rows={4}
                                    className="w-full p-4 bg-main border border-subtle rounded-2xl text-sm text-brand-dark placeholder-brand-muted focus:outline-none focus:border-brand-primary transition-all resize-none font-medium"
                                />
                            </div>

                        </div>

                        <div data-aos="fade-up" data-aos-delay="100" className="bg-card-custom border border-subtle rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between h-fit">
                            <div>
                                <h3 className="text-lg font-black text-brand-dark mb-4 pb-4 border-b border-subtle flex items-center gap-2">
                                    <UserCheck className="w-5 h-5 text-brand-primary" />
                                    Appointment Summary
                                </h3>

                                <AppointmentSummary
                                    doctorName={doctorData.name}
                                    specialization={doctorData.specialization}
                                    targetDate={targetDate}
                                    selectedSlot={selectedSlot}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={!selectedSlot || isPending}
                                className={`w-full justify-center py-4 rounded-2xl font-black text-sm shadow-xl transition-all ${
                                    selectedSlot && !isPending
                                        ? 'bg-brand-primary text-white hover:bg-sky-700 shadow-sky-500/20 cursor-pointer'
                                        : 'opacity-50 cursor-not-allowed bg-slate-200 text-slate-500 border-none'
                                }`}
                                icon={<CheckCircle2 className="w-5 h-5" />}
                            >
                                {isPending ? 'Booking...' : 'Make Appointment'}
                            </Button>
                        </div>

                    </div>
                </form>
            )}

        </div>
    );
}