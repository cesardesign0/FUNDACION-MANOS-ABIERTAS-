import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Quote, Sparkles, HeartHandshake, CheckCircle, Cross, ExternalLink, MapPin, Phone, Globe, Church, Heart, Flame } from 'lucide-react';

export const AboutFounder = ({ onOpenVolunteer, onSelectElement }) => {
  const { language, t } = useLanguage();
  const { about: adminAbout } = useAdminData();
  const about = adminAbout || t.about;

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden border-t border-slate-200/80">
      {/* Decorative Blur Circles */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Logos Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white shadow-xl border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo 1: EL CENTRO (Centro Carismático Católico NY & Bronx) */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">
              {language === 'es' ? 'NUESTRA CASA MATRIZ Y CUNA ESPIRITUAL' : 'OUR SPIRITUAL HOME & CRADLE'}
            </span>
            <img
              src="/logo-el-centro.png"
              alt="El Centro Carismático Católico - Bronx NY"
              className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform"
            />
            <p className="text-[11px] text-slate-500 font-medium">
              826 E. 166th St., Bronx, NY 10459 • Arquidiócesis de Nueva York
            </p>
          </div>

          <div className="hidden md:block w-px h-16 bg-slate-200" />

          {/* Logo 2: ISHA BETHEL & MANOS ABIERTAS */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <span className="text-[10px] uppercase font-black tracking-widest text-brand-coral">
              {language === 'es' ? 'COMUNIDAD Y PASTORAL MISIONERA' : 'MISSIONARY COMMUNITY & PASTORAL'}
            </span>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-teal to-brand-teal-dark flex items-center justify-center text-white font-black text-base shadow-md">
                ✝️
              </div>
              <div>
                <span className="font-display font-black text-xl text-slate-900 tracking-tight block">
                  ISHA BETHEL
                </span>
                <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider block">
                  Mujeres y Familias en Fe
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Impulsoras de la Fundación Manos Abiertas de Jesús & María
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Rich Dynamic 4-Photo Collage of the Center and Community */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              
              {/* Photo 1: Large Primary Image (Sanctuary / Altar Adoration) */}
              <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src={about.collageImg1 || "/retreats/seminario-espiritu.jpg"}
                  alt="Asamblea y Alabanza en el Centro Carismático Católico"
                  className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-slate-950 text-[10px] font-black uppercase tracking-wider">
                      <Flame className="w-3 h-3 fill-slate-950" />
                      <span>El Centro Carismático</span>
                    </div>

                    <a
                      href="https://centrobronx.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md"
                    >
                      <span>centrobronx.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <h4 className="font-display font-black text-base sm:text-lg mt-2 text-white">
                    Alabanza, Oración y Casa de Acogida
                  </h4>
                </div>
              </div>

              {/* Photo 2: Community Women Isha Bethel */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <img
                  src={about.collageImg2 || "/retreats/retiro-mujeres.jpg"}
                  alt="Comunidad de Mujeres Isha Bethel"
                  className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3 text-white">
                  <span className="text-xs font-black">Comunidad Isha Bethel</span>
                </div>
              </div>

              {/* Photo 3: Humanitarian Aid & Food Distribution */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white group">
                <img
                  src={about.collageImg3 || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"}
                  alt="Distribución de Alimentos y Obras Sociales"
                  className="w-full h-44 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3 text-white">
                  <span className="text-xs font-black">Comedores y Caridad Viva</span>
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

            <p className="text-brand-coral font-extrabold text-base sm:text-lg">
              {about.subtitle}
            </p>

            <p className="text-slate-700 text-base leading-relaxed font-medium">
              {about.paragraph1}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              {about.paragraph2}
            </p>

            {/* Direct Location & Link Card */}
            <div className="p-5 rounded-2xl bg-white border border-brand-teal/20 shadow-md space-y-3">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-md hover:scale-105 transition-all"
                >
                  <Globe className="w-4 h-4 text-brand-gold" />
                  <span>Visitar centrobronx.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] text-slate-500 font-bold">
                  Arquidiócesis de Nueva York
                </span>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row gap-3.5 items-start sm:items-center">
              <div className="w-10 h-10 rounded-xl bg-brand-gold text-slate-950 flex-shrink-0 flex items-center justify-center font-black">
                <Quote className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 italic leading-relaxed">
                "{about.quote}"
              </p>
            </div>

            {/* Signature & Community Attribution */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-navy flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-brand-teal">
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

              <div className="font-handwritten text-2xl sm:text-3xl text-brand-coral tracking-wider rotate-[-2deg] select-none font-bold">
                Isha Bethel • NY & Bronx
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
