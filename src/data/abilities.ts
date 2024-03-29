export enum Ability {
  Empty = "",
  Burrowing = "BUR",
  Camouflage = "CMF",
  Carnivore = "CRN",
  Fat = "FAT",
  Communication = "CMN",
  Cooperation = "CPR",
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
  Symbiosis = "SYM",
  TailLoss = "TLS",
}

export type TAbility =
  | Ability.Empty
  | Ability.Burrowing
  | Ability.Camouflage
  | Ability.Carnivore
  | Ability.Fat
  | Ability.Communication
  | Ability.Cooperation
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
  | Ability.Symbiosis
  | Ability.TailLoss

interface IAbility{
  active?: boolean
  hex?: boolean
  kind?: string
  nCards?: number
  nSlots?: number
  pair?: boolean
}

const abilityMap = new Map<TAbility, IAbility>([
  [Ability.Burrowing, {}],
  [Ability.Camouflage, {}],
  [Ability.Carnivore, {active: true, kind: "feed", nCards: 3, nSlots: 1}],
  [Ability.Communication, {pair: true}],
  [Ability.Cooperation, {nCards: 2, pair: true}],
  [Ability.Fat, {active: true, nCards: 3, nSlots: 1}],
  [Ability.Grazing, {active: true}],
  [Ability.Hibernation, {active: true}],
  [Ability.HighBodyWeight, {nCards: 2, nSlots: 1}],
  [Ability.Mimicry, {}],
  [Ability.Parasite, {hex: true, nCards: 2, nSlots: 2}],
  [Ability.Piracy, {active: true}],
  [Ability.Poisonous, {}],
  [Ability.Running, {}],
  [Ability.Scavenger, {kind: "feed"}],
  [Ability.SharpVision, {}],
  [Ability.Swimming, {nCards: 2}],
  [Ability.Symbiosis, {pair: true}],
  [Ability.TailLoss, {}],
])

export const abilityList = [...abilityMap.keys()]

export const getKind = (ability: TAbility) => abilityMap.get(ability)?.kind ?? ""

export const isActive = (ability: TAbility) => !!abilityMap.get(ability)?.active
export const isHex = (ability: TAbility) => !!abilityMap.get(ability)?.hex
export const isKind = (ability: TAbility, kind: string) => !!kind && kind === getKind(ability)
export const isPair = (ability: TAbility) => !!abilityMap.get(ability)?.pair

export const nCards = (ability: TAbility): number => abilityMap.get(ability)?.nCards ?? 1
export const nSlots = (ability: TAbility): number => abilityMap.get(ability)?.nSlots ?? 0
