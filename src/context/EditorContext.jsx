import React, { createContext, useContext, useState } from 'react';

const EditorContext = createContext();

export const EditorProvider = ({ 
  children, 
  isEditorActive = false, 
  onElementSelect,
  onElementAction // Action from floating toolbar: 'edit', 'move', 'delete'
}) => {
  const [activeElementId, setActiveElementId] = useState(null);

  const handleElementSelect = (e, elementInfo) => {
    if (!isEditorActive) return;
    e.stopPropagation();
    setActiveElementId(elementInfo.id);
    if (onElementSelect) {
      onElementSelect(e, elementInfo);
    }
  };

  const handleAction = (action, elementInfo) => {
    if (onElementAction) {
      onElementAction(action, elementInfo);
    }
  };

  return (
    <EditorContext.Provider value={{ 
      isEditorActive, 
      activeElementId, 
      handleElementSelect,
      handleAction
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    return { isEditorActive: false };
  }
  return context;
};
