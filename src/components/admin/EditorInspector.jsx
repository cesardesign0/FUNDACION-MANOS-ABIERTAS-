import React, { useRef } from 'react';
import {
  X, Star, Calendar, ShoppingBag, Trash2, Wand2, Upload, Link as LinkIcon,
  FolderOpen, RefreshCw, ImageIcon, Plus, ChevronDown, ChevronUp,
  Type, Palette, Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  Target, Sparkles, Save, Check, Eye, Settings, Heart, Users,
  Mail, Phone, MapPin, DollarSign, Tag, PlusCircle
} from 'lucide-react';
import { TypographyToolbar, ButtonStudio, QUICK_COLORS, FONT_OPTIONS, SIZE_OPTIONS } from './StyleToolbars';

// ============================================================
// INLINE STYLE EDITOR — complete typography + color controls
// ============================================================
const InlineStyleEditor = ({ label, fieldPrefix, styles = {}, onChange, previewText }) => {
  const current = {
    font: styles[`${fieldPrefix}_font`] || 'font-sans',
    size: styles[`${fieldPrefix}_size`] || 'text-base',
    color: styles[`${fieldPrefix}_color`] || '#FFFFFF',
    weight: styles[`${fieldPrefix}_weight`] || 'font-normal',
    italic: !!styles[`${fieldPrefix}_italic`],
    align: styles[`${fieldPrefix}_align`] || 'text-left',
    case: styles[`${fieldPrefix}_case`] || 'normal-case',
  };

  const isBold = current.weight === 'font-bold' || current.weight === 'font-black';
  const isUppercase = current.case === 'uppercase';

  const update = (key, value) => onChange({ ...styles, [`${fieldPrefix}_${key}`]: value });

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3 space-y-3">
      <span className="text-[10px] font-black uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
        <Type className="w-3.5 h-3.5" />
        {label}
      </span>

      {/* Row 1: Font + Size */}
      <div className="flex flex-wrap gap-2">
        <select
          value={current.font}
          onChange={(e) => update('font', e.target.value)}
          className="flex-1 min-w-[130px] bg-slate-900 border border-slate-700 text-white rounded-xl px-2.5 py-2 text-[11px] font-semibold"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        <select
          value={current.size}
          onChange={(e) => update('size', e.target.value)}
          className="w-[130px] bg-slate-900 border border-slate-700 text-white rounded-xl px-2.5 py-2 text-[11px] font-semibold"
        >
          {SIZE_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Row 2: B / I / aA / Alignment */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => update('weight', isBold ? 'font-normal' : 'font-bold')}
          className={`px-3 py-1.5 rounded-lg font-black text-xs transition-all ${
            isBold ? 'bg-brand-gold text-slate-950 ring-2 ring-brand-gold/50' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          B
        </button>
        <button
          onClick={() => update('italic', !current.italic)}
          className={`px-3 py-1.5 rounded-lg italic font-serif text-xs transition-all ${
            current.italic ? 'bg-brand-gold text-slate-950 ring-2 ring-brand-gold/50' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          I
        </button>
        <button
          onClick={() => update('case', isUppercase ? 'normal-case' : 'uppercase')}
          className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
            isUppercase ? 'bg-brand-gold text-slate-950 ring-2 ring-brand-gold/50' : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          aA
        </button>
        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700 gap-0.5">
          {['text-left', 'text-center', 'text-right'].map((align, i) => {
            const icons = [AlignLeft, AlignCenter, AlignRight];
            const Icon = icons[i];
            return (
              <button
                key={align}
                onClick={() => update('align', align)}
                className={`p-1.5 rounded ${current.align === align ? 'bg-brand-teal text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Icon className="w-3 h-3" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 3: Color Picker */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-slate-400 font-bold">Color:</span>
        {QUICK_COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => update('color', c.hex)}
            title={c.name}
            className={`w-5 h-5 rounded-full border-2 transition-transform ${c.bg} ${
              current.color.toLowerCase() === c.hex.toLowerCase()
                ? 'scale-125 border-white ring-2 ring-white/40'
                : 'border-slate-600 hover:scale-110'
            }`}
          />
        ))}
        <input
          type="color"
          value={current.color.startsWith('#') ? current.color : '#FFFFFF'}
          onChange={(e) => update('color', e.target.value)}
          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
          title="Color personalizado"
        />
      </div>

      {/* Live Preview */}
      {previewText && (
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 font-bold block mb-1.5 flex items-center gap-1"><Eye className="w-3 h-3" /> Vista Previa:</span>
          <div
            className={`${current.font} ${current.size} ${isBold ? 'font-bold' : 'font-normal'} ${current.italic ? 'italic' : ''} ${isUppercase ? 'uppercase' : ''} ${current.align} break-words leading-snug`}
            style={{ color: current.color }}
          >
            {previewText}
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// IMAGE HUB — Upload / AI Generate / Gallery / URL
// ============================================================
export const ImageHub = ({ onApply, onClose }) => {
  const fileRef = useRef(null);
  const [tab, setTab] = React.useState('upload');
  const [urlInput, setUrlInput] = React.useState('');
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [aiLoading, setAiLoading] = React.useState(false);

  const gallery = [
    { label: 'Sagrado Corazón de Jesús', url: '/sagrado-corazon-jesus-lateral.jpg' },
    { label: 'Inmaculado Corazón de María', url: '/sagrado-corazon-maria-lateral.jpg' },
    { label: 'Logo Manos Abiertas', url: '/logo-manos-abiertas.png' },
    { label: 'Jornada de Alimentos NY', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Retiro y Oración Espiritual', url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Comunidad Isha-Bethel', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Ayuda a Familias Vulnerables', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Vigilia de Alabanza y Oración', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1920&q=85' },
  ];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { onApply(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleAI = () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      const p = aiPrompt.toLowerCase();
      let url = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=85';
      if (p.includes('jesus') || p.includes('sagrado')) url = '/sagrado-corazon-jesus-lateral.jpg';
      else if (p.includes('maria') || p.includes('virgen')) url = '/sagrado-corazon-maria-lateral.jpg';
      else if (p.includes('comida') || p.includes('alimento')) url = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80';
      else if (p.includes('retiro') || p.includes('oración') || p.includes('iglesia')) url = 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80';
      onApply(url);
      setAiLoading(false);
    }, 1200);
  };

  const tabs = [
    { id: 'upload', label: 'Subir', icon: Upload },
    { id: 'ai', label: 'IA', icon: Wand2 },
    { id: 'gallery', label: 'Galería', icon: FolderOpen },
    { id: 'url', label: 'URL', icon: LinkIcon },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-white flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
          Gestor de Imágenes
        </span>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-0.5 py-2 rounded-lg font-bold transition-all ${
              tab === id ? 'bg-brand-teal text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Upload */}
      {tab === 'upload' && (
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-brand-teal transition-colors"
        >
          <Upload className="w-8 h-8 text-brand-teal mx-auto mb-2" />
          <p className="text-xs font-bold text-white">Selecciona una imagen</p>
          <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, WEBP</p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
      )}

      {/* AI Generator */}
      {tab === 'ai' && (
        <div className="space-y-3">
          <p className="text-[11px] text-slate-400">Describe la imagen que deseas:</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej: Sagrado corazón de Jesús brillante..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button
              onClick={handleAI}
              disabled={aiLoading || !aiPrompt.trim()}
              className="px-4 py-2 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl disabled:opacity-30 flex items-center gap-1.5"
            >
              {aiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              Generar
            </button>
          </div>
        </div>
      )}

      {/* Gallery */}
      {tab === 'gallery' && (
        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
          {gallery.map((item, i) => (
            <div
              key={i}
              onClick={() => onApply(item.url)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-slate-800 hover:border-brand-gold transition-all"
            >
              <img src={item.url} alt={item.label} className="w-full h-20 object-cover group-hover:scale-105 transition-transform" />
              <span className="block px-2 py-1.5 text-[10px] font-bold text-slate-300 truncate bg-slate-950">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* URL */}
      {tab === 'url' && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
          />
          <button
            onClick={() => urlInput.trim() && onApply(urlInput.trim())}
            disabled={!urlInput.trim()}
            className="px-4 py-2 bg-brand-teal text-slate-950 font-black text-xs rounded-xl disabled:opacity-30"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
};

// ============================================================
// EDITOR INSPECTOR — Unified Right Panel (all controls in one)
// ============================================================
export const EditorInspector = ({
  selectedElement,   // { type, id, sectionId, label, data }
  activeSectionId,
  // Data hooks
  hero, updateHero,
  about, updateAbout,
  missionHeart, updateMissionHeart,
  programsSection, updateProgramsHeader,
  retreatsModal, updateRetreatsHeader,
  shopHeader, updateShopHeader,
  volunteerSection, updateVolunteerHeader,
  footer, updateFooter,
  settings, updateSettings,
  missions, updateMission, deleteMission, addMission,
  events, updateEvent, deleteEvent, addEvent, featuredRetreatId, setFeaturedRetreat,
  products, updateProduct, deleteProduct, addProduct, featuredProductIds, toggleFeaturedProduct,
  featuredMissionId, setFeaturedMission,
  approvedReviews, pendingReviews, approveReview, deleteReview,
  // Actions
  onClose,
  showNotification,
  openNewItemModal,
}) => {
  const [imageTarget, setImageTarget] = React.useState(null);
  const [expandedSection, setExpandedSection] = React.useState(null);

  const toggleSection = (s) => setExpandedSection(expandedSection === s ? null : s);
  const CollapsibleHeader = ({ id, label, children }) => (
    <div className="border border-slate-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-950 hover:bg-slate-900 text-xs font-black text-slate-200 uppercase tracking-wider"
      >
        <span>{label}</span>
        {expandedSection === id ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {expandedSection === id && (
        <div className="p-4 bg-slate-900 space-y-4 border-t border-slate-800">
          {children}
        </div>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────────
  // Render ImageHub modal inline within inspector
  // ─────────────────────────────────────────────────────────────
  if (imageTarget) {
    return (
      <div className="p-5 animate-fadeIn">
        <ImageHub
          onApply={(url) => {
            const { section, field, itemId } = imageTarget;
            if (section === 'hero') updateHero({ [field]: url });
            else if (section === 'missionHeart') updateMissionHeart({ [field]: url });
            else if (section === 'about') updateAbout({ [field]: url });
            else if (section === 'missionItem') updateMission(itemId, { [field]: url });
            else if (section === 'retreatItem') updateEvent(itemId, { [field]: url });
            else if (section === 'productItem') updateProduct(itemId, { [field]: url });
            showNotification('¡Imagen actualizada con éxito!');
            setImageTarget(null);
          }}
          onClose={() => setImageTarget(null)}
        />
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // BUTTON sub-item
  // ─────────────────────────────────────────────────────────────
  if (selectedElement?.type === 'button') {
    const heroButtons = hero?.buttons || [];
    const currentBtn = heroButtons.find(b => b.id === selectedElement.id) || selectedElement.data || heroButtons[0];
    const btnIdx = heroButtons.findIndex(b => b.id === currentBtn?.id);
    const updateBtn = (updates) => {
      const updated = heroButtons.map((b, i) => i === btnIdx ? { ...b, ...updates } : b);
      updateHero({ buttons: updated });
    };
    return (
      <div className="p-5 space-y-5 animate-fadeIn">
        <div className="p-3 rounded-2xl bg-brand-teal/20 border border-brand-teal/40">
          <span className="text-xs font-black text-brand-teal uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Editando Botón
          </span>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Texto del Botón</label>
          <input type="text" value={currentBtn?.label || ''} onChange={(e) => updateBtn({ label: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-bold" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Estilo / Color</label>
            <select value={currentBtn?.variant || 'primary'} onChange={(e) => updateBtn({ variant: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white">
              <option value="primary">Rojo Coral</option>
              <option value="secondary">Gris Oscuro</option>
              <option value="gold">Dorado</option>
              <option value="teal">Verde Teal</option>
              <option value="outline-white">Borde Blanco</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Forma</label>
            <select value={currentBtn?.shape || 'rounded'} onChange={(e) => updateBtn({ shape: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white">
              <option value="pill">Pastilla</option>
              <option value="rounded">Suave</option>
              <option value="square">Cuadrado</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase">Acción al Clic</label>
          <select value={currentBtn?.action || 'donate'} onChange={(e) => updateBtn({ action: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white">
            <option value="donate">Abrir Donaciones</option>
            <option value="volunteer">Abrir Voluntariado</option>
            <option value="causes">Ir a Misiones</option>
            <option value="retreats">Ir a Retiros</option>
            <option value="custom">URL Personalizada</option>
          </select>
        </div>
        {currentBtn?.action === 'custom' && (
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300 block">URL (https://...)</label>
            <input type="text" value={currentBtn?.url || ''} onChange={(e) => updateBtn({ url: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>
        )}
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // MISSION sub-item
  // ─────────────────────────────────────────────────────────────
  if (selectedElement?.type === 'mission') {
    const m = missions.find(x => x.id === selectedElement.id) || selectedElement.data || missions[0];
    const isFeat = featuredMissionId === m?.id;
    return (
      <div className="p-5 space-y-5 animate-fadeIn">
        <div className="p-3 rounded-2xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-between">
          <span className="text-xs font-black text-brand-gold flex items-center gap-1.5"><Star className="w-4 h-4 fill-brand-gold" /> Causa Seleccionada</span>
          <button onClick={() => { setFeaturedMission(m.id); showNotification('¡Causa destacada!'); }}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${isFeat ? 'bg-brand-gold text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-brand-gold hover:text-slate-950'}`}>
            {isFeat ? '⭐ Destacada' : 'Destacar'}
          </button>
        </div>

        {/* Image */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
          <img src={m?.image} alt={m?.title} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
          <div className="flex-1 space-y-1">
            <span className="text-xs font-bold text-white block truncate">{m?.title}</span>
            <button onClick={() => setImageTarget({ section: 'missionItem', field: 'image', itemId: m.id })}
              className="text-[11px] font-bold text-brand-teal hover:underline flex items-center gap-1">
              <Wand2 className="w-3 h-3" /> Cambiar Imagen / IA
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Título de la Causa</label>
          <input type="text" value={m?.title || ''} onChange={(e) => updateMission(m.id, { title: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Descripción del Caso</label>
          <textarea rows={3} value={m?.desc || ''} onChange={(e) => updateMission(m.id, { desc: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[['Recaudado', 'raisedAmount'], ['Meta ($)', 'goalAmount']].map(([lbl, field]) => (
            <div key={field} className="col-span-1 space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{lbl}</label>
              <input type="text" value={m?.[field] || ''} onChange={(e) => updateMission(m.id, { [field]: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold" />
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">% Logro</label>
            <input type="number" value={m?.percentage || 0} onChange={(e) => updateMission(m.id, { percentage: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-emerald-400 font-bold" />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800">
          <button onClick={() => { if (confirm(`¿Eliminar "${m?.title}"?`)) { deleteMission(m.id); showNotification('Causa eliminada'); } }}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Eliminar Causa
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RETREAT sub-item
  // ─────────────────────────────────────────────────────────────
  if (selectedElement?.type === 'retreat') {
    const ev = events.find(x => x.id === selectedElement.id) || selectedElement.data || events[0];
    const isFeat = featuredRetreatId === ev?.id;
    return (
      <div className="p-5 space-y-5 animate-fadeIn">
        <div className="p-3 rounded-2xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-between">
          <span className="text-xs font-black text-brand-gold flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Retiro Seleccionado</span>
          <button onClick={() => { setFeaturedRetreat(ev.id); showNotification('¡Retiro destacado!'); }}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${isFeat ? 'bg-brand-gold text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-brand-gold hover:text-slate-950'}`}>
            {isFeat ? '⭐ Destacado' : 'Destacar'}
          </button>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
          <img src={ev?.image} alt={ev?.title} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
          <div className="flex-1 space-y-1">
            <span className="text-xs font-bold text-white block truncate">{ev?.title}</span>
            <button onClick={() => setImageTarget({ section: 'retreatItem', field: 'image', itemId: ev.id })}
              className="text-[11px] font-bold text-brand-teal hover:underline flex items-center gap-1">
              <Wand2 className="w-3 h-3" /> Cambiar Imagen / IA
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Título de la Actividad</label>
          <input type="text" value={ev?.title || ''} onChange={(e) => updateEvent(ev.id, { title: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[['Fecha', 'date'], ['Horario', 'schedule'], ['Aporte', 'cost'], ['Categoría', 'category']].map(([lbl, field]) => (
            <div key={field} className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">{lbl}</label>
              <input type="text" value={ev?.[field] || ''} onChange={(e) => updateEvent(ev.id, { [field]: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold" />
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Enlace de Registro / Boletos</label>
          <input type="text" value={ev?.registrationLink || ''} onChange={(e) => updateEvent(ev.id, { registrationLink: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono text-[11px]" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Descripción</label>
          <textarea rows={3} value={ev?.desc || ''} onChange={(e) => updateEvent(ev.id, { desc: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
        </div>

        <div className="pt-2 border-t border-slate-800">
          <button onClick={() => { if (confirm(`¿Eliminar "${ev?.title}"?`)) { deleteEvent(ev.id); showNotification('Retiro eliminado'); } }}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Eliminar Retiro
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // PRODUCT sub-item
  // ─────────────────────────────────────────────────────────────
  if (selectedElement?.type === 'product') {
    const p = products.find(x => x.id === selectedElement.id) || selectedElement.data || products[0];
    const isFeat = (featuredProductIds || []).includes(p?.id);
    return (
      <div className="p-5 space-y-5 animate-fadeIn">
        <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-between">
          <span className="text-xs font-black text-amber-300 flex items-center gap-1.5"><ShoppingBag className="w-4 h-4 text-amber-400" /> Producto Seleccionado</span>
          <button onClick={() => { toggleFeaturedProduct(p.id); showNotification(isFeat ? 'Desmarcado como destacado' : '¡Marcado como Más Vendido!'); }}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${isFeat ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-amber-400 hover:text-slate-950'}`}>
            {isFeat ? '🔥 Más Vendido' : 'Marcar Top'}
          </button>
        </div>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
          <img src={p?.image} alt={p?.name} className="w-16 h-16 object-cover rounded-xl border border-slate-700" />
          <div className="flex-1 space-y-1">
            <span className="text-xs font-bold text-white block truncate">{p?.name}</span>
            <button onClick={() => setImageTarget({ section: 'productItem', field: 'image', itemId: p.id })}
              className="text-[11px] font-bold text-brand-teal hover:underline flex items-center gap-1">
              <Wand2 className="w-3 h-3" /> Cambiar Imagen / IA
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Nombre del Artículo</label>
          <input type="text" value={p?.name || ''} onChange={(e) => updateProduct(p.id, { name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Precio ($ USD)</label>
            <input type="number" step="0.01" value={p?.price || 0} onChange={(e) => updateProduct(p.id, { price: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Etiqueta / Badge</label>
            <input type="text" value={p?.tag || ''} onChange={(e) => updateProduct(p.id, { tag: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white font-bold" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 block">Descripción</label>
          <textarea rows={3} value={p?.desc || ''} onChange={(e) => updateProduct(p.id, { desc: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
        </div>

        <div className="pt-2 border-t border-slate-800">
          <button onClick={() => { if (confirm(`¿Eliminar "${p?.name}"?`)) { deleteProduct(p.id); showNotification('Producto eliminado'); } }}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1">
            <Trash2 className="w-3.5 h-3.5" /> Eliminar Producto
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // SECTION-LEVEL INSPECTOR (default when a section is selected)
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="p-5 space-y-4 animate-fadeIn">

      {/* ── HERO ── */}
      {activeSectionId === 'hero' && (
        <>
          <CollapsibleHeader id="heroLogo" label="🖼️ Logo y Tarjeta de Portada">
            <div className="flex items-center gap-3">
              <img src={hero?.logoCardImage || '/logo-manos-abiertas.png'} alt="Logo" className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-slate-700" />
              <button onClick={() => setImageTarget({ section: 'hero', field: 'logoCardImage' })}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-brand-teal" /> Reemplazar Imagen
              </button>
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="heroHandwritten" label="✍️ Frase Manuscrita (Destacada)">
            <div className="space-y-3">
              <input type="text" value={hero?.handwritten || ''} onChange={(e) => updateHero({ handwritten: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white" />
              <InlineStyleEditor
                label="Estilo de la Frase"
                fieldPrefix="handwritten"
                styles={hero?.styles || {}}
                onChange={(s) => updateHero({ styles: s })}
                previewText={hero?.handwritten}
              />
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="heroCitation" label="📖 Cita Bíblica / Lema">
            <div className="space-y-3">
              <textarea rows={2} value={hero?.title || ''} onChange={(e) => updateHero({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <InlineStyleEditor
                label="Estilo de la Cita"
                fieldPrefix="title"
                styles={hero?.styles || {}}
                onChange={(s) => updateHero({ styles: s })}
                previewText={hero?.title}
              />
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Referencia (Ej: — 1 Pedro 4, 10)</label>
                <input type="text" value={hero?.citation || ''} onChange={(e) => updateHero({ citation: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              </div>
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="heroDesc" label="📝 Descripción Principal">
            <textarea rows={3} value={hero?.description || ''} onChange={(e) => updateHero({ description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
          </CollapsibleHeader>

          <CollapsibleHeader id="heroButtons" label="🔘 Botones de Acción">
            <ButtonStudio
              buttons={hero?.buttons || []}
              onChange={(btns) => updateHero({ buttons: btns })}
            />
          </CollapsibleHeader>
        </>
      )}

      {/* ── STATS ── */}
      {activeSectionId === 'stats' && (
        <CollapsibleHeader id="statsNumbers" label="📊 Contadores de Impacto">
          <div className="space-y-3">
            {[
              ['Familias Alimentadas', 'stat1'],
              ['Retiros Realizados', 'stat2'],
              ['Voluntarios Activos', 'stat3'],
              ['Meta Anual Lograda', 'stat4'],
            ].map(([lbl, field]) => (
              <div key={field} className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">{lbl}</label>
                <input type="text" value={hero?.[field] || ''} onChange={(e) => updateHero({ [field]: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold" />
              </div>
            ))}
          </div>
        </CollapsibleHeader>
      )}

      {/* ── MISSION HEART ── */}
      {activeSectionId === 'mission' && (
        <>
          <CollapsibleHeader id="mhBubbles" label="🫧 Fotos de Burbujas Interactivas">
            <div className="grid grid-cols-2 gap-3">
              {[['Burbuja Ayuda', 'bubble1Image'], ['Burbuja Isha-Bethel', 'bubbleIshaImage']].map(([lbl, field]) => (
                <div key={field} className="p-2 bg-slate-950 rounded-xl text-center space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold block">{lbl}</span>
                  <img src={missionHeart?.[field]} alt={lbl} className="w-12 h-12 rounded-full object-cover mx-auto" />
                  <button onClick={() => setImageTarget({ section: 'missionHeart', field })}
                    className="text-[10px] font-bold text-brand-teal hover:underline">Cambiar</button>
                </div>
              ))}
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="mhTitle" label="✏️ Título y Párrafo">
            <div className="space-y-3">
              <input type="text" value={missionHeart?.title || ''} onChange={(e) => updateMissionHeart({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <InlineStyleEditor label="Estilo del Título" fieldPrefix="title"
                styles={missionHeart?.styles || {}}
                onChange={(s) => updateMissionHeart({ styles: s })}
                previewText={missionHeart?.title} />
              <textarea rows={3} value={missionHeart?.paragraph1 || ''} onChange={(e) => updateMissionHeart({ paragraph1: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
          </CollapsibleHeader>
        </>
      )}

      {/* ── ABOUT ── */}
      {activeSectionId === 'about' && (
        <>
          <CollapsibleHeader id="aboutCollage" label="🖼️ Fotos del Collage (Centro)">
            <div className="grid grid-cols-3 gap-2">
              {[['Principal', 'collageImg1', '/retreats/seminario-espiritu.jpg'], ['Isha-Bethel', 'collageImg2', '/retreats/retiro-mujeres.jpg'], ['Comedores', 'collageImg3', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80']].map(([lbl, field, fallback]) => (
                <div key={field} className="p-2 bg-slate-950 rounded-xl space-y-1 text-center">
                  <span className="text-[10px] text-slate-400 font-bold block">{lbl}</span>
                  <img src={about?.[field] || fallback} alt={lbl} className="w-full h-14 object-cover rounded-lg" />
                  <button onClick={() => setImageTarget({ section: 'about', field })}
                    className="text-[10px] font-bold text-brand-teal hover:underline">Cambiar</button>
                </div>
              ))}
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="aboutText" label="✏️ Textos del Centro">
            <div className="space-y-3">
              <input type="text" value={about?.title || ''} onChange={(e) => updateAbout({ title: e.target.value })}
                placeholder="Título del Centro..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <InlineStyleEditor label="Estilo del Título" fieldPrefix="title"
                styles={about?.styles || {}}
                onChange={(s) => updateAbout({ styles: s })}
                previewText={about?.title} />
              <textarea rows={3} value={about?.paragraph1 || ''} onChange={(e) => updateAbout({ paragraph1: e.target.value })}
                placeholder="Descripción del centro..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="aboutContact" label="📍 Dirección y Contacto">
            <div className="space-y-3">
              {[['Dirección', 'address', 'text'], ['Teléfono', 'phone', 'text']].map(([lbl, field, type]) => (
                <div key={field} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{lbl}</label>
                  <input type={type} value={about?.[field] || ''} onChange={(e) => updateAbout({ [field]: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                </div>
              ))}
            </div>
          </CollapsibleHeader>
        </>
      )}

      {/* ── PROGRAMS (Missions) ── */}
      {activeSectionId === 'programs' && (
        <>
          <CollapsibleHeader id="progFeatured" label="⭐ Causa Destacada en Portada">
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400">Selecciona cuál causa aparece con marco dorado:</p>
              <select value={featuredMissionId} onChange={(e) => { setFeaturedMission(Number(e.target.value)); showNotification('¡Causa destacada actualizada!'); }}
                className="w-full bg-slate-950 border border-brand-gold/50 text-brand-gold rounded-xl px-3 py-2 text-xs font-bold">
                {missions.map((m) => <option key={m.id} value={m.id}>⭐ {m.title} ({m.percentage}%)</option>)}
              </select>
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="progTitle" label="✏️ Título de la Sección">
            <div className="space-y-3">
              <input type="text" value={programsSection?.title || ''} onChange={(e) => updateProgramsHeader({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <InlineStyleEditor label="Estilo" fieldPrefix="title"
                styles={programsSection?.styles || {}}
                onChange={(s) => updateProgramsHeader({ styles: s })}
                previewText={programsSection?.title} />
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="progList" label={`📋 Causas Activas (${missions.length})`}>
            <div className="space-y-2">
              <button onClick={() => openNewItemModal('mission')}
                className="w-full py-2 border-2 border-dashed border-brand-gold/40 rounded-xl text-xs font-bold text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10 flex items-center justify-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" /> + Nueva Causa
              </button>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {missions.map((m) => {
                  const isFeat = featuredMissionId === m.id;
                  return (
                    <div key={m.id} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${isFeat ? 'bg-brand-gold/10 border-brand-gold' : 'bg-slate-950 border-slate-800'}`}>
                      <span className="truncate flex-1 font-bold text-white">{isFeat && '⭐ '}{m.title}</span>
                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="text-emerald-400 font-bold">{m.percentage}%</span>
                        <button onClick={() => { setFeaturedMission(m.id); showNotification('¡Destacada!'); }}
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${isFeat ? 'bg-brand-gold text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-brand-gold hover:text-slate-950'}`}>
                          {isFeat ? 'Destacada' : 'Destacar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CollapsibleHeader>
        </>
      )}

      {/* ── RETREATS ── */}
      {activeSectionId === 'retreats' && (
        <>
          <CollapsibleHeader id="retFeatured" label="⭐ Retiro Destacado del Calendario">
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400">Selecciona cuál retiro aparece como destacado:</p>
              <select value={featuredRetreatId} onChange={(e) => { setFeaturedRetreat(e.target.value); showNotification('¡Retiro destacado actualizado!'); }}
                className="w-full bg-slate-950 border border-brand-gold/50 text-brand-gold rounded-xl px-3 py-2 text-xs font-bold">
                {events.map((ev) => <option key={ev.id} value={ev.id}>⭐ {ev.title} ({ev.date})</option>)}
              </select>
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="retTitle" label="✏️ Textos del Calendario">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Título</label>
                <input type="text" value={retreatsModal?.title || ''} onChange={(e) => updateRetreatsHeader({ title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                <InlineStyleEditor label="Estilo del Título" fieldPrefix="title"
                  styles={retreatsModal?.styles || {}}
                  onChange={(s) => updateRetreatsHeader({ styles: s })}
                  previewText={retreatsModal?.title} />
              </div>
              
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Subtítulo / Descripción</label>
                <textarea rows={2} value={retreatsModal?.subtitle || ''} onChange={(e) => updateRetreatsHeader({ subtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                <InlineStyleEditor label="Estilo del Subtítulo" fieldPrefix="subtitle"
                  styles={retreatsModal?.styles || {}}
                  onChange={(s) => updateRetreatsHeader({ styles: s })}
                  previewText={retreatsModal?.subtitle} />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Aviso de Ubicación</label>
                <input type="text" value={retreatsModal?.venueNotice || ''} onChange={(e) => updateRetreatsHeader({ venueNotice: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold block">Color del Aviso</label>
                  <input type="color" value={retreatsModal?.styles?.venue_color || '#94A3B8'} onChange={(e) => updateRetreatsHeader({ styles: { ...retreatsModal?.styles, venue_color: e.target.value } })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-slate-950 border border-slate-700" />
                </div>
              </div>
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="retList" label={`📋 Actividades (${events.length})`}>
            <div className="space-y-2">
              <button onClick={() => openNewItemModal('retreat')}
                className="w-full py-2 border-2 border-dashed border-brand-gold/40 rounded-xl text-xs font-bold text-brand-gold hover:border-brand-gold hover:bg-brand-gold/10 flex items-center justify-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" /> + Nuevo Retiro
              </button>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {events.map((ev) => {
                  const isFeat = featuredRetreatId === ev.id;
                  return (
                    <div key={ev.id} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${isFeat ? 'bg-brand-gold/10 border-brand-gold' : 'bg-slate-950 border-slate-800'}`}>
                      <span className="truncate flex-1 font-bold text-white">{isFeat && '⭐ '}{ev.title}</span>
                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="text-amber-300 text-[10px]">{ev.date}</span>
                        <button onClick={() => { setFeaturedRetreat(ev.id); showNotification('¡Destacado!'); }}
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${isFeat ? 'bg-brand-gold text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-brand-gold hover:text-slate-950'}`}>
                          {isFeat ? 'Destacado' : 'Destacar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CollapsibleHeader>
        </>
      )}

      {/* ── SHOP ── */}
      {activeSectionId === 'shop' && (
        <>
          <CollapsibleHeader id="shopTitle" label="✏️ Título de la Tienda">
            <input type="text" value={shopHeader?.title || ''} onChange={(e) => updateShopHeader({ title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
          </CollapsibleHeader>

          <CollapsibleHeader id="shopList" label={`📋 Artículos (${products.length})`}>
            <div className="space-y-2">
              <button onClick={() => openNewItemModal('product')}
                className="w-full py-2 border-2 border-dashed border-amber-400/40 rounded-xl text-xs font-bold text-amber-400 hover:border-amber-400 hover:bg-amber-400/10 flex items-center justify-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" /> + Nuevo Producto
              </button>
              <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                {products.map((p) => {
                  const isFeat = (featuredProductIds || []).includes(p.id);
                  return (
                    <div key={p.id} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${isFeat ? 'bg-amber-400/10 border-amber-400' : 'bg-slate-950 border-slate-800'}`}>
                      <span className="truncate flex-1 font-bold text-white">{p.name}</span>
                      <div className="flex items-center gap-1.5 ml-2">
                        <span className="text-amber-300 font-bold">${p.price}</span>
                        <button onClick={() => { toggleFeaturedProduct(p.id); }}
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${isFeat ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-amber-400 hover:text-slate-950'}`}>
                          {isFeat ? '🔥 Top' : 'Destacar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CollapsibleHeader>
        </>
      )}

      {/* ── VOLUNTEER ── */}
      {activeSectionId === 'volunteer' && (
        <>
          <CollapsibleHeader id="volTitle" label="✏️ Título y Descripción">
            <div className="space-y-3">
              <input type="text" value={volunteerSection?.title || ''} onChange={(e) => updateVolunteerHeader({ title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
              <InlineStyleEditor label="Estilo del Título" fieldPrefix="title"
                styles={volunteerSection?.styles || {}}
                onChange={(s) => updateVolunteerHeader({ styles: s })}
                previewText={volunteerSection?.title} />
              <textarea rows={3} value={volunteerSection?.desc || ''} onChange={(e) => updateVolunteerHeader({ desc: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
          </CollapsibleHeader>

          {pendingReviews?.length > 0 && (
            <CollapsibleHeader id="volReviews" label={`⏳ Testimonios Pendientes (${pendingReviews.length})`}>
              <div className="space-y-2">
                {pendingReviews.map((rev) => (
                  <div key={rev.id} className="p-2.5 bg-slate-950 rounded-xl border border-amber-500/40 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{rev.name}</span>
                      <div className="flex gap-1">
                        <button onClick={() => approveReview(rev.id)} className="px-2 py-0.5 bg-emerald-500 text-slate-950 text-[10px] font-black rounded">Aprobar</button>
                        <button onClick={() => deleteReview(rev.id)} className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded">Eliminar</button>
                      </div>
                    </div>
                    <p className="text-slate-300 text-[11px]">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </CollapsibleHeader>
          )}
        </>
      )}

      {/* ── FOOTER ── */}
      {activeSectionId === 'footer' && (
        <>
          <CollapsibleHeader id="footerText" label="✏️ Textos del Pie de Página">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Derechos de Autor</label>
              <input type="text" value={footer?.rights || ''} onChange={(e) => updateFooter({ rights: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white" />
            </div>
          </CollapsibleHeader>

          <CollapsibleHeader id="footerZelle" label="💸 Correo Zelle para Donaciones">
            <input type="email" value={settings?.donationsEmail || ''} onChange={(e) => updateSettings({ donationsEmail: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </CollapsibleHeader>
        </>
      )}

      {/* Empty state */}
      {!activeSectionId && (
        <div className="text-center text-slate-500 text-xs py-10 space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-brand-gold/40" />
          <p className="font-bold">Haz clic sobre cualquier sección o elemento del lienzo para editarlo</p>
        </div>
      )}

    </div>
  );
};
