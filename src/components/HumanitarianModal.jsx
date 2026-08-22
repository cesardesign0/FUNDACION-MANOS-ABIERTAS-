import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, HeartHandshake, Heart, MapPin, CheckCircle2, TrendingUp, Sparkles, Users, ArrowRight, Eye, Info, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export const HumanitarianModal = ({ isOpen, onClose, onOpenDonate, onOpenVolunteer, onOpenMissionDetail }) => {
  const { language, t } = useLanguage();
  const { humanitarianModal } = t;
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'accomplished'
  const [expandedMissionId, setExpandedMissionId] = useState(null);

  if (!isOpen) return null;

  const handleDonateForMission = (missionTitle) => {
    onClose();
    onOpenDonate(missionTitle);
  };

  const handleVolunteerForMission = () => {
    onClose();
    onOpenVolunteer('volunteer');
  };

  const toggleExpand = (id) => {
    setExpandedMissionId((prev) => (prev === id ? null : id));
  };

  const handleOpenFullDetail = (mission) => {
    onClose();
    if (onOpenMissionDetail) {
      onOpenMissionDetail({
        id: mission.id,
        title: mission.title,
        desc: mission.desc,
        image: mission.image,
        location: mission.location,
        percentage: 82,
        raisedAmount: '$42,500',
        goalAmount: '$50,000'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-brand-coral/20 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-brand-navy to-brand-coral text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-coral text-white text-[10px] font-black uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{humanitarianModal.badge}</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            {humanitarianModal.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-lg">
            {humanitarianModal.subtitle}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'active'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🔥 {humanitarianModal.tabActive}
          </button>
          <button
            onClick={() => setActiveTab('accomplished')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'accomplished'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🏆 {humanitarianModal.tabAccomplished}
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'active' ? (
            <div className="space-y-4">
              {humanitarianModal.activeList.map((mission) => {
                const isExpanded = expandedMissionId === mission.id;

                return (
                  <div
                    key={mission.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-coral/40 transition-all flex flex-col gap-3"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <img
                        src={mission.image}
                        alt={mission.title}
                        className="w-full sm:w-28 h-28 rounded-xl object-cover flex-shrink-0 border border-slate-100"
                      />

                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-brand-coral">
                          <MapPin className="w-3 h-3" />
                          <span>{mission.location}</span>
                        </div>

                        <h4 className="font-display font-bold text-base text-slate-900 leading-snug">
                          {mission.title}
                        </h4>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {mission.desc}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                            ✓ {mission.metric}
                          </span>
                          <span className="text-amber-800 font-semibold">
                            {mission.need}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Ficha Desplegable de Detalles Profundos del Caso */}
                    {isExpanded && (
                      <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2.5 animate-fadeIn">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                          <Info className="w-4 h-4 text-brand-teal" />
                          <span>Detalle Completo e Impacto de la Misión:</span>
                        </div>

                        <p className="leading-relaxed">
                          Esta misión se coordina directamente con los comedores y líderes comunitarios del Bronx y Nueva York. Cada aporte se destina a compras al por mayor de alimentos no perecederos, mantas térmicas e insumos médicos de primera urgencia.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>100% de entrega directa y transparente</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-brand-teal flex-shrink-0" />
                            <span>Supervisión de voluntarios Isha Bethel</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Botones de Acción: Conocer Detalles & Colaborar */}
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => toggleExpand(mission.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-700 hover:text-brand-teal px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-brand-teal" />
                        <span>{isExpanded ? 'Ocultar Detalles' : 'Conocer Detalles de la Causa'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleDonateForMission(mission.title)}
                        className="inline-flex items-center gap-1.5 bg-brand-coral hover:bg-brand-coral-dark text-white text-xs font-extrabold uppercase px-4 py-2 rounded-xl shadow-md transition-all hover:scale-105"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Colaborar con esta Causa</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Metric stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {humanitarianModal.accomplishments.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-brand-teal-light border border-teal-200 text-center">
                    <div className="font-display font-black text-2xl sm:text-3xl text-brand-teal mb-1">
                      {item.stat}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-display font-bold text-sm text-slate-900">
                  {humanitarianModal.impactStoryTitle}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{humanitarianModal.impactStory}"
                </p>
                <div className="text-right text-[11px] font-bold text-brand-coral">
                  {humanitarianModal.impactStoryAuthor}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <button
            onClick={handleVolunteerForMission}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-brand-teal" />
            <span>{humanitarianModal.btnJoinVolunteer}</span>
          </button>

          <button
            onClick={() => handleDonateForMission('all')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>{humanitarianModal.btnDonateGeneral}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
