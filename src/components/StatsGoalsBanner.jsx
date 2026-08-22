import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Calendar, ArrowRight, CheckCircle2, TrendingUp, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const StatsGoalsBanner = ({ onOpenDonate, onOpenVolunteer }) => {
  const { t } = useLanguage();
  const { card1, card2, card3 } = t.statsGoals;

  const handleScrollToRetreats = (e) => {
    e.preventDefault();
    const el = document.getElementById('retreats');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPrograms = (e) => {
    e.preventDefault();
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="goals" className="relative z-20 -mt-2 sm:-mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 shadow-2xl rounded-3xl overflow-hidden border border-white/20">
        
        {/* Banner 1: Teal Impact Results (Apilado Verticalmente Uno Debajo del Otro) */}
        <div className="bg-brand-teal text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          
          <div>
            <div className="text-[11px] tracking-widest font-extrabold text-teal-200 uppercase mb-2">
              {card1.tag}
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight mb-5">
              {card1.title}
            </h3>

            {/* Métricas Verticales: Uno Debajo del Otro */}
            <div className="space-y-4 pt-3 border-t border-teal-600/60">
              {/* Métrica 1: Personas Ayudadas */}
              <div className="pb-3 border-b border-teal-600/40">
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white leading-none mb-1">
                  {card1.stat1Number}
                </div>
                <div className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-teal-100">
                  {card1.stat1Label}
                </div>
              </div>

              {/* Métrica 2: Casos y Misiones Completadas */}
              <div className="pb-3 border-b border-teal-600/40">
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tight text-brand-gold leading-none mb-1">
                  {card1.stat2Number}
                </div>
                <div className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-teal-100">
                  {card1.stat2Label}
                </div>
              </div>

              {/* Métrica 3: Cantidad de Donadores */}
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white leading-none mb-1">
                  {card1.stat3Number}
                </div>
                <div className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-teal-100">
                  {card1.stat3Label}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-600/40 flex items-center justify-between text-xs text-teal-100 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>{card1.stat4Number || '100%'} {card1.stat4Label || 'Transparencia con Respaldo del Centro Carismático'}</span>
            </span>
            <TrendingUp className="w-4 h-4 text-white flex-shrink-0" />
          </div>
        </div>

        {/* Banner 2: Golden Activities & Retreats Calendar Card */}
        <div className="bg-brand-gold text-slate-900 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute bottom-0 right-0 -mb-10 -mr-10 w-44 h-44 bg-white/20 rounded-full blur-xl" />

          <div>
            <div className="text-[11px] tracking-widest font-extrabold text-amber-900 uppercase mb-2">
              {card2.tag}
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight mb-6 text-slate-950">
              {card2.title}
            </h3>

            {/* Retreat Timeline Items */}
            <ul className="space-y-3.5">
              {card2.items.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex items-center justify-between text-xs sm:text-sm font-bold pb-2.5 border-b border-amber-600/25 last:border-b-0"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-950/80" />
                    {item.name}
                  </span>
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-900/15 text-slate-900 whitespace-nowrap">
                    {item.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-2">
            <a
              href="#retreats"
              onClick={handleScrollToRetreats}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-slate-950 text-white hover:bg-slate-900 px-5 py-3 rounded-full transition-all shadow-md hover:scale-105"
            >
              <span>{card2.btnLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Banner 3: Coral Active Missions Card */}
        <div className="bg-brand-coral text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80')` }}
          />

          <div className="relative z-10">
            <div className="text-[11px] tracking-widest font-extrabold text-red-200 uppercase mb-2">
              {card3.tag}
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight mb-4">
              {card3.title}
            </h3>
            <p className="text-red-100 text-sm leading-relaxed mb-6">
              {card3.desc}
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <a
              href="#programs"
              onClick={handleScrollToPrograms}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <span>{card3.btnLabel}</span>
              <Sparkles className="w-4 h-4 text-brand-gold" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
