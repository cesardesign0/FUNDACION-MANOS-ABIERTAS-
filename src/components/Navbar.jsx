import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Menu, X, Heart, Globe, ShoppingBag, Instagram } from 'lucide-react';

export const Navbar = ({ onOpenDonate, onOpenVolunteer, onOpenCart, cartItemCount = 0 }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { nav } = useAdminData();

  const navData = nav || t.nav;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: navData.home || t.nav.home, href: '#home' },
    { label: navData.mission || t.nav.mission, href: '#mission' },
    { label: navData.programs || t.nav.programs, href: '#programs' },
    { label: navData.about || t.nav.about, href: '#about' },
    { label: navData.retreats || t.nav.retreats || 'Calendario de Actividades', href: '#retreats' },
    { label: navData.goals || t.nav.goals || 'Misiones Completadas', href: '#goals' },
    { label: navData.shop || t.nav.shop, href: '#shop' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 w-full ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md py-2 text-slate-800 border-b border-slate-200' 
        : 'bg-slate-950/95 backdrop-blur-sm py-2.5 text-white border-b border-slate-800/80'
    }`}>
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
        
        {/* Brand Logo Oficial - Con proporciones claras y nítidas */}
        <a href="#home" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <img
            src="/logo-manos-abiertas.png"
            alt="Fundación Manos Abiertas de Jesús & María"
            className="h-12 sm:h-14 lg:h-16 w-auto object-contain bg-white rounded-xl p-1 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="hidden sm:block">
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-slate-400 block -mb-0.5">
              Fundación
            </span>
            <span className="font-display font-black text-sm sm:text-base lg:text-lg tracking-tight block leading-none text-[#424242]">
              MANOS <span className="text-[#424242]">ABIERTAS</span>
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-wider uppercase font-bold block mt-0.5 leading-none">
              <span className="text-[#8B1C1C]">de JESÚS </span>
              <span className="text-[#888888]">& </span>
              <span className="text-[#2BBEC9]">MARÍA</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation - Centrado Nítido */}
        <nav className="hidden lg:flex items-center justify-center flex-1 space-x-2 xl:space-x-4 2xl:space-x-6 text-[11px] xl:text-xs 2xl:text-sm font-bold mx-2">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`transition-all whitespace-nowrap text-center py-1.5 px-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-teal hover:after:w-full after:transition-all ${
                link.href === '#shop' 
                  ? 'text-[#8B1C1C] font-black flex items-center gap-1 bg-[#fcedec] hover:bg-[#fbdcdb] px-3 py-1 rounded-full border border-[#8B1C1C]/25 shadow-xs' 
                  : (scrolled ? 'text-slate-700 hover:text-brand-teal' : 'text-slate-200 hover:text-white')
              }`}
            >
              {link.href === '#shop' && <ShoppingBag className="w-3.5 h-3.5 text-[#8B1C1C]" />}
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Buttons (Instagram, Carrito, Idioma, Donar) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Instagram Official Link Button */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 sm:p-2.5 rounded-full border transition-all ${
              scrolled
                ? 'border-slate-300 text-slate-700 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300'
                : 'border-slate-700 text-slate-200 hover:bg-white/10 hover:text-pink-400'
            }`}
            title="Síguenos en Instagram"
          >
            <Instagram className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            className={`relative p-2 sm:p-2.5 rounded-full border transition-all ${
              scrolled
                ? 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-brand-teal'
                : 'border-slate-700 text-slate-200 hover:bg-white/10 hover:text-white'
            }`}
            title="Ver Carrito Solidario"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-coral text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Language switch */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1 text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full border font-bold transition-all ${
              scrolled
                ? 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
            title="Cambiar Idioma / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-brand-teal" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Botón Donar Ahora en Rojo Carmesí */}
          <button
            onClick={() => onOpenDonate()}
            className="inline-flex items-center gap-1.5 bg-brand-coral hover:bg-brand-coral-dark text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-brand-coral/30 hover:scale-105 transition-all whitespace-nowrap"
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            <span>{t.nav.donate}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-colors ${
              scrolled ? 'border-slate-200 text-slate-800 hover:bg-slate-100' : 'border-slate-800 text-white hover:bg-slate-900'
            }`}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-t border-slate-800 px-5 pt-4 pb-6 space-y-3 animate-fadeIn text-white shadow-2xl">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-sm font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 text-white font-bold py-2.5 rounded-full text-xs hover:bg-white/20"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram Oficial</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="w-full flex items-center justify-center gap-2 bg-brand-coral text-white font-extrabold py-3 rounded-full text-sm shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{t.nav.donate}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
