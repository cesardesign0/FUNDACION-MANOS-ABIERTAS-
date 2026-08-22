import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Clock, MapPin, Sparkles, UserCheck, Star, ExternalLink, Info, CheckCircle2, ChevronDown, ChevronUp, Layers } from 'lucide-react';

export const RetreatsSection = ({ onOpenRetreatsModal, featuredRetreatId, onToggleFeaturedRetreat }) => {
  const { language, t } = useLanguage();
  const { retreatsModal } = t;

  // Filter: 'all', 'current', 'next', 'future'
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [isExpandedAll, setIsExpandedAll] = useState(false);

  // Filter events based on selected period
  const filteredEvents = retreatsModal.events.filter((event) => {
    if (selectedPeriod === 'all') return true;
    return event.period === selectedPeriod;
  });

  // Events to display (if not expanded and period is 'all', show first 4)
  const displayedEvents = isExpandedAll 
    ? filteredEvents 
    : (selectedPeriod === 'all' ? filteredEvents.slice(0, 4) : filteredEvents);

  return (
    <section id="retreats" className="py-24 bg-gradient-to-b from-white via-[#fcfbf9] to-[#faf8f5] relative overflow-hidden border-t border-slate-200/80">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9922B_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Ambient Orbs */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold-dark font-black text-xs uppercase tracking-widest mb-4 border border-brand-gold/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" />
            <span>{language === 'es' ? 'CALENDARIO OFICIAL' : 'OFFICIAL CALENDAR'}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 leading-tight mb-4">
            {language === 'es' ? 'Calendario de ' : 'Calendar of '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal">
              {language === 'es' ? 'Actividades y Retiros' : 'Activities & Retreats'}
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {retreatsModal.subtitle}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-brand-coral flex-shrink-0" />
            <span>{retreatsModal.venueNotice}</span>
          </div>

          <div className="w-20 h-1.5 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal mx-auto mt-6 rounded-full" />
        </div>

        {/* 3 Botones de Filtro por Mes / Periodo */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12">
          <button
            onClick={() => {
              setSelectedPeriod('current');
              setIsExpandedAll(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-sm ${
              selectedPeriod === 'current'
                ? 'bg-brand-coral text-white shadow-brand-coral/30 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'es' ? 'Este Mes' : 'This Month'}</span>
          </button>

          <button
            onClick={() => {
              setSelectedPeriod('next');
              setIsExpandedAll(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-sm ${
              selectedPeriod === 'next'
                ? 'bg-brand-teal text-white shadow-brand-teal/30 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'es' ? 'El Próximo Mes' : 'Next Month'}</span>
          </button>

          <button
            onClick={() => {
              setSelectedPeriod('future');
              setIsExpandedAll(false);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-sm ${
              selectedPeriod === 'future'
                ? 'bg-brand-gold text-slate-950 font-black shadow-brand-gold/30 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>{language === 'es' ? 'Otras Próximas Actividades' : 'Other Upcoming Activities'}</span>
          </button>

          <button
            onClick={() => {
              setSelectedPeriod('all');
              setIsExpandedAll(true);
            }}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              selectedPeriod === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Ver Todas' : 'View All'}</span>
          </button>
        </div>

        {/* Retreat Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedEvents.map((event) => {
            const isFeatured = featuredRetreatId === event.id;

            return (
              <div
                key={event.id}
                className={`group bg-white rounded-3xl p-7 shadow-xl border transition-all duration-300 flex flex-col justify-between relative hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'border-brand-gold ring-2 ring-brand-gold/50 shadow-brand-gold/15'
                    : 'border-slate-200/90 hover:border-brand-teal/50 hover:shadow-2xl'
                }`}
              >
                <div>
                  {/* Event Type & Featured Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-black uppercase tracking-wider text-white px-3 py-1 rounded-full shadow-xs ${event.badgeColor}`}>
                      {event.type}
                    </span>

                    {/* Toggle Feature in Bubbles Button */}
                    <button
                      onClick={() => onToggleFeaturedRetreat(event.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all border ${
                        isFeatured
                          ? 'bg-brand-gold text-slate-950 border-brand-gold shadow-xs font-black'
                          : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
                      }`}
                      title="Al marcar este botón, esta actividad aparecerá como una burbuja destacada en la sección Nuestra Misión"
                    >
                      <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-slate-950 text-slate-950' : 'text-slate-400'}`} />
                      <span>{isFeatured ? (language === 'es' ? '⭐ Destacada en Portada' : '⭐ Featured on Front') : (language === 'es' ? 'Destacar en Portada' : 'Feature on Front')}</span>
                    </button>
                  </div>

                  {/* Event Date & Title */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-brand-coral">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>

                    <h3 
                      onClick={() => onOpenRetreatsModal(event.id)}
                      className="font-display font-black text-xl text-slate-900 leading-snug group-hover:text-brand-teal transition-colors cursor-pointer"
                    >
                      {event.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {event.desc}
                    </p>
                  </div>

                  {/* Event Metadata (Time, Location, Leader) */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                      <span><strong>Horario:</strong> {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-coral flex-shrink-0" />
                      <span><strong>Lugar:</strong> {event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-brand-gold-dark flex-shrink-0" />
                      <span><strong>Guía Pastoral:</strong> {event.leader}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Ver Detalles & Inscripción en centrobronx.com */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onOpenRetreatsModal(event.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider py-3.5 px-3 rounded-2xl transition-all"
                  >
                    <Info className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Ver Detalles</span>
                  </button>

                  <a
                    href="https://centrobronx.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-teal-900 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-3 rounded-2xl transition-all shadow-md hover:scale-[1.02] text-center"
                  >
                    <span>Inscribirme Oficial ↗</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón Destacado: Ver Más Actividades / Desplegar Calendario Completo */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl max-w-4xl mx-auto">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-brand-gold-dark font-black text-xs uppercase tracking-widest block">
                {language === 'es' ? 'CALENDARIO INTEGRAL DE NUESTRA CASA' : 'FULL SPIRITUAL CALENDAR'}
              </span>
              <h4 className="font-display font-black text-xl sm:text-2xl text-slate-900">
                {language === 'es' ? '¿Deseas explorar más retiros y vigilias?' : 'Want to explore more retreats and vigils?'}
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg">
                {language === 'es' 
                  ? 'Consulta el rol completo de encuentros en el Centro Carismático Católico de Nueva York.'
                  : 'Check the full schedule of encounters at the Catholic Charismatic Center of New York.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setSelectedPeriod('all');
                  setIsExpandedAll(!isExpandedAll);
                }}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
              >
                <span>{isExpandedAll ? (language === 'es' ? 'Ver Menos' : 'Show Less') : (language === 'es' ? 'Ver Más Actividades' : 'See More Activities')}</span>
                {isExpandedAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <a
                href="https://centrobronx.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-teal-900 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-brand-teal/30 hover:scale-105 transition-all"
              >
                <span>centrobronx.com ↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
