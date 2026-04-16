'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { SavedItem, SavedItemType } from '@/types';

interface WorkspaceContextValue {
  items: SavedItem[];
  saveItem: (item: Omit<SavedItem, 'id' | 'savedAt'>) => void;
  deleteItem: (id: string) => void;
  getItemsByType: (type: SavedItemType) => SavedItem[];
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SavedItem[]>([]);

  const saveItem = useCallback((item: Omit<SavedItem, 'id' | 'savedAt'>) => {
    const newItem: SavedItem = {
      ...item,
      id: crypto.randomUUID(),
      savedAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getItemsByType = useCallback(
    (type: SavedItemType) => items.filter((item) => item.type === type),
    [items]
  );

  return (
    <WorkspaceContext.Provider value={{ items, saveItem, deleteItem, getItemsByType }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return ctx;
}
