'use client';

import { useState } from 'react';
import ModularBlock from '@/components/ui/ModularBlock';
import ModularList from '@/components/ui/ModularList';
import { reroll } from '@/lib/generators';
import { useWorkspace } from '@/context/WorkspaceContext';
import type { CampaignOutput } from '@/types';

interface Props {
  output: CampaignOutput;
  onChange: (updated: CampaignOutput) => void;
}

export default function CampaignOutputView({ output, onChange }: Props) {
  const { saveItem } = useWorkspace();

  function update<K extends keyof CampaignOutput>(key: K, value: CampaignOutput[K]) {
    onChange({ ...output, [key]: value });
  }

  function rerollArc(index: number) {
    const updated = [...output.arcs];
    updated[index] = reroll.campaign.arc();
    update('arcs', updated);
  }

  function editArc(index: number, value: string) {
    const updated = [...output.arcs];
    updated[index] = value;
    update('arcs', updated);
  }

  function deleteArc(index: number) {
    update('arcs', output.arcs.filter((_, i) => i !== index));
  }

  function addArc() {
    update('arcs', [...output.arcs, reroll.campaign.arc()]);
  }

  function rerollHook(index: number) {
    const updated = [...output.hooks];
    updated[index] = reroll.campaign.hook();
    update('hooks', updated);
  }

  function editHook(index: number, value: string) {
    const updated = [...output.hooks];
    updated[index] = value;
    update('hooks', updated);
  }

  function deleteHook(index: number) {
    update('hooks', output.hooks.filter((_, i) => i !== index));
  }

  function addHook() {
    update('hooks', [...output.hooks, reroll.campaign.hook()]);
  }

  function saveCampaign() {
    saveItem({
      type: 'campaign',
      title: output.premise.slice(0, 60) + (output.premise.length > 60 ? '…' : ''),
      fields: [
        { label: 'Premise', value: output.premise },
        { label: 'Main Conflict', value: output.mainConflict },
        { label: 'Villain', value: output.villain },
        { label: 'Arcs', value: output.arcs.join('\n') },
        { label: 'Hooks', value: output.hooks.join('\n') },
        { label: 'Finale', value: output.finaleIdea },
      ],
    });
  }

  function saveHook(index: number) {
    saveItem({
      type: 'hook',
      title: output.hooks[index].slice(0, 60) + '…',
      fields: [{ label: 'Hook', value: output.hooks[index] }],
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Save whole campaign button */}
      <div className="flex justify-end">
        <button
          onClick={saveCampaign}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          ＋ Save Campaign to Workspace
        </button>
      </div>

      <ModularBlock
        label="Campaign Premise"
        value={output.premise}
        highlight
        onReroll={() => update('premise', reroll.campaign.premise())}
        onEdit={(v) => update('premise', v)}
        onDelete={() => update('premise', '')}
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <ModularBlock
          label="Main Conflict"
          value={output.mainConflict}
          onReroll={() => update('mainConflict', reroll.campaign.mainConflict())}
          onEdit={(v) => update('mainConflict', v)}
          onDelete={() => update('mainConflict', '')}
        />
        <ModularBlock
          label="Villain or Threat"
          value={output.villain}
          onReroll={() => update('villain', reroll.campaign.villain())}
          onEdit={(v) => update('villain', v)}
          onDelete={() => update('villain', '')}
        />
      </div>

      <ModularList
        label="Story Arcs"
        items={output.arcs}
        onRerollItem={rerollArc}
        onEditItem={editArc}
        onDeleteItem={deleteArc}
        onAddItem={addArc}
        itemLabel="arc"
      />

      <ModularList
        label="Campaign Hooks"
        items={output.hooks}
        onRerollItem={rerollHook}
        onEditItem={editHook}
        onDeleteItem={deleteHook}
        onAddItem={addHook}
        onSaveItem={saveHook}
        itemLabel="hook"
      />

      <ModularBlock
        label="Finale Idea"
        value={output.finaleIdea}
        onReroll={() => update('finaleIdea', reroll.campaign.finaleIdea())}
        onEdit={(v) => update('finaleIdea', v)}
        onDelete={() => update('finaleIdea', '')}
      />
    </div>
  );
}
