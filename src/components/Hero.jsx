import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Users, ArrowRight, Sparkles, HeartHandshake, HandHeart, Sun, Calendar, ChevronRight, BookOpen } from 'lucide-react';

export const Hero = ({ onOpenDonate, onOpenVolunteer, onOpenHumanitarian, onOpenRetreats }) => {
  const { t } = useLanguage();

  const getIcon = (id) => {
    switch (id) {
      case 1: return <HeartHandshake className="w-4 h-4 text-brand-coral" />;
      case 2: return <HandHeart className="w-4 h-4 text-brand-teal" />;
      case 3: return <Sun className="w-4 h-4 text-brand-gold" />;
      default: return <Sparkles className="w-4 h-4 text-brand-gold" />;
    }
  };

  const handleCardClick = (card) => {
    if (card.key === 'humanitarian') {
      onOpenHumanitarian();
    } else if (card.key === 'volunteer') {
      onOpenVolunteer('volunteer');
    } else if (card.key === 'retreats') {
      onOpenRetreats();
    }
  };

  const handleScrollToMission = () => {
    const missionEl = document.getElementById('mission');
    if (missionEl) {
      missionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-[92vh] bg-slate-950 text-white flex flex-col justify-between overflow-hidden">
      {/* Background Image with Cinematic Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=85')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Floating Accent Warmth Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-coral/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content - Split into 2 Columns (Logo on LEFT + Text on RIGHT) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Prominent Official Logo Card (Clickable to Nuestra Misión) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <button
              onClick={handleScrollToMission}
              title="Haz clic para conocer nuestra misión e historia"
              className="relative bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white/60 backdrop-blur-xl hover:scale-105 transition-all duration-500 max-w-sm sm:max-w-md w-full flex flex-col items-center text-center cursor-pointer group text-left"
            >
              {/* Outer decorative ambient aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal rounded-3xl blur-lg opacity-40 group-hover:opacity-70 transition duration-700 pointer-events-none" />
              
              <img
                src="/logo-manos-abiertas.png"
                alt="Fundación Manos Abiertas de Jesús & María"
                className="relative z-10 w-full h-auto object-contain max-h-56 sm:max-h-64 drop-shadow-md group-hover:scale-105 transition-transform"
              />

              <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-200 w-full text-center">
                <span className="font-display font-extrabold text-xs uppercase tracking-widest text-slate-800 block">
                  Fundación Benéfica Católica
                </span>
                <p className="text-[11px] text-[#8B1C1C] font-black mt-0.5 uppercase tracking-wide">
                  Centro Carismático Católico • NY & Bronx
                </p>
                <div className="mt-2 text-[10px] text-brand-teal font-extrabold flex items-center justify-center gap-1 group-hover:underline">
                  <span>Conoce Nuestra Misión</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>

          {/* Right Column: Headlines, Bible Verse and Action Buttons */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/40 text-brand-teal-light text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>{t.hero.tag}</span>
            </div>

            {/* Handwritten Subheading */}
            <div className="font-handwritten text-4xl sm:text-5xl lg:text-6xl text-brand-gold font-bold tracking-wide drop-shadow-lg rotate-[-1deg] leading-tight">
              {t.hero.handwritten}
            </div>

            {/* Versículo Bíblico Católico de Servicio */}
            <div className="border-l-4 border-brand-gold/70 pl-4 py-1">
              <h1 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-white font-medium tracking-tight leading-snug drop-shadow-md">
                {t.hero.title}
              </h1>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-amber-200 text-xs sm:text-sm font-bold border border-brand-gold/40">
                <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                <span>{t.hero.citation}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {t.hero.description}
            </p>

            {/* 3 Botones de Acción Principales */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Botón 1: Donar */}
              <button
                onClick={() => onOpenDonate()}
                className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full shadow-xl shadow-brand-coral/40 hover:scale-105 transition-all text-sm sm:text-base"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>{t.hero.btnDonate}</span>
              </button>

              {/* Botón 2: Voluntariado */}
              <button
                onClick={() => onOpenVolunteer()}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full backdrop-blur-md border border-white/30 hover:border-white transition-all text-sm sm:text-base"
              >
                <Users className="w-5 h-5 text-brand-teal" />
                <span>{t.hero.btnVolunteer}</span>
              </button>

              {/* Botón 3: Ver Nuestras Misiones */}
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold hover:text-white border border-brand-gold/50 font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full backdrop-blur-md shadow-lg hover:scale-105 transition-all text-sm sm:text-base group"
              >
                <span>{t.hero.btnCauses}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom 3 Interactive Featured Cards */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.hero.programCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="group relative h-52 sm:h-56 rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-slate-900/90 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-brand-teal hover:shadow-2xl flex flex-col justify-end p-5 cursor-pointer ring-0 hover:ring-2 hover:ring-brand-teal/50"
            >
              {/* Card Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/20" />

              {/* Card Content */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white">
                    {getIcon(card.id)}
                    <span className="tracking-wide uppercase">Manos Abiertas</span>
                  </div>

                  <span className="text-[10px] text-brand-gold font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform bg-black/40 px-2 py-0.5 rounded-full">
                    <span>Abrir</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-base sm:text-lg text-white leading-snug drop-shadow-md group-hover:text-brand-gold transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
                  {card.desc}
                </p>

                <div className="pt-1 text-[11px] font-bold text-brand-teal-light flex items-center gap-1 group-hover:text-white transition-colors">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
