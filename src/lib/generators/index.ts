import * as data from './data';
import type {
  CampaignOutput,
  SessionOutput,
  NpcOutput,
  EncounterOutput,
  LootOutput,
} from '@/types';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// ===== FULL GENERATORS =====

export function generateCampaign(): CampaignOutput {
  return {
    premise: pick(data.campaignPremises),
    mainConflict: pick(data.campaignConflicts),
    villain: pick(data.campaignVillains),
    arcs: pickN(data.campaignArcs, 3),
    hooks: pickN(data.campaignHooks, 3),
    finaleIdea: pick(data.campaignFinales),
  };
}

export function generateSession(): SessionOutput {
  return {
    hook: pick(data.sessionHooks),
    scenes: pickN(data.sessionScenes, 4),
    conflict: pick(data.sessionConflicts),
    socialMoment: pick(data.sessionSocialMoments),
    twist: pick(data.sessionTwists),
    reward: pick(data.sessionRewards),
    backupPlan: pick(data.sessionBackupPlans),
  };
}

export function generateNpc(): NpcOutput {
  return {
    name: `${pick(data.npcFirstNames)} ${pick(data.npcLastNames)}`,
    role: pick(data.npcRoles),
    personality: pick(data.npcPersonalities),
    goal: pick(data.npcGoals),
    secret: pick(data.npcSecrets),
    memorableTrait: pick(data.npcTraits),
    storyConnection: pick(data.npcConnections),
  };
}

export function generateEncounter(): EncounterOutput {
  return {
    purpose: pick(data.encounterPurposes),
    enemyType: pick(data.encounterEnemyTypes),
    terrain: pick(data.encounterTerrains),
    complication: pick(data.encounterComplications),
    twist: pick(data.encounterTwists),
    reward: pick(data.encounterRewards),
  };
}

export function generateLoot(): LootOutput {
  return {
    name: pick(data.lootNames),
    type: pick(data.lootTypes),
    flavor: pick(data.lootFlavors),
    practicalUse: pick(data.lootUses),
    hiddenEffect: pick(data.lootHiddenEffects),
  };
}

// ===== PER-FIELD REROLL FUNCTIONS =====
// Each returns a new random value for a single field.
// Inputs are accepted but not yet used — reserved for AI integration.

export const reroll = {
  campaign: {
    premise: () => pick(data.campaignPremises),
    mainConflict: () => pick(data.campaignConflicts),
    villain: () => pick(data.campaignVillains),
    arc: () => pick(data.campaignArcs),
    hook: () => pick(data.campaignHooks),
    finaleIdea: () => pick(data.campaignFinales),
  },
  session: {
    hook: () => pick(data.sessionHooks),
    scene: () => pick(data.sessionScenes),
    conflict: () => pick(data.sessionConflicts),
    socialMoment: () => pick(data.sessionSocialMoments),
    twist: () => pick(data.sessionTwists),
    reward: () => pick(data.sessionRewards),
    backupPlan: () => pick(data.sessionBackupPlans),
  },
  npc: {
    name: () => `${pick(data.npcFirstNames)} ${pick(data.npcLastNames)}`,
    role: () => pick(data.npcRoles),
    personality: () => pick(data.npcPersonalities),
    goal: () => pick(data.npcGoals),
    secret: () => pick(data.npcSecrets),
    memorableTrait: () => pick(data.npcTraits),
    storyConnection: () => pick(data.npcConnections),
  },
  encounter: {
    purpose: () => pick(data.encounterPurposes),
    enemyType: () => pick(data.encounterEnemyTypes),
    terrain: () => pick(data.encounterTerrains),
    complication: () => pick(data.encounterComplications),
    twist: () => pick(data.encounterTwists),
    reward: () => pick(data.encounterRewards),
  },
  loot: {
    name: () => pick(data.lootNames),
    type: () => pick(data.lootTypes),
    flavor: () => pick(data.lootFlavors),
    practicalUse: () => pick(data.lootUses),
    hiddenEffect: () => pick(data.lootHiddenEffects),
  },
};
