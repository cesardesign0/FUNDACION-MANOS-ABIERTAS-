import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminData } from '../../context/AdminDataContext';
import { TypographyToolbar, ButtonStudio } from './StyleToolbars';
import { 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Layers, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Sparkles, 
  Edit3, 
  X, 
  Save, 
  Check, 
  Plus, 
  Trash2, 
  Star, 
  Image as ImageIcon, 
  Settings, 
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Palette,
  Sliders,
  Flame,
  Target,
  Calendar,
  ShoppingBag,
  Heart
} from 'lucide-react';

export const VisualLiveEditor = ({ onExit }) => {
  const { language } = useLanguage();
  const {
    adminData,
    sectionOrder,
    sectionVisibility,
    updateSectionOrder,
    moveSection,
    toggleSectionVisibility,
    featuredMissionId,
    setFeaturedMission,
    featuredRetreatId,
    setFeaturedRetreat,
    featuredProductIds,
    toggleFeaturedProduct,
    hero,
    updateHero,
    about,
    updateAbout,
    programsSection,
    updateProgramsHeader,
    retreatsModal,
    updateRetreatsHeader,
    shopHeader,
    updateShopHeader,
    missionHeart,
    updateMissionHeart,
    volunteerSection,
    updateVolunteerHeader,
    footer,
    updateFooter,
    missions,
    events,
    products,
    updateMission,
    updateEvent,
    updateProduct
  } = useAdminData();

  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [isBlockManagerOpen, setIsBlockManagerOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleScrollToSection = (sectionId) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(`editor-section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans overflow-hidden text-slate-100">
      
      {/* ========================================================================= */}
      {/* TOPBAR: Wix / Storyblok Style Control Header */}
      {/* ========================================================================= */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-md">
        
        {/* Left: Brand & Mode Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-brand-coral to-brand-gold text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>EDITOR VISUAL WIX-STYLE</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            | Clic en cualquier bloque para editar en vivo
          </span>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceMode === 'desktop'
                ? 'bg-brand-teal text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Computadora / Desktop"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Escritorio</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceMode === 'tablet'
                ? 'bg-brand-teal text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Tableta (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tableta</span>
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              deviceMode === 'mobile'
                ? 'bg-brand-teal text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Móvil (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Móvil</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBlockManagerOpen(!isBlockManagerOpen)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
              isBlockManagerOpen 
                ? 'bg-brand-gold text-slate-950 border-brand-gold shadow-md' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bloques / Orden</span>
          </button>

          <button
            onClick={() => {
              showNotification("¡Cambios guardados en vivo y sincronizados con éxito!");
            }}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Todo</span>
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl border border-slate-700 transition-all"
            title="Salir del Editor Visual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 right-6 z-50 bg-emerald-500 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WORKSPACE AREA: Sidebar + Visual Canvas + Right Inspector Drawer */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR: BLOCK MANAGER (Storyblok / Wix Block Navigator) */}
        {isBlockManagerOpen && (
          <aside className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-xl overflow-hidden animate-slide-right">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-gold">
                <Layers className="w-4 h-4" />
                <span>Gestor de Secciones ({sectionOrder.length})</span>
              </div>
              <span className="text-[10px] text-slate-400">Arrastrar / Subir / Bajar</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <p className="text-[11px] text-slate-400 px-1 leading-relaxed">
                Usa las flechas para reordenar bloques u ocúltalos con el ojo para borrarlos temporalmente:
              </p>

              {sectionOrder.map((section, idx) => {
                const isVisible = sectionVisibility[section.id] !== false;
                const isSelected = activeSectionId === section.id;

                return (
                  <div
                    key={section.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-brand-teal/15 border-brand-teal text-white shadow-lg'
                        : isVisible
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                    }`}
                  >
                    <div 
                      onClick={() => handleScrollToSection(section.id)}
                      className="flex-1 cursor-pointer flex items-center gap-2 truncate"
                    >
                      <span className="text-[10px] font-black text-slate-500 w-4">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-extrabold truncate">
                        {section.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Move Up */}
                      <button
                        disabled={idx === 0}
                        onClick={() => moveSection(section.id, -1)}
                        className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20 rounded-lg transition-colors"
                        title="Subir sección"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        disabled={idx === sectionOrder.length - 1}
                        onClick={() => moveSection(section.id, 1)}
                        className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20 rounded-lg transition-colors"
                        title="Bajar sección"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Toggle Visibility */}
                      <button
                        onClick={() => toggleSectionVisibility(section.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          isVisible
                            ? 'text-emerald-400 hover:bg-emerald-950/40'
                            : 'text-rose-400 hover:bg-rose-950/40'
                        }`}
                        title={isVisible ? "Ocultar bloque en la web" : "Mostrar bloque en la web"}
                      >
                        {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      {/* Edit Button */}
                      <button
                        onClick={() => setActiveSectionId(section.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-brand-teal text-slate-950'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                        title="Abrir editor de este bloque"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 border-t border-slate-800 text-center">
              <span className="text-[10px] text-slate-400">
                ⭐ Fundación Manos Abiertas de Jesús & María
              </span>
            </div>

          </aside>
        )}

        {/* 2. CENTER: LIVE VISUAL CANVAS */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-4 sm:p-6 flex justify-center items-start">
          
          <div 
            className={`transition-all duration-300 bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 ${
              deviceMode === 'desktop'
                ? 'w-full max-w-6xl'
                : deviceMode === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            } ${activeSectionId ? 'border-brand-teal' : 'border-slate-800'}`}
          >
            
            {/* Sections rendered in dynamic sectionOrder */}
            {sectionOrder.map((section) => {
              const isVisible = sectionVisibility[section.id] !== false;
              const isSelected = activeSectionId === section.id;

              if (!isVisible) {
                return (
                  <div
                    key={section.id}
                    id={`editor-section-${section.id}`}
                    className="p-6 bg-slate-100 border-2 border-dashed border-slate-300 text-center text-slate-400 font-bold text-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-rose-500" />
                      <span>{section.name} (Bloque Oculto)</span>
                    </div>
                    <button
                      onClick={() => toggleSectionVisibility(section.id)}
                      className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-200 text-xs font-extrabold"
                    >
                      Mostrar Bloque
                    </button>
                  </div>
                );
              }

              return (
                <div
                  key={section.id}
                  id={`editor-section-${section.id}`}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`relative group cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-4 ring-brand-teal ring-inset'
                      : 'hover:outline hover:outline-2 hover:outline-dashed hover:outline-brand-gold'
                  }`}
                >
                  {/* Floating Action Badge on Section Hover */}
                  <div className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-slate-950/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xl border border-white/20">
                    <Edit3 className="w-3.5 h-3.5 text-brand-teal" />
                    <span>Editar {section.name}</span>
                  </div>

                  {/* Section Render Mockups with live context data */}
                  {section.id === 'hero' && (
                    <div className="p-8 sm:p-12 bg-gradient-to-b from-brand-navy via-slate-900 to-slate-950 text-white relative">
                      <div className="max-w-2xl space-y-4">
                        <span className="text-xs font-black uppercase text-brand-teal">
                          {hero?.tagline || 'FUNDACIÓN CATÓLICA DE AYUDA SOCIAL'}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
                          {hero?.titlePrefix || 'El Amor de Dios en'} <span className="text-brand-gold italic">{hero?.titleHighlight || 'Acción y Misericordia'}</span>
                        </h1>
                        <p className="text-slate-300 text-sm">
                          {hero?.description}
                        </p>
                        
                        {/* Live Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(hero?.buttons || []).filter(b => b.visible !== false).map((b) => (
                            <span key={b.id} className="px-4 py-2 rounded-full text-xs font-black bg-brand-coral text-white shadow-md">
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === 'stats' && (
                    <div className="p-6 bg-slate-900 text-white border-y border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                        <span className="text-lg font-black text-brand-gold">+12,500</span>
                        <span className="text-[10px] text-slate-400 block uppercase">Alimentos Entregados</span>
                      </div>
                      <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                        <span className="text-lg font-black text-brand-teal">+850</span>
                        <span className="text-[10px] text-slate-400 block uppercase">Familias Asistidas</span>
                      </div>
                      <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                        <span className="text-lg font-black text-brand-coral">+45</span>
                        <span className="text-[10px] text-slate-400 block uppercase">Retiros Espirituales</span>
                      </div>
                      <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800">
                        <span className="text-lg font-black text-emerald-400">100%</span>
                        <span className="text-[10px] text-slate-400 block uppercase">Transparencia</span>
                      </div>
                    </div>
                  )}

                  {section.id === 'mission' && (
                    <div className="p-8 bg-gradient-to-tr from-[#fbf8f3] via-[#f4f9fa] to-[#fdf7f4] border-b border-slate-100 relative">
                      <div className="max-w-xl space-y-3">
                        <span className="text-xs font-black text-brand-coral uppercase">{missionHeart?.badge}</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{missionHeart?.title}</h2>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{missionHeart?.paragraph1}</p>
                        <div className="pt-2">
                          <span className="px-5 py-2.5 rounded-full bg-brand-coral text-white text-xs font-black inline-block">
                            {missionHeart?.btnMore}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === 'about' && (
                    <div className="p-8 bg-slate-950 text-white space-y-4">
                      <span className="text-xs font-black text-brand-gold uppercase">{about?.badge}</span>
                      <h2 className="text-2xl font-black text-white">{about?.title}</h2>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{about?.lead}</p>
                    </div>
                  )}

                  {section.id === 'programs' && (
                    <div className="p-8 bg-slate-900 text-white space-y-6">
                      <div>
                        <span className="text-xs font-black text-brand-gold uppercase">⭐ Causa Destacada & Misiones</span>
                        <h2 className="text-2xl font-black text-white">{programsSection?.title}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {missions.slice(0, 3).map((m) => {
                          const isFeat = m.id === featuredMissionId;
                          return (
                            <div key={m.id} className={`p-4 rounded-2xl bg-slate-950 border ${isFeat ? 'border-brand-gold ring-2 ring-brand-gold/40' : 'border-slate-800'}`}>
                              {isFeat && <span className="text-[10px] font-black text-brand-gold block mb-1">⭐ CAUSA DESTACADA</span>}
                              <h4 className="text-xs font-bold text-white truncate">{m.title}</h4>
                              <span className="text-[11px] text-emerald-400 font-bold block mt-1">{m.percentage}% Recaudado</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {section.id === 'retreats' && (
                    <div className="p-8 bg-white border-b border-slate-200 space-y-6">
                      <div>
                        <span className="text-xs font-black text-brand-coral uppercase">Calendario Oficial</span>
                        <h2 className="text-2xl font-black text-slate-900">{retreatsModal?.title}</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {events.slice(0, 3).map((e) => {
                          const isFeat = e.id === featuredRetreatId;
                          return (
                            <div key={e.id} className={`p-4 rounded-2xl bg-slate-50 border ${isFeat ? 'border-brand-gold ring-2 ring-brand-gold/40' : 'border-slate-200'}`}>
                              {isFeat && <span className="text-[10px] font-black text-brand-gold block mb-1">⭐ RETIRO DESTACADO</span>}
                              <h4 className="text-xs font-bold text-slate-900 truncate">{e.title}</h4>
                              <span className="text-[10px] text-slate-500 block mt-1">{e.date}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {section.id === 'shop' && (
                    <div className="p-8 bg-[#fdfbf7] border-y border-amber-200 space-y-6">
                      <div>
                        <span className="text-xs font-black text-amber-700 uppercase">{shopHeader?.badge}</span>
                        <h2 className="text-2xl font-black text-slate-900">{shopHeader?.title}</h2>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {products.slice(0, 4).map((p) => {
                          const isFeat = (featuredProductIds || []).includes(p.id);
                          return (
                            <div key={p.id} className={`p-3 rounded-2xl bg-white border ${isFeat ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-amber-200'}`}>
                              {isFeat && <span className="text-[9px] font-black text-red-600 block mb-1">🔥 TOP VENTAS</span>}
                              <h4 className="text-xs font-bold text-slate-900 truncate">{p.name}</h4>
                              <span className="text-xs font-black text-slate-950 block mt-1">${p.price.toFixed(2)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {section.id === 'volunteer' && (
                    <div className="p-8 bg-slate-950 text-white space-y-4">
                      <span className="text-xs font-black text-brand-teal uppercase">{volunteerSection?.badge}</span>
                      <h2 className="text-2xl font-black text-white">{volunteerSection?.title}</h2>
                      <p className="text-slate-300 text-xs sm:text-sm">{volunteerSection?.subtitle}</p>
                    </div>
                  )}

                  {section.id === 'footer' && (
                    <div className="p-8 bg-slate-950 text-slate-400 border-t border-slate-800 text-center text-xs space-y-2">
                      <span className="font-bold text-white block">{footer?.rights}</span>
                      <span>Sitio oficial Fundación Manos Abiertas de Jesús & María</span>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </main>

        {/* 3. RIGHT SIDEBAR: INLINE INSPECTOR & LIVE EDITOR (Wix Inspector Drawer) */}
        {activeSectionId && (
          <aside className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-2xl overflow-hidden animate-slide-left">
            
            {/* Inspector Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-teal" />
                <span className="text-xs font-black uppercase text-white">
                  Inspector: {sectionOrder.find(s => s.id === activeSectionId)?.name}
                </span>
              </div>
              <button
                onClick={() => setActiveSectionId(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inspector Content per Section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">

              {/* ===================== HERO INSPECTOR ===================== */}
              {activeSectionId === 'hero' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Etiqueta Superior (Tagline)</label>
                    <input
                      type="text"
                      value={hero?.tagline || ''}
                      onChange={(e) => updateHero({ tagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Prefijo del Título</label>
                    <input
                      type="text"
                      value={hero?.titlePrefix || ''}
                      onChange={(e) => updateHero({ titlePrefix: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Frase Resaltada (Cursiva/Dorada)</label>
                    <input
                      type="text"
                      value={hero?.titleHighlight || ''}
                      onChange={(e) => updateHero({ titleHighlight: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Descripción Principal</label>
                    <textarea
                      rows={3}
                      value={hero?.description || ''}
                      onChange={(e) => updateHero({ description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  {/* Buttons Studio in Hero */}
                  <div className="pt-4 border-t border-slate-800">
                    <ButtonStudio
                      buttons={hero?.buttons || []}
                      onChange={(newButtons) => updateHero({ buttons: newButtons })}
                    />
                  </div>
                </div>
              )}

              {/* ===================== MISSION HEART INSPECTOR ===================== */}
              {activeSectionId === 'mission' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Insignia / Badge</label>
                    <input
                      type="text"
                      value={missionHeart?.badge || ''}
                      onChange={(e) => updateMissionHeart({ badge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de la Misión</label>
                    <input
                      type="text"
                      value={missionHeart?.title || ''}
                      onChange={(e) => updateMissionHeart({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Párrafo Principal</label>
                    <textarea
                      rows={3}
                      value={missionHeart?.paragraph1 || ''}
                      onChange={(e) => updateMissionHeart({ paragraph1: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Texto del Botón</label>
                    <input
                      type="text"
                      value={missionHeart?.btnMore || ''}
                      onChange={(e) => updateMissionHeart({ btnMore: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ===================== PROGRAMS / FEATURED MISSIONS INSPECTOR ===================== */}
              {activeSectionId === 'programs' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/40 space-y-3">
                    <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase">
                      <Star className="w-4 h-4 fill-brand-gold" />
                      <span>⭐ Elegir Causa Destacada / Principal</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Esta misión aparecerá con un marco dorado de alta prioridad al inicio de la sección:
                    </p>
                    <select
                      value={featuredMissionId || ''}
                      onChange={(e) => setFeaturedMission(Number(e.target.value) || e.target.value)}
                      className="w-full bg-slate-950 border border-brand-gold rounded-xl px-3 py-2 text-xs text-white font-bold"
                    >
                      {missions.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.title} ({m.percentage}% recaudado)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de la Sección</label>
                    <input
                      type="text"
                      value={programsSection?.title || ''}
                      onChange={(e) => updateProgramsHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Subtítulo</label>
                    <textarea
                      rows={2}
                      value={programsSection?.subtitle || ''}
                      onChange={(e) => updateProgramsHeader({ subtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ===================== RETREATS / FEATURED CALENDAR INSPECTOR ===================== */}
              {activeSectionId === 'retreats' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/40 space-y-3">
                    <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase">
                      <Star className="w-4 h-4 fill-brand-gold" />
                      <span>⭐ Elegir Retiro Destacado en Calendario</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Este retiro se fijará en la parte superior del calendario con un banner especial:
                    </p>
                    <select
                      value={featuredRetreatId || ''}
                      onChange={(e) => setFeaturedRetreat(e.target.value)}
                      className="w-full bg-slate-950 border border-brand-gold rounded-xl px-3 py-2 text-xs text-white font-bold"
                    >
                      {events.map((ev) => (
                        <option key={ev.id} value={ev.id}>
                          {ev.title} ({ev.date})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título del Calendario</label>
                    <input
                      type="text"
                      value={retreatsModal?.title || ''}
                      onChange={(e) => updateRetreatsHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ===================== SHOP / FEATURED PRODUCTS INSPECTOR ===================== */}
              {activeSectionId === 'shop' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase">
                      <Flame className="w-4 h-4 text-amber-400" />
                      <span>⭐ Artículos Destacados / Top Más Vendidos</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Marca los artículos que llevarán la insignia de "Más Vendido" y aparecerán en el filtro destacado:
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {products.map((p) => {
                        const isFeat = (featuredProductIds || []).includes(p.id);
                        return (
                          <label key={p.id} className="flex items-center gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-amber-400 text-xs">
                            <input
                              type="checkbox"
                              checked={isFeat}
                              onChange={() => toggleFeaturedProduct(p.id)}
                              className="accent-amber-400 rounded"
                            />
                            <span className="truncate flex-1 font-bold text-white">{p.name}</span>
                            <span className="text-[10px] text-amber-300 font-mono">${p.price}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de la Tienda</label>
                    <input
                      type="text"
                      value={shopHeader?.title || ''}
                      onChange={(e) => updateShopHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Mensaje de Impacto Social</label>
                    <input
                      type="text"
                      value={shopHeader?.supportCallout || ''}
                      onChange={(e) => updateShopHeader({ supportCallout: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ===================== ABOUT INSPECTOR ===================== */}
              {activeSectionId === 'about' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Insignia / Badge</label>
                    <input
                      type="text"
                      value={about?.badge || ''}
                      onChange={(e) => updateAbout({ badge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título</label>
                    <input
                      type="text"
                      value={about?.title || ''}
                      onChange={(e) => updateAbout({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Texto de Introducción</label>
                    <textarea
                      rows={3}
                      value={about?.lead || ''}
                      onChange={(e) => updateAbout({ lead: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ===================== VOLUNTEER INSPECTOR ===================== */}
              {activeSectionId === 'volunteer' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de Voluntariado</label>
                    <input
                      type="text"
                      value={volunteerSection?.title || ''}
                      onChange={(e) => updateVolunteerHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Subtítulo</label>
                    <textarea
                      rows={3}
                      value={volunteerSection?.subtitle || ''}
                      onChange={(e) => updateVolunteerHeader({ subtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* ===================== FOOTER INSPECTOR ===================== */}
              {activeSectionId === 'footer' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Derechos de Autor (Footer)</label>
                    <input
                      type="text"
                      value={footer?.rights || ''}
                      onChange={(e) => updateFooter({ rights: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Inspector Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
              <button
                onClick={() => showNotification("¡Bloque actualizado con éxito!")}
                className="w-full py-2.5 bg-brand-teal hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Aplicar Cambios
              </button>
            </div>

          </aside>
        )}

      </div>

    </div>
  );
};
