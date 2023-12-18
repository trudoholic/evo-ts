export enum Ability {
  Empty = "_",
  Burrowing = "BUR",
  Camouflage = "CMF",
  Carnivore = "CRN",
  Grazing = "GRZ",
  Hibernation = "HIB",
  HighBodyWeight = "HBW",
  Mimicry = "MIM",
  Parasite = "parasite",
  Piracy = "PIR",
  Poisonous = "PSN",
  Running = "RUN",
  Scavenger = "SCV",
  SharpVision = "SHV",
  Swimming = "SWI",
  TailLoss = "TLS",
}

/*
Scavenger
*/

export type TAbility =
  | Ability.Empty
  | Ability.Burrowing
  | Ability.Camouflage
  | Ability.Carnivore
  | Ability.Grazing
  | Ability.Hibernation
  | Ability.HighBodyWeight
  | Ability.Mimicry
  | Ability.Parasite
  | Ability.Piracy
  | Ability.Poisonous
  | Ability.Running
  | Ability.Scavenger
  | Ability.SharpVision
  | Ability.Swimming
  | Ability.TailLoss

interface IAbility{
  active?: boolean
}

const abilityMap = new Map<TAbility, IAbility>([
  [Ability.Burrowing, {}],
  [Ability.Camouflage, {}],
  [Ability.Carnivore, {active: true}],
  [Ability.Grazing, {active: true}],
  [Ability.Hibernation, {active: true}],
  [Ability.HighBodyWeight, {}],
  [Ability.Mimicry, {}],
  [Ability.Parasite, {}],
  [Ability.Piracy, {active: true}],
  [Ability.Poisonous, {}],
  [Ability.Running, {}],
  [Ability.Scavenger, {}],
  [Ability.SharpVision, {}],
  [Ability.Swimming, {}],
  [Ability.TailLoss, {}],
])

export const isActive = (id: TAbility) => !!abilityMap.get(id)?.active

export const getSpellId = (idx: number): TAbility =>
  [Ability.Carnivore, Ability.Running, Ability.Scavenger, Ability.TailLoss][idx % 4]

export const isEmpty = (spellId: TAbility) => Ability.Empty === spellId
