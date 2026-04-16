'use client';

import ModularBlock from '@/components/ui/ModularBlock';
import { reroll } from '@/lib/generators';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { EncounterOutput } from '@/types';

interface Props {
  output: EncounterOutput;
  onChange: (updated: EncounterOutput) => void;
}

export default function EncounterOutputView({ output, onChange }: Props) {
  const { saveItem } = useWorkspace();

  function update<K extends keyof EncounterOutput>(key: K, value: string) {
    onChange({ ...output, [key]: value });
  }

  function saveEncounter() {
    saveItem({
      type: 'encounter',
      title: output.enemyType.slice(0, 60) + '…',
      fields: [
        { label: 'Purpose', value: output.purpose },
        { label: 'Enemy Type', value: output.enemyType },
        { label: 'Terrain', value: output.terrain },
        { label: 'Complication', value: output.complication },
        { label: 'Twist', value: output.twist },
        { label: 'Reward', value: output.reward },
      ],
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button
          onClick={saveEncounter}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          ＋ Save Encounter to Workspace
        </button>
      </div>

      <ModularBlock
        label="Encounter Purpose"
        value={output.purpose}
        highlight
        onReroll={() => update('purpose', reroll.encounter.purpose())}
        onEdit={(v) => update('purpose', v)}
        onDelete={() => update('purpose', '')}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <ModularBlock
          label="Enemy Type"
          value={output.enemyType}
          onReroll={() => update('enemyType', reroll.encounter.enemyType())}
          onEdit={(v) => update('enemyType', v)}
          onDelete={() => update('enemyType', '')}
        />
        <ModularBlock
          label="Terrain Feature"
          value={output.terrain}
          onReroll={() => update('terrain', reroll.encounter.terrain())}
          onEdit={(v) => update('terrain', v)}
          onDelete={() => update('terrain', '')}
        />
        <ModularBlock
          label="Tactical Complication"
          value={output.complication}
          onReroll={() => update('complication', reroll.encounter.complication())}
          onEdit={(v) => update('complication', v)}
          onDelete={() => update('complication', '')}
        />
        <ModularBlock
          label="Twist or Escalation"
          value={output.twist}
          onReroll={() => update('twist', reroll.encounter.twist())}
          onEdit={(v) => update('twist', v)}
          onDelete={() => update('twist', '')}
        />
      </div>

      <ModularBlock
        label="Reward or Consequence"
        value={output.reward}
        onReroll={() => update('reward', reroll.encounter.reward())}
        onEdit={(v) => update('reward', v)}
        onDelete={() => update('reward', '')}
      />
    </div>
  );
}
