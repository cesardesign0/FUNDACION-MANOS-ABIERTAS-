import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Heart, Target, TrendingUp, Sparkles, HandHeart, CheckCircle2, PlusCircle, ArrowRight, Eye, Trophy, Star, AlertCircle } from 'lucide-react';

export const Programs = ({ onSelectCauseAndDonate, onOpenNewMission, onOpenMissionDetail, onOpenCompletedMissions }) => {
  const { language, t } = useLanguage();
  const { missions, programsSection: adminProgramsSection, featuredMissionId } = useAdminData();
  const programsSection = { ...t.programsSection, ...(adminProgramsSection || {}) };

  const activeMissions = missions && missions.length > 0 ? missions : programsSection.items;
  
  // Find featured mission (either by explicit ID or fallback)
  const featuredMission = activeMissions.find(m => m.id === featuredMissionId) || (activeMissions.length > 0 ? activeMissions[0] : null);
  const regularMissions = activeMissions.filter(m => m.id !== featuredMission?.id);

  return (
    <section id="programs" className="py-24 relative overflow-hidden bg-slate-950 text-white">
      {/* High-Impact Thematic Background Image with Cinematic Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-brand-navy/95 to-slate-950" />
      
      {/* Glowing Ambient Light Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-teal/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Subtle Cross / Rays Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#e5a823_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <div 
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/20 text-xs font-black tracking-widest border border-brand-gold/40 backdrop-blur-md shadow-lg ${programsSection.styles?.badge_color ? '' : 'text-brand-gold'}`}
              style={{ color: programsSection.styles?.badge_color || '#E5A93C' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{programsSection.badge || (language === 'es' ? 'MISIONES Y CAUSAS ACTIVAS' : 'ACTIVE MISSIONS & CAUSES')}</span>
            </div>

            {/* Botón Destacado: Ver Misiones Completadas */}
            <button
              onClick={onOpenCompletedMissions}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 font-black text-xs uppercase tracking-wider border border-emerald-500/40 backdrop-blur-md transition-all shadow-md hover:scale-105"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Ver Misiones Completadas' : 'View Completed Missions'}</span>
            </button>
          </div>

          <h2 
            className={`${programsSection.styles?.title_font || 'font-display'} ${programsSection.styles?.title_size || 'text-3xl sm:text-5xl'} ${programsSection.styles?.title_weight || 'font-black'} leading-tight mb-4 drop-shadow-lg`}
            style={{ color: programsSection.styles?.title_color || '#FFFFFF' }}
          >
            {programsSection.title || (language === 'es' ? 'Misiones y Causas Activas que Necesitan tu Apoyo' : 'Active Missions & Causes That Need Your Support')}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {programsSection.subtitle}
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-coral mx-auto mt-6 rounded-full" />
        </div>

        {/* ========================================================================= */}
        {/* ⭐ CAUSA DESTACADA / PRIORITARIA HERO SHOWCASE */}
        {/* ========================================================================= */}
        {featuredMission && (
          <div className="mb-14 bg-gradient-to-br from-slate-900 via-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-brand-gold/60 shadow-2xl shadow-brand-gold/10 relative overflow-hidden group">
            
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Image & Badges */}
              <div 
                onClick={() => onOpenMissionDetail(featuredMission)}
                className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer aspect-video sm:aspect-auto sm:h-80 bg-slate-950"
              >
                <img
                  src={featuredMission.image}
                  alt={featuredMission.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                {/* Badge Causa Destacada */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-brand-gold to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Star className="w-4 h-4 fill-slate-950" />
                  <span>⭐ MISIÓN DESTACADA & PRIORITARIA</span>
                </div>

                <div className="absolute top-4 right-4 bg-slate-950/90 text-emerald-300 border border-emerald-500/40 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{featuredMission.percentage}% {programsSection.raised || 'Recaudado'}</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-200 tracking-wider">
                    Llamado urgente de la comunidad
                  </span>
                  <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full group-hover:bg-brand-teal transition-colors">
                    Ver Detalles del Caso →
                  </span>
                </div>
              </div>

              {/* Text & Progress Information */}
              <div className="lg:col-span-6 space-y-5">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-brand-gold text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Causa Activa Principal</span>
                  </div>
                  <h3 
                    onClick={() => onOpenMissionDetail(featuredMission)}
                    className="font-display font-black text-2xl sm:text-3xl text-white leading-snug group-hover:text-brand-gold transition-colors cursor-pointer"
                  >
                    {featuredMission.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {featuredMission.desc}
                  </p>
                </div>

                {/* Progress Bar & Amounts */}
                <div className="space-y-3 bg-slate-950/70 p-4 sm:p-5 rounded-2xl border border-slate-800">
                  <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden p-0.5 border border-slate-700">
                    <div
                      className="bg-gradient-to-r from-brand-teal via-emerald-400 to-brand-gold h-full rounded-full transition-all duration-1000 shadow-md"
                      style={{ width: `${featuredMission.percentage}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Recaudado actualmente:</span>
                      <strong className="text-brand-gold text-base sm:text-lg font-black">{featuredMission.raisedAmount}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Meta requerida:</span>
                      <strong className="text-white text-base sm:text-lg font-black">{featuredMission.goalAmount}</strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectCauseAndDonate(featuredMission.title)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-coral to-brand-coral-dark hover:from-brand-coral-dark hover:to-red-900 text-white font-black text-sm uppercase tracking-wider py-4 px-8 rounded-2xl transition-all shadow-xl shadow-brand-coral/30 hover:scale-105"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Apoyar Esta Causa</span>
                  </button>

                  <button
                    onClick={() => onOpenMissionDetail(featuredMission)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider py-4 px-6 rounded-2xl border border-white/30 hover:border-white transition-all"
                  >
                    <Eye className="w-4 h-4 text-brand-teal" />
                    <span>Ver Caso Completo</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* OTHER MISSIONS GRID */}
        {/* ========================================================================= */}
        {regularMissions.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h4 className="text-sm font-black uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-teal" />
                <span>Otras Misiones y Causas en Marcha ({regularMissions.length})</span>
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {regularMissions.map((program) => (
                <div
                  key={program.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2.5 hover:shadow-brand-teal/20"
                >
                  <div>
                    {/* Image Container - Clickable to open Detail View */}
                    <div 
                      onClick={() => onOpenMissionDetail(program)}
                      className="relative h-60 overflow-hidden bg-slate-900 cursor-pointer"
                      title="Haz clic para ver el caso en detalle"
                    >
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      {/* Percentage Floating Badge */}
                      <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md text-white text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{program.percentage}% {programsSection.raised || 'Recaudado'}</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">
                          Causa Solidaria
                        </span>
                        <span className="text-[11px] text-white font-bold flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full group-hover:bg-brand-teal transition-colors">
                          <Eye className="w-3 h-3" />
                          <span>Ver Caso →</span>
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 text-slate-800 space-y-4">
                      <h3 
                        onClick={() => onOpenMissionDetail(program)}
                        className="font-display font-extrabold text-xl text-slate-900 leading-snug group-hover:text-brand-teal transition-colors cursor-pointer"
                      >
                        {program.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {program.desc}
                      </p>

                      {/* Progress Bar & Amounts */}
                      <div className="space-y-2.5 pt-2">
                        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
                          <div
                            className="bg-gradient-to-r from-brand-teal via-emerald-500 to-brand-gold h-full rounded-full transition-all duration-1000"
                            style={{ width: `${program.percentage}%` }}
                          />
                        </div>
                        
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>{programsSection.raised || 'Recaudado'}: <strong className="text-slate-900 font-extrabold">{program.raisedAmount}</strong></span>
                          <span>{programsSection.goal || 'Meta'}: <strong className="text-slate-900 font-extrabold">{program.goalAmount}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: Ver Caso & Donar */}
                  <div className="px-6 pb-6 pt-0 flex gap-2">
                    <button
                      onClick={() => onOpenMissionDetail(program)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs uppercase tracking-wider py-3.5 px-3 rounded-2xl transition-all"
                      title="Ver descripción profunda del caso"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Ver Caso</span>
                    </button>

                    <button
                      onClick={() => onSelectCauseAndDonate(program.title)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-coral to-brand-coral-dark hover:from-brand-coral-dark hover:to-red-900 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-3 rounded-2xl transition-all shadow-md hover:scale-[1.02]"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white" />
                      <span>Apoyar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botón Destacado Debajo de las Imágenes / Tarjetas de Misiones */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/15 max-w-4xl mx-auto shadow-2xl">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-brand-gold font-bold text-xs uppercase tracking-widest block">
                ¿CONOCES A ALGUIEN QUE NECESITA AUXILIO?
              </span>
              <h4 className="font-display font-black text-xl sm:text-2xl text-white">
                Suma una nueva causa o caso vulnerable
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg">
                Nuestro equipo pastoral evaluará la situación para sumarla a las jornadas de ayuda humanitaria y recaudación.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCompletedMissions}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-5 py-4 rounded-full border border-white/30 transition-all"
              >
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Misiones Completadas</span>
              </button>

              <button
                onClick={onOpenNewMission}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-brand-coral to-amber-500 hover:from-brand-coral-dark hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-7 py-4 rounded-full shadow-xl shadow-brand-coral/30 hover:scale-105 transition-all border border-white/20 flex-shrink-0"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{programsSection.btnProposeMission || 'Proponer Nueva Causa'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
