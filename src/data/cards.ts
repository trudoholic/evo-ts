import {commonId} from "./players"
import {getSpellId, TAbility} from "./abilities"
import {Zone} from "./zones"

export interface ICard  {
  disabled: boolean
  id: string
  idCard: string
  idCard2: string
  idPlayer: string
  idZone: string
  poisoned: boolean
  slotEmpty: boolean
  spellId: TAbility
  spellCooldown: number
  spellUsed: boolean
}

export const cards: ICard[] = [...Array(50)]
  .map((_, i) => ({
    disabled: false,
    id: `${('0' + (i + 1)).slice(-2)}`,
    idCard: "",
    idCard2: "",
    idPlayer: commonId,
    idZone: Zone.DrawPile,
    poisoned: false,
    slotEmpty: true,
    spellId: getSpellId(i),
    spellCooldown: 0,
    spellUsed: false,
  }))

// console.log(cards)
// console.log(cards.map(c => c.id + ':' + c.spellId))
