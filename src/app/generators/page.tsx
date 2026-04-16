'use client';

import { useState } from 'react';
import type {
  GeneratorType, NpcOutput, CampaignOutput,
  SessionOutput, EncounterOutput, LootOutput,
} from '@/types';
import {
  generateNpc, generateCampaign, generateSession,
  generateEncounter, generateLoot,
} from '@/lib/generators';
import NpcOutputView      from '@/components/generators/NpcOutput';
import CampaignOutputView from '@/components/generators/CampaignOutput';
import SessionOutputView  from '@/components/generators/SessionOutput';
import EncounterOutputView from '@/components/generators/EncounterOutput';
import LootOutputView     from '@/components/generators/LootOutput';

const TABS: { type: GeneratorType; label: string; icon: string }[] = [
  { type: 'npc',       label: 'NPC',       icon: '🧙' },
  { type: 'campaign',  label: 'Campaign',  icon: '🗺' },
  { type: 'session',   label: 'Session',   icon: '📜' },
  { type: 'encounter', label: 'Encounter', icon: '⚔'  },
  { type: 'loot',      label: 'Loot',      icon: '💎' },
];

const FORMS: Record<GeneratorType, { id: string; label: string; options: string[] }[]> = {
  npc: [
    { id: 'role',    label: 'Role',    options: ['Any', 'Ally', 'Rival', 'Villain', 'Neutral', 'Quest Giver', 'Merchant', 'Authority Figure'] },
    { id: 'setting', label: 'Setting', options: ['Any', 'Urban', 'Rural', 'Wilderness', 'Dungeon', 'Royal Court', 'Tavern', 'Port City'] },
  ],
  campaign: [
    { id: 'tone',   label: 'Tone',            options: ['Any', 'High Fantasy', 'Dark Fantasy', 'Political Intrigue', 'Cosmic Horror', 'Heroic Adventure'] },
    { id: 'length', label: 'Campaign Length', options: ['Any', 'One-shot', 'Short (5–10)', 'Medium (15–20)', 'Long (30+)'] },
    { id: 'level',  label: 'Party Level',     options: ['Any', 'Levels 1–4', 'Levels 5–8', 'Levels 9–12', 'Levels 13–20'] },
  ],
  session: [
    { id: 'focus', label: 'Session Focus', options: ['Any', 'Action/Combat', 'Exploration', 'Social/Roleplay', 'Mystery', 'Heist', 'Mixed'] },
    { id: 'tone',  label: 'Tone',          options: ['Any', 'Tense', 'Lighthearted', 'Epic', 'Dark', 'Mysterious'] },
  ],
  encounter: [
    { id: 'difficulty',  label: 'Difficulty',  options: ['Any', 'Easy', 'Medium', 'Hard', 'Deadly'] },
    { id: 'environment', label: 'Environment', options: ['Any', 'Forest', 'Dungeon', 'City', 'Sea', 'Mountain', 'Ruins', 'Underground'] },
    { id: 'partySize',   label: 'Party Size',  options: ['Any', '2', '3', '4', '5', '6'] },
  ],
  loot: [
    { id: 'rarity',   label: 'Rarity',    options: ['Any', 'Common', 'Uncommon', 'Rare', 'Very Rare', 'Legendary'] },
    { id: 'itemType', label: 'Item Type', options: ['Any', 'Weapon', 'Armor', 'Trinket', 'Consumable', 'Wondrous Item', 'Ring', 'Amulet'] },
  ],
};

function buildDefaultFormValues(): Record<GeneratorType, Record<string, string>> {
  const result = {} as Record<GeneratorType, Record<string, string>>;
  for (const [type, fields] of Object.entries(FORMS) as [GeneratorType, typeof FORMS.npc][]) {
    result[type] = Object.fromEntries(fields.map((f) => [f.id, f.options[0]]));
  }
  return result;
}

