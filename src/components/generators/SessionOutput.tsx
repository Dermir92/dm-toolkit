'use client';

import ModularBlock from '@/components/ui/ModularBlock';
import ModularList from '@/components/ui/ModularList';
import { reroll } from '@/lib/generators';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { SessionOutput } from '@/types';

interface Props {
  output: SessionOutput;
  onChange: (updated: SessionOutput) => void;
}

export default function SessionOutputView({ output, onChange }: Props) {
  const { saveItem } = useWorkspace();

  function update<K extends keyof SessionOutput>(key: K, value: SessionOutput[K]) {
    onChange({ ...output, [key]: value });
  }

  function rerollScene(index: number) {
    const updated = [...output.scenes];
    updated[index] = reroll.session.scene();
    update('scenes', updated);
  }

  function editScene(index: number, value: string) {
    const updated = [...output.scenes];
    updated[index] = value;
    update('scenes', updated);
  }

  function deleteScene(index: number) {
    update('scenes', output.scenes.filter((_, i) => i !== index));
  }

  function addScene() {
    update('scenes', [...output.scenes, reroll.session.scene()]);
  }

  function saveSession() {
    saveItem({
      type: 'session',
      title: output.hook.slice(0, 60) + '…',
      fields: [
        { label: 'Hook', value: output.hook },
        { label: 'Scenes', value: output.scenes.join('\n') },
        { label: 'Conflict', value: output.conflict },
        { label: 'Social Moment', value: output.socialMoment },
        { label: 'Twist', value: output.twist },
        { label: 'Reward', value: output.reward },
        { label: 'Backup Plan', value: output.backupPlan },
      ],
    });
  }

  function saveHook() {
    saveItem({
      type: 'hook',
      title: output.hook.slice(0, 60) + '…',
      fields: [{ label: 'Hook', value: output.hook }],
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Save whole session */}
      <div className="flex justify-end">
        <button
          onClick={saveSession}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          ＋ Save Session to Workspace
        </button>
      </div>

      {/* Hook — highlighted, independently controllable */}
      <ModularBlock
        label="Session Hook"
        value={output.hook}
        highlight
        onReroll={() => update('hook', reroll.session.hook())}
        onEdit={(v) => update('hook', v)}
        onDelete={() => update('hook', '')}
        onSave={saveHook}
      />

      {/* Scenes list */}
      <ModularList
        label="Scenes"
        items={output.scenes}
        onRerollItem={rerollScene}
        onEditItem={editScene}
        onDeleteItem={deleteScene}
        onAddItem={addScene}
        itemLabel="scene"
      />

      {/* Single-value fields in a 2-col grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ModularBlock
          label="Conflict or Encounter"
          value={output.conflict}
          onReroll={() => update('conflict', reroll.session.conflict())}
          onEdit={(v) => update('conflict', v)}
          onDelete={() => update('conflict', '')}
        />
        <ModularBlock
          label="Social Moment"
          value={output.socialMoment}
          onReroll={() => update('socialMoment', reroll.session.socialMoment())}
          onEdit={(v) => update('socialMoment', v)}
          onDelete={() => update('socialMoment', '')}
        />
        <ModularBlock
          label="Twist"
          value={output.twist}
          onReroll={() => update('twist', reroll.session.twist())}
          onEdit={(v) => update('twist', v)}
          onDelete={() => update('twist', '')}
        />
        <ModularBlock
          label="Reward or Consequence"
          value={output.reward}
          onReroll={() => update('reward', reroll.session.reward())}
          onEdit={(v) => update('reward', v)}
          onDelete={() => update('reward', '')}
        />
      </div>

      <ModularBlock
        label="Backup Plan (if players derail)"
        value={output.backupPlan}
        onReroll={() => update('backupPlan', reroll.session.backupPlan())}
        onEdit={(v) => update('backupPlan', v)}
        onDelete={() => update('backupPlan', '')}
      />
    </div>
  );
}
