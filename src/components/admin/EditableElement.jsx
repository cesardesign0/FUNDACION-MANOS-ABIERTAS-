import React, { useRef } from 'react';
import { useEditor } from '../../context/EditorContext';

export const EditableElement = ({ 
  children, 
  elementInfo, // { type, id, sectionId, label, movable, deletable, data }
  className = '',
  inline = false
}) => {
  const { isEditorActive, handleElementSelect, activeElementId } = useEditor();
  const elementRef = useRef(null);

  if (!isEditorActive) {
    return <>{children}</>;
  }

  const isSelected = activeElementId === elementInfo.id;
  const Comp = inline ? 'span' : 'div';

  return (
    <Comp
      ref={elementRef}
      className={`relative cursor-pointer transition-all ${className} ${
        isSelected 
          ? 'ring-2 ring-brand-teal ring-offset-2 ring-offset-slate-900 z-10' 
          : 'hover:ring-2 hover:ring-brand-gold/50 hover:ring-offset-1'
      }`}
      onDoubleClick={(e) => {
        // We use double click as requested by user to open the floating menu / select
        const rect = elementRef.current.getBoundingClientRect();
        handleElementSelect(e, { ...elementInfo, rect });
      }}
      onClick={(e) => {
        // Prevent default navigation if clicking links inside the editor
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {children}
    </Comp>
  );
};
