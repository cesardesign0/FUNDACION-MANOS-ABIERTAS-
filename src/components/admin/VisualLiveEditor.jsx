import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAdminData } from '../../context/AdminDataContext';
import { TypographyToolbar, ButtonStudio } from './StyleToolbars';

// Import the REAL LIVE COMPONENTS for 100% visual fidelity
import { Hero } from '../Hero';
import { StatsGoalsBanner } from '../StatsGoalsBanner';
import { MissionHeart } from '../MissionHeart';
import { AboutFounder } from '../AboutFounder';
import { Programs } from '../Programs';
import { RetreatsSection } from '../RetreatsSection';
import { ShopSection } from '../ShopSection';
import { VolunteerSection } from '../VolunteerSection';
import { Footer } from '../Footer';

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
  Heart,
  Upload,
  Link as LinkIcon,
  Wand2,
  CheckCircle2,
  RefreshCw,
  FolderOpen,
  DollarSign,
  Clock,
  MapPin,
  Tag,
  Mail,
  Phone,
  LogOut,
  List,
  Layout,
  PlusCircle,
  AlertCircle,
  Quote,
  CheckCircle,
  Users,
  ShieldCheck
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
    reviews,
    approvedReviews,
    pendingReviews,
    settings,
    addEvent,
    updateEvent,
    deleteEvent,
    addProduct,
    updateProduct,
    deleteProduct,
    addMission,
    updateMission,
    deleteMission,
    approveReview,
    deleteReview,
    updateSettings,
    resetToDefaults
  } = useAdminData();

  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [selectedSubItem, setSelectedSubItem] = useState(null); // { type: 'mission'|'retreat'|'product'|'button'|'element', id: string|number, data?: any }
  const [isBlockManagerOpen, setIsBlockManagerOpen] = useState(true);
  const [notification, setNotification] = useState(null);

  // New Item Modal states
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [newItemType, setNewItemType] = useState('mission'); // 'mission' | 'retreat' | 'product'
  const [newItemForm, setNewItemForm] = useState({
    title: '',
    name: '',
    desc: '',
    price: 25,
    tag: 'Solidario',
    raisedAmount: '$0',
    goalAmount: '$5,000',
    percentage: 0,
    date: 'Próximamente 2026',
    schedule: '9:00 AM - 5:00 PM',
    cost: '$25 USD',
    category: 'Jornada',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80'
  });

  // Image Hub Modal state
  const [imageModalTarget, setImageModalTarget] = useState(null); // { section: string, field: string, itemId?: any }
  const [imageModalTab, setImageModalTab] = useState('upload'); // 'upload' | 'ai' | 'url' | 'gallery'
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const fileInputRef = useRef(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleScrollToSection = (sectionId) => {
    setActiveSectionId(sectionId);
    setSelectedSubItem(null);
    const el = document.getElementById(`editor-section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Image Upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      applyImageChange(event.target.result);
      showNotification("¡Imagen cargada y aplicada con éxito!");
    };
    reader.readAsDataURL(file);
  };

  // Apply chosen image to active target
  const applyImageChange = (url) => {
    if (!imageModalTarget || !url) return;
    const { section, field, itemId } = imageModalTarget;

    if (section === 'hero') updateHero({ [field]: url });
    else if (section === 'missionHeart') updateMissionHeart({ [field]: url });
    else if (section === 'about') updateAbout({ [field]: url });
    else if (section === 'programs') updateProgramsHeader({ [field]: url });
    else if (section === 'missionItem' && itemId) updateMission(itemId, { [field]: url });
    else if (section === 'retreatItem' && itemId) updateEvent(itemId, { [field]: url });
    else if (section === 'productItem' && itemId) updateProduct(itemId, { [field]: url });

    setImageModalTarget(null);
    setImageUrlInput('');
  };

  // AI Prompt preset image generator
  const handleGenerateAiImage = () => {
    if (!aiPromptInput.trim()) return;
    setIsGeneratingAi(true);
    setTimeout(() => {
      const promptLower = aiPromptInput.toLowerCase();
      let generatedUrl = "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=85";
      
      if (promptLower.includes('jesus') || promptLower.includes('sagrado') || promptLower.includes('corazon')) {
        generatedUrl = "/sagrado-corazon-jesus-lateral.jpg";
      } else if (promptLower.includes('maria') || promptLower.includes('virgen')) {
        generatedUrl = "/sagrado-corazon-maria-lateral.jpg";
      } else if (promptLower.includes('comida') || promptLower.includes('alimento') || promptLower.includes('hambre')) {
        generatedUrl = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";
      } else if (promptLower.includes('retiro') || promptLower.includes('oracion') || promptLower.includes('iglesia')) {
        generatedUrl = "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80";
      } else if (promptLower.includes('joven') || promptLower.includes('comunidad') || promptLower.includes('bethel')) {
        generatedUrl = "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80";
      }

      applyImageChange(generatedUrl);
      setIsGeneratingAi(false);
      showNotification("¡Imagen generada y aplicada en tiempo real!");
    }, 1200);
  };

  // Create new item (Mission, Retreat or Product)
  const handleCreateNewItem = (e) => {
    e.preventDefault();
    if (newItemType === 'mission') {
      addMission({
        id: Date.now(),
        title: newItemForm.title || 'Nueva Causa de Ayuda',
        desc: newItemForm.desc || 'Descripción de la obra solidaria.',
        raisedAmount: newItemForm.raisedAmount || '$0',
        goalAmount: newItemForm.goalAmount || '$5,000',
        percentage: Number(newItemForm.percentage) || 0,
        image: newItemForm.image
      });
      showNotification("¡Nueva Causa agregada a la web!");
    } else if (newItemType === 'retreat') {
      addEvent({
        id: `ret-${Date.now()}`,
        title: newItemForm.title || 'Nuevo Retiro Espiritual',
        desc: newItemForm.desc || 'Descripción del retiro.',
        date: newItemForm.date || 'Octubre 2026',
        schedule: newItemForm.schedule || '9:00 AM',
        cost: newItemForm.cost || '$25 USD',
        category: newItemForm.category || 'Retiro',
        image: newItemForm.image
      });
      showNotification("¡Nuevo Retiro agregado al calendario!");
    } else if (newItemType === 'product') {
      addProduct({
        id: `prod-${Date.now()}`,
        name: newItemForm.name || 'Nuevo Artículo Católico',
        desc: newItemForm.desc || 'Descripción del artículo solidario.',
        price: parseFloat(newItemForm.price) || 20,
        tag: newItemForm.tag || 'Devoción',
        category: 'religious',
        image: newItemForm.image
      });
      showNotification("¡Nuevo Producto agregado a la tienda!");
    }

    setIsNewItemModalOpen(false);
  };

  // Curated Catholic Gallery
  const curatedGallery = [
    { label: "Sagrado Corazón de Jesús", url: "/sagrado-corazon-jesus-lateral.jpg" },
    { label: "Inmaculado Corazón de María", url: "/sagrado-corazon-maria-lateral.jpg" },
    { label: "Logo Oficial Manos Abiertas", url: "/logo-manos-abiertas.png" },
    { label: "Jornada de Alimentos en Nueva York", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Retiro y Sanación Espiritual", url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80" },
    { label: "Grupo Juvenil y Familiar Isha Bethel", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80" },
    { label: "Ayuda a Niños y Familias Vulnerables", url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80" },
    { label: "Vigilia de Oración y Alabanza", url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans overflow-hidden text-slate-100">
      
      {/* ========================================================================= */}
      {/* TOPBAR: Control Header */}
      {/* ========================================================================= */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-md">
        
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>EDITOR VISUAL EN VIVO</span>
          </div>
          <span className="text-xs text-slate-400 hidden xl:inline">
            | Clic sobre cualquier elemento para autoseleccionarlo y editarlo de inmediato
          </span>
        </div>

        {/* Center: Device Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              deviceMode === 'desktop'
                ? 'bg-brand-teal text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Vista Escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Escritorio</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
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
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
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
            onClick={() => showNotification("¡Todos los cambios se guardaron y sincronizaron en tiempo real!")}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar Todo</span>
          </button>

          <button
            onClick={onExit}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white p-2 rounded-xl border border-slate-700 transition-all"
            title="Cerrar Editor Visual"
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
      {/* WORKSPACE: Left Sidebar + Live Canvas + Right Inspector */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR: BLOCK MANAGER & QUICK SECTION JUMP */}
        {isBlockManagerOpen && (
          <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-xl overflow-hidden animate-slide-right">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-gold">
                <Layers className="w-4 h-4" />
                <span>Gestor de Secciones ({sectionOrder.length})</span>
              </div>
              <span className="text-[10px] text-slate-400">Subir / Bajar</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              <p className="text-[11px] text-slate-400 px-1 leading-relaxed">
                Haz clic en una sección para verla y editarla, o usa las flechas para reordenar bloques:
              </p>

              {sectionOrder.map((section, idx) => {
                const isVisible = sectionVisibility[section.id] !== false;
                const isSelected = activeSectionId === section.id && !selectedSubItem;

                return (
                  <div
                    key={section.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-brand-teal/20 border-brand-teal text-white shadow-lg'
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
                        title="Subir bloque"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>

                      {/* Move Down */}
                      <button
                        disabled={idx === sectionOrder.length - 1}
                        onClick={() => moveSection(section.id, 1)}
                        className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20 rounded-lg transition-colors"
                        title="Bajar bloque"
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
                        onClick={() => {
                          setActiveSectionId(section.id);
                          setSelectedSubItem(null);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSelected
                            ? 'bg-brand-teal text-slate-950 font-black'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                        title="Abrir inspector de este bloque"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions at bottom of left sidebar */}
            <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-950">
              <button
                onClick={() => {
                  setNewItemType('mission');
                  setIsNewItemModalOpen(true);
                }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 text-brand-gold"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Nueva Causa / Retiro / Prod</span>
              </button>
            </div>

          </aside>
        )}

        {/* 2. CENTER: 100% REAL LIVE VISUAL CANVAS */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-3 sm:p-6 flex justify-center items-start">
          
          <div 
            className={`transition-all duration-300 bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 ${
              deviceMode === 'desktop'
                ? 'w-full max-w-6xl'
                : deviceMode === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            } ${activeSectionId ? 'border-brand-teal/80 ring-4 ring-brand-teal/20' : 'border-slate-800'}`}
          >
            
            {/* Real Full-Fidelity Components Rendering with Interactive Click-to-Edit Wrappers */}
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
                      <span>{section.name} (Bloque Ocultado)</span>
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
                  onClick={() => {
                    setActiveSectionId(section.id);
                  }}
                  className={`relative group cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-4 ring-brand-teal ring-inset shadow-2xl'
                      : 'hover:outline hover:outline-2 hover:outline-dashed hover:outline-brand-gold'
                  }`}
                >
                  {/* Floating Action Badge on Section Hover */}
                  <div className="absolute top-4 right-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-slate-950/95 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl text-xs font-black shadow-2xl border border-brand-gold/60">
                    <Edit3 className="w-4 h-4 text-brand-gold" />
                    <span>✏️ Clic para Editar: {section.name}</span>
                  </div>

                  {/* ========================================================= */}
                  {/* REAL 100% LIVE COMPONENTS WITH CONTEXT-AWARE ONCLICK */}
                  {/* ========================================================= */}
                  {section.id === 'hero' && (
                    <Hero
                      onOpenDonate={() => {}}
                      onOpenVolunteer={() => {}}
                      onOpenHumanitarian={() => {}}
                      onOpenRetreats={() => {}}
                      onSelectButton={(btn) => {
                        setActiveSectionId('hero');
                        setSelectedSubItem({ type: 'button', id: btn.id, item: btn });
                      }}
                      onSelectElement={() => {
                        setActiveSectionId('hero');
                        setSelectedSubItem(null);
                      }}
                    />
                  )}

                  {section.id === 'stats' && (
                    <StatsGoalsBanner
                      onOpenDonate={() => handleScrollToSection('hero')}
                      onOpenVolunteer={() => handleScrollToSection('volunteer')}
                    />
                  )}

                  {section.id === 'mission' && (
                    <MissionHeart
                      onOpenDonate={() => handleScrollToSection('hero')}
                      onOpenVolunteer={() => handleScrollToSection('volunteer')}
                      onOpenGetHelp={() => handleScrollToSection('volunteer')}
                      onOpenShop={() => handleScrollToSection('shop')}
                      onOpenContact={() => handleScrollToSection('volunteer')}
                      onOpenNewMission={() => handleScrollToSection('programs')}
                      onOpenHumanitarian={() => handleScrollToSection('programs')}
                      onOpenRetreats={() => handleScrollToSection('retreats')}
                      featuredRetreat={events.find(e => e.id === featuredRetreatId) || events[0]}
                      onSelectElement={() => {
                        setActiveSectionId('mission');
                        setSelectedSubItem(null);
                      }}
                    />
                  )}

                  {section.id === 'about' && (
                    <AboutFounder
                      onOpenVolunteer={() => handleScrollToSection('volunteer')}
                      onSelectElement={() => {
                        setActiveSectionId('about');
                        setSelectedSubItem(null);
                      }}
                    />
                  )}

                  {section.id === 'programs' && (
                    <Programs
                      onSelectCauseAndDonate={(causeTitle) => {
                        setActiveSectionId('programs');
                        const found = missions.find(m => m.title === causeTitle);
                        if (found) setSelectedSubItem({ type: 'mission', id: found.id, item: found });
                      }}
                      onOpenNewMission={() => {
                        setNewItemType('mission');
                        setIsNewItemModalOpen(true);
                      }}
                      onOpenMissionDetail={(missionItem) => {
                        setActiveSectionId('programs');
                        setSelectedSubItem({ type: 'mission', id: missionItem.id, item: missionItem });
                      }}
                      onOpenCompletedMissions={() => handleScrollToSection('programs')}
                      onSelectMission={(missionItem) => {
                        setActiveSectionId('programs');
                        setSelectedSubItem({ type: 'mission', id: missionItem.id, item: missionItem });
                      }}
                    />
                  )}

                  {section.id === 'retreats' && (
                    <RetreatsSection
                      onOpenRetreatsModal={(eventId) => {
                        setActiveSectionId('retreats');
                        const found = events.find(e => e.id === eventId);
                        if (found) setSelectedSubItem({ type: 'retreat', id: found.id, item: found });
                      }}
                      featuredRetreatId={featuredRetreatId}
                      onToggleFeaturedRetreat={(eventId) => {
                        setActiveSectionId('retreats');
                        const found = events.find(e => e.id === eventId);
                        if (found) setSelectedSubItem({ type: 'retreat', id: found.id, item: found });
                      }}
                      onSelectEvent={(eventItem) => {
                        setActiveSectionId('retreats');
                        setSelectedSubItem({ type: 'retreat', id: eventItem.id, item: eventItem });
                      }}
                    />
                  )}

                  {section.id === 'shop' && (
                    <ShopSection
                      onAddToCart={(prod) => {
                        setActiveSectionId('shop');
                        setSelectedSubItem({ type: 'product', id: prod.id, item: prod });
                      }}
                      onOpenCart={() => handleScrollToSection('shop')}
                      onBuyNow={(prod) => {
                        setActiveSectionId('shop');
                        setSelectedSubItem({ type: 'product', id: prod.id, item: prod });
                      }}
                      onSelectProduct={(prodItem) => {
                        setActiveSectionId('shop');
                        setSelectedSubItem({ type: 'product', id: prodItem.id, item: prodItem });
                      }}
                    />
                  )}

                  {section.id === 'volunteer' && (
                    <VolunteerSection
                      onOpenVolunteer={() => handleScrollToSection('volunteer')}
                      onOpenReviewModal={() => handleScrollToSection('volunteer')}
                      customReviews={approvedReviews}
                    />
                  )}

                  {section.id === 'footer' && (
                    <Footer
                      onOpenDonate={() => handleScrollToSection('hero')}
                      onOpenVolunteer={() => handleScrollToSection('volunteer')}
                      onOpenAdmin={() => {}}
                    />
                  )}

                </div>
              );
            })}

          </div>

        </main>

        {/* 3. RIGHT SIDEBAR: SPACIOUS & RESPONSIVE CONTEXT-AWARE INSPECTOR */}
        {activeSectionId && (
          <aside className="w-full max-w-[460px] sm:w-[460px] bg-slate-900 border-l border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-2xl overflow-hidden animate-slide-left">
            
            {/* Inspector Header with Back to Section Button if sub-item is selected */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <Sliders className="w-4 h-4 text-brand-teal flex-shrink-0" />
                <span className="text-xs font-black uppercase text-white truncate">
                  {selectedSubItem ? (
                    <span className="text-brand-gold">
                      Editando: {selectedSubItem.type === 'mission' ? 'Causa' : selectedSubItem.type === 'retreat' ? 'Retiro' : selectedSubItem.type === 'product' ? 'Producto' : 'Botón'} Seleccionado
                    </span>
                  ) : (
                    sectionOrder.find(s => s.id === activeSectionId)?.name
                  )}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {selectedSubItem && (
                  <button
                    onClick={() => setSelectedSubItem(null)}
                    className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-300 font-bold"
                  >
                    Ver Sección
                  </button>
                )}
                <button
                  onClick={() => {
                    setActiveSectionId(null);
                    setSelectedSubItem(null);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Inspector Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">

              {/* ========================================================================= */}
              {/* SUB-ITEM FOCUS: SPECIFIC BUTTON CLICKED */}
              {/* ========================================================================= */}
              {selectedSubItem?.type === 'button' && (() => {
                const heroButtons = hero?.buttons || [
                  { id: 'btn-donate', label: 'Hacer una Donación', variant: 'primary', shape: 'pill', icon: 'heart', action: 'donate' },
                  { id: 'btn-volunteer', label: 'Únete como Voluntario', variant: 'secondary', shape: 'rounded', icon: 'users', action: 'volunteer' },
                  { id: 'btn-causes', label: 'Ver Nuestras Misiones', variant: 'gold', shape: 'pill', icon: 'arrow', action: 'causes' }
                ];
                const currentBtn = heroButtons.find(b => b.id === selectedSubItem.id) || selectedSubItem.item || heroButtons[0];
                const btnIdx = heroButtons.findIndex(b => b.id === currentBtn?.id);

                const updateSingleButton = (updates) => {
                  const updated = heroButtons.map((b, i) => i === (btnIdx !== -1 ? btnIdx : 0) ? { ...b, ...updates } : b);
                  updateHero({ buttons: updated });
                };

                return (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-brand-teal/20 border border-brand-teal/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-brand-teal font-black text-xs uppercase">
                        <Sparkles className="w-4 h-4 text-brand-teal" />
                        <span>Editando Botón Seleccionado</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Texto / Etiqueta del Botón</label>
                      <input
                        type="text"
                        value={currentBtn?.label || ''}
                        onChange={(e) => updateSingleButton({ label: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Estilo / Color</label>
                        <select
                          value={currentBtn?.variant || 'primary'}
                          onChange={(e) => updateSingleButton({ variant: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                        >
                          <option value="primary">Rojo Coral (Donación)</option>
                          <option value="secondary">Gris Carbón / Oscuro</option>
                          <option value="gold">Dorado Brillante</option>
                          <option value="teal">Verde Azulado / Teal</option>
                          <option value="outline-white">Borde Blanco</option>
                          <option value="outline-gold">Borde Dorado</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Forma</label>
                        <select
                          value={currentBtn?.shape || 'rounded'}
                          onChange={(e) => updateSingleButton({ shape: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                        >
                          <option value="pill">Pastilla Redonda</option>
                          <option value="rounded">Bordes Suaves</option>
                          <option value="square">Rectangular</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Acción al Clic</label>
                        <select
                          value={currentBtn?.action || 'donate'}
                          onChange={(e) => updateSingleButton({ action: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                        >
                          <option value="donate">Abrir Donaciones</option>
                          <option value="volunteer">Abrir Voluntariado</option>
                          <option value="causes">Ir a Misiones</option>
                          <option value="retreats">Ir a Retiros</option>
                          <option value="custom">Enlace Web Personalizado</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Icono</label>
                        <select
                          value={currentBtn?.icon || 'heart'}
                          onChange={(e) => updateSingleButton({ icon: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                        >
                          <option value="heart">Corazón ❤️</option>
                          <option value="users">Personas 👥</option>
                          <option value="arrow">Flecha ➔</option>
                          <option value="calendar">Calendario 📅</option>
                          <option value="shop">Bolsa 🛍️</option>
                          <option value="sparkles">Destello ✨</option>
                        </select>
                      </div>
                    </div>

                    {currentBtn?.action === 'custom' && (
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300 block">Enlace URL (https://...)</label>
                        <input
                          type="text"
                          value={currentBtn?.url || ''}
                          onChange={(e) => updateSingleButton({ url: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ========================================================================= */}
              {/* SUB-ITEM FOCUS: SPECIFIC MISSION CARD CLICKED */}
              {/* ========================================================================= */}
              {selectedSubItem?.type === 'mission' && (() => {
                const currentMission = missions.find(m => m.id === selectedSubItem.id) || selectedSubItem.item || missions[0];
                const isFeatured = featuredMissionId === currentMission.id;

                return (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-gold/20 via-brand-navy to-slate-900 border border-brand-gold/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase">
                        <Star className="w-4 h-4 fill-brand-gold" />
                        <span>Causa Seleccionada</span>
                      </div>
                      <button
                        onClick={() => setFeaturedMission(currentMission.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                          isFeatured
                            ? 'bg-brand-gold text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-brand-gold hover:text-slate-950'
                        }`}
                      >
                        {isFeatured ? '⭐ Destacada' : 'Hacer Destacada'}
                      </button>
                    </div>

                    {/* Image manager for this mission */}
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                      <img src={currentMission.image} alt={currentMission.title} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
                      <div className="flex-1 space-y-1">
                        <span className="text-xs font-bold text-white block truncate">{currentMission.title}</span>
                        <button
                          onClick={() => setImageModalTarget({ section: 'missionItem', field: 'image', itemId: currentMission.id })}
                          className="text-[11px] font-bold text-brand-teal hover:underline flex items-center gap-1"
                        >
                          <Wand2 className="w-3 h-3" />
                          <span>Cambiar Imagen / IA</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Título de la Causa</label>
                      <input
                        type="text"
                        value={currentMission.title || ''}
                        onChange={(e) => updateMission(currentMission.id, { title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Descripción del Caso</label>
                      <textarea
                        rows={3}
                        value={currentMission.desc || ''}
                        onChange={(e) => updateMission(currentMission.id, { desc: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Recaudado</label>
                        <input
                          type="text"
                          value={currentMission.raisedAmount || ''}
                          onChange={(e) => updateMission(currentMission.id, { raisedAmount: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Meta ($)</label>
                        <input
                          type="text"
                          value={currentMission.goalAmount || ''}
                          onChange={(e) => updateMission(currentMission.id, { goalAmount: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">% Logro</label>
                        <input
                          type="number"
                          value={currentMission.percentage || 0}
                          onChange={(e) => updateMission(currentMission.id, { percentage: Number(e.target.value) })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-emerald-400 font-bold"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar la causa "${currentMission.title}"?`)) {
                            deleteMission(currentMission.id);
                            setSelectedSubItem(null);
                            showNotification("Causa eliminada");
                          }
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar Causa</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* ========================================================================= */}
              {/* SUB-ITEM FOCUS: SPECIFIC RETREAT / EVENT CLICKED */}
              {/* ========================================================================= */}
              {selectedSubItem?.type === 'retreat' && (() => {
                const currentEvent = events.find(e => e.id === selectedSubItem.id) || selectedSubItem.item || events[0];
                const isFeatured = featuredRetreatId === currentEvent.id;

                return (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-gold/20 via-brand-navy to-slate-900 border border-brand-gold/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-brand-gold font-black text-xs uppercase">
                        <Calendar className="w-4 h-4 text-brand-gold" />
                        <span>Retiro Seleccionado</span>
                      </div>
                      <button
                        onClick={() => setFeaturedRetreat(currentEvent.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                          isFeatured
                            ? 'bg-brand-gold text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-brand-gold hover:text-slate-950'
                        }`}
                      >
                        {isFeatured ? '⭐ Destacado' : 'Fijar Destacado'}
                      </button>
                    </div>

                    {/* Image manager for this event */}
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                      <img src={currentEvent.image} alt={currentEvent.title} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
                      <div className="flex-1 space-y-1">
                        <span className="text-xs font-bold text-white block truncate">{currentEvent.title}</span>
                        <button
                          onClick={() => setImageModalTarget({ section: 'retreatItem', field: 'image', itemId: currentEvent.id })}
                          className="text-[11px] font-bold text-brand-teal hover:underline flex items-center gap-1"
                        >
                          <Wand2 className="w-3 h-3" />
                          <span>Cambiar Imagen / IA</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Título de la Actividad</label>
                      <input
                        type="text"
                        value={currentEvent.title || ''}
                        onChange={(e) => updateEvent(currentEvent.id, { title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Fecha</label>
                        <input
                          type="text"
                          value={currentEvent.date || ''}
                          onChange={(e) => updateEvent(currentEvent.id, { date: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Horario</label>
                        <input
                          type="text"
                          value={currentEvent.schedule || ''}
                          onChange={(e) => updateEvent(currentEvent.id, { schedule: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Aporte / Donación</label>
                        <input
                          type="text"
                          value={currentEvent.cost || ''}
                          onChange={(e) => updateEvent(currentEvent.id, { cost: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Categoría</label>
                        <input
                          type="text"
                          value={currentEvent.category || ''}
                          onChange={(e) => updateEvent(currentEvent.id, { category: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Enlace de Registro / Boletos</label>
                      <input
                        type="text"
                        value={currentEvent.registrationLink || ''}
                        onChange={(e) => updateEvent(currentEvent.id, { registrationLink: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px]"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar el evento "${currentEvent.title}"?`)) {
                            deleteEvent(currentEvent.id);
                            setSelectedSubItem(null);
                            showNotification("Retiro eliminado");
                          }
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar Retiro</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* ========================================================================= */}
              {/* SUB-ITEM FOCUS: SPECIFIC PRODUCT CLICKED */}
              {/* ========================================================================= */}
              {selectedSubItem?.type === 'product' && (() => {
                const currentProduct = products.find(p => p.id === selectedSubItem.id) || selectedSubItem.item || products[0];
                const isFeatured = (featuredProductIds || []).includes(currentProduct.id);

                return (
                  <div className="space-y-5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase">
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>Producto Seleccionado</span>
                      </div>
                      <button
                        onClick={() => toggleFeaturedProduct(currentProduct.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                          isFeatured
                            ? 'bg-amber-400 text-slate-950 shadow-md'
                            : 'bg-slate-800 text-slate-300 hover:bg-amber-400 hover:text-slate-950'
                        }`}
                      >
                        {isFeatured ? '🔥 Más Vendido' : 'Marcar Top Ventas'}
                      </button>
                    </div>

                    {/* Image manager for this product */}
                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
                      <img src={currentProduct.image} alt={currentProduct.name} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
                      <div className="flex-1 space-y-1">
                        <span className="text-xs font-bold text-white block truncate">{currentProduct.name}</span>
                        <button
                          onClick={() => setImageModalTarget({ section: 'productItem', field: 'image', itemId: currentProduct.id })}
                          className="text-[11px] font-bold text-brand-teal hover:underline flex items-center gap-1"
                        >
                          <Wand2 className="w-3 h-3" />
                          <span>Cambiar Foto / IA</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Nombre del Artículo</label>
                      <input
                        type="text"
                        value={currentProduct.name || ''}
                        onChange={(e) => updateProduct(currentProduct.id, { name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Precio ($ USD)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={currentProduct.price || 0}
                          onChange={(e) => updateProduct(currentProduct.id, { price: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 block uppercase">Etiqueta / Badge</label>
                        <input
                          type="text"
                          value={currentProduct.tag || ''}
                          onChange={(e) => updateProduct(currentProduct.id, { tag: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-300 block">Descripción Corta</label>
                      <textarea
                        rows={3}
                        value={currentProduct.desc || ''}
                        onChange={(e) => updateProduct(currentProduct.id, { desc: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar el producto "${currentProduct.name}"?`)) {
                            deleteProduct(currentProduct.id);
                            setSelectedSubItem(null);
                            showNotification("Producto eliminado");
                          }
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar Producto</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* ========================================================================= */}
              {/* SECTION LEVEL INSPECTOR (Default when no specific card is focused) */}
              {/* ========================================================================= */}
              {!selectedSubItem && activeSectionId === 'hero' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Photo & Logo Manager */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Logo / Tarjeta de Portada</span>
                      </span>
                      <button
                        onClick={() => setImageModalTarget({ section: 'hero', field: 'logoCardImage' })}
                        className="text-[11px] font-black text-brand-teal hover:underline flex items-center gap-1"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Cambiar / IA</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        src={hero?.logoCardImage || "/logo-manos-abiertas.png"}
                        alt="Logo Hero"
                        className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-slate-700"
                      />
                      <div className="text-[11px] text-slate-400 space-y-1 flex-1">
                        <button
                          onClick={() => setImageModalTarget({ section: 'hero', field: 'logoCardImage' })}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold text-xs"
                        >
                          Reemplazar Imagen
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Text */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Frase Manuscrita (Destacada)</label>
                    <input
                      type="text"
                      value={hero?.handwritten || ''}
                      onChange={(e) => updateHero({ handwritten: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <TypographyToolbar
                      label="Estilo de la Frase Manuscrita"
                      target="handwritten"
                      styles={hero?.styles || {}}
                      onChange={(newStyles) => updateHero({ styles: newStyles })}
                      previewText={hero?.handwritten}
                    />
                  </div>

                  {/* Title & Citation */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Cita Bíblica / Lema</label>
                    <textarea
                      rows={2}
                      value={hero?.title || ''}
                      onChange={(e) => updateHero({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <TypographyToolbar
                      label="Estilo del Lema / Cita"
                      target="title"
                      styles={hero?.styles || {}}
                      onChange={(newStyles) => updateHero({ styles: newStyles })}
                      previewText={hero?.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Referencia (Ej: — 1 Pedro 4, 10)</label>
                    <input
                      type="text"
                      value={hero?.citation || ''}
                      onChange={(e) => updateHero({ citation: e.target.value })}
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

              {/* STATS GOALS BANNER */}
              {!selectedSubItem && activeSectionId === 'stats' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-brand-teal" />
                      <span>Barra de Impacto y Logros Comunitarios</span>
                    </span>

                    <div className="space-y-3">
                      <div className="p-3 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Familias Alimentadas</span>
                        <input
                          type="text"
                          value={hero?.stat1 || "1,200+"}
                          onChange={(e) => updateHero({ stat1: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Retiros y Jornadas Realizadas</span>
                        <input
                          type="text"
                          value={hero?.stat2 || "24+"}
                          onChange={(e) => updateHero({ stat2: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Voluntarios Activos en NY</span>
                        <input
                          type="text"
                          value={hero?.stat3 || "80+"}
                          onChange={(e) => updateHero({ stat3: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-bold"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Meta Anual de Recaudación</span>
                        <input
                          type="text"
                          value={hero?.stat4 || "85% Logrado"}
                          onChange={(e) => updateHero({ stat4: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MISSION HEART DEFAULT */}
              {!selectedSubItem && activeSectionId === 'mission' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Fotos de Burbujas Interactivas</span>
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-2 bg-slate-900 rounded-xl space-y-1.5 text-center">
                        <span className="text-[10px] text-slate-400 font-bold block">Ayuda</span>
                        <img src={missionHeart?.bubble1Image} alt="Ayuda" className="w-12 h-12 rounded-full object-cover mx-auto" />
                        <button
                          onClick={() => setImageModalTarget({ section: 'missionHeart', field: 'bubble1Image' })}
                          className="text-[10px] font-bold text-brand-teal hover:underline"
                        >
                          Cambiar Foto
                        </button>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-xl space-y-1.5 text-center">
                        <span className="text-[10px] text-slate-400 font-bold block">Isha Bethel</span>
                        <img src={missionHeart?.bubbleIshaImage} alt="Isha" className="w-12 h-12 rounded-full object-cover mx-auto" />
                        <button
                          onClick={() => setImageModalTarget({ section: 'missionHeart', field: 'bubbleIshaImage' })}
                          className="text-[10px] font-bold text-brand-teal hover:underline"
                        >
                          Cambiar Foto
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de la Misión</label>
                    <input
                      type="text"
                      value={missionHeart?.title || ''}
                      onChange={(e) => updateMissionHeart({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <TypographyToolbar
                      label="Estilo del Título"
                      target="title"
                      styles={missionHeart?.styles || {}}
                      onChange={(newStyles) => updateMissionHeart({ styles: newStyles })}
                      previewText={missionHeart?.title}
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
                </div>
              )}

              {/* PROGRAMS DEFAULT */}
              {!selectedSubItem && activeSectionId === 'programs' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de Misiones</label>
                    <input
                      type="text"
                      value={programsSection?.title || ''}
                      onChange={(e) => updateProgramsHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <TypographyToolbar
                      label="Estilo del Título de Misiones"
                      target="title"
                      styles={programsSection?.styles || {}}
                      onChange={(newStyles) => updateProgramsHeader({ styles: newStyles })}
                      previewText={programsSection?.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">Causas Activas ({missions.length})</label>
                      <button
                        onClick={() => {
                          setNewItemType('mission');
                          setIsNewItemModalOpen(true);
                        }}
                        className="text-[11px] font-black text-brand-gold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ Nueva Causa</span>
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {missions.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedSubItem({ type: 'mission', id: m.id, item: m })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 hover:border-brand-teal rounded-xl text-left flex items-center justify-between text-xs transition-all"
                        >
                          <span className="truncate flex-1 font-bold text-white">{m.title}</span>
                          <span className="text-emerald-400 font-bold ml-2">{m.percentage}%</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* RETREATS DEFAULT */}
              {!selectedSubItem && activeSectionId === 'retreats' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título del Calendario</label>
                    <input
                      type="text"
                      value={retreatsModal?.title || ''}
                      onChange={(e) => updateRetreatsHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">Actividades ({events.length})</label>
                      <button
                        onClick={() => {
                          setNewItemType('retreat');
                          setIsNewItemModalOpen(true);
                        }}
                        className="text-[11px] font-black text-brand-gold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ Nuevo Retiro</span>
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {events.map((ev) => (
                        <button
                          key={ev.id}
                          onClick={() => setSelectedSubItem({ type: 'retreat', id: ev.id, item: ev })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 hover:border-brand-gold rounded-xl text-left flex items-center justify-between text-xs transition-all"
                        >
                          <span className="truncate flex-1 font-bold text-white">{ev.title}</span>
                          <span className="text-amber-300 text-[10px] ml-2">{ev.date}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SHOP DEFAULT */}
              {!selectedSubItem && activeSectionId === 'shop' && (
                <div className="space-y-6 animate-fadeIn">
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
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-300">Artículos ({products.length})</label>
                      <button
                        onClick={() => {
                          setNewItemType('product');
                          setIsNewItemModalOpen(true);
                        }}
                        className="text-[11px] font-black text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>+ Nuevo Producto</span>
                      </button>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedSubItem({ type: 'product', id: p.id, item: p })}
                          className="w-full p-2.5 bg-slate-950 border border-slate-800 hover:border-amber-400 rounded-xl text-left flex items-center justify-between text-xs transition-all"
                        >
                          <span className="truncate flex-1 font-bold text-white">{p.name}</span>
                          <span className="text-amber-300 font-bold ml-2">${p.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ABOUT DEFAULT */}
              {!selectedSubItem && activeSectionId === 'about' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Collage Photos Management */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Fotos del Collage del Centro y Comunidad</span>
                    </span>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block truncate">Principal</span>
                        <img src={about?.collageImg1 || "/retreats/seminario-espiritu.jpg"} alt="Foto 1" className="w-full h-14 object-cover rounded-lg" />
                        <button
                          onClick={() => setImageModalTarget({ section: 'about', field: 'collageImg1' })}
                          className="text-[10px] font-bold text-brand-teal hover:underline block w-full"
                        >
                          Cambiar
                        </button>
                      </div>

                      <div className="p-2 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block truncate">Isha Bethel</span>
                        <img src={about?.collageImg2 || "/retreats/retiro-mujeres.jpg"} alt="Foto 2" className="w-full h-14 object-cover rounded-lg" />
                        <button
                          onClick={() => setImageModalTarget({ section: 'about', field: 'collageImg2' })}
                          className="text-[10px] font-bold text-brand-teal hover:underline block w-full"
                        >
                          Cambiar
                        </button>
                      </div>

                      <div className="p-2 bg-slate-900 rounded-xl space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block truncate">Comedores</span>
                        <img src={about?.collageImg3 || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"} alt="Foto 3" className="w-full h-14 object-cover rounded-lg" />
                        <button
                          onClick={() => setImageModalTarget({ section: 'about', field: 'collageImg3' })}
                          className="text-[10px] font-bold text-brand-teal hover:underline block w-full"
                        >
                          Cambiar
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título del Centro</label>
                    <input
                      type="text"
                      value={about?.title || ''}
                      onChange={(e) => updateAbout({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <TypographyToolbar
                      label="Estilo del Título"
                      target="title"
                      styles={about?.styles || {}}
                      onChange={(newStyles) => updateAbout({ styles: newStyles })}
                      previewText={about?.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Texto de Introducción / Historia</label>
                    <textarea
                      rows={3}
                      value={about?.paragraph1 || ''}
                      onChange={(e) => updateAbout({ paragraph1: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Dirección Bronx</label>
                      <input
                        type="text"
                        value={about?.address || '826 E. 166th St., Bronx, NY'}
                        onChange={(e) => updateAbout({ address: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Teléfono</label>
                      <input
                        type="text"
                        value={about?.phone || '(718) 378-1734'}
                        onChange={(e) => updateAbout({ phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* VOLUNTEER DEFAULT */}
              {!selectedSubItem && activeSectionId === 'volunteer' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Título de Voluntariado</label>
                    <input
                      type="text"
                      value={volunteerSection?.title || ''}
                      onChange={(e) => updateVolunteerHeader({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <TypographyToolbar
                      label="Estilo del Título"
                      target="title"
                      styles={volunteerSection?.styles || {}}
                      onChange={(newStyles) => updateVolunteerHeader({ styles: newStyles })}
                      previewText={volunteerSection?.title}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Descripción</label>
                    <textarea
                      rows={3}
                      value={volunteerSection?.desc || ''}
                      onChange={(e) => updateVolunteerHeader({ desc: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  {/* Testimonies Moderation */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Gestión de Reseñas y Testimonios ({approvedReviews.length} Aprobados)</span>
                    </span>

                    {pendingReviews && pendingReviews.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[10px] text-amber-400 font-bold uppercase block">
                          Pendientes de Aprobación ({pendingReviews.length}):
                        </span>
                        {pendingReviews.map((rev) => (
                          <div key={rev.id} className="p-2.5 bg-slate-900 rounded-xl border border-amber-500/40 text-xs space-y-1">
                            <div className="flex justify-between font-bold text-white">
                              <span>{rev.name}</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => approveReview(rev.id)}
                                  className="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-black rounded"
                                >
                                  Aprobar
                                </button>
                                <button
                                  onClick={() => deleteReview(rev.id)}
                                  className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                            <p className="text-slate-300 text-[11px]">"{rev.comment}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* FOOTER DEFAULT */}
              {!selectedSubItem && activeSectionId === 'footer' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">Derechos de Autor (Footer)</label>
                    <input
                      type="text"
                      value={footer?.rights || ''}
                      onChange={(e) => updateFooter({ rights: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Contacto Oficial & Zelle</span>
                    </span>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase block">Correo para Donaciones Zelle</label>
                      <input
                        type="email"
                        value={settings?.donationsEmail || 'donaciones@fundacionmanosabiertas.org'}
                        onChange={(e) => updateSettings({ donationsEmail: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Inspector Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
              <button
                onClick={() => showNotification("¡Cambios aplicados y guardados con éxito en tiempo real!")}
                className="w-full py-2.5 bg-brand-teal hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Aplicar y Guardar Cambios
              </button>
            </div>

          </aside>
        )}

      </div>

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW ITEM (Mission, Retreat or Product) */}
      {/* ========================================================================= */}
      {isNewItemModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-brand-gold font-black text-sm uppercase">
                <PlusCircle className="w-5 h-5" />
                <span>Agregar Nuevo Elemento a la Web</span>
              </div>
              <button
                onClick={() => setIsNewItemModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Type Switcher */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setNewItemType('mission')}
                className={`py-2 rounded-xl font-bold transition-all ${
                  newItemType === 'mission' ? 'bg-brand-teal text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Causa / Misión
              </button>
              <button
                type="button"
                onClick={() => setNewItemType('retreat')}
                className={`py-2 rounded-xl font-bold transition-all ${
                  newItemType === 'retreat' ? 'bg-brand-gold text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Retiro / Evento
              </button>
              <button
                type="button"
                onClick={() => setNewItemType('product')}
                className={`py-2 rounded-xl font-bold transition-all ${
                  newItemType === 'product' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Producto Tienda
              </button>
            </div>

            <form onSubmit={handleCreateNewItem} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  {newItemType === 'product' ? 'Nombre del Producto' : 'Título'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={newItemType === 'product' ? 'Ej: Rosario de San Benito' : 'Ej: Jornada de Alimentación Navideña'}
                  value={newItemType === 'product' ? newItemForm.name : newItemForm.title}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, [newItemType === 'product' ? 'name' : 'title']: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">Descripción</label>
                <textarea
                  rows={2}
                  required
                  value={newItemForm.desc}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, desc: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              {newItemType === 'mission' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Meta en Dólares ($)</label>
                    <input
                      type="text"
                      value={newItemForm.goalAmount}
                      onChange={(e) => setNewItemForm(prev => ({ ...prev, goalAmount: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Recaudado Inicial</label>
                    <input
                      type="text"
                      value={newItemForm.raisedAmount}
                      onChange={(e) => setNewItemForm(prev => ({ ...prev, raisedAmount: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
                    />
                  </div>
                </div>
              )}

              {newItemType === 'retreat' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Fecha</label>
                    <input
                      type="text"
                      value={newItemForm.date}
                      onChange={(e) => setNewItemForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Aporte Sugerido</label>
                    <input
                      type="text"
                      value={newItemForm.cost}
                      onChange={(e) => setNewItemForm(prev => ({ ...prev, cost: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {newItemType === 'product' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Precio ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newItemForm.price}
                      onChange={(e) => setNewItemForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Etiqueta / Badge</label>
                    <input
                      type="text"
                      value={newItemForm.tag}
                      onChange={(e) => setNewItemForm(prev => ({ ...prev, tag: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">URL de Imagen</label>
                <input
                  type="text"
                  value={newItemForm.image}
                  onChange={(e) => setNewItemForm(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewItemModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-xs font-black text-slate-950 uppercase tracking-wider shadow-lg"
                >
                  Guardar y Publicar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: IMAGE HUB (Upload, AI Generator & Curated Catholic Library) */}
      {/* ========================================================================= */}
      {imageModalTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-brand-gold font-black text-sm uppercase">
                <ImageIcon className="w-5 h-5" />
                <span>Gestor Inteligente de Imágenes</span>
              </div>
              <button
                onClick={() => setImageModalTarget(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab selection */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 gap-1 text-xs">
              <button
                onClick={() => setImageModalTab('upload')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  imageModalTab === 'upload' ? 'bg-brand-teal text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Subir Archivo</span>
              </button>

              <button
                onClick={() => setImageModalTab('ai')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  imageModalTab === 'ai' ? 'bg-brand-gold text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Generar con IA</span>
              </button>

              <button
                onClick={() => setImageModalTab('gallery')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  imageModalTab === 'gallery' ? 'bg-brand-coral text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Galería</span>
              </button>

              <button
                onClick={() => setImageModalTab('url')}
                className={`flex-1 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
                  imageModalTab === 'url' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Pegar URL</span>
              </button>
            </div>

            {/* Tab 1: Upload */}
            {imageModalTab === 'upload' && (
              <div className="space-y-4 text-center py-6 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-950/60 p-6">
                <Upload className="w-10 h-10 text-brand-teal mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white">Selecciona una imagen de tu computadora</h4>
                  <p className="text-xs text-slate-400">Soporta JPG, PNG, WEBP de alta resolución</p>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-brand-teal hover:bg-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  Explorar Archivos...
                </button>
              </div>
            )}

            {/* Tab 2: AI Generator */}
            {imageModalTab === 'ai' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-200 block">Describe la imagen que deseas generar:</label>
                  <p className="text-[11px] text-slate-400">Ejemplo: "Sagrado corazón de Jesús", "Retiro de oración de jóvenes", "Entrega de comida caliente en Bronx"</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe aquí tu imagen católica..."
                    value={aiPromptInput}
                    onChange={(e) => setAiPromptInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    disabled={isGeneratingAi || !aiPromptInput.trim()}
                    onClick={handleGenerateAiImage}
                    className="px-4 py-2 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-30 flex items-center gap-1.5"
                  >
                    {isGeneratingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                    <span>Generar</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Curated Gallery */}
            {imageModalTab === 'gallery' && (
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                {curatedGallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => applyImageChange(item.url)}
                    className="group cursor-pointer rounded-xl overflow-hidden border border-slate-800 bg-slate-950 hover:border-brand-gold transition-all"
                  >
                    <img src={item.url} alt={item.label} className="w-full h-20 object-cover group-hover:scale-105 transition-transform" />
                    <span className="block p-2 text-[10px] font-bold text-slate-300 truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 4: Direct URL */}
            {imageModalTab === 'url' && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-200 block">Pega la URL de la imagen:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    disabled={!imageUrlInput.trim()}
                    onClick={() => applyImageChange(imageUrlInput)}
                    className="px-4 py-2 bg-brand-teal text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-30"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
