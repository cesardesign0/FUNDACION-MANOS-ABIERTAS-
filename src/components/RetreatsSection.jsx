import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Calendar, Clock, MapPin, Sparkles, UserCheck, Star, ExternalLink, Info, CheckCircle2, ChevronDown, ChevronUp, Layers, RefreshCw, Radio, Heart, Users } from 'lucide-react';
import { EditableElement } from './admin/EditableElement';
import { CENTRO_BRONX_SOURCE_URL, CENTRO_BRONX_TICKETS_URL, syncCentroBronxEvents, getLastSyncTime } from '../services/centroBronxSync';

export const RetreatsSection = ({ onOpenRetreatsModal, featuredRetreatId: propFeaturedRetreatId, onToggleFeaturedRetreat, onSelectEvent }) => {
  const { language, t } = useLanguage();
  const { events, retreatsModal: adminRetreatsModal, featuredRetreatId: adminFeaturedRetreatId, setFeaturedRetreat } = useAdminData();
  const retreatsModal = { ...t.retreatsModal, ...(adminRetreatsModal || {}) };

  const effectiveFeaturedId = propFeaturedRetreatId || adminFeaturedRetreatId || 'ret-1';

  // Active events list (dynamic from admin data or fallback)
  const activeEvents = events && events.length > 0 ? events : retreatsModal.events;

  const featuredEvent = activeEvents.find(e => e.id === effectiveFeaturedId) || (activeEvents.length > 0 ? activeEvents[0] : null);

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

  const handleToggle = (id) => {
    if (onToggleFeaturedRetreat) {
      onToggleFeaturedRetreat(id);
    } else if (setFeaturedRetreat) {
      setFeaturedRetreat(id);
    }
  };

  // Filter events based on selected period
  const filteredEvents = activeEvents.filter((event) => {
    if (selectedPeriod === 'all') return true;
    return event.period === selectedPeriod;
  });

  // Ensure high contrast against light background
  const titleColor = (() => {
    const c = retreatsModal.styles?.title_color;
    if (!c || c.toLowerCase() === '#ffffff' || c.toLowerCase() === '#fff' || c.toLowerCase() === 'white' || c.toLowerCase() === '#e2e8f0') {
      return '#0F172A';
    }
    return c;
  })();

  const subtitleColor = (() => {
    const c = retreatsModal.styles?.subtitle_color;
    if (!c || c.toLowerCase() === '#ffffff' || c.toLowerCase() === '#fff' || c.toLowerCase() === 'white' || c.toLowerCase() === '#e2e8f0' || c.toLowerCase() === '#cbd5e1') {
      return '#475569';
    }
    return c;
  })();

  const venueColor = (() => {
    const c = retreatsModal.styles?.venue_color;
    if (!c || c.toLowerCase() === '#ffffff' || c.toLowerCase() === '#fff' || c.toLowerCase() === 'white') {
      return '#475569';
    }
    return c;
  })();

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

          <EditableElement elementInfo={{ type: 'text', id: 'retreats-title', sectionId: 'retreats', label: 'Título Principal', data: { text: retreatsModal.title } }}>
            <h2 
              className={`${retreatsModal.styles?.title_font || 'font-display'} ${retreatsModal.styles?.title_size || 'text-3xl sm:text-5xl'} ${retreatsModal.styles?.title_weight || 'font-black'} text-slate-900 leading-tight mb-4`}
              style={{ color: titleColor }}
            >
              {retreatsModal.title || (language === 'es' ? 'Calendario de Actividades y Retiros' : 'Calendar of Activities & Retreats')}
            </h2>
          </EditableElement>

          <EditableElement elementInfo={{ type: 'text', id: 'retreats-subtitle', sectionId: 'retreats', label: 'Subtítulo', data: { text: retreatsModal.subtitle } }}>
            <p 
              className={`leading-relaxed max-w-2xl mx-auto text-slate-600 ${retreatsModal.styles?.subtitle_size || 'text-base sm:text-lg'}`}
              style={{ color: subtitleColor }}
            >
              {retreatsModal.subtitle}
            </p>
          </EditableElement>

          <div 
            className="mt-3 inline-flex items-center gap-1.5 text-xs bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs font-medium"
            style={{ color: venueColor }}
          >
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

        {/* ========================================================================= */}
        {/* ⭐ ACTIVIDAD / RETIRO DESTACADO HERO SHOWCASE EN CALENDARIO */}
        {/* ========================================================================= */}
        {featuredEvent && (
          <EditableElement elementInfo={{ type: 'retreat', id: featuredEvent.id, sectionId: 'retreats', label: 'Retiro Destacado', data: featuredEvent, movable: true, deletable: true }}>
            <div 
              onClick={(e) => {
                if (onSelectEvent) {
                  e.stopPropagation();
                  onSelectEvent(featuredEvent);
                }
              }}
              className={`mb-12 bg-white rounded-3xl p-6 sm:p-8 border-2 border-brand-gold/60 shadow-xl shadow-brand-gold/10 relative overflow-hidden transition-all ${
                onSelectEvent ? 'cursor-pointer hover:ring-4 hover:ring-brand-gold/50' : ''
              }`}
            >
            <div className="absolute top-0 right-0 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg h-64 sm:h-72 bg-slate-900">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-brand-gold text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Star className="w-4 h-4 fill-slate-950" />
                  <span>⭐ ACTIVIDAD DESTACADA DEL CALENDARIO</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs text-amber-300 font-mono font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{featuredEvent.date}</span>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-coral bg-brand-coral/10 px-3 py-1 rounded-full inline-block">
                    {featuredEvent.category || featuredEvent.type}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900 leading-tight">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {featuredEvent.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-brand-teal flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Horario:</span>
                      <strong className="text-slate-800">{featuredEvent.schedule}</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Aporte / Donación:</span>
                      <strong className="text-slate-800 font-bold">{featuredEvent.cost}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={featuredEvent.registrationLink || CENTRO_BRONX_TICKETS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-2xl shadow-lg shadow-brand-coral/30 hover:scale-105 transition-all"
                  >
                    <span>Inscribirse / Boletos</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleToggle(featuredEvent.id)}
                    className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-slate-900 border border-brand-gold font-bold text-xs uppercase tracking-wider px-4 py-3.5 rounded-2xl hover:bg-brand-gold transition-all"
                  >
                    <Star className="w-4 h-4 fill-brand-gold" />
                    <span>Fijado en Portada</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          </EditableElement>
        )}

        {/* 3 Botones de Filtro por Mes / Periodo */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-10">
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
            const isFeatured = effectiveFeaturedId === event.id;

            return (
              <div
                key={event.id}
                onClick={(e) => {
                  if (onSelectEvent) {
                    e.stopPropagation();
                    onSelectEvent(event);
                  }
                }}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between group ${
                  onSelectEvent ? 'cursor-pointer' : ''
                } ${
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

                  {/* Featured Badge */}
                  {isFeatured && (
                    <div className="absolute top-4 right-4 bg-brand-gold text-slate-950 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5 text-[10px] font-black uppercase">
                      <Star className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                      <span>Destacado</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </span>
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      {event.cost}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-xl text-slate-900 group-hover:text-brand-teal transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {event.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                      <span>{event.schedule}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-brand-coral flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Event Action Button */}
                <div className="p-6 pt-0">
                  <a
                    href={event.registrationLink || CENTRO_BRONX_TICKETS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-2xl transition-all shadow-md ${
                      isFeatured
                        ? 'bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black shadow-brand-gold/30 hover:scale-[1.02]'
                        : 'bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-teal-800 text-white shadow-brand-teal/20 hover:scale-[1.02]'
                    }`}
                  >
                    <span>{language === 'es' ? 'Inscribirse / Boletos' : 'Register / Tickets'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
