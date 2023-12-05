export enum Spell {
  Empty = "_",
  Carnivore = "CRN",
  Grazing = "GRZ",
  Hibernation = "HIB",
  Piracy = "PIR",
}

export type TSpell =
  | Spell.Empty
  | Spell.Carnivore
  | Spell.Grazing
  | Spell.Hibernation
  | Spell.Piracy

export const getSpellId =
  (idx: number): TSpell => (idx % 2) ?
    Spell.Carnivore
    : Spell.Grazing
    // [Spell.Carnivore, Spell.Grazing, Spell.Hibernation][idx % 3]
    // : Spell.Empty

export const isEmpty = (spellId: TSpell) => Spell.Empty === spellId
