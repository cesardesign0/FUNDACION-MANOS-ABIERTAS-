import React from 'react';
import { 
  Bold, Italic, Type, AlignLeft, AlignCenter, AlignRight, 
  Palette, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, 
  ExternalLink, Heart, Users, Calendar, ShoppingBag, Sparkles, ArrowRight, Church
} from 'lucide-react';

// Preset color options for quick one-click selection
export const QUICK_COLORS = [
  { name: 'Dorado Celestial', hex: '#E5A93C', bg: 'bg-[#E5A93C]' },
  { name: 'Rojo Coral', hex: '#E05A47', bg: 'bg-[#E05A47]' },
  { name: 'Verde Teal', hex: '#2BBEC9', bg: 'bg-[#2BBEC9]' },
  { name: 'Blanco Puro', hex: '#FFFFFF', bg: 'bg-white' },
  { name: 'Ámbar Cálido', hex: '#F59E0B', bg: 'bg-[#F59E0B]' },
  { name: 'Esmeralda', hex: '#10B981', bg: 'bg-[#10B981]' },
  { name: 'Azul Noche', hex: '#0F172A', bg: 'bg-[#0F172A]' },
  { name: 'Gris Plata', hex: '#94A3B8', bg: 'bg-[#94A3B8]' }
];

export const FONT_OPTIONS = [
  { label: '✍️ Manuscrita / Cursiva', value: 'font-handwritten' },
  { label: '📖 Elegante Clásica (Serif)', value: 'font-serif' },
  { label: '🏛️ Título Moderno (Display)', value: 'font-display' },
  { label: '🔤 Sans Limpia y Clara', value: 'font-sans' }
];

export const SIZE_OPTIONS = [
  { label: 'S (Pequeño)', value: 'text-sm' },
  { label: 'M (Normal)', value: 'text-base' },
  { label: 'L (Mediano)', value: 'text-xl' },
  { label: 'XL (Grande)', value: 'text-2xl' },
  { label: '2XL (Muy Grande)', value: 'text-3xl' },
  { label: '3XL (Gigante)', value: 'text-5xl' },
  { label: '4XL (Impacto)', value: 'text-6xl' }
];

/**
 * TypographyToolbar - Barra de herramientas estilo "Mini Word" para corregir y personalizar
 * tipografía, negritas, cursiva, mayúsculas, color y tamaño de cualquier texto.
 */
