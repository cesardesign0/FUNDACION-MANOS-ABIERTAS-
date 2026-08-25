import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { Heart, Users, Handshake, Mail, ArrowRight, Sparkles, ShoppingBag, Church, PlusCircle, Calendar, Star } from 'lucide-react';

export const MissionHeart = ({ 
  onOpenDonate, 
  onOpenVolunteer, 
  onOpenGetHelp, 
  onOpenShop, 
  onOpenContact, 
  onOpenNewMission,
  onOpenHumanitarian,
  onOpenRetreats,
  featuredRetreat
}) => {
  const { t } = useLanguage();
  const { missionHeart } = useAdminData();
  const mission = { ...t.mission, ...(missionHeart || {}) };

  const handleActionClick = (id) => {
    if (id === 'donate') {
      onOpenDonate();
    } else if (id === 'about') {
      const aboutEl = document.getElementById('about');
      if (aboutEl) aboutEl.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'shop') {
      if (onOpenShop) onOpenShop();
      else {
        const shopEl = document.getElementById('shop');
        if (shopEl) shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (id === 'retreats') {
      const retreatsEl = document.getElementById('retreats');
      if (retreatsEl) {
        retreatsEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        onOpenRetreats();
      }
    } else if (id === 'volunteer') {
      onOpenVolunteer();
    } else if (id === 'getHelp') {
      onOpenGetHelp();
    } else if (id === 'contact') {
      const footerElement = document.getElementById('footer');
      if (footerElement) footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRetreats = () => {
    const retreatsEl = document.getElementById('retreats');
    if (retreatsEl) {
      retreatsEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenRetreats();
    }
  };

  const getActionIcon = (iconName) => {
    switch (iconName) {
      case 'heart':
        return <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-brand-coral group-hover:scale-110 transition-transform" />;
      case 'cross':
      case 'church':
        return <Church className="w-6 h-6 sm:w-7 sm:h-7 text-brand-teal group-hover:scale-110 transition-transform" />;
      case 'calendar':
        return <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-brand-gold group-hover:scale-110 transition-transform" />;
      case 'shoppingBag':
        return <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600 group-hover:scale-110 transition-transform" />;
      case 'users':
        return <Users className="w-6 h-6 sm:w-7 sm:h-7 text-brand-teal group-hover:scale-110 transition-transform" />;
      case 'handshake':
        return <Handshake className="w-6 h-6 sm:w-7 sm:h-7 text-brand-coral group-hover:scale-110 transition-transform" />;
      case 'mail':
        return <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-slate-700 group-hover:scale-110 transition-transform" />;
      default:
        return <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-brand-coral" />;
    }
  };

  return (
    <section id="mission" className="py-20 bg-white relative overflow-hidden">
      {/* Fondo Celestial del Sagrado Corazón de Jesús y María */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/sagrado-corazon-jesus-y-maria.jpg"
          alt="Sagrado Corazón de Jesús y Sagrado Corazón de María"
          className="w-full h-full object-cover object-center opacity-35 filter brightness-105 contrast-105 transition-opacity duration-700"
        />
        {/* Capas de degradado blanco para mantener la pureza, luz y legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/45 to-white/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#2BBEC9_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split: Text & Main Logo Bubble with Interactive Floating Bubbles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-20">
          
          {/* Left Column: Main Logo Bubble + Floating Interactive Bubbles */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-8">
            {/* Ambient Glow */}
            <div className="absolute w-80 h-80 bg-brand-teal/15 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-brand-coral/15 rounded-full blur-3xl" />

            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              
              {/* BURBUJA MAYOR: Logo Oficial de la Fundación */}
              <div className="relative w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-white shadow-2xl border-4 border-white flex flex-col items-center justify-center p-8 group z-10 hover:scale-105 transition-transform duration-500 ring-4 ring-brand-teal/20">
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-coral via-brand-gold to-brand-teal rounded-full blur-md opacity-30 group-hover:opacity-60 transition duration-700 pointer-events-none" />
                <img
                  src={mission.centerLogoImage || "/logo-manos-abiertas.png"}
                  alt="Fundación Manos Abiertas de Jesús & María"
                  className="relative z-10 w-full h-auto object-contain max-h-48 drop-shadow-md"
                />
                <div className="absolute bottom-4 left-6 right-6 text-center z-10 bg-slate-950/80 backdrop-blur-md rounded-full py-1 px-3 text-white text-[11px] font-bold border border-white/20">
                  ❤️ Manos Abiertas de Jesús & María
                </div>
              </div>

              {/* BURBUJA PEQUEÑA 1 (Arriba Derecha): Ayuda Humanitaria */}
              <button
                onClick={onOpenHumanitarian}
                title="Haz clic para ver las Misiones de Ayuda Humanitaria"
                className="absolute -top-3 right-0 sm:right-4 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white z-20 group hover:scale-110 transition-transform duration-300 cursor-pointer focus:outline-none ring-2 ring-brand-teal/30 hover:ring-brand-teal"
              >
                <img
                  src={mission.bubble1Image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"}
                  alt="Ayuda Humanitaria"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col items-center justify-end pb-2">
                  <span className="text-white text-[11px] font-black tracking-wide">Ayuda</span>
                  <span className="text-[9px] text-brand-gold font-bold">Ver Causas →</span>
                </div>
              </button>

              {/* BURBUJA PEQUEÑA 2 (Abajo Derecha): Comunidad Isha Bethel */}
              <button
                onClick={handleScrollToAbout}
                title="Haz clic para conocer la Comunidad Isha Bethel y Casa de Ayuda"
                className="absolute -bottom-4 right-2 sm:right-6 w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-2xl border-4 border-white z-20 group hover:scale-110 transition-transform duration-300 cursor-pointer focus:outline-none ring-2 ring-brand-coral/30 hover:ring-brand-coral"
              >
                <img
                  src={mission.bubbleIshaImage || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80"}
                  alt="Comunidad Isha Bethel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col items-center justify-end pb-2.5">
                  <span className="text-white text-[11px] font-black tracking-wide">Isha Bethel</span>
                  <span className="text-[9px] text-brand-teal-light font-bold">Conocer Más →</span>
                </div>
              </button>

              {/* BURBUJA DESTACADA MÁS GRANDE (Abajo Izquierda): CALENDARIO DE ACTIVIDADES Y RETIROS */}
              <button
                onClick={handleScrollToRetreats}
                title="Haz clic para ver el Calendario de Actividades y Retiros"
                className="absolute -bottom-6 -left-4 sm:-left-6 w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-2xl border-4 border-white z-20 group hover:scale-105 transition-transform duration-300 cursor-pointer focus:outline-none ring-4 ring-brand-gold/40 hover:ring-brand-gold"
              >
                <img
                  src={mission.bubbleRetreatsImage || "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80"}
                  alt="Calendario de Actividades y Retiros"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col items-center justify-end pb-3 px-2 text-center">
                  <div className="inline-flex items-center gap-1 bg-brand-gold text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full mb-1">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>CALENDARIO</span>
                  </div>
                  <span className="text-white text-[11px] sm:text-xs font-black tracking-tight leading-tight block">
                    Actividades y Retiros
                  </span>
                  <span className="text-[9px] text-amber-300 font-bold block mt-0.5 group-hover:underline">
                    Ver Fechas →
                  </span>
                </div>
              </button>

              {/* BURBUJA EXTRA DINÁMICA: ACTIVIDAD DESTACADA (Si se marca desde el calendario) */}
              {featuredRetreat && (
                <button
                  onClick={handleScrollToRetreats}
                  title={`Retiro Destacado: ${featuredRetreat.title}`}
                  className="absolute -top-6 -left-6 sm:-left-8 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-brand-gold via-amber-400 to-brand-coral text-slate-950 p-2.5 border-4 border-white shadow-2xl z-30 flex flex-col items-center justify-center text-center group hover:scale-110 transition-transform duration-300 cursor-pointer ring-4 ring-brand-gold/40 animate-pulse hover:animate-none"
                >
                  <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-slate-900 bg-white/80 px-2 py-0.5 rounded-full mb-1">
                    <Star className="w-2.5 h-2.5 fill-slate-900" />
                    <span>Destacado</span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-black leading-tight line-clamp-2 text-slate-950">
                    {featuredRetreat.title}
                  </span>
                  <span className="text-[9px] font-bold text-slate-900 mt-1 bg-white/70 px-2 py-0.5 rounded-full">
                    {featuredRetreat.date.split(',')[0]}
                  </span>
                </button>
              )}

              {/* Floating Mini Badge */}
              {!featuredRetreat && (
                <div className="absolute top-2 -left-2 bg-brand-gold text-slate-950 px-3.5 py-1.5 rounded-2xl shadow-xl font-display font-black text-[11px] flex items-center gap-1.5 z-30">
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>+15 Años de Fe</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Mission Content & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-coral-light text-brand-coral font-bold text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-coral animate-ping" />
              {mission.badge}
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 leading-tight">
              {mission.title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              {mission.paragraph1}
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              {mission.paragraph2}
            </p>

            {/* Actions: Botón a Casa de Ayuda + Botón Proponer Causa */}
            <div className="pt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleScrollToAbout}
                  className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold px-7 py-4 rounded-full shadow-lg shadow-brand-coral/20 hover:scale-105 transition-all text-sm uppercase tracking-wider"
                >
                  <span>{mission.btnMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenNewMission}
                  className="inline-flex items-center gap-2 bg-brand-teal-light hover:bg-teal-100 text-brand-teal font-extrabold px-5 py-3.5 rounded-full border border-brand-teal/30 hover:scale-105 transition-all text-xs uppercase tracking-wider"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Proponer Nueva Causa</span>
                </button>
              </div>

              {/* Texto separado para donaciones */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenDonate()}
                  className="text-slate-700 hover:text-brand-coral font-bold text-sm underline-offset-4 hover:underline transition-colors flex items-center gap-1.5"
                >
                  <Heart className="w-4 h-4 text-brand-coral fill-brand-coral" />
                  <span>{mission.donateLinkText}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Quick Interactive Action Cards (Including Calendario de Retiros) */}
        <div className="mt-10 pt-10 border-t border-slate-100">
          <div className="text-center mb-8">
            <h3 className="font-display font-bold text-2xl text-slate-800">
              {mission.quickActionsTitle}
            </h3>
            <div className="w-12 h-1 bg-brand-coral mx-auto mt-2 rounded-full" />
          </div>

          {/* 6-Column Single Line Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {mission.quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleActionClick(action.id)}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-brand-teal/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center text-slate-800 hover:-translate-y-1 focus:outline-none w-full"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white group-hover:bg-slate-50 flex items-center justify-center mb-3 shadow-sm border border-slate-100 transition-colors">
                  {getActionIcon(action.icon)}
                </div>
                <h4 className="font-display font-black text-xs sm:text-sm mb-1 group-hover:text-brand-teal transition-colors leading-tight">
                  {action.title}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium leading-snug">
                  {action.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Heart Hands Banner */}
        <div className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-slate-950 via-brand-navy to-slate-950 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80')` }} />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="text-brand-gold font-bold text-xs uppercase tracking-widest block mb-2">
              JUNTOS HACEMOS LA DIFERENCIA
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight mb-3">
              Uniendo corazones, cambiando destinos.
            </h3>
            <p className="text-slate-300 text-sm">
              Cada pequeña acción suma. Conviértete hoy en el motivo por el cual alguien no se rinde.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onOpenDonate()}
              className="bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Dar Amor Ahora</span>
            </button>
            <button
              onClick={() => onOpenVolunteer()}
              className="bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full backdrop-blur-md border border-white/30 hover:border-white transition-all"
            >
              Ser Voluntario
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
