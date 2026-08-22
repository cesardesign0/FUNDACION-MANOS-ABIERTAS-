import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Mail, Phone, Globe, ShieldCheck } from 'lucide-react';

export const TopBar = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="bg-brand-navy text-slate-300 text-xs py-2 px-3 sm:px-6 lg:px-8 border-b border-slate-700/50 hidden md:block w-full">
      <div className="w-full max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Contact Info */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-brand-teal" />
            <span>{t.topbar.address}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-brand-teal" />
            <a href={`mailto:${t.topbar.email}`} className="hover:underline">{t.topbar.email}</a>
          </div>
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5 text-brand-teal" />
            <span>{t.topbar.phone}</span>
          </div>
        </div>

        {/* Right: Transparency & Language Switcher */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.topbar.transparency}</span>
          </div>

          <div className="h-3.5 w-px bg-slate-700"></div>

          {/* Bilingual Language Switcher Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-full border border-slate-600 transition-all font-medium text-[11px] shadow-sm hover:border-brand-teal"
            title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-3.5 h-3.5 text-brand-gold" />
            <span>{language === 'es' ? '🇺🇸 English' : '🇪🇸 Español'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