export const TypographyToolbar = ({ 
  styles = {}, 
  fieldPrefix = 'title', 
  onChangeStyle,
  title = "Formato de Texto" 
}) => {
  const currentFont = styles[`${fieldPrefix}_font`] || 'font-sans';
  const currentSize = styles[`${fieldPrefix}_size`] || 'text-base';
  const currentColor = styles[`${fieldPrefix}_color`] || '#FFFFFF';
  const isBold = styles[`${fieldPrefix}_weight`] === 'font-bold' || styles[`${fieldPrefix}_weight`] === 'font-black';
  const isItalic = !!styles[`${fieldPrefix}_italic`];
  const isUppercase = styles[`${fieldPrefix}_case`] === 'uppercase';
  const currentAlign = styles[`${fieldPrefix}_align`] || 'text-left';

  const toggleBold = () => {
    onChangeStyle(`${fieldPrefix}_weight`, isBold ? 'font-normal' : 'font-bold');
  };

  const toggleItalic = () => {
    onChangeStyle(`${fieldPrefix}_italic`, !isItalic);
  };

  const toggleUppercase = () => {
    onChangeStyle(`${fieldPrefix}_case`, isUppercase ? 'normal-case' : 'uppercase');
  };

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-2 mb-2 flex flex-wrap items-center justify-between gap-2 text-xs shadow-inner">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 mr-1 flex items-center gap-1">
          <Type className="w-3 h-3 text-brand-gold" />
          <span>{title}:</span>
        </span>

        {/* 1. Selector de Fuente */}
        <select
          value={currentFont}
          onChange={(e) => onChangeStyle(`${fieldPrefix}_font`, e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-[11px] font-semibold focus:border-brand-teal outline-none"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        {/* 2. Selector de Tamaño */}
        <select
          value={currentSize}
          onChange={(e) => onChangeStyle(`${fieldPrefix}_size`, e.target.value)}
          className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-[11px] font-semibold focus:border-brand-teal outline-none"
        >
          {SIZE_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <div className="h-4 w-px bg-slate-700 mx-0.5" />

        {/* 3. Botón Negrita [B] */}
        <button
          type="button"
          onClick={toggleBold}
          title="Alternar Negrita"
          className={`p-1.5 rounded-lg font-black transition-all ${
            isBold 
              ? 'bg-brand-gold text-slate-950 shadow-xs' 
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        {/* 4. Botón Cursiva [I] */}
        <button
          type="button"
          onClick={toggleItalic}
          title="Alternar Cursiva"
          className={`p-1.5 rounded-lg italic font-serif transition-all ${
            isItalic 
              ? 'bg-brand-gold text-slate-950 shadow-xs' 
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        {/* 5. Botón Mayúsculas [aA] */}
        <button
          type="button"
          onClick={toggleUppercase}
          title="Alternar MAYÚSCULAS"
          className={`px-2 py-1 rounded-lg text-[10px] font-black transition-all ${
            isUppercase 
              ? 'bg-brand-gold text-slate-950 shadow-xs' 
              : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
          }`}
        >
          aA
        </button>

        <div className="h-4 w-px bg-slate-700 mx-0.5" />

        {/* 6. Alineación */}
        <div className="flex items-center gap-0.5 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
          <button
            type="button"
            onClick={() => onChangeStyle(`${fieldPrefix}_align`, 'text-left')}
            className={`p-1 rounded ${currentAlign === 'text-left' ? 'bg-brand-teal text-white' : 'text-slate-400 hover:text-white'}`}
            title="Alinear a la Izquierda"
          >
            <AlignLeft className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => onChangeStyle(`${fieldPrefix}_align`, 'text-center')}
            className={`p-1 rounded ${currentAlign === 'text-center' ? 'bg-brand-teal text-white' : 'text-slate-400 hover:text-white'}`}
            title="Alinear al Centro"
          >
            <AlignCenter className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => onChangeStyle(`${fieldPrefix}_align`, 'text-right')}
            className={`p-1 rounded ${currentAlign === 'text-right' ? 'bg-brand-teal text-white' : 'text-slate-400 hover:text-white'}`}
            title="Alinear a la Derecha"
          >
            <AlignRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 7. Paleta de Colores Rápidos */}
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] text-slate-400">Color:</span>
        <div className="flex items-center gap-1">
          {QUICK_COLORS.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => onChangeStyle(`${fieldPrefix}_color`, c.hex)}
              title={c.name}
              className={`w-4 h-4 rounded-full border border-slate-600 transition-transform ${c.bg} ${
                currentColor.toLowerCase() === c.hex.toLowerCase() ? 'scale-125 ring-2 ring-white ring-offset-1 ring-offset-slate-900' : 'hover:scale-110'
              }`}
            />
          ))}
        </div>
        {/* Custom Color Input */}
        <input
          type="color"
          value={currentColor.startsWith('#') ? currentColor : '#FFFFFF'}
          onChange={(e) => onChangeStyle(`${fieldPrefix}_color`, e.target.value)}
          className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
          title="Color Personalizado"
        />
      </div>
    </div>
  );
};

/**
 * ButtonStudio - Constructor visual de botones para crear, mover, cambiar estilo,
 * forma y destino de los botones de acción.
 */
