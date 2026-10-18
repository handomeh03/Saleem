'use client';

import Link from 'next/link';
import { Users, Smile, Award, Clock, ArrowRight } from 'lucide-react';
import 'aos/dist/aos.css';
import { useAos } from '@/Hooks/useAos';
import { useAuth } from '@/store/context/userContext';

export default function Hero() {
        
   useAos();

    return (
        <section id='hero' className="relative overflow-hidden bg-main pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-subtle">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* content */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left" data-aos="fade-right" data-aos-duration="1000">

                        <div className="inline-flex items-center gap-2 bg-sky-100 text-brand-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-brand-primary animate-ping"></span>
                            Trusted Care. Better Health.
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.15] mb-6">
                            Your Health <br />
                            Our <span className="text-brand-primary">Priority</span>
                        </h1>

                        <p className="text-sm sm:text-lg text-brand-muted max-w-xl leading-relaxed mb-8">
                            Compassionate care, advanced technology, and experienced specialists — all for a healthier you.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
                            <Link
                                href="/appointment"
                                className="bg-brand-primary text-white px-8 py-4 rounded-xl font-bold text-base shadow-lg shadow-sky-500/25 hover:bg-sky-700 transition text-center flex items-center justify-center gap-2"
                            >
                                Book Appointment
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/services"
                                className="bg-card-custom text-brand-dark border border-subtle px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-50 transition text-center shadow-xs"
                            >
                                Our Services
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-subtle w-full" data-aos="fade-up" data-aos-delay="200">

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-brand-dark">15+</h3>
                                    <p className="text-xs text-brand-muted font-medium">Expert Doctors</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center shrink-0">
                                    <Smile className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-brand-dark">10k+</h3>
                                    <p className="text-xs text-brand-muted font-medium">Happy Patients</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center shrink-0">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-extrabold text-brand-dark">25+</h3>
                                    <p className="text-xs text-brand-muted font-medium">Specialties</p>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* image section */}
                    <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0" data-aos="fade-left" data-aos-duration="1000">

                        <div className="absolute w-70 h-70 sm:w-100 sm:h-100 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>

                        <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none flex justify-center">

                            <div className="w-full h-95 sm:h-115 bg-brand-primary rounded-3xl overflow-hidden relative shadow-2xl flex items-end justify-center">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-top opacity-95"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent"></div>
                            </div>
                            
                            <div className="absolute -bottom-6 left-4 sm:left-auto sm:-right-6 bg-card-custom border border-subtle p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-3.5" data-aos="zoom-in" data-aos-delay="400">
                                <div className="w-12 h-12 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center shrink-0 shadow-inner">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-brand-dark">24/7</h4>
                                    <p className="text-xs text-brand-muted font-medium">Emergency Support</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}