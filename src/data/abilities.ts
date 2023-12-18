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
  SharpVision = "SHV",
  Swimming = "SWI",
}

/*
Running
Scavenger
TailLoss
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
  | Ability.SharpVision
  | Ability.Swimming

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
  [Ability.SharpVision, {}],
  [Ability.Swimming, {}],
])

export const isActive = (id: TAbility) => !!abilityMap.get(id)?.active

export const getSpellId =
  (idx: number): TAbility => (idx % 2) ?
    Ability.Carnivore
    // : Ability.Camouflage
    : [Ability.Poisonous, Ability.HighBodyWeight, Ability.Swimming][idx % 3]
    // : Ability.Empty

export const isEmpty = (spellId: TAbility) => Ability.Empty === spellId
