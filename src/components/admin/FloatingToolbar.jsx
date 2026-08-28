import React, { useEffect, useState } from 'react';
import { Edit3, Move, Trash2, Sparkles, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export const FloatingToolbar = ({
  targetRect,        // { top, left, width, height } of the target element
  selectedElement,  // { type, id, sectionId, label, ... }
  onAction,         // (actionName) => void
  visible = false,
}) => {
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (!visible || !targetRect) return;
    
    // Position slightly above the element
    const scrollY = window.scrollY || 0;
    setPos({
      top: targetRect.top + scrollY - 48, // 48px above
      left: targetRect.left,
      width: targetRect.width,
    });
  }, [visible, targetRect]);

  if (!visible || !selectedElement) return null;

  return (
    <div
      className="fixed z-[9998] pointer-events-auto animate-fadeIn"
      style={{
        top: Math.max(8, pos.top),
        left: Math.max(8, pos.left),
      }}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()} // Prevent double clicks passing through
    >
      <div className="flex items-center gap-1 bg-slate-950/95 backdrop-blur-xl border border-brand-teal/50 rounded-xl px-2 py-1.5 shadow-2xl shadow-brand-teal/20 whitespace-nowrap">
        
        {/* Label */}
        <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider px-2 border-r border-slate-700 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {selectedElement.label || 'Elemento'}
        </span>

        {/* Editar */}
        <button
          onClick={(e) => { e.stopPropagation(); onAction('edit'); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:bg-brand-teal/20 hover:text-brand-teal transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          <span>Editar</span>
        </button>

        {/* Mover (if the element is movable, e.g. card, button) */}
        {selectedElement.movable && (
          <div className="flex items-center border-l border-slate-700 pl-1 ml-1">
             <button
                onClick={(e) => { e.stopPropagation(); onAction('moveLeft'); }}
                className="p-1.5 rounded-lg text-slate-300 hover:text-brand-teal hover:bg-slate-800 transition-colors"
                title="Mover Izquierda/Arriba"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onAction('moveRight'); }}
                className="p-1.5 rounded-lg text-slate-300 hover:text-brand-teal hover:bg-slate-800 transition-colors"
                title="Mover Derecha/Abajo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
          </div>
        )}

        {/* Eliminar (if the element is deletable) */}
        {selectedElement.deletable && (
          <div className="flex items-center border-l border-slate-700 pl-1 ml-1">
            <button
              onClick={(e) => { e.stopPropagation(); onAction('delete'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:bg-rose-900/50 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          </div>
        )}
      </div>

      {/* Pointer arrow below toolbar */}
      <div className="ml-6 w-3 h-2 overflow-hidden">
        <div className="w-3 h-3 bg-slate-950 border-l border-b border-brand-teal/50 rotate-45 origin-top-left translate-x-px" />
      </div>
    </div>
  );
};
