'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Loader2 } from 'lucide-react';
import { useAuth } from '@/store/context/userContext';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#aboutus' },
  { name: 'Our Services', href: '#service' },
  { name: 'Doctors', href: 'Doctors' },
  { name: 'Contact', href: '#footer' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const { user, isLoading, logout } = useAuth();

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
    setActiveLink(name);

    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const dashboardHref = user?.role?.roleName === "admin" ? "/admin-dashboard/doctors" : "/DoctorDashboard/doctor-recourds";

  return (
    <header className="sticky top-0 z-50 bg-card-custom border-b border-subtle shadow-xs">
      {/* Top Bar */}
      <div className="bg-hero text-white text-xs py-2 px-4 sm:px-8 hidden md:flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Health, Our Priority
          </span>
          <span className="text-slate-300">Open 7 Days a Week</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <Link href="/patient" className="hover:text-white transition">Patient Portal</Link>
          
          {isLoading ? (
            <span className="text-xs text-slate-400">Loading...</span>
          ) : user ? (
            <>
              <span>|</span>
              <Link href={dashboardHref} className="hover:text-white transition">Dashboard</Link>
            </>
          ) : null}

          <span>|</span>
          <Link href="#footer" onClick={(e) => handleScrollToSection(e, 'Contact', '#footer')} className="hover:text-white transition">Contact Us</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="#" onClick={(e) => handleScrollToSection(e, 'Home', '#')} className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-xl shadow-md">
            +
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-brand-dark">
              Saleem<span className="text-brand-primary">Care</span>
            </span>
            <span className="text-[10px] text-brand-muted tracking-widest uppercase">Health Clinic</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-brand-dark">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeLink === link.name;
            return (
              <a 
                key={index} 
                href={link.href} 
                onClick={(e) => handleScrollToSection(e, link.name, link.href)}
                className={`transition cursor-pointer ${
                  isActive ? 'text-brand-primary font-semibold' : 'text-brand-dark hover:text-brand-primary'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">  
          <Link 
            href="/Doctors" 
            className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-sky-500/20 hover:bg-sky-700 transition"
          >
            Book Appointment
          </Link>

          {isLoading ? (
            <div className="w-24 h-10 flex items-center justify-center bg-brand-primary/10 rounded-xl">
              <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
            </div>
          ) : user ? (
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-red-500/20 hover:bg-red-600 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link 
              href="/login" 
              className="bg-brand-primary text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-md shadow-sky-500/20 hover:bg-sky-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-brand-dark p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-card-custom border-b border-subtle shadow-xl py-6 px-6 flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {NAV_LINKS.map((link, index) => {
            const isActive = activeLink === link.name;
            return (
              <a 
                key={index}
                href={link.href} 
                onClick={(e) => handleScrollToSection(e, link.name, link.href)}
                className={`text-base py-2.5 border-b border-slate-100 cursor-pointer ${
                  isActive ? 'text-brand-primary font-semibold' : 'text-brand-dark hover:text-brand-primary'
                }`}
              >
                {link.name}
              </a>
            );
          })}

          <Link 
            href="/appointment" 
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-brand-primary text-white text-center py-3 rounded-xl font-medium shadow-md shadow-sky-500/20"
          >
            Book Appointment
          </Link>

          {/* ظهور زر الـ Dashboard في قائمة الموبايل في حال وجود المستخدم */}
          {!isLoading && user && (
            <Link 
              href={dashboardHref}
              onClick={() => setIsOpen(false)}
              className="bg-main border border-subtle text-brand-dark text-center py-3 rounded-xl font-medium shadow-2xs hover:bg-subtle/50 transition"
            >
              Dashboard
            </Link>
          )}

          {isLoading ? (
            <div className="mt-2 py-3 flex items-center justify-center bg-brand-primary/10 rounded-xl">
              <Loader2 className="w-5 h-5 text-brand-primary animate-spin" />
            </div>
          ) : user ? (
            <button 
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="mt-2 bg-red-500 text-white text-center py-3 rounded-xl font-medium shadow-md shadow-red-500/20 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-brand-primary text-white text-center py-3 rounded-xl font-medium shadow-md shadow-sky-500/20"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}