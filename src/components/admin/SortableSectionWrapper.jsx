import React, { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Trash2 } from 'lucide-react';

/**
 * SortableSectionWrapper — Wix-style drag & drop section block
 * Wraps each page section with a reorder handle and visibility toggle.
 */
export const SortableSectionWrapper = ({
  id,
  sectionName,
  isVisible,
  isSelected,
  onSelect,
  onToggleVisibility,
  children
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : 'auto',
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group transition-all ${
        isDragging ? 'shadow-2xl scale-[1.01] ring-4 ring-brand-teal rounded-2xl' : ''
      } ${!isVisible ? 'opacity-40' : ''}`}
    >
      {/* ======================================================= */}
      {/* SECTION CONTROL BAR — appears on hover / when selected  */}
      {/* ======================================================= */}
      <div className={`absolute -top-10 left-0 right-0 z-50 flex items-center justify-between px-3 h-10
        bg-slate-950/95 backdrop-blur-md border border-brand-teal/60 rounded-t-xl shadow-xl
        transition-all duration-200
        ${isSelected
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto'
        }`}
      >
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white cursor-grab active:cursor-grabbing px-1.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Arrastra para mover esta sección"
        >
          <GripVertical className="w-4 h-4" />
          <span className="text-[11px] font-bold truncate max-w-[140px]">{sectionName}</span>
        </div>

        {/* Section Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleVisibility}
            className={`p-1.5 rounded-lg transition-colors text-xs font-bold ${
              isVisible
                ? 'text-emerald-400 hover:bg-emerald-950/50'
                : 'text-rose-400 hover:bg-rose-950/50'
            }`}
            title={isVisible ? 'Ocultar sección de la web' : 'Mostrar sección en la web'}
          >
            {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* SELECTION RING — Wix-style blue border when selected    */}
      {/* ======================================================= */}
      <div
        onClick={onSelect}
        className={`relative transition-all duration-150 ${
          isSelected
            ? 'ring-4 ring-brand-teal ring-offset-0 rounded-sm shadow-[0_0_0_4px_rgba(43,190,201,0.25)]'
            : 'hover:ring-2 hover:ring-dashed hover:ring-brand-gold/60 cursor-pointer'
        }`}
      >
        {/* Edit hint badge — shows on hover when not selected */}
        {!isSelected && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-slate-950/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border border-brand-gold/50 shadow-xl flex items-center gap-1.5 whitespace-nowrap">
              <span>✏️ Clic para editar · Arrastra el handle para mover</span>
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