export const ButtonStudio = ({ buttons = [], onChangeButtons }) => {
  
  const handleAddButton = () => {
    const newBtn = {
      id: `btn-${Date.now()}`,
      label: 'Nuevo Botón',
      action: 'donate',
      customUrl: '',
      variant: 'coral',
      shape: 'pill',
      icon: 'heart',
      visible: true
    };
    onChangeButtons([...buttons, newBtn]);
  };

  const handleUpdate = (id, fields) => {
    onChangeButtons(buttons.map(b => b.id === id ? { ...b, ...fields } : b));
  };

  const handleDelete = (id) => {
    onChangeButtons(buttons.filter(b => b.id !== id));
  };

  const handleMove = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= buttons.length) return;
    const newButtons = [...buttons];
    const temp = newButtons[index];
    newButtons[index] = newButtons[newIndex];
    newButtons[newIndex] = temp;
    onChangeButtons(newButtons);
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Constructor y Editor de Botones ({buttons.length})</span>
          </span>
          <p className="text-[11px] text-slate-400">
            Agrega, quita, mueve y cambia la forma o color de los botones de la portada.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddButton}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-coral hover:bg-brand-coral-dark text-white font-bold text-xs shadow-md hover:scale-105 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Agregar Botón</span>
        </button>
      </div>

      {buttons.length === 0 ? (
        <div className="text-center py-4 text-xs text-slate-500 bg-slate-950 rounded-xl border border-slate-800">
          No hay botones activos. Haz clic en "Agregar Botón" para crear uno.
        </div>
      ) : (
        <div className="space-y-3">
          {buttons.map((btn, idx) => (
            <div 
              key={btn.id} 
              className={`p-3.5 rounded-2xl bg-slate-950 border transition-all ${
                btn.visible !== false ? 'border-slate-800' : 'border-slate-800 opacity-60'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                
                {/* 1. Reordenar y Visibilidad */}
                <div className="sm:col-span-2 flex items-center gap-1">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, -1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                    title="Mover arriba"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === buttons.length - 1}
                    onClick={() => handleMove(idx, 1)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                    title="Mover abajo"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdate(btn.id, { visible: btn.visible === false ? true : false })}
                    className={`p-1 rounded-lg transition-colors ${
                      btn.visible !== false ? 'text-teal-400 bg-teal-950/40' : 'text-slate-500 bg-slate-800'
                    }`}
                    title={btn.visible !== false ? 'Ocultar botón' : 'Mostrar botón'}
                  >
                    {btn.visible !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* 2. Texto del Botón */}
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={btn.label}
                    onChange={(e) => handleUpdate(btn.id, { label: e.target.value })}
                    placeholder="Texto del botón"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-xs"
                  />
                </div>

                {/* 3. Acción / Destino */}
                <div className="sm:col-span-2">
                  <select
                    value={btn.action}
                    onChange={(e) => handleUpdate(btn.id, { action: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px]"
                  >
                    <option value="donate">Donar (Modal)</option>
                    <option value="volunteer">Voluntariado</option>
                    <option value="programs">Ver Misiones</option>
                    <option value="retreats">Calendario Retiros</option>
                    <option value="about">Casa de Ayuda</option>
                    <option value="shop">Tienda Solidaria</option>
                    <option value="custom_url">Link Web Externo</option>
                  </select>
                </div>

                {/* 4. Color / Estilo */}
                <div className="sm:col-span-2">
                  <select
                    value={btn.variant || 'coral'}
                    onChange={(e) => handleUpdate(btn.id, { variant: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px]"
                  >
                    <option value="coral">🔴 Rojo Coral</option>
                    <option value="teal">🟢 Verde Teal</option>
                    <option value="gold">🟡 Dorado Brillo</option>
                    <option value="glass">⚪ Blanco Cristal</option>
                    <option value="outline-gold">🔲 Borde Dorado</option>
                    <option value="outline-white">🔲 Borde Blanco</option>
                  </select>
                </div>

                {/* 5. Forma */}
                <div className="sm:col-span-2">
                  <select
                    value={btn.shape || 'pill'}
                    onChange={(e) => handleUpdate(btn.id, { shape: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px]"
                  >
                    <option value="pill">💊 Píldora Redonda</option>
                    <option value="smooth">🔲 Esquinas Suaves</option>
                    <option value="square">⏹️ Rectangular</option>
                  </select>
                </div>

                {/* 6. Eliminar */}
                <div className="sm:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(btn.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white transition-colors"
                    title="Eliminar botón"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* Si es URL personalizada */}
              {btn.action === 'custom_url' && (
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="https://..."
                    value={btn.customUrl || ''}
                    onChange={(e) => handleUpdate(btn.id, { customUrl: e.target.value })}
                    className="flex-1 px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
