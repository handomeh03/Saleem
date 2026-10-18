'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const QUICK_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#aboutus' },
  { name: 'Our Services', href: '#service' },
  { name: 'Doctors', href: '#doctors' },
  { name: 'Contact', href: '#footer' },
];

const SERVICES_LINKS = [
  { name: 'Cardiology', href: '#service' },
  { name: 'General Medicine', href: '#service' },
  { name: 'Dental Care', href: '#service' },
  { name: "Women's Health", href: '#service' },
  { name: 'Pediatrics', href: '#service' },
];

export default function Footer() {

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer id="footer" className="bg-hero text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="#" onClick={(e) => handleScrollToSection(e, '#')} className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
                +
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  Saleem<span className="text-brand-primary">Care</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-widest uppercase">Health Clinic</span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Providing exceptional medical care, advanced diagnostic services, and dedicated health professionals to ensure your family well-being.
            </p>

            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-primary hover:text-white transition">
                <span className="font-bold text-sm">Fb</span>
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-primary hover:text-white transition">
                <span className="font-bold text-sm">Tw</span>
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-primary hover:text-white transition">
                <span className="font-bold text-sm">Ig</span>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-brand-primary hover:text-white transition">
                <span className="font-bold text-sm">In</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-base font-bold text-white mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className="hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-primary" /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-base font-bold text-white mb-5 tracking-wide">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {SERVICES_LINKS.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    onClick={(e) => handleScrollToSection(e, service.href)}
                    className="hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-brand-primary" /> {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <h4 className="text-base font-bold text-white mb-5 tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, Amman, Jordan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-primary shrink-0" />
                <span>+962 0 000 4067</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-primary shrink-0" />
                <span>support@saleemcare.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SaleemCare Health Clinic. All rights reserved.</p> 
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}