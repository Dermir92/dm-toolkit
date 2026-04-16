'use client';

import { useState } from 'react';
import ModularBlock from '@/components/ui/ModularBlock';
import { reroll } from '@/lib/generators';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { NpcOutput } from '@/types';

interface Props {
  output: NpcOutput;
  onChange: (updated: NpcOutput) => void;
  onClear: () => void;
}

export default function NpcOutputView({ output, onChange, onClear }: Props) {
  const { saveItem } = useWorkspace();
  const [saved, setSaved] = useState(false);

  function update<K extends keyof NpcOutput>(key: K, value: string) {
    onChange({ ...output, [key]: value });
  }

  function saveNpc() {
    saveItem({
      type: 'npc',
      title: output.name || 'Unnamed NPC',
      fields: [
        { label: 'Name',             value: output.name },
        { label: 'Role',             value: output.role },
        { label: 'Personality',      value: output.personality },
        { label: 'Goal',             value: output.goal },
        { label: 'Secret',           value: output.secret },
        { label: 'Memorable Trait',  value: output.memorableTrait },
        { label: 'Story Connection', value: output.storyConnection },
      ].filter((f) => f.value !== ''),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={onClear}
          className="px-4 py-2.5 text-base font-medium rounded-lg border border-zinc-700 text-zinc-500 hover:text-red-400 hover:border-red-500/40 transition-colors"
        >
          Clear NPC
        </button>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-sm font-medium text-emerald-400">
              ✓ Saved to Workspace
            </span>
          )}
          <button
            onClick={saveNpc}
            className={`px-4 py-2.5 text-base font-medium rounded-lg border transition-colors ${
              saved
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            }`}
          >
            {saved ? '✓ Saved' : '+ Save to Workspace'}
          </button>
        </div>
      </div>

      <ModularBlock label="Name" value={output.name} highlight
        onReroll={() => update('name', reroll.npc.name())}
        onEdit={(v) => update('name', v)}
        onDelete={() => update('name', '')}
      />

      <ModularBlock label="Role" value={output.role}
        onReroll={() => update('role', reroll.npc.role())}
        onEdit={(v) => update('role', v)}
        onDelete={() => update('role', '')}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <ModularBlock label="Personality" value={output.personality}
          onReroll={() => update('personality', reroll.npc.personality())}
          onEdit={(v) => update('personality', v)}
          onDelete={() => update('personality', '')}
        />
        <ModularBlock label="Goal" value={output.goal}
          onReroll={() => update('goal', reroll.npc.goal())}
          onEdit={(v) => update('goal', v)}
          onDelete={() => update('goal', '')}
        />
        <ModularBlock label="Secret" value={output.secret}
          onReroll={() => update('secret', reroll.npc.secret())}
          onEdit={(v) => update('secret', v)}
          onDelete={() => update('secret', '')}
        />
        <ModularBlock label="Memorable Trait" value={output.memorableTrait}
          onReroll={() => update('memorableTrait', reroll.npc.memorableTrait())}
          onEdit={(v) => update('memorableTrait', v)}
          onDelete={() => update('memorableTrait', '')}
        />
      </div>

      <ModularBlock label="Story Connection" value={output.storyConnection}
        onReroll={() => update('storyConnection', reroll.npc.storyConnection())}
        onEdit={(v) => update('storyConnection', v)}
        onDelete={() => update('storyConnection', '')}
      />
    </div>
  );
}
