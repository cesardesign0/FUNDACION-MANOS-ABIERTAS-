import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, CheckCircle2, Trophy, Heart, MapPin, Users, Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const CompletedMissionsModal = ({ isOpen, onClose, onOpenDonate }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const completedList = [
    {
      id: 'comp-1',
      title: language === 'es' 
        ? 'Comedores Solidarios del Bronx: 45,000 Platos Servidos' 
        : 'Bronx Solidarity Soup Kitchens: 45,000 Meals Served',
      location: 'El Bronx & Washington Heights, NY',
      date: 'Enero - Diciembre 2024 / 2025',
      raised: '$54,200 USD',
      beneficiaries: '+3,800 personas',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      desc: language === 'es'
        ? 'Meta cumplida al 100%. Entrega semanal continua de raciones calientes, despensas de alimentos y suministros básicos a familias en pobreza extrema y personas sin hogar.'
        : '100% goal achieved. Weekly hot meal distributions and grocery baskets for vulnerable families and homeless individuals.'
    },
    {
      id: 'comp-2',
      title: language === 'es'
        ? 'Campaña de Invierno: 650 Familias con Abrigo y Calzado Fraterno'
        : 'Winter Relief Campaign: Warm Clothing & Shoes for 650 Families',
      location: 'Comunidad del Bronx & Alrededores',
      date: 'Temporada Invernal 2024 - 2025',
      raised: '$32,400 USD',
      beneficiaries: '650 familias / +1,800 niños',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
      desc: language === 'es'
        ? 'Recolección, compra y entrega directa de camperas térmicas, mantas y calzado nuevo para que ningún niño o anciano sufriera el frío extremo.'
        : 'Direct distribution of heavy thermal coats, blankets, and new footwear for vulnerable children and elders during harsh winter months.'
    },
    {
      id: 'comp-3',
      title: language === 'es'
        ? 'Fondo de Emergencia: 98 Familias Mantenidas Bajo Techo Seguro'
        : 'Emergency Housing Fund: 98 Families Protected Against Eviction',
      location: 'Área Metropolitana de Nueva York',
      date: 'Operativo Permanente',
      raised: '$86,000 USD',
      beneficiaries: '98 hogares protegidos',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      desc: language === 'es'
        ? 'Asistencia económica urgente y mediación social para evitar el desalojo de madres solteras y familias en riesgo habitacional inminente.'
        : 'Urgent rental and emergency relief to prevent eviction of single mothers and vulnerable families facing homelessness.'
    },
    {
      id: 'comp-4',
      title: language === 'es'
        ? 'Jornadas de Sanación Integral y Salud Emocional para 320 Madres'
        : 'Inner Healing & Emotional Support Days for 320 Mothers',
      location: 'Centro Carismático Católico (Bronx, NY)',
      date: 'Ciclo Pastoral Anual',
      raised: '$24,000 USD',
      beneficiaries: '320 mujeres asistidas',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80',
      desc: language === 'es'
        ? 'Talleres de perdón, sanación de duelo, apoyo psicológico cristiano y retiro espiritual guiado por el grupo Isha Bethel.'
        : 'Workshops on forgiveness, grief counseling, Christian psychological support, and inner healing retreats guided by Isha Bethel.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden relative border border-emerald-500/30 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider mb-2 shadow-sm">
            <Trophy className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'TRANSPARENCIA TOTAL Y RENDICIÓN DE CUENTAS' : 'FULL TRANSPARENCY & ACCOUNTABILITY'}</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            {language === 'es' ? 'Misiones y Causas Cumplidas con Éxito' : 'Successfully Completed Missions & Causes'}
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'es' 
              ? 'Conoce las metas alcanzadas gracias a las donaciones y al voluntariado de nuestra comunidad en el Centro Carismático Católico.'
              : 'Explore the goals achieved thanks to donations and volunteers across our Catholic Charismatic community.'}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {completedList.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row gap-4 items-start"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-32 h-32 rounded-2xl object-cover flex-shrink-0 border border-slate-100"
              />

              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{item.location}</span>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{language === 'es' ? 'Meta 100% Cumplida' : '100% Goal Met'}</span>
                  </span>
                </div>

                <h4 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Métricas Logradas */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">{language === 'es' ? 'Recaudado y Ejecutado:' : 'Funds Raised & Deployed:'}</span>
                    <strong className="text-emerald-700 font-black text-xs sm:text-sm">{item.raised}</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-500 block">{language === 'es' ? 'Impacto Directo:' : 'Direct Impact:'}</span>
                    <strong className="text-slate-900 font-bold text-xs sm:text-sm">{item.beneficiaries}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{language === 'es' ? 'Respaldado por el Centro Carismático Católico de NY' : 'Backed by the Catholic Charismatic Center NY'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-300 font-bold text-xs hover:bg-slate-200 text-slate-800 transition-all"
            >
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenDonate('all');
              }}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'es' ? 'Apoyar Próximas Misiones' : 'Support Upcoming Missions'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
