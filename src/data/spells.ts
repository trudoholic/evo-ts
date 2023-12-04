export enum Spell {
  Empty = "Empty",
  Qwe = "Qwe",
  Asd = "Asd",
  Zxc = "Zxc",
}

export type TSpell =
  | Spell.Empty
  | Spell.Qwe
  | Spell.Asd
  | Spell.Zxc

export interface ISpell {
  effect: () => void
  // disabled: boolean
  // id: TSpell
}

export const getSpellId =
  (idx: number): TSpell => [
    Spell.Qwe, Spell.Asd, Spell.Zxc
  ][idx % 3]

const spellsMap = new Map<TSpell, ISpell>([
  [Spell.Qwe, {effect: () => {console.log(`* cast: ${Spell.Qwe}`)}}],
  [Spell.Asd, {effect: () => {console.log(`* cast: ${Spell.Asd}`)}}],
  [Spell.Zxc, {effect: () => {console.log(`* cast: ${Spell.Zxc}`)}}],
])

// console.log(spellsMap)

export const isEmpty = (spellId: TSpell) => Spell.Empty === spellId

export const castSpell =
  (spellId: TSpell) => spellsMap.has(spellId)?
    spellsMap.get(spellId).effect():
    console.warn("Can not cast:", spellId)
