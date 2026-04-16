'use client';

import ModularBlock from './ModularBlock';

interface ModularListProps {
  label: string;
  items: string[];
  onRerollItem: (index: number) => void;
  onEditItem: (index: number, newValue: string) => void;
  onDeleteItem: (index: number) => void;
  onAddItem: () => void;
  onSaveItem?: (index: number) => void;
  itemLabel?: string;
}

export default function ModularList({
  label,
  items,
  onRerollItem,
  onEditItem,
  onDeleteItem,
  onAddItem,
  onSaveItem,
  itemLabel = 'item',
}: ModularListProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-300">{label}</h3>
        <button
          onClick={onAddItem}
          className="px-3 py-2 text-sm font-medium rounded-lg border border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
        >
          + Add {itemLabel}
        </button>
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-700 p-8 text-center">
          <p className="text-base text-zinc-500 mb-3">No {label.toLowerCase()} yet.</p>
          <button
            onClick={onAddItem}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
          >
            Generate one
          </button>
        </div>
      )}

      {items.map((item, index) => (
        <ModularBlock
          key={index}
          label={`${itemLabel} ${index + 1}`}
          value={item}
          onReroll={() => onRerollItem(index)}
          onEdit={(v) => onEditItem(index, v)}
          onDelete={() => onDeleteItem(index)}
          onSave={onSaveItem ? () => onSaveItem(index) : undefined}
        />
      ))}
    </div>
  );
}
