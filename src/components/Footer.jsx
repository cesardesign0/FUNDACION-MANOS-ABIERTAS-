import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HandHeart, Heart, Send, CheckCircle2, MapPin, Mail, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export const Footer = ({ onOpenDonate, onOpenVolunteer }) => {
  const { t } = useLanguage();
  const { footer, topbar } = t;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-manos-abiertas.png"
                alt="Fundación Manos Abiertas de Jesús & María"
                className="h-14 w-auto object-contain bg-white rounded-xl p-1 shadow-md"
              />
              <div>
                <span className="font-display font-extrabold text-base tracking-tight text-white block leading-tight">
                  MANOS <span className="text-brand-teal">ABIERTAS</span>
                </span>
                <span className="text-[11px] tracking-wider uppercase text-brand-coral font-bold block">
                  de Jesús & María
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {footer.aboutText}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-brand-teal text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-brand-coral text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-sky-500 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-brand-teal transition-colors">Inicio</a></li>
              <li><a href="#mission" className="hover:text-brand-teal transition-colors">Nuestra Misión</a></li>
              <li><a href="#programs" className="hover:text-brand-teal transition-colors">Programas</a></li>
              <li><a href="#goals" className="hover:text-brand-teal transition-colors">Metas e Impacto</a></li>
              <li><a href="#about" className="hover:text-brand-teal transition-colors">La Casa de Ayuda</a></li>
              <li><a href="#shop" className="hover:text-brand-gold text-brand-gold font-semibold transition-colors">Tienda Solidaria</a></li>
              <li>
                <button onClick={onOpenVolunteer} className="hover:text-brand-teal transition-colors text-left">
                  Ser Voluntario
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>{topbar.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <a href={`mailto:${topbar.email}`} className="hover:underline">{topbar.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span>{topbar.phone}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">
              {footer.newsletterTitle}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {footer.newsletterDesc}
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{footer.subscribeSuccess}</span>
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

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Manos Amigas Non-Profit Org. {footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">{footer.privacy}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">{footer.terms}</a>
            <a href="#" className="hover:text-slate-300 transition-colors">501(c)(3) Status</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
