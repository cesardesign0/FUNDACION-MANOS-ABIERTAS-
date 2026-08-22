import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Heart, Star, Sparkles, MessageCircle, PenLine, ShieldCheck } from 'lucide-react';

export const VolunteerSection = ({ onOpenVolunteer, onOpenReviewModal, customReviews = [] }) => {
  const { language, t } = useLanguage();
  const { volunteerSection } = t;

  // Combine default testimonials with approved custom reviews
  const allTestimonials = [...volunteerSection.testimonials, ...customReviews];

  return (
    <section className="py-24 bg-gradient-to-br from-brand-navy via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Glow ambient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Callout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-brand-gold font-bold text-xs uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{volunteerSection.tag}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mb-6">
            {volunteerSection.title}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            {volunteerSection.desc}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenVolunteer()}
              className="inline-flex items-center gap-3 bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-2xl shadow-brand-coral/30 hover:scale-105 transition-all uppercase tracking-wider"
            >
              <Users className="w-5 h-5 text-white" />
              <span>{volunteerSection.btnJoin}</span>
            </button>

            {/* Botón: Dejar una Reseña o Testimonio */}
            <button
              onClick={() => onOpenReviewModal()}
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-white/30 backdrop-blur-md hover:scale-105 transition-all"
            >
              <PenLine className="w-4 h-4 text-brand-gold" />
              <span>{language === 'es' ? 'Dejar una Reseña o Testimonio' : 'Leave a Review / Testimony'}</span>
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {allTestimonials.map((test, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-brand-gold">
                    {[...Array(test.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold" />
                    ))}
                  </div>

                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Testimonio Verificado</span>
                  </span>
                </div>

                <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{test.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center text-white font-bold text-sm">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">{test.author}</h4>
                  <p className="text-xs text-brand-teal-light font-medium">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote about Reviews Moderation */}
        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>{language === 'es' ? 'Todas las reseñas son moderadas pastoralmente para garantizar autenticidad y edificación comunitaria.' : 'All reviews are pastorally moderated to ensure authenticity.'}</span>
        </div>

      </div>
    </section>
  );
};
