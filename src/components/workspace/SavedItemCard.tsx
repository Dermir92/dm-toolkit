'use client';

import { useState } from 'react';
import type { SavedItem } from '@/types';

interface Props {
  item: SavedItem;
  onDelete: (id: string) => void;
}

const typeColors: Record<string, string> = {
  campaign: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  npc: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  encounter: 'text-red-400 bg-red-500/10 border-red-500/20',
  loot: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  hook: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  session: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
};

const typeLabels: Record<string, string> = {
  campaign: 'Campaign',
  npc: 'NPC',
  encounter: 'Encounter',
  loot: 'Loot',
  hook: 'Hook',
  session: 'Session',
};

export default function SavedItemCard({ item, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = typeColors[item.type] ?? typeColors.hook;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded border ${colorClass}`}
        >
          {typeLabels[item.type]}
        </span>
        <p className="text-sm text-zinc-200 flex-1 truncate">{item.title}</p>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="px-2 py-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {expanded ? 'Hide' : 'View'}
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="px-2 py-1 text-xs text-red-400/60 hover:text-red-400 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Expanded fields */}
      {expanded && (
        <div className="border-t border-zinc-800 px-4 py-3 flex flex-col gap-3">
          {item.fields.map((field) => (
            <div key={field.label}>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                {field.label}
              </span>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                {field.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