export default function GeneratorsPage() {
  const [activeType,      setActiveType]      = useState<GeneratorType>('npc');
  const [formValues,      setFormValues]      = useState(buildDefaultFormValues);
  const [npcOutput,       setNpcOutput]       = useState<NpcOutput | null>(null);
  const [campaignOutput,  setCampaignOutput]  = useState<CampaignOutput | null>(null);
  const [sessionOutput,   setSessionOutput]   = useState<SessionOutput | null>(null);
  const [encounterOutput, setEncounterOutput] = useState<EncounterOutput | null>(null);
  const [lootOutput,      setLootOutput]      = useState<LootOutput | null>(null);

  function handleFieldChange(field: string, value: string) {
    setFormValues((prev) => ({ ...prev, [activeType]: { ...prev[activeType], [field]: value } }));
  }

  function handleGenerate() {
    switch (activeType) {
      case 'npc':       setNpcOutput(generateNpc());             break;
      case 'campaign':  setCampaignOutput(generateCampaign());   break;
      case 'session':   setSessionOutput(generateSession());     break;
      case 'encounter': setEncounterOutput(generateEncounter()); break;
      case 'loot':      setLootOutput(generateLoot());           break;
    }
  }

  const tab    = TABS.find((t) => t.type === activeType)!;
  const fields = FORMS[activeType];
  const values = formValues[activeType];

  const hasOutput =
    (activeType === 'npc'       && npcOutput       !== null) ||
    (activeType === 'campaign'  && campaignOutput  !== null) ||
    (activeType === 'session'   && sessionOutput   !== null) ||
    (activeType === 'encounter' && encounterOutput !== null) ||
    (activeType === 'loot'      && lootOutput      !== null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-zinc-100">Quick Generators</h1>
        <p className="text-base text-zinc-500 mt-1">Choose a type, set the context, and shape what you get.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-7 overflow-x-auto">
        {TABS.map((t) => {
          const isActive = t.type === activeType;
          return (
            <button
              key={t.type}
              onClick={() => setActiveType(t.type)}
              className={`flex items-center gap-2 px-5 py-3 text-base font-medium whitespace-nowrap border-b-2 -mb-px transition-colors ${
                isActive
                  ? 'text-amber-400 border-amber-400'
                  : 'text-zinc-500 border-transparent hover:text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form card */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-7 mb-7">
        <h2 className="text-xl font-semibold text-zinc-100 mb-5">{tab.label} Generator</h2>

        <div className="grid sm:grid-cols-3 gap-5 mb-6">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <label htmlFor={field.id} className="text-sm font-semibold text-zinc-400">
                {field.label}
              </label>
              <select
                id={field.id}
                value={values[field.id]}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-base text-zinc-200 focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          className="px-7 py-3 rounded-lg bg-amber-500 text-zinc-950 font-semibold text-base hover:bg-amber-400 active:bg-amber-600 transition-colors"
        >
          {hasOutput ? `↺  Regenerate ${tab.label}` : `Generate ${tab.label}`}
        </button>
      </div>

      {/* Output */}
      {activeType === 'npc' && npcOutput && (
        <NpcOutputView output={npcOutput} onChange={setNpcOutput} onClear={() => setNpcOutput(null)} />
      )}
      {activeType === 'campaign' && campaignOutput && (
        <CampaignOutputView output={campaignOutput} onChange={setCampaignOutput} />
      )}
      {activeType === 'session' && sessionOutput && (
        <SessionOutputView output={sessionOutput} onChange={setSessionOutput} />
      )}
      {activeType === 'encounter' && encounterOutput && (
        <EncounterOutputView output={encounterOutput} onChange={setEncounterOutput} />
      )}
      {activeType === 'loot' && lootOutput && (
        <LootOutputView output={lootOutput} onChange={setLootOutput} />
      )}

      {/* Empty state */}
      {!hasOutput && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-16 text-center">
          <p className="text-4xl mb-4">{tab.icon}</p>
          <p className="text-zinc-300 font-medium mb-1">No {tab.label.toLowerCase()} generated yet</p>
          <p className="text-sm text-zinc-600">
            Set your context above and click{' '}
            <span className="text-zinc-400 font-medium">Generate {tab.label}</span>.
          </p>
        </div>
      )}
    </div>
  );
}
