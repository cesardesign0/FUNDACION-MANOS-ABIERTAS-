import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Calendar, Clock, MapPin, Sparkles, UserCheck, Star, ExternalLink, Info, CheckCircle2, ChevronDown, ChevronUp, Layers, RefreshCw, Radio } from 'lucide-react';
import { CENTRO_BRONX_SOURCE_URL, CENTRO_BRONX_TICKETS_URL, syncCentroBronxEvents, getLastSyncTime } from '../services/centroBronxSync';

export const RetreatsSection = ({ onOpenRetreatsModal, featuredRetreatId, onToggleFeaturedRetreat }) => {
  const { language, t } = useLanguage();
  const { events, retreatsModal: adminRetreatsModal } = useAdminData();
  const retreatsModal = { ...t.retreatsModal, ...(adminRetreatsModal || {}) };

  // Active events list (dynamic from admin data or fallback)
  const activeEvents = events && events.length > 0 ? events : retreatsModal.events;

  // Filter: 'all' (por defecto), 'current', 'next', 'future'
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [isExpandedAll, setIsExpandedAll] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(getLastSyncTime());

  useEffect(() => {
    // Background auto-sync on mount
    handleSync();
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    await syncCentroBronxEvents(activeEvents);
    setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (' + new Date().toLocaleDateString() + ')');
    setTimeout(() => setIsSyncing(false), 800);
  };

  // Filter events based on selected period
  const filteredEvents = activeEvents.filter((event) => {
    if (selectedPeriod === 'all') return true;
    return event.period === selectedPeriod;
  });

  // Events to display (shows all matching events)
  const displayedEvents = filteredEvents;

  return (
    <section id="retreats" className="py-24 bg-gradient-to-b from-white via-[#fcfbf9] to-[#faf8f5] relative overflow-hidden border-t border-slate-200/80">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9922B_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* Ambient Orbs */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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

          {/* Live Automatic Sync Status Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 bg-slate-900 text-white px-5 py-2.5 rounded-2xl shadow-md border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold text-emerald-300">
                {language === 'es' ? 'Sincronizado en Vivo' : 'Live Synced'}:
              </span>
              <span className="text-slate-300 font-mono text-[11px]">
                centrobronx.com/events
              </span>
            </div>

            <span className="text-slate-500 hidden sm:inline">•</span>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">
                {language === 'es' ? 'Última verificación:' : 'Last verified:'} <strong className="text-white">{lastSync}</strong>
              </span>

              <button
                onClick={handleSync}
                disabled={isSyncing}
                title="Volver a sincronizar con la web del centro"
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand-gold' : ''}`} />
              </button>
            </div>

            <a
              href={CENTRO_BRONX_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline flex items-center gap-1 font-bold ml-1 text-[11px]"
            >
              <span>{language === 'es' ? 'Fuente Oficial' : 'Official Source'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
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
            <span>{language === 'es' ? 'Otras Próximas Actividades' : 'Other Upcoming'}</span>
          </button>

          <button
            onClick={() => {
              setSelectedPeriod('all');
              setIsExpandedAll(true);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-sm ${
              selectedPeriod === 'all' && isExpandedAll
                ? 'bg-slate-900 text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{language === 'es' ? 'Ver Todas' : 'View All'}</span>
          </button>
        </div>

        {/* Retreats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedEvents.map((event) => {
            const isFeatured = featuredRetreatId === event.id;

            return (
              <div
                key={event.id}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between group ${
                  isFeatured 
                    ? 'border-brand-gold ring-4 ring-brand-gold/30 shadow-brand-gold/20' 
                    : 'border-slate-200/80 hover:border-brand-teal/60'
                }`}
              >
                {/* Event Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-md text-brand-gold text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 shadow-md">
                    {event.category}
                  </span>

                  {/* Featured Badge or Button */}
                  <button
                    onClick={() => onToggleFeaturedRetreat(event.id)}
                    title={isFeatured ? "Retiro actualmente fijado en portada" : "Haz clic para fijar este retiro en la burbuja de la portada"}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-bold ${
                      isFeatured
                        ? 'bg-brand-gold text-slate-950 font-black shadow-brand-gold/40'
                        : 'bg-black/60 text-white hover:bg-black/80 hover:text-brand-gold'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFeatured ? 'fill-slate-950' : ''}`} />
                    <span className="hidden sm:inline">{isFeatured ? 'Destacado' : 'Destacar'}</span>
                  </button>

                  {/* Date Pill over image bottom */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{event.date}</span>
                    </div>

                    <span className="text-[11px] font-black text-brand-gold bg-brand-navy/90 px-2.5 py-1 rounded-full border border-brand-gold/30">
                      {event.cost}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-xl text-slate-900 group-hover:text-brand-teal transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                      {event.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Clock className="w-4 h-4 text-brand-teal flex-shrink-0" />
                      <span>{event.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <MapPin className="w-4 h-4 text-brand-coral flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="pt-3 flex flex-col gap-2">
                    {/* Botón de Inscripción Oficial */}
                    <a
                      href={event.registrationLink || CENTRO_BRONX_TICKETS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl bg-brand-teal hover:bg-brand-teal-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-brand-teal/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{language === 'es' ? 'Inscribirme / Comprar Ticket' : 'Register / Buy Ticket'}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>

                    {/* Botón Detalle Rápido */}
                    <button
                      onClick={() => onOpenRetreatsModal(event.id)}
                      className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Info className="w-3.5 h-3.5 text-slate-500" />
                      <span>{language === 'es' ? 'Ver Detalles del Retiro' : 'View Retreat Details'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand / Collapse "Ver Más Actividades" Banner */}
        {selectedPeriod !== 'all' && (
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-brand-navy rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-slate-700 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-wider border border-brand-gold/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{language === 'es' ? 'AGENDA COMPLETA DEL AÑO' : 'FULL YEAR SCHEDULE'}</span>
                </div>
                <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                  {language === 'es' ? '¿Deseas ver más retiros, asambleas y vigilias?' : 'Looking for more retreats and events?'}
                </h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  {language === 'es'
                    ? 'El Centro Carismático Católico del Bronx actualiza continuamente nuevas fechas de retiros carismáticos, sanación de familias y conciertos de alabanza.'
                    : 'The Catholic Charismatic Center in the Bronx regularly updates new retreats, healing services, and events.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full md:w-auto">
                <button
                  onClick={() => {
                    setSelectedPeriod('all');
                    setIsExpandedAll(true);
                  }}
                  className="py-3.5 px-6 rounded-full bg-brand-gold hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'es' ? 'Ver Todos los Retiros' : 'View All Retreats'}</span>
                </button>

                <a
                  href={CENTRO_BRONX_SOURCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>centrobronx.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
