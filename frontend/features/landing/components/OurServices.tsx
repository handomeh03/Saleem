'use client';
import { useAos } from '@/Hooks/useAos';
import { Heart, Stethoscope, Smile, Baby, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Heart,
    title: 'Cardiology',
    description: 'Comprehensive heart care with advanced diagnostics and treatment.',
  },
  {
    icon: Stethoscope,
    title: 'General Medicine',
    description: 'Expert care for everyday health concerns and chronic conditions.',
  },
  {
    icon: Smile,
    title: 'Dental Care',
    description: 'Complete dental solutions for a healthy and confident smile.',
  },
  {
    icon: Baby,
    title: "Women's Health",
    description: 'Compassionate care for women at every stage of life.',
  },
];

export default function OurServices() {
  useAos();

  return (
    <section id="service" className="py-16 lg:py-24 bg-main border-b border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* العنوان العلوي مع حركات AOS */}
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up" data-aos-duration="800">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-brand-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            High-Quality Medical Services
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* شبكة الكروت مع تدرج ظهور (Staggered Animation) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-card-custom border border-subtle p-8 rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-start text-left group"
                data-aos="fade-up"
                data-aos-delay={index * 150} // كل كارت يتأخر قليلاً عن الكارت الذي قبله
                data-aos-duration="800"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-100 text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <IconComponent className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-brand-dark mb-3">
                  {service.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}