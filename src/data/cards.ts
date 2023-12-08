import {commonId} from "./players"
import {getSpellId, TSpell} from "./spells"
import {Zone} from "./zones"

export interface ICard  {
  disabled: boolean
  id: string
  idCard: string
  idPlayer: string
  idZone: string
  slot: boolean
  slotEmpty: boolean
  spellId: TSpell
  spellCooldown: number
  spellUsed: boolean
}

export const cards: ICard[] = [...Array(50)]
  .map((_, i) => ({
    disabled: false,
    id: `${i + 1}`,
    idCard: "",
    idPlayer: commonId,
    idZone: Zone.DrawPile,
    slot: !!(i % 2),
    slotEmpty: true,
    spellId: getSpellId(i),
    spellCooldown: 0,
    spellUsed: false,
  }))

// console.log(cards)
// console.log(cards.map(c => c.id + ':' + c.spellId))
