// Generator input types
export type GeneratorType = 'campaign' | 'session' | 'npc' | 'encounter' | 'loot';

export interface CampaignInput {
  tone: string;
  length: string;
  level: string;
}

export interface SessionInput {
  focus: string;
  tone: string;
}

export interface NpcInput {
  role: string;
  setting: string;
}

export interface EncounterInput {
  difficulty: string;
  environment: string;
  partySize: string;
}

export interface LootInput {
  rarity: string;
  itemType: string;
}

// Generator output types
export interface CampaignOutput {
  premise: string;
  mainConflict: string;
  villain: string;
  arcs: string[];
  hooks: string[];
  finaleIdea: string;
}

export interface SessionOutput {
  hook: string;
  scenes: string[];
  conflict: string;
  socialMoment: string;
  twist: string;
  reward: string;
  backupPlan: string;
}

export interface NpcOutput {
  name: string;
  role: string;
  personality: string;
  goal: string;
  secret: string;
  memorableTrait: string;
  storyConnection: string;
}

export interface EncounterOutput {
  purpose: string;
  enemyType: string;
  terrain: string;
  complication: string;
  twist: string;
  reward: string;
}

export interface LootOutput {
  name: string;
  type: string;
  flavor: string;
  practicalUse: string;
  hiddenEffect: string;
}

// Workspace types
export type SavedItemType = 'campaign' | 'npc' | 'encounter' | 'loot' | 'hook' | 'session';

export interface SavedItem {
  id: string;
  type: SavedItemType;
  title: string;
  fields: { label: string; value: string }[];
  savedAt: number;
}
