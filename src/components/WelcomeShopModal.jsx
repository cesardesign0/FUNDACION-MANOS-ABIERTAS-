import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ShoppingBag, Sparkles, Heart, ArrowRight, BookOpen, Cross } from 'lucide-react';

export const WelcomeShopModal = ({ onOpenShop }) => {
  const { t } = useLanguage();
  const { welcomeModal } = t;
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Modal de bienvenida de la tienda desactivado (no se muestra automáticamente)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {}, []);

  const handleClose = () => {
    if (dontShowAgain) {
      sessionStorage.setItem('manos_amigas_welcome_seen', 'true');
    }
    setIsOpen(false);
  };

  const handleGoToShop = () => {
    handleClose();
    onOpenShop();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-brand-teal/20 animate-scaleUp">
        
        {/* Banner Header with Official Logo & Compassionate Sacred Imagery */}
        <div className="relative bg-gradient-to-r from-brand-navy via-slate-900 to-brand-teal text-white p-6 flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
            alt="Tienda Solidaria"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-20"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo Oficial de la Fundación en el Encabezado */}
          <div className="relative z-10 flex items-center justify-between gap-3 mb-4">
            <div className="bg-white rounded-2xl p-2 shadow-xl border-2 border-white/80 inline-flex items-center">
              <img
                src="/logo-manos-abiertas.png"
                alt="Fundación Manos Abiertas de Jesús y María"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>{welcomeModal.badge}</span>
              </span>
            </div>
          </div>

          {/* Quick Icons Row */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-brand-teal-light font-semibold flex-wrap">
            <span className="flex items-center gap-1">📿 Rosarios y Biblias</span>
            <span>•</span>
            <span className="flex items-center gap-1">📖 Libros de Motivación</span>
            <span>•</span>
            <span className="flex items-center gap-1">👕 Polos</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          <div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 leading-snug mb-2">
              {welcomeModal.title}
            </h3>
            <p className="text-brand-coral font-bold text-sm sm:text-base">
              "{welcomeModal.subtitle}"
            </p>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed">
            {welcomeModal.description}
          </p>

          {/* Notice Card */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/70 text-amber-900 text-xs font-semibold flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-brand-coral flex-shrink-0 fill-brand-coral" />
            <span>{welcomeModal.highlightNotice}</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleGoToShop}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-coral to-brand-coral-dark hover:from-brand-coral-dark hover:to-red-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-2xl shadow-xl shadow-brand-coral/25 hover:scale-[1.02] transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{welcomeModal.btnShop}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleClose}
              className="w-full text-center py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              {welcomeModal.btnContinue}
            </button>
          </div>

          {/* Don't show again checkbox */}
          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-400">
            <input
              type="checkbox"
              id="dontShowWelcome"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-300 text-brand-teal focus:ring-brand-teal w-3.5 h-3.5"
            />
            <label htmlFor="dontShowWelcome" className="cursor-pointer select-none">
              {welcomeModal.dontShow}
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
