import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Heart, Users, Share2, MapPin, CheckCircle2, TrendingUp, Sparkles, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export const MissionDetailModal = ({ isOpen, onClose, mission, onDonate, onVolunteer }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('details');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !mission) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden relative border border-brand-teal/30 max-h-[92vh] flex flex-col">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-md transition-colors border border-white/20"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-64 sm:h-72 bg-slate-950 flex-shrink-0 overflow-hidden">
          <img
            src={mission.image}
            alt={mission.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-brand-gold text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              Causa Activa
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-teal" />
              <span>Nueva York & El Bronx</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight drop-shadow-md">
              {mission.title}
            </h2>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-brand-coral text-brand-coral bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Detalles del Caso
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`py-3 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'impact'
                ? 'border-brand-teal text-brand-teal bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Impacto y Metas
          </button>
          <button
            onClick={() => setActiveTab('transparency')}
            className={`py-3 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'transparency'
                ? 'border-brand-gold text-brand-gold bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Transparencia
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-700">
          
          {/* Progress Box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
              <span className="text-slate-600">Progreso de Recaudación:</span>
              <span className="text-emerald-600 font-extrabold text-sm sm:text-base flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {mission.percentage}% Financiado
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-brand-teal via-emerald-500 to-brand-gold h-full rounded-full transition-all duration-700"
                style={{ width: `${mission.percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-xs sm:text-sm font-extrabold text-slate-800">
              <span>Recaudado: <strong className="text-brand-coral">{mission.raisedAmount}</strong></span>
              <span>Meta Necesaria: <strong className="text-slate-900">{mission.goalAmount}</strong></span>
            </div>
          </div>

          {/* Tab 1: Detalles del Caso */}
          {activeTab === 'details' && (
            <div className="space-y-4 text-sm leading-relaxed">
              <h4 className="font-display font-black text-lg text-slate-900">
                ¿De qué se trata esta misión solidaria?
              </h4>
              <p className="text-slate-700 font-medium">
                {mission.fullStory || mission.desc}
              </p>
              {mission.fullStory && mission.desc && mission.fullStory !== mission.desc && (
                <p className="text-slate-600">
                  {mission.desc}
                </p>
              )}
              <p className="text-slate-600 text-xs leading-relaxed">
                Esta causa responde directamente al llamado del Evangelio de asistir al desamparado. Coordinada por la pastoral social del Centro Carismático Católico y la comunidad Isha Bethel, garantizamos que cada ayuda llegue a las manos correctas sin intermediarios.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs space-y-2">
                <strong className="block font-bold text-amber-950 text-sm">📋 Necesidades Inmediatas en esta Causa:</strong>
                {typeof mission.needs === 'string' ? (
                  <div className="whitespace-pre-line text-amber-900 leading-relaxed font-medium">
                    {mission.needs}
                  </div>
                ) : Array.isArray(mission.needs) ? (
                  <ul className="list-disc list-inside space-y-1 text-amber-900">
                    {mission.needs.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-amber-900">
                    <li>Fondos para provisión directa de insumos de primera necesidad.</li>
                    <li>Voluntarios para clasificación, embalaje y entrega comunitaria.</li>
                    <li>Acompañamiento espiritual y apoyo fraterno a los beneficiarios.</li>
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Impacto y Metas */}
          {activeTab === 'impact' && (
            <div className="space-y-4 text-sm leading-relaxed">
              <h4 className="font-display font-black text-lg text-slate-900">
                Metas Clave que Lograremos con tu Ayuda
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold text-xs block">Atención a Familias</strong>
                    <span className="text-xs text-slate-600">Más de 200 familias asistidas semanalmente en el área metropolitana de NY.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 font-bold text-xs block">Acompañamiento Continuo</strong>
                    <span className="text-xs text-slate-600">Seguimiento pastoral y apoyo emocional para superar la vulnerabilidad.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Transparencia */}
          {activeTab === 'transparency' && (
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-6 h-6 text-brand-teal flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h5 className="font-display font-bold text-slate-900 text-sm">
                    Respaldo del Centro Carismático Católico
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Todos los fondos donados son administrados con estricta supervisión eclesiástica y rendición de cuentas pública en nuestra sede de 826 E. 166th St., Bronx, NY.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-500" />
            <span>{copied ? '¡Enlace Copiado!' : 'Compartir Causa'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onVolunteer();
              }}
              className="px-5 py-3 rounded-full border border-slate-300 font-bold text-xs hover:bg-slate-200 text-slate-800 transition-all"
            >
              Ser Voluntario
            </button>

            <button
              onClick={() => {
                onClose();
                onDonate(mission.title);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Apoyar esta Causa</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
