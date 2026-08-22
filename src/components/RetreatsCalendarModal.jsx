import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, Clock, MapPin, Sparkles, ExternalLink, Phone, Globe, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export const RetreatsCalendarModal = ({ isOpen, onClose, initialEventId }) => {
  const { language, t } = useLanguage();
  const { retreatsModal } = t;

  const [selectedEventId, setSelectedEventId] = useState(initialEventId || retreatsModal.events[0]?.id || 'ret-1');

  // If initialEventId changes when opening
  React.useEffect(() => {
    if (initialEventId) {
      setSelectedEventId(initialEventId);
    }
  }, [initialEventId]);

  if (!isOpen) return null;

  const currentEvent = retreatsModal.events.find((e) => e.id === selectedEventId) || retreatsModal.events[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-brand-teal/30 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-brand-navy to-brand-teal text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-slate-950 text-[10px] font-black uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Centro Carismático Católico NY & Grupo Isha Bethel</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Detalles e Información del Retiro
          </h3>
          <p className="text-teal-100 text-xs sm:text-sm mt-1">
            Espacios de sanación interior, fortaleza y avivamiento en el Espíritu Santo.
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700">
          
          {/* Selector de Evento si el usuario quiere explorar otros */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
            {retreatsModal.events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEventId(ev.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedEventId === ev.id
                    ? 'bg-brand-teal text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {ev.date.split(',')[0]} — {ev.type}
              </button>
            ))}
          </div>

          {/* Tarjeta Detallada del Retiro Seleccionado */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className={`text-[11px] font-black uppercase text-white px-3 py-1 rounded-full shadow-xs ${currentEvent.badgeColor}`}>
                {currentEvent.type}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-coral bg-brand-coral-light px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentEvent.date}</span>
              </span>
            </div>

            <h4 className="font-display font-black text-xl sm:text-2xl text-slate-900 leading-snug">
              {currentEvent.title}
            </h4>

            <p className="text-slate-600 text-sm leading-relaxed">
              {currentEvent.desc}
            </p>

            {/* Metadatos Logísticos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-start gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Horario Oficial:</strong>
                  <span>{currentEvent.time}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-700">
                <MapPin className="w-4 h-4 text-brand-coral flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Lugar y Sede:</strong>
                  <span>{currentEvent.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-700 sm:col-span-2 pt-1 border-t border-slate-200">
                <UserCheck className="w-4 h-4 text-brand-gold-dark flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Guía y Acompañamiento:</strong>
                  <span>{currentEvent.leader}</span>
                </div>
              </div>
            </div>

            {/* Cuadro de Información Oficial & Redirección */}
            <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Inscripciones y Cupos Oficiales</span>
              </div>
              <p className="leading-relaxed text-amber-900">
                Para garantizar la organización pastoral y cupos limitados por aforo, la reserva e inscripción oficial para este retiro se realiza directamente en la plataforma del <strong>Centro Carismático Católico de Nueva York (Nuestra Casa de Ayuda)</strong>.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions con Redirección a centrobronx.com */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <a
            href="tel:7183781734"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors w-full sm:w-auto justify-center"
          >
            <Phone className="w-4 h-4 text-brand-teal" />
            <span>Consultar al (718) 378-1734</span>
          </a>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-full border border-slate-300 font-bold text-xs hover:bg-slate-200 text-slate-800 transition-all"
            >
              Cerrar
            </button>

            <a
              href="https://centrobronx.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-teal-900 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg shadow-brand-teal/30 hover:scale-105 transition-all text-center"
            >
              <Globe className="w-4 h-4" />
              <span>Inscribirme en centrobronx.com</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
