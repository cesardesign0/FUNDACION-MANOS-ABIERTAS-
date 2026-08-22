import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Quote, Sparkles, HeartHandshake, CheckCircle, Cross, ExternalLink, MapPin, Phone, Globe, Church } from 'lucide-react';

export const AboutFounder = ({ onOpenVolunteer }) => {
  const { t } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Layered Overlapping Imagery with Link to Centro Bronx */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Primary Image (Clickable Link to https://centrobronx.com/) */}
              <a
                href="https://centrobronx.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar sitio web oficial del Centro Carismático Católico (centrobronx.com)"
                className="block w-4/5 sm:w-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="Centro Carismático Católico del Bronx"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold text-brand-gold flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>centrobronx.com</span>
                  </span>
                  <p className="font-display font-extrabold text-sm sm:text-base leading-tight">
                    Centro Católico Carismático • Bronx, NY
                  </p>
                </div>
              </a>

              {/* Overlapping Secondary Image (Bottom Right) */}
              <a
                href="https://centrobronx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -bottom-8 right-2 sm:right-4 w-3/5 sm:w-1/2 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group"
              >
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80"
                  alt="Grupo Isha Bethel"
                  className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent flex items-end p-3">
                  <span className="text-white text-xs font-bold">Comunidad Isha Bethel</span>
                </div>
              </a>

              {/* Catholic Center Badge */}
              <div className="absolute -top-4 left-4 bg-brand-teal text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-xl text-brand-gold">
                  ✝️
                </div>
                <div>
                  <div className="font-extrabold text-xs tracking-wider uppercase">Isha Bethel</div>
                  <div className="text-[11px] text-teal-100 font-medium">Centro Carismático NY & Bronx</div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Narrative of Centro Carismático Católico & Isha Bethel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal-light text-brand-teal font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{about.badge}</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 leading-tight">
              {about.title}
            </h2>

            <p className="text-brand-coral font-bold text-base sm:text-lg">
              {about.subtitle}
            </p>

            <p className="text-slate-700 text-base leading-relaxed">
              {about.paragraph1}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              {about.paragraph2}
            </p>

            {/* Direct Location & Link Card */}
            <div className="p-5 rounded-2xl bg-white border border-brand-teal/20 shadow-sm space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-slate-700">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">{about.addressLabel} </span>
                  <span>{about.address}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Phone className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">{about.phoneLabel} </span>
                  <a href="tel:+17183781734" className="hover:underline text-brand-teal font-semibold">{about.phone}</a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <a
                  href="https://centrobronx.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>{about.websiteBtn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] text-slate-400 font-medium">
                  Arquidiócesis de Nueva York
                </span>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60 shadow-sm flex flex-col sm:flex-row gap-3.5 items-start sm:items-center">
              <div className="w-10 h-10 rounded-xl bg-brand-gold text-slate-950 flex-shrink-0 flex items-center justify-center">
                <Quote className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
                "{about.quote}"
              </p>
            </div>

            {/* Signature & Community Attribution */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-brand-teal">
                  ✝️
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 leading-tight">
                    {about.founderName}
                  </h4>
                  <p className="text-xs text-brand-teal font-semibold">
                    {about.founderRole}
                  </p>
                </div>
              </div>

              <div className="font-handwritten text-2xl sm:text-3xl text-slate-800 tracking-wider rotate-[-2deg] select-none font-bold">
                Isha Bethel • NY & Bronx
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
