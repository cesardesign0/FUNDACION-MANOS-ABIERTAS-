import React, { useRef, useState, useEffect } from 'react';

/**
 * InlineEditText — Wix-style inline text editing.
 * Single click = select. Double click = edit inline (contentEditable).
 * Tab / Enter / Escape / blur = confirm edit.
 */
export const InlineEditText = ({
  value = '',
  onChange,
  className = '',
  tag: Tag = 'span',
  placeholder = 'Clic para editar...',
  multiline = false,
  isEditorActive = false,   // Only activates in editor mode
  style = {},
}) => {
  const ref = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
    if (ref.current && !isEditing) {
      ref.current.textContent = value;
    }
  }, [value, isEditing]);

  const startEdit = (e) => {
    if (!isEditorActive) return;
    e.stopPropagation();
    setIsEditing(true);
    if (ref.current) {
      ref.current.contentEditable = 'true';
      ref.current.focus();
      // Place cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const finishEdit = () => {
    if (!isEditing) return;
    setIsEditing(false);
    const newVal = ref.current?.textContent?.trim() || '';
    if (ref.current) ref.current.contentEditable = 'false';
    if (newVal !== value) {
      setLocalValue(newVal);
      if (onChange) onChange(newVal);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      ref.current.textContent = value; // Revert
      setIsEditing(false);
      if (ref.current) ref.current.contentEditable = 'false';
      return;
    }
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      finishEdit();
    }
  };

  return (
    <Tag
      ref={ref}
      onDoubleClick={startEdit}
      onBlur={finishEdit}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      data-placeholder={placeholder}
      className={`${className} ${
        isEditorActive
          ? isEditing
            ? 'outline-none ring-2 ring-brand-teal bg-brand-teal/10 rounded px-1 cursor-text'
            : 'cursor-pointer hover:underline hover:decoration-dashed hover:decoration-brand-gold'
          : ''
      }`}
      style={style}
    >
      {localValue || (isEditorActive ? placeholder : '')}
    </Tag>
  );
};
