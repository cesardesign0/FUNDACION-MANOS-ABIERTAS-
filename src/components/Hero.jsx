import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { EditableElement } from './admin/EditableElement';
import { Heart, Users, ArrowRight, Sparkles, HeartHandshake, HandHeart, Sun, Calendar, ChevronRight, BookOpen } from 'lucide-react';

export const Hero = ({ onOpenDonate, onOpenVolunteer, onOpenHumanitarian, onOpenRetreats, onSelectButton, onSelectElement }) => {
  const { t } = useLanguage();
  const { hero } = useAdminData();

  const heroData = hero || t.hero;

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
          backgroundImage: `url('${heroData.backgroundImage || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=85"}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* Glowing Ambient Light Orbs */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Catholic Non-Profit Emblem & Identity Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <button
              onClick={handleScrollToMission}
              className="group relative block w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.03] border-2 border-white/20 text-left focus:outline-none focus:ring-4 focus:ring-brand-teal/40"
              title="Conoce nuestra historia y misión"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              {/* Card Surface */}
              <div className="relative bg-gradient-to-b from-white/95 to-slate-100/95 backdrop-blur-xl p-8 rounded-3xl border border-white flex flex-col items-center text-center text-slate-900 shadow-2xl">
                
                {/* Official Logo */}
                <EditableElement elementInfo={{ type: 'image', id: 'hero-logo', sectionId: 'hero', label: 'Logo Principal' }}>
                  <div className="w-full flex justify-center mb-4">
                    <img
                      src={heroData.logoCardImage || "/logo-manos-abiertas.png"}
                      alt="Fundación Manos Abiertas de Jesús y María"
                      className="h-32 sm:h-36 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </EditableElement>

                <div className="w-12 h-1 bg-gradient-to-r from-brand-coral to-brand-teal rounded-full mb-3" />

                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
                  Fundación Benéfica Católica
                </span>
                
                <h3 className="font-display font-black text-xs sm:text-sm text-brand-coral uppercase tracking-wider mt-1">
                  Centro Católico Carismático • Bronx de Nueva York
                </h3>

                <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-teal group-hover:text-brand-teal-dark transition-colors">
                  <span>Conoce Nuestra Misión</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>

          {/* Right Column: Headlines, Bible Verse and Action Buttons */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <EditableElement elementInfo={{ type: 'text', id: 'hero-badge', sectionId: 'hero', label: 'Etiqueta Hero', data: { text: heroData.tag } }} inline>
              <div 
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-teal/20 border border-brand-teal/40 text-xs font-bold tracking-wider backdrop-blur-md ${heroData.styles?.tag_case || 'uppercase'}`}
                style={{ color: heroData.styles?.tag_color || '#2BBEC9' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>{heroData.tag}</span>
              </div>
            </EditableElement>

            {/* Handwritten Subheading */}
            <EditableElement elementInfo={{ type: 'text', id: 'hero-handwritten', sectionId: 'hero', label: 'Frase Manuscrita', data: { text: heroData.handwritten } }}>
              <div 
                className={`${heroData.styles?.handwritten_font || 'font-handwritten'} ${heroData.styles?.handwritten_size || 'text-4xl sm:text-5xl lg:text-6xl'} ${heroData.styles?.handwritten_weight || 'font-bold'} ${heroData.styles?.handwritten_case || 'normal-case'} tracking-wide drop-shadow-lg rotate-[-1deg] leading-tight ${heroData.styles?.handwritten_align || 'text-left'}`}
                style={{ color: heroData.styles?.handwritten_color || '#E5A93C' }}
              >
                {heroData.handwritten}
              </div>
            </EditableElement>

            {/* Versículo Bíblico Católico de Servicio */}
            <EditableElement elementInfo={{ type: 'text', id: 'hero-title', sectionId: 'hero', label: 'Título Principal', data: { text: heroData.title } }}>
              <div className="border-l-4 border-brand-gold/70 pl-4 py-1">
                <h1 
                  className={`${heroData.styles?.title_font || 'font-serif'} ${heroData.styles?.title_size || 'text-2xl sm:text-3xl lg:text-4xl'} ${heroData.styles?.title_weight || 'font-medium'} ${heroData.styles?.title_italic !== false ? 'italic' : ''} ${heroData.styles?.title_case || 'normal-case'} ${heroData.styles?.title_align || 'text-left'} tracking-tight leading-snug drop-shadow-md`}
                  style={{ color: heroData.styles?.title_color || '#FFFFFF' }}
                >
                  {heroData.title}
                </h1>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-amber-200 text-xs sm:text-sm font-bold border border-brand-gold/40">
                  <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{heroData.citation}</span>
                </div>
              </div>
            </EditableElement>

            {/* Description */}
            <EditableElement elementInfo={{ type: 'text', id: 'hero-desc', sectionId: 'hero', label: 'Descripción', data: { text: heroData.description } }}>
              <p 
                className={`leading-relaxed max-w-2xl ${heroData.styles?.desc_size || 'text-base sm:text-lg'}`}
                style={{ color: heroData.styles?.desc_color || '#CBD5E1' }}
              >
                {heroData.description}
              </p>
            </EditableElement>

            {/* Botones de Acción Dinámicos y Configurables */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {(heroData.buttons && heroData.buttons.length > 0 ? heroData.buttons : [
                { id: 'btn-1', label: heroData.btnDonate || 'Hacer una Donación', action: 'donate', variant: 'coral', shape: 'pill', icon: 'heart', visible: true },
                { id: 'btn-2', label: heroData.btnVolunteer || 'Únete como Voluntario', action: 'volunteer', variant: 'glass', shape: 'pill', icon: 'users', visible: true },
                { id: 'btn-3', label: heroData.btnCauses || 'Ver Nuestras Misiones', action: 'programs', variant: 'gold', shape: 'pill', icon: 'arrow', visible: true }
              ]).filter(b => b.visible !== false).map((btn) => {
                const shapeClass = btn.shape === 'square' ? 'rounded-lg' : btn.shape === 'smooth' ? 'rounded-2xl' : 'rounded-full';
                let variantClass = 'bg-brand-coral hover:bg-brand-coral-dark text-white shadow-xl shadow-brand-coral/40';
                if (btn.variant === 'teal') variantClass = 'bg-brand-teal hover:bg-brand-teal-dark text-white shadow-xl shadow-brand-teal/40';
                else if (btn.variant === 'gold') variantClass = 'bg-brand-gold hover:bg-amber-500 text-slate-950 font-black shadow-xl shadow-brand-gold/40';
                else if (btn.variant === 'glass') variantClass = 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 hover:border-white';
                else if (btn.variant === 'outline-gold') variantClass = 'border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/20';
                else if (btn.variant === 'outline-white') variantClass = 'border-2 border-white/40 text-white hover:bg-white/20';

                const handleClick = (e) => {
                  if (onSelectButton) {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectButton(btn);
                    return;
                  }
                  if (btn.action === 'donate') onOpenDonate();
                  else if (btn.action === 'volunteer') onOpenVolunteer();
                  else if (btn.action === 'programs') {
                    const el = document.getElementById('programs');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (btn.action === 'retreats') onOpenRetreats();
                  else if (btn.action === 'about') {
                    const el = document.getElementById('about');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (btn.action === 'shop') {
                    const el = document.getElementById('shop');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  } else if (btn.action === 'custom_url' && btn.customUrl) {
                    window.open(btn.customUrl, '_blank', 'noopener,noreferrer');
                  }
                };

                return (
                  <EditableElement key={btn.id} inline elementInfo={{ type: 'button', id: btn.id, sectionId: 'hero', label: `Botón: ${btn.label}`, data: btn, movable: true }}>
                    <button
                      onClick={handleClick}
                      className={`inline-flex items-center gap-2 font-extrabold px-6 sm:px-7 py-3.5 sm:py-4 ${shapeClass} ${variantClass} hover:scale-105 transition-all text-sm sm:text-base`}
                    >
                      {btn.icon === 'heart' && <Heart className="w-5 h-5 fill-current" />}
                      {btn.icon === 'users' && <Users className="w-5 h-5 text-current" />}
                      {btn.icon === 'calendar' && <Calendar className="w-5 h-5 text-current" />}
                      {/* {btn.icon === 'shop' && <ShoppingBag className="w-5 h-5 text-current" />} */}
                      {btn.icon === 'sparkles' && <Sparkles className="w-5 h-5 text-current" />}
                      <span>{btn.label}</span>
                      {btn.icon === 'arrow' && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </EditableElement>
                );
              })}
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
