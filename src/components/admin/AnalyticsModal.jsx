import React, { useState, useEffect } from 'react';
import { 
  X, Users, Eye, TrendingUp, Calendar, Clock, Smartphone, Monitor, 
  Layers, RefreshCw, PlusCircle
} from 'lucide-react';
import { getAnalyticsData, resetAnalyticsData } from '../../utils/analyticsTracker';

export const AnalyticsModal = ({ isOpen, onClose }) => {
  const [data, setData] = useState(null);
  const [simulatedCount, setSimulatedCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setData(getAnalyticsData());
    }
  }, [isOpen, simulatedCount]);

  if (!isOpen || !data) return null;

  const handleSimulateVisit = () => {
    try {
      const current = getAnalyticsData();
      current.totalVisits += 1;
      current.todayVisits += 1;
      current.weekVisits += 1;
      current.monthVisits += 1;
      localStorage.setItem('manos_local_analytics_v1', JSON.stringify(current));
      setSimulatedCount(prev => prev + 1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas reiniciar las estadísticas a los valores iniciales?')) {
      const fresh = resetAnalyticsData();
      setData(fresh);
      setSimulatedCount(0);
    }
  };

  const sectionsList = [
    { name: '1. Portada Principal (Hero)', pct: data.sectionViews.hero, color: 'bg-emerald-500' },
    { name: '2. Estadísticas de Impacto', pct: data.sectionViews.stats, color: 'bg-brand-teal' },
    { name: '3. Nuestras Misiones y Causas', pct: data.sectionViews.programs, color: 'bg-brand-gold' },
    { name: '4. Calendario de Retiros', pct: data.sectionViews.retreats, color: 'bg-amber-500' },
    { name: '5. Tienda Solidaria', pct: data.sectionViews.shop, color: 'bg-brand-coral' },
    { name: '6. Voluntariado y Casa Hogar', pct: data.sectionViews.volunteer, color: 'bg-rose-500' },
    { name: '7. Quiénes Somos / Centro Carismático', pct: data.sectionViews.about, color: 'bg-indigo-500' },
    { name: '8. Pie de Página y Contacto', pct: data.sectionViews.footer, color: 'bg-slate-500' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-teal/15 border border-brand-teal/40 flex items-center justify-center text-brand-teal">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">Visitas y Analítica del Sitio</h2>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-black px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  En Vivo
                </span>
              </div>
              <p className="text-xs text-slate-400">Visualización simplificada del tráfico y retención de secciones</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* KPI Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-teal" />
                Hoy
              </span>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  {data.todayVisits.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">+12% vs ayer</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                Esta Semana
              </span>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-black text-brand-gold block">
                  {data.weekVisits.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Últimos 7 días</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Este Mes
              </span>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-300 block">
                  {data.monthVisits.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">Últimos 30 días</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-brand-teal/20 via-slate-950 to-slate-950 border border-brand-teal/40 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-brand-teal uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-brand-teal" />
                Total Histórico
              </span>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  {data.totalVisits.toLocaleString()}
                </span>
                <span className="text-[10px] text-brand-teal font-bold">Visitas totales</span>
              </div>
            </div>
          </div>

          {/* Retention Sections */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-gold" />
                <h3 className="text-sm font-bold text-white">Alcance de Secciones («Hasta dónde han llegado los visitantes»)</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">% de personas</span>
            </div>

            <div className="space-y-3">
              {sectionsList.map((sec, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{sec.name}</span>
                    <span className="text-white font-bold font-mono">{sec.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={'h-full ' + sec.color + ' rounded-full transition-all duration-500'}
                      style={{ width: sec.pct + '%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Devices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-brand-teal flex-shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Celulares / Móviles</span>
                <span className="text-base font-black text-white">{data.devices.mobile}% de visitas</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Monitor className="w-6 h-6 text-brand-gold flex-shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Computadoras</span>
                <span className="text-base font-black text-white">{data.devices.desktop}% de visitas</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
              <Layers className="w-6 h-6 text-indigo-400 flex-shrink-0" />
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Tabletas</span>
                <span className="text-base font-black text-white">{data.devices.tablet}% de visitas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateVisit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-brand-teal text-xs font-bold transition-all"
              title="Añade 1 visita de prueba al contador"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Simular Visita
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 text-xs font-semibold transition-all"
              title="Reiniciar valores"
            >
              <RefreshCw className="w-3 h-3" />
              Reiniciar
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-brand-teal hover:bg-teal-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
