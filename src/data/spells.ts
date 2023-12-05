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

export interface ISpell {
  effect: () => void
  // disabled: boolean
  // id: TSpell
}

export const getSpellId =
  (idx: number): TSpell => (idx % 2) ?
    Spell.Carnivore
    : Spell.Grazing
    // [Spell.Carnivore, Spell.Grazing, Spell.Hibernation][idx % 3]
    // : Spell.Empty

const spellsMap = new Map<TSpell, ISpell>([
  [Spell.Carnivore, {effect: () => {console.log(`* cast: ${Spell.Carnivore}`)}}],
  [Spell.Grazing, {effect: () => {console.log(`* cast: ${Spell.Grazing}`)}}],
  [Spell.Hibernation, {effect: () => {console.log(`* cast: ${Spell.Hibernation}`)}}],
  [Spell.Piracy, {effect: () => {console.log(`* cast: ${Spell.Piracy}`)}}],
])

// console.log(spellsMap)

export const isEmpty = (spellId: TSpell) => Spell.Empty === spellId

export const castSpell =
  (spellId: TSpell) => spellsMap.has(spellId)?
    spellsMap.get(spellId).effect():
    console.warn("Can not cast:", spellId)
