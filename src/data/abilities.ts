export enum Ability {
  Empty = "_",
  Carnivore = "CRN",
  Grazing = "GRZ",
  Hibernation = "HIB",
  Piracy = "PIR",
}

export type TAbility =
  | Ability.Empty
  | Ability.Carnivore
  | Ability.Grazing
  | Ability.Hibernation
  | Ability.Piracy

interface IAbility{
  active?: boolean
}

const abilityMap = new Map<TAbility, IAbility>([
  [Ability.Carnivore, {active: true}],
  [Ability.Grazing, {active: true}],
  [Ability.Hibernation, {active: true}],
  [Ability.Piracy, {active: true}],
])

export const isActive = (id: TAbility) => !!abilityMap.get(id)?.active


export const getSpellId =
  (idx: number): TAbility => (idx % 2) ?
    Ability.Piracy
    : Ability.Hibernation
    // [Spell.Carnivore, Spell.Grazing, Spell.Hibernation][idx % 3]
    // : Spell.Empty

export const isEmpty = (spellId: TAbility) => Ability.Empty === spellId
