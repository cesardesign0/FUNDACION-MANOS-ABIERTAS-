import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Mail, Phone, MapPin, Send, Instagram, Facebook, Globe, ShieldCheck, Lock } from 'lucide-react';
import { FOUNDATION_CONFIG } from '../config/foundationConfig';

export const Footer = ({ onOpenDonate, onOpenVolunteer, onOpenAdmin }) => {
  const { language, t } = useLanguage();
  const { footer } = t;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1: Identity & Church link */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-manos-abiertas.png"
                alt="Fundación Manos Abiertas"
                className="h-14 w-auto object-contain bg-white rounded-xl p-1 shadow-md"
              />
              <div>
                <span className="font-display font-black text-sm text-white tracking-tight block">
                  MANOS ABIERTAS
                </span>
                <span className="text-[10px] font-bold text-brand-coral uppercase tracking-wider block">
                  de Jesús & María
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {footer.aboutText}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={FOUNDATION_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={FOUNDATION_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://centrobronx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-brand-teal text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                title="Sitio Oficial Centro Carismático"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#mission" className="hover:text-white transition-colors">Nuestra Misión</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Misiones y Causas</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">La Casa de Ayuda (Centro Bronx)</a></li>
              <li><a href="#retreats" className="hover:text-white transition-colors">Calendario de Actividades</a></li>
              <li><a href="#shop" className="hover:text-white transition-colors">Tienda Solidaria</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Casa de Ayuda & Contacto
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5" />
                <span>{FOUNDATION_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <a href={`tel:${FOUNDATION_CONFIG.phone}`} className="hover:text-white transition-colors">{FOUNDATION_CONFIG.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href={`mailto:${FOUNDATION_CONFIG.officialEmail}`} className="hover:text-white transition-colors">{FOUNDATION_CONFIG.officialEmail}</a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Obra Respaldada Pastoralmente</span>
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Action */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              {footer.newsletterTitle}
            </h4>
            <p className="text-xs text-slate-400">
              {footer.newsletterDesc}
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold">
                {footer.subscribeSuccess}
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder={footer.placeholderEmail}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-teal"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-brand-teal hover:bg-brand-teal-dark text-white transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenDonate}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-md"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Hacer Donación</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Author Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} Fundación Manos Abiertas de Jesús & María. {footer.rights}
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-400">
              <span>Diseño & Desarrollo por</span>
              <a
                href="https://www.instagram.com/cdesign01/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-brand-gold hover:text-amber-300 transition-colors uppercase tracking-wider underline-offset-4 hover:underline"
                title="Visitar perfil oficial de CDESIGN en Instagram"
              >
                CDESIGN
              </a>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">{footer.privacy}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{footer.terms}</a>
            
            {/* Shortcut al panel /admin */}
            <button
              onClick={onOpenAdmin}
              className="hover:text-brand-gold transition-colors flex items-center gap-1 text-slate-400 font-bold"
              title="Acceso exclusivo para la administración pastoral"
            >
              <Lock className="w-3 h-3" />
              <span>Acceso Pastoral / Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
