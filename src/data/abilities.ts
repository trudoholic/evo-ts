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
  Parasite = "PRS",
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
  hex?: boolean
  kind?: string
  nSlots?: number
}

const abilityMap = new Map<TAbility, IAbility>([
  [Ability.Burrowing, {}],
  [Ability.Camouflage, {}],
  [Ability.Carnivore, {active: true, kind: "feed", nSlots: 1}],
  [Ability.Fat, {active: true, nSlots: 1}],
  [Ability.Grazing, {active: true}],
  [Ability.Hibernation, {active: true}],
  [Ability.HighBodyWeight, {nSlots: 1}],
  [Ability.Mimicry, {}],
  [Ability.Parasite, {hex: true, nSlots: 2}],
  [Ability.Piracy, {active: true}],
  [Ability.Poisonous, {}],
  [Ability.Running, {}],
  [Ability.Scavenger, {kind: "feed"}],
  [Ability.SharpVision, {}],
  [Ability.Swimming, {}],
  [Ability.TailLoss, {}],
])

export const getKind = (ability: TAbility) => abilityMap.get(ability)?.kind ?? ""

export const isActive = (ability: TAbility) => !!abilityMap.get(ability)?.active
export const isEmpty = (ability: TAbility) => Ability.Empty === ability
export const isHex = (ability: TAbility) => !!abilityMap.get(ability)?.hex
export const isKind = (ability: TAbility, kind: string) => !!kind && kind === getKind(ability)

export const nSlots = (ability: TAbility): number => abilityMap.get(ability)?.nSlots ?? 0

export const getSpellId = (idx: number): TAbility =>
  [Ability.Carnivore, Ability.Fat, Ability.Fat, Ability.HighBodyWeight][idx % 4]
  // [Ability.Carnivore, Ability.Parasite, Ability.Scavenger, Ability.Piracy][idx % 4]

