import React, { useEffect, useRef, useState } from 'react';
import {
  Edit3, Image as ImageIcon, Trash2, Copy, ChevronUp, ChevronDown,
  Star, Sparkles, Type, Link as LinkIcon, Palette, MoreHorizontal,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight, Move
} from 'lucide-react';

/**
 * FloatingToolbar — Wix-style contextual toolbar that floats above any selected element.
 * Appears with a smooth animation on element selection.
 */
export const FloatingToolbar = ({
  targetRef,        // ref to the selected element's DOM node
  selectedElement,  // { type, id, sectionId, label }
  onEdit,
  onChangeImage,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onOpenInspector,
  onOpenTypography,
  visible = false,
}) => {
  const toolbarRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!visible || !targetRef?.current) return;

    const update = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scrollY = window.scrollY || 0;
      // Position above the element
      setPos({
        top: rect.top + scrollY - 52,
        left: rect.left,
        width: rect.width,
      });
    };

    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [visible, targetRef, selectedElement]);

  if (!visible || !selectedElement) return null;

  const isText = selectedElement?.type === 'text' || selectedElement?.type === 'heading' || selectedElement?.type === 'button';
  const isImage = selectedElement?.type === 'image' || selectedElement?.type === 'logo';
  const isCard = selectedElement?.type === 'retreat' || selectedElement?.type === 'product' || selectedElement?.type === 'mission';

  return (
    <div
      ref={toolbarRef}
      className="fixed z-[9998] pointer-events-auto animate-fadeIn"
      style={{
        top: Math.max(8, pos.top),
        left: pos.left,
        width: 'auto',
        maxWidth: pos.width,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-0.5 bg-slate-950/97 backdrop-blur-xl border border-brand-teal/60 rounded-xl px-1.5 py-1 shadow-2xl shadow-brand-teal/20 whitespace-nowrap">

        {/* Element Label */}
        <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider px-2 border-r border-slate-700 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {selectedElement.label || 'Elemento'}
        </span>

        {/* Edit / Inline Edit */}
        {(isText) && (
          <button
            onClick={onEdit}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white hover:bg-brand-teal/30 hover:text-brand-teal transition-colors"
            title="Editar texto (doble clic)"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>
        )}

        {/* Typography for text elements */}
        {isText && (
          <button
            onClick={onOpenTypography}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white hover:bg-violet-500/20 hover:text-violet-300 transition-colors"
            title="Cambiar tipografía, color y estilo"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Estilo</span>
          </button>
        )}

        {/* Change Image */}
        {(isImage || isCard) && (
          <button
            onClick={onChangeImage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white hover:bg-brand-gold/20 hover:text-brand-gold transition-colors"
            title="Cambiar imagen o generar con IA"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Imagen</span>
          </button>
        )}

        {/* Open Full Inspector */}
        <button
          onClick={onOpenInspector}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white hover:bg-slate-700 transition-colors"
          title="Abrir editor completo en panel derecho"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
          <span>Más</span>
        </button>

        <div className="w-px h-5 bg-slate-700 mx-0.5" />

        {/* Move Up / Down */}
        <button
          onClick={onMoveUp}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Mover sección arriba"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onMoveDown}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Mover sección abajo"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-5 bg-slate-700 mx-0.5" />

        {/* Delete */}
        {isCard && (
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/50 transition-colors"
            title="Eliminar elemento"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Pointer arrow below toolbar */}
      <div className="ml-6 w-3 h-2 overflow-hidden">
        <div className="w-3 h-3 bg-slate-950 border-l border-b border-brand-teal/60 rotate-45 origin-top-left translate-x-px" />
      </div>
    </div>
  );
};
