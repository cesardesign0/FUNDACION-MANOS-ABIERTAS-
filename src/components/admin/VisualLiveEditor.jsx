import React, { useState, useRef, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { useLanguage } from '../../context/LanguageContext';
import { useAdminData } from '../../context/AdminDataContext';

// New modular components
import { SortableSectionWrapper } from './SortableSectionWrapper';
import { FloatingToolbar } from './FloatingToolbar';
import { EditorInspector } from './EditorInspector';
import { EditorProvider } from '../../context/EditorContext';

// Real live page components
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
  Eye, EyeOff, ArrowUp, ArrowDown, Layers, Smartphone, Tablet, Monitor,
  Sparkles, Edit3, X, Save, Check, Plus, Trash2, Star, Image as ImageIcon,
  Settings, ChevronRight, ExternalLink, RotateCcw, Palette, Sliders,
  Flame, Target, Calendar, ShoppingBag, Heart, Upload, Link as LinkIcon,
  Wand2, CheckCircle2, RefreshCw, FolderOpen, DollarSign, Clock, MapPin,
  Tag, Mail, Phone, LogOut, List, Layout, PlusCircle, AlertCircle, Quote,
  CheckCircle, Users, ShieldCheck, GripVertical, ChevronDown, ChevronUp as ChevronUpIcon,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// NEW ITEM FORM — compact creation modal for Mission / Retreat / Product
// ─────────────────────────────────────────────────────────────────────────────
const NewItemModal = ({ type, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: '', name: '', desc: '', price: 25, tag: 'Solidario',
    raisedAmount: '$0', goalAmount: '$5,000', percentage: 0,
    date: 'Próximamente 2026', schedule: '9:00 AM - 5:00 PM', cost: '$25 USD',
    category: 'Jornada',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80'
  });
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const fi = (label, key, type = 'text') => (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-slate-400">{label}</label>
      <input type={type} value={form[key]} onChange={e => upd(key, e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full mx-4 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h3 className="font-black text-white text-sm flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-brand-gold" />
            {type === 'mission' ? 'Nueva Causa de Ayuda' : type === 'retreat' ? 'Nuevo Retiro / Actividad' : 'Nuevo Artículo de Tienda'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        {type === 'mission' && (
          <div className="space-y-3">
            {fi('Título de la Causa', 'title')}
            {fi('Descripción', 'desc')}
            <div className="grid grid-cols-3 gap-2">
              {fi('Recaudado', 'raisedAmount')}
              {fi('Meta ($)', 'goalAmount')}
              {fi('% Logro', 'percentage', 'number')}
            </div>
          </div>
        )}
        {type === 'retreat' && (
          <div className="space-y-3">
            {fi('Nombre del Retiro / Actividad', 'title')}
            {fi('Descripción', 'desc')}
            <div className="grid grid-cols-2 gap-2">
              {fi('Fecha', 'date')}
              {fi('Horario', 'schedule')}
              {fi('Aporte / Costo', 'cost')}
              {fi('Categoría', 'category')}
            </div>
          </div>
        )}
        {type === 'product' && (
          <div className="space-y-3">
            {fi('Nombre del Artículo', 'name')}
            {fi('Descripción', 'desc')}
            <div className="grid grid-cols-2 gap-2">
              {fi('Precio (USD)', 'price', 'number')}
              {fi('Etiqueta / Badge', 'tag')}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-400">URL de Imagen (opcional)</label>
          <input type="text" value={form.image} onChange={e => upd('image', e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" placeholder="https://..." />
        </div>

        <button onClick={() => onSubmit(form)}
          className="w-full py-3 bg-gradient-to-r from-brand-coral to-brand-gold text-slate-950 font-black text-sm rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Check className="w-4 h-4" /> Crear y Publicar en la Web
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN: VisualLiveEditor — Wix/Storyblok-style unified editor
// ─────────────────────────────────────────────────────────────────────────────
export const VisualLiveEditor = ({ onExit }) => {
  const { language } = useLanguage();
  const {
    sectionOrder, sectionVisibility,
    updateSectionOrder, moveSection, toggleSectionVisibility,
    featuredMissionId, setFeaturedMission,
    featuredRetreatId, setFeaturedRetreat,
    featuredProductIds, toggleFeaturedProduct,
    hero, updateHero,
    about, updateAbout,
    programsSection, updateProgramsHeader,
    retreatsModal, updateRetreatsHeader,
    shopHeader, updateShopHeader,
    missionHeart, updateMissionHeart,
    volunteerSection, updateVolunteerHeader,
    footer, updateFooter,
    missions, events, products, reviews,
    approvedReviews, pendingReviews,
    settings, updateSettings,
    addEvent, updateEvent, deleteEvent,
    addProduct, updateProduct, deleteProduct,
    addMission, updateMission, deleteMission,
    approveReview, deleteReview,
    resetToDefaults,
  } = useAdminData();

  // ── UI State ──────────────────────────────────────────────────────────────
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [selectedElement, setSelectedElement] = useState(null); // { type, id, label, data }
  const [isBlockManagerOpen, setIsBlockManagerOpen] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isDraggingSection, setIsDraggingSection] = useState(false);
  const [newItemModal, setNewItemModal] = useState(null); // null | 'mission' | 'retreat' | 'product'
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  const canvasRef = useRef(null);

  // ── dnd-kit sensors ───────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // Need to drag at least 8px to activate
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const showNotification = useCallback((msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleScrollToSection = useCallback((sectionId) => {
    setActiveSectionId(sectionId);
    setSelectedElement(null);
    const el = document.getElementById(`editor-section-${sectionId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const selectSection = useCallback((sectionId) => {
    setActiveSectionId(sectionId);
    setSelectedElement(null);
    setIsInspectorOpen(true);
  }, []);

  const selectSubItem = useCallback((type, id, label, data) => {
    setSelectedElement({ type, id, label, data });
    setIsInspectorOpen(true);
  }, []);

  // ── Drag & Drop handlers ─────────────────────────────────────────────────
  const handleDragStart = () => setIsDraggingSection(true);

  const handleDragEnd = (event) => {
    setIsDraggingSection(false);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sectionOrder.findIndex(s => s.id === active.id);
    const newIndex = sectionOrder.findIndex(s => s.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(sectionOrder, oldIndex, newIndex);
      updateSectionOrder(reordered);
      showNotification(`Sección "${sectionOrder[oldIndex]?.name}" movida a la posición ${newIndex + 1}`);
    }
  };

  // ── New item creation ─────────────────────────────────────────────────────
  const openNewItemModal = (type) => setNewItemModal(type);

  const handleCreateItem = (form) => {
    if (newItemModal === 'mission') {
      addMission({
        id: Date.now(), title: form.title || 'Nueva Causa',
        desc: form.desc || '', raisedAmount: form.raisedAmount,
        goalAmount: form.goalAmount, percentage: Number(form.percentage) || 0,
        image: form.image,
      });
      showNotification('¡Nueva Causa publicada en la web!');
    } else if (newItemModal === 'retreat') {
      addEvent({
        id: `ret-${Date.now()}`, title: form.title || 'Nuevo Retiro',
        desc: form.desc || '', date: form.date, schedule: form.schedule,
        cost: form.cost, category: form.category, image: form.image,
      });
      showNotification('¡Nuevo Retiro agregado al calendario!');
    } else if (newItemModal === 'product') {
      addProduct({
        id: `prod-${Date.now()}`, name: form.name || 'Nuevo Artículo',
        desc: form.desc || '', price: parseFloat(form.price) || 20,
        tag: form.tag, category: 'religious', image: form.image,
      });
      showNotification('¡Nuevo Producto publicado en la tienda!');
    }
    setNewItemModal(null);
  };

  const [floatingMenuElement, setFloatingMenuElement] = useState(null);

  const handleElementAction = (action, elementInfo) => {
    if (action === 'edit') {
      selectSubItem(elementInfo.type, elementInfo.id, elementInfo.label, elementInfo.data);
      setFloatingMenuElement(null); // Close menu
    } else if (action === 'delete') {
      if (elementInfo.type === 'mission') deleteMission(elementInfo.id);
      if (elementInfo.type === 'retreat') deleteEvent(elementInfo.id);
      if (elementInfo.type === 'product') deleteProduct(elementInfo.id);
      showNotification('Elemento eliminado.');
      setFloatingMenuElement(null);
    } else if (action === 'moveLeft' || action === 'moveRight') {
       // Mock for moving items, you'd typically rearrange an array here
       showNotification(`Elemento desplazado hacia la ${action === 'moveLeft' ? 'izquierda/arriba' : 'derecha/abajo'}.`);
    }
  };

  const sectionIds = sectionOrder.map(s => s.id);
  const isItemSelected = !!selectedElement;

  return (
    <EditorProvider 
      isEditorActive={true}
      onElementSelect={(e, elementInfo) => setFloatingMenuElement(elementInfo)}
      onElementAction={handleElementAction}
    >
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col font-sans overflow-hidden text-slate-100" onClick={() => setFloatingMenuElement(null)}>
      
      <FloatingToolbar 
        visible={!!floatingMenuElement}
        targetRect={floatingMenuElement?.rect}
        selectedElement={floatingMenuElement}
        onAction={(action) => handleElementAction(action, floatingMenuElement)}
      />

      {/* ==================================================================== */}
      {/* TOPBAR                                                                */}
      {/* ==================================================================== */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between flex-shrink-0 z-30 shadow-md">

        {/* Brand badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>EDITOR VISUAL EN VIVO</span>
          </div>
          <button 
             onClick={() => window.open('https://analytics.google.com/', '_blank')}
             className="flex items-center gap-1.5 bg-slate-800 hover:bg-brand-teal/20 hover:text-brand-teal border border-slate-700 text-slate-300 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors"
          >
            <Star className="w-3.5 h-3.5" />
            Ver Analíticas
          </button>
          <span className="text-[10px] text-slate-400 hidden xl:inline font-semibold">
            Arrastra secciones · Doble clic para editar
          </span>
        </div>

        {/* Device switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          {[
            { id: 'desktop', Icon: Monitor, label: 'Escritorio' },
            { id: 'tablet', Icon: Tablet, label: 'Tableta' },
            { id: 'mobile', Icon: Smartphone, label: 'Móvil' },
          ].map(({ id, Icon, label }) => (
            <button key={id} onClick={() => setDeviceMode(id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                deviceMode === id ? 'bg-brand-teal text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBlockManagerOpen(v => !v)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${
              isBlockManagerOpen ? 'bg-brand-gold text-slate-950 border-brand-gold shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secciones</span>
          </button>

          <button
            onClick={() => setIsInspectorOpen(v => !v)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border transition-all ${
              isInspectorOpen ? 'bg-violet-600 text-white border-violet-600 shadow-md' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Inspector</span>
          </button>

          <button
            onClick={() => showNotification('¡Todos los cambios se guardaron en tiempo real!')}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase px-4 py-2 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar</span>
          </button>

          <button onClick={onExit}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-xl border border-slate-700 transition-all"
            title="Cerrar Editor Visual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[9990] bg-emerald-500 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* WORKSPACE: Left | Canvas | Right                                      */}
      {/* ==================================================================== */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* ============================================================= */}
        {/* LEFT SIDEBAR — Block Manager with drag-reorder list             */}
        {/* ============================================================= */}
        {isBlockManagerOpen && (
          <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-xl overflow-hidden">

            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-gold">
                <Layers className="w-4 h-4" />
                <span>Secciones ({sectionOrder.length})</span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold">Arrastra para reordenar</span>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {sectionOrder.map((section, idx) => {
                const isVisible = sectionVisibility[section.id] !== false;
                const isSelected = activeSectionId === section.id;

                return (
                  <div
                    key={section.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-brand-teal/20 border-brand-teal text-white shadow-lg'
                        : isVisible
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                        : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
                    }`}
                  >
                    {/* Number */}
                    <span className="text-[10px] font-black text-slate-500 w-4 flex-shrink-0">{idx + 1}</span>

                    {/* Name (click to select) */}
                    <button
                      onClick={() => handleScrollToSection(section.id)}
                      className="flex-1 text-left text-xs font-extrabold truncate"
                    >
                      {section.name}
                    </button>

                    {/* Actions */}
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveSection(section.id, -1)}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 rounded-lg hover:bg-slate-800 transition-colors"
                      ><ArrowUp className="w-3 h-3" /></button>

                      <button
                        disabled={idx === sectionOrder.length - 1}
                        onClick={() => moveSection(section.id, 1)}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 rounded-lg hover:bg-slate-800 transition-colors"
                      ><ArrowDown className="w-3 h-3" /></button>

                      <button
                        onClick={() => toggleSectionVisibility(section.id)}
                        className={`p-1 rounded-lg transition-colors ${isVisible ? 'text-emerald-400 hover:bg-emerald-950/30' : 'text-rose-400 hover:bg-rose-950/30'}`}
                        title={isVisible ? 'Ocultar en la web' : 'Mostrar en la web'}
                      >
                        {isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </button>

                      <button
                        onClick={() => { selectSection(section.id); }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSelected ? 'bg-brand-teal text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        }`}
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add buttons */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 space-y-1.5">
              {[['mission', '+ Nueva Causa', 'text-brand-gold'], ['retreat', '+ Nuevo Retiro', 'text-brand-teal'], ['product', '+ Nuevo Producto', 'text-amber-400']].map(([type, label, color]) => (
                <button key={type}
                  onClick={() => openNewItemModal(type)}
                  className={`w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 ${color}`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* ============================================================= */}
        {/* CENTER CANVAS — dnd-kit sortable sections + live components    */}
        {/* ============================================================= */}
        <main className="flex-1 bg-slate-950 overflow-y-auto p-4 flex justify-center items-start" ref={canvasRef}>

          {/* Context info bar */}
          {(activeSectionId || selectedElement) && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
              <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-2xl px-5 py-2.5 text-xs text-slate-300 font-bold shadow-2xl flex items-center gap-3">
                <span className="text-brand-teal font-black">
                  {selectedElement
                    ? `✏️ Editando: ${selectedElement.label}`
                    : `📍 Sección activa: ${sectionOrder.find(s => s.id === activeSectionId)?.name || activeSectionId}`
                  }
                </span>
                <span className="text-slate-500">|</span>
                <span>Clic en cualquier elemento para editarlo · Arrastra secciones para reorganizar</span>
              </div>
            </div>
          )}

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
              <div
                className={`transition-all duration-300 bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 ${
                  deviceMode === 'desktop' ? 'w-full max-w-6xl' : deviceMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                } border-slate-800`}
              >
                {sectionOrder.map((section, idx) => {
                  const isVisible = sectionVisibility[section.id] !== false;
                  const isSelected = activeSectionId === section.id && !isItemSelected;

                  if (!isVisible) {
                    return (
                      <div key={section.id} id={`editor-section-${section.id}`}
                        className="p-5 bg-slate-100 border-2 border-dashed border-slate-300 text-center text-slate-400 font-bold text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <EyeOff className="w-4 h-4 text-rose-500" />
                          <span>{section.name} (Oculto)</span>
                        </div>
                        <button onClick={() => toggleSectionVisibility(section.id)}
                          className="px-3 py-1 bg-white border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-200 text-xs font-extrabold">
                          Mostrar
                        </button>
                      </div>
                    );
                  }

                  return (
                    <SortableSectionWrapper
                      key={section.id}
                      id={section.id}
                      sectionName={section.name}
                      isVisible={isVisible}
                      isSelected={isSelected}
                      onSelect={() => selectSection(section.id)}
                      onToggleVisibility={() => toggleSectionVisibility(section.id)}
                    >
                      <div id={`editor-section-${section.id}`}>
                        {/* ─ HERO ─ */}
                        {section.id === 'hero' && (
                          <Hero
                            onOpenDonate={() => {}}
                            onOpenVolunteer={() => {}}
                            onOpenHumanitarian={() => {}}
                            onOpenRetreats={() => {}}
                            onSelectButton={(btn) => {
                              selectSection('hero');
                              selectSubItem('button', btn.id, `Botón: ${btn.label}`, btn);
                            }}
                            onSelectElement={() => selectSection('hero')}
                          />
                        )}

                        {/* ─ STATS ─ */}
                        {section.id === 'stats' && (
                          <StatsGoalsBanner
                            onOpenDonate={() => selectSection('hero')}
                            onOpenVolunteer={() => selectSection('volunteer')}
                          />
                        )}

                        {/* ─ MISSION HEART ─ */}
                        {section.id === 'mission' && (
                          <MissionHeart
                            onOpenDonate={() => selectSection('hero')}
                            onOpenVolunteer={() => selectSection('volunteer')}
                            onOpenGetHelp={() => selectSection('volunteer')}
                            onOpenShop={() => selectSection('shop')}
                            onOpenContact={() => selectSection('volunteer')}
                            onOpenNewMission={() => openNewItemModal('mission')}
                            onOpenHumanitarian={() => selectSection('programs')}
                            onOpenRetreats={() => selectSection('retreats')}
                            featuredRetreat={events.find(e => e.id === featuredRetreatId) || events[0]}
                            onSelectElement={() => selectSection('mission')}
                          />
                        )}

                        {/* ─ ABOUT ─ */}
                        {section.id === 'about' && (
                          <AboutFounder
                            onOpenVolunteer={() => selectSection('volunteer')}
                            onSelectElement={() => selectSection('about')}
                          />
                        )}

                        {/* ─ PROGRAMS ─ */}
                        {section.id === 'programs' && (
                          <Programs
                            onSelectCauseAndDonate={(causeTitle) => {
                              selectSection('programs');
                              const found = missions.find(m => m.title === causeTitle);
                              if (found) selectSubItem('mission', found.id, `Causa: ${found.title}`, found);
                            }}
                            onOpenNewMission={() => openNewItemModal('mission')}
                            onOpenMissionDetail={(m) => {
                              selectSection('programs');
                              selectSubItem('mission', m.id, `Causa: ${m.title}`, m);
                            }}
                            onOpenCompletedMissions={() => selectSection('programs')}
                            onSelectMission={(m) => {
                              selectSection('programs');
                              selectSubItem('mission', m.id, `Causa: ${m.title}`, m);
                            }}
                          />
                        )}

                        {/* ─ RETREATS ─ */}
                        {section.id === 'retreats' && (
                          <RetreatsSection
                            onOpenRetreatsModal={(eventId) => {
                              selectSection('retreats');
                              const found = events.find(e => e.id === eventId);
                              if (found) selectSubItem('retreat', found.id, `Retiro: ${found.title}`, found);
                            }}
                            featuredRetreatId={featuredRetreatId}
                            onToggleFeaturedRetreat={(eventId) => {
                              selectSection('retreats');
                              const found = events.find(e => e.id === eventId);
                              if (found) selectSubItem('retreat', found.id, `Retiro: ${found.title}`, found);
                            }}
                            onSelectEvent={(ev) => {
                              selectSection('retreats');
                              selectSubItem('retreat', ev.id, `Retiro: ${ev.title}`, ev);
                            }}
                          />
                        )}

                        {/* ─ SHOP ─ */}
                        {section.id === 'shop' && (
                          <ShopSection
                            onAddToCart={(prod) => {
                              selectSection('shop');
                              selectSubItem('product', prod.id, `Producto: ${prod.name}`, prod);
                            }}
                            onOpenCart={() => selectSection('shop')}
                            onBuyNow={(prod) => {
                              selectSection('shop');
                              selectSubItem('product', prod.id, `Producto: ${prod.name}`, prod);
                            }}
                            onSelectProduct={(prod) => {
                              selectSection('shop');
                              selectSubItem('product', prod.id, `Producto: ${prod.name}`, prod);
                            }}
                          />
                        )}

                        {/* ─ VOLUNTEER ─ */}
                        {section.id === 'volunteer' && (
                          <VolunteerSection
                            onOpenVolunteer={() => selectSection('volunteer')}
                            onOpenReviewModal={() => selectSection('volunteer')}
                            customReviews={approvedReviews}
                          />
                        )}

                        {/* ─ FOOTER ─ */}
                        {section.id === 'footer' && (
                          <Footer
                            onOpenDonate={() => selectSection('hero')}
                            onOpenVolunteer={() => selectSection('volunteer')}
                            onOpenAdmin={() => {}}
                          />
                        )}
                      </div>
                    </SortableSectionWrapper>
                  );
                })}
              </div>
            </SortableContext>

            {/* DragOverlay — ghost element while dragging */}
            <DragOverlay>
              {isDraggingSection && (
                <div className="bg-brand-teal/30 border-4 border-brand-teal border-dashed rounded-2xl p-6 text-center text-brand-teal font-black text-sm">
                  <GripVertical className="w-8 h-8 mx-auto mb-2" />
                  Moviendo sección...
                </div>
              )}
            </DragOverlay>
          </DndContext>

        </main>

        {/* ============================================================= */}
        {/* RIGHT INSPECTOR — Unified editor panel                         */}
        {/* ============================================================= */}
        {isInspectorOpen && (
          <aside className="w-[420px] max-w-[420px] bg-slate-900 border-l border-slate-800 flex flex-col flex-shrink-0 z-20 shadow-xl overflow-hidden">

            {/* Inspector Header */}
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950 flex-shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <Sliders className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-200 truncate">
                  {selectedElement
                    ? selectedElement.label
                    : activeSectionId
                    ? `${sectionOrder.find(s => s.id === activeSectionId)?.name || activeSectionId}`
                    : 'Inspector de Edición'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* Clear selection — go back to section level */}
                {selectedElement && (
                  <button onClick={() => setSelectedElement(null)}
                    className="text-[10px] font-bold text-brand-teal hover:underline flex items-center gap-1 px-2 py-1 bg-brand-teal/10 rounded-lg">
                    <ChevronDown className="w-3 h-3" /> Sección
                  </button>
                )}
                <button onClick={() => setIsInspectorOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick add bar within inspector */}
            {!selectedElement && (
              <div className="px-4 py-2 border-b border-slate-800 bg-slate-950 flex items-center gap-2">
                {[
                  ['+ Causa', 'mission', 'text-brand-gold'],
                  ['+ Retiro', 'retreat', 'text-brand-teal'],
                  ['+ Prod', 'product', 'text-amber-400'],
                ].map(([label, type, color]) => (
                  <button key={type}
                    onClick={() => openNewItemModal(type)}
                    className={`flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-[10px] font-black rounded-xl ${color} flex items-center justify-center gap-1`}
                  >
                    <PlusCircle className="w-3 h-3" />
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Inspector body */}
            <div className="flex-1 overflow-y-auto">
              <EditorInspector
                selectedElement={selectedElement}
                activeSectionId={activeSectionId}
                hero={hero} updateHero={updateHero}
                about={about} updateAbout={updateAbout}
                missionHeart={missionHeart} updateMissionHeart={updateMissionHeart}
                programsSection={programsSection} updateProgramsHeader={updateProgramsHeader}
                retreatsModal={retreatsModal} updateRetreatsHeader={updateRetreatsHeader}
                shopHeader={shopHeader} updateShopHeader={updateShopHeader}
                volunteerSection={volunteerSection} updateVolunteerHeader={updateVolunteerHeader}
                footer={footer} updateFooter={updateFooter}
                settings={settings} updateSettings={updateSettings}
                missions={missions} updateMission={updateMission}
                deleteMission={deleteMission} addMission={addMission}
                events={events} updateEvent={updateEvent}
                deleteEvent={deleteEvent} addEvent={addEvent}
                featuredRetreatId={featuredRetreatId} setFeaturedRetreat={setFeaturedRetreat}
                products={products} updateProduct={updateProduct}
                deleteProduct={deleteProduct} addProduct={addProduct}
                featuredProductIds={featuredProductIds} toggleFeaturedProduct={toggleFeaturedProduct}
                featuredMissionId={featuredMissionId} setFeaturedMission={setFeaturedMission}
                approvedReviews={approvedReviews} pendingReviews={pendingReviews}
                approveReview={approveReview} deleteReview={deleteReview}
                onClose={() => setSelectedElement(null)}
                showNotification={showNotification}
                openNewItemModal={openNewItemModal}
              />
            </div>

          </aside>
        )}
      </div>

      {/* ==================================================================== */}
      {/* NEW ITEM MODAL                                                        */}
      {/* ==================================================================== */}
      {newItemModal && (
        <NewItemModal
          type={newItemModal}
          onClose={() => setNewItemModal(null)}
          onSubmit={handleCreateItem}
        />
      )}
    </div>
    </EditorProvider>
  );
};
