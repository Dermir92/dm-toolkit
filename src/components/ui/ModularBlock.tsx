'use client';

import { useState } from 'react';

interface ModularBlockProps {
  label: string;
  value: string;
  onReroll?: () => void;
  onEdit?: (newValue: string) => void;
  onDelete?: () => void;
  onSave?: () => void;
  highlight?: boolean;
}

function cap(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ModularBlock({
  label,
  value,
  onReroll,
  onEdit,
  onDelete,
  onSave,
  highlight = false,
}: ModularBlockProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [prevValue, setPrevValue] = useState('');

  const isEmpty = value === '';
  const canRestore = prevValue !== '' && prevValue !== value;

  function handleStartEdit() {
    setDraft(value);
    setEditing(true);
  }

  function handleConfirm() {
    if (onEdit && draft.trim()) onEdit(draft.trim());
    setEditing(false);
  }

  function handleCancel() {
    setDraft(value);
    setEditing(false);
  }

  function handleReroll() {
    if (!onReroll) return;
    setPrevValue(value);
    onReroll();
  }

  function handleDelete() {
    if (!onDelete) return;
    setPrevValue(value);
    onDelete();
  }

  function handleRestore() {
    if (onEdit && prevValue) {
      onEdit(prevValue);
      setPrevValue('');
    }
  }

  return (
    <div
      className={`rounded-xl border flex flex-col transition-all ${
        highlight
          ? 'border-amber-500/30 bg-amber-500/5'
          : isEmpty
          ? 'border-dashed border-zinc-700 bg-zinc-900/40'
          : 'border-zinc-800 bg-zinc-900'
      }`}
    >
      {/* Label row */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2">
        <span className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">{label}</span>
        {canRestore && !isEmpty && (
          <button
            onClick={handleRestore}
            className="text-xs text-zinc-600 hover:text-amber-400 transition-colors"
          >
            ↩ Restore previous
          </button>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        {isEmpty ? (
          <div className="flex items-center gap-3 py-2">
            <span className="text-base text-zinc-600 italic flex-1">Field cleared</span>
            <div className="flex gap-2">
              {onReroll && (
                <button
                  onClick={handleReroll}
                  className="px-3 py-2 text-sm font-medium rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
                >
                  ↺ Regenerate
                </button>
              )}
              {canRestore && onEdit && (
                <button
                  onClick={handleRestore}
                  className="px-3 py-2 text-sm font-medium rounded-lg border border-amber-500/30 text-amber-400/80 hover:text-amber-400 transition-colors"
                >
                  ↩ Restore
                </button>
              )}
            </div>
          </div>
        ) : editing ? (
          <div className="flex flex-col gap-3 pt-1">
            <textarea
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-base text-zinc-100 resize-none focus:outline-none focus:border-amber-500/50 leading-relaxed"
              rows={Math.max(3, Math.ceil(draft.length / 70))}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-zinc-950 hover:bg-amber-400 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-base text-zinc-200 leading-relaxed">{cap(value)}</p>
        )}
      </div>

      {/* Action bar */}
      {!editing && !isEmpty && (
        <div className="flex flex-wrap gap-1 px-4 pb-3 border-t border-zinc-800/60 pt-2">
          {onReroll  && <Btn onClick={handleReroll}    label="↺ Reroll"  />}
          {onEdit    && <Btn onClick={handleStartEdit} label="✎ Edit"    />}
          {onSave    && <Btn onClick={onSave}          label="+ Save"    accent />}
          {onDelete  && <Btn onClick={handleDelete}    label="✕ Delete"  danger />}
          {canRestore && <Btn onClick={handleRestore}  label="↩ Restore" restore />}
        </div>
      )}
    </div>
  );
}

function Btn({ onClick, label, accent, danger, restore }: {
  onClick: () => void;
  label: string;
  accent?: boolean;
  danger?: boolean;
  restore?: boolean;
}) {
  let cls = 'px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ';
  if (danger)        cls += 'text-zinc-500 hover:text-red-400 hover:bg-red-500/10';
  else if (accent)   cls += 'text-amber-400 hover:bg-amber-500/10';
  else if (restore)  cls += 'text-zinc-500 hover:text-amber-400 hover:bg-amber-500/10';
  else               cls += 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800';
  return <button onClick={onClick} className={cls}>{label}</button>;
}
