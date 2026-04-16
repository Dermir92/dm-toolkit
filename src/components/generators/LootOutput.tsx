'use client';

import ModularBlock from '@/components/ui/ModularBlock';
import { reroll } from '@/lib/generators';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { LootOutput } from '@/types';

interface Props {
  output: LootOutput;
  onChange: (updated: LootOutput) => void;
}

export default function LootOutputView({ output, onChange }: Props) {
  const { saveItem } = useWorkspace();

  function update<K extends keyof LootOutput>(key: K, value: string) {
    onChange({ ...output, [key]: value });
  }

  function saveLoot() {
    saveItem({
      type: 'loot',
      title: output.name,
      fields: [
        { label: 'Name', value: output.name },
        { label: 'Type', value: output.type },
        { label: 'Flavor', value: output.flavor },
        { label: 'Practical Use', value: output.practicalUse },
        { label: 'Hidden Effect', value: output.hiddenEffect },
      ],
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          onClick={saveLoot}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          ＋ Save Loot to Workspace
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <ModularBlock
          label="Item Name"
          value={output.name}
          highlight
          onReroll={() => update('name', reroll.loot.name())}
          onEdit={(v) => update('name', v)}
          onDelete={() => update('name', '')}
        />
        <ModularBlock
          label="Item Type"
          value={output.type}
          onReroll={() => update('type', reroll.loot.type())}
          onEdit={(v) => update('type', v)}
          onDelete={() => update('type', '')}
        />
      </div>

      <ModularBlock
        label="Flavor & Origin"
        value={output.flavor}
        onReroll={() => update('flavor', reroll.loot.flavor())}
        onEdit={(v) => update('flavor', v)}
        onDelete={() => update('flavor', '')}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <ModularBlock
          label="Practical Use"
          value={output.practicalUse}
          onReroll={() => update('practicalUse', reroll.loot.practicalUse())}
          onEdit={(v) => update('practicalUse', v)}
          onDelete={() => update('practicalUse', '')}
        />
        <ModularBlock
          label="Hidden Cost or Story Hook"
          value={output.hiddenEffect}
          onReroll={() => update('hiddenEffect', reroll.loot.hiddenEffect())}
          onEdit={(v) => update('hiddenEffect', v)}
          onDelete={() => update('hiddenEffect', '')}
        />
      </div>
    </div>
  );
}
