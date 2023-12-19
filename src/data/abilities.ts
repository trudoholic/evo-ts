export enum Ability {
  Empty = "_",
  Burrowing = "BUR",
  Camouflage = "CMF",
  Carnivore = "CRN",
  Fat = "FAT",
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

export type TAbility =
  | Ability.Empty
  | Ability.Burrowing
  | Ability.Camouflage
  | Ability.Carnivore
  | Ability.Fat
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
  nSlots?: number
}

const abilityMap = new Map<TAbility, IAbility>([
  [Ability.Burrowing, {}],
  [Ability.Camouflage, {}],
  [Ability.Carnivore, {active: true, nSlots: 1}],
  [Ability.Fat, {active: true, nSlots: 1}],
  [Ability.Grazing, {active: true}],
  [Ability.Hibernation, {active: true}],
  [Ability.HighBodyWeight, {nSlots: 1}],
  [Ability.Mimicry, {}],
  [Ability.Parasite, {nSlots: 2}],
  [Ability.Piracy, {active: true}],
  [Ability.Poisonous, {}],
  [Ability.Running, {}],
  [Ability.Scavenger, {}],
  [Ability.SharpVision, {}],
  [Ability.Swimming, {}],
  [Ability.TailLoss, {}],
])

export const hasSlots = (ability: TAbility) => !!abilityMap.get(ability)?.nSlots
export const isActive = (ability: TAbility) => !!abilityMap.get(ability)?.active
export const isEmpty = (ability: TAbility) => Ability.Empty === ability

export const getSpellId = (idx: number): TAbility =>
  [Ability.Carnivore, Ability.Fat, Ability.Scavenger, Ability.TailLoss][idx % 4]
