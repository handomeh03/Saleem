'use client';
import Link from 'next/link';
import { ShieldCheck, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { useAos } from '@/Hooks/useAos';

export default function AboutUs() {
  useAos();

  return (
    <section id="aboutus" className="py-16 lg:py-24 bg-main border-b border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          
          <div className="lg:col-span-6 relative flex justify-center" data-aos="fade-right" data-aos-duration="1000">
            <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="space-y-4">
                <div className="h-48 sm:h-64 rounded-3xl overflow-hidden shadow-lg bg-[url('https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="h-32 sm:h-40 rounded-3xl overflow-hidden shadow-lg bg-brand-primary flex flex-col items-center justify-center text-white p-6 text-center">
                  <span className="text-3xl font-black">10+</span>
                  <span className="text-xs font-medium opacity-90">Years of Excellence</span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-32 sm:h-40 rounded-3xl overflow-hidden shadow-lg bg-card-custom border border-subtle flex flex-col items-center justify-center p-6 text-center">
                  <HeartPulse className="w-8 h-8 text-brand-primary mb-2" />
                  <span className="text-xs font-bold text-brand-dark">Patient First Approach</span>
                </div>
                <div className="h-48 sm:h-64 rounded-3xl overflow-hidden shadow-lg bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-6 flex flex-col items-start text-left" data-aos="fade-left" data-aos-duration="1000">
            
            <div className="inline-flex items-center gap-2 bg-sky-100 text-brand-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6">
              About Our Clinic
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-[1.2] mb-6">
              Dedicated to Your Health & Well-being Every Single Day
            </h2>

            <p className="text-base text-brand-muted leading-relaxed mb-8">
              We combine advanced medical technologies with compassionate, personalized care to ensure you and your family receive the highest standard of treatment in a comfortable and healing environment.
            </p>

            <div className="space-y-4 w-full mb-8" data-aos="fade-up" data-aos-delay="200">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-card-custom border border-subtle shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center shrink-0">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-dark">Advanced Medical Technology</h3>
                  <p className="text-xs text-brand-muted mt-1">State-of-the-art diagnostic tools and modern treatment equipment.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-card-custom border border-subtle shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-brand-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-dark">Certified & Expert Specialists</h3>
                  <p className="text-xs text-brand-muted mt-1">Highly experienced doctors dedicated to specialized medical care.</p>
                </div>
              </div>
            </div>

           
          </div>

        </div>

      </div>
    </section>
  );
}