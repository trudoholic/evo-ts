import {commonId} from "./players"
import {getSpellId, TAbility} from "./abilities"
import {Zone} from "./zones"

export interface ICard  {
  abId: TAbility
  abCooldown: number
  abUsed: boolean
  disabled: boolean
  id: string
  idCard: string
  idCard2: string
  idPlayer: string
  idZone: string
  emptySlots: number
  poisoned: boolean
}

export const cards: ICard[] = [...Array(50)]
  .map((_, i) => ({
    abId: getSpellId(i),
    abCooldown: 0,
    abUsed: false,
    disabled: false,
    id: `${('0' + (i + 1)).slice(-2)}`,
    idCard: "",
    idCard2: "",
    idPlayer: commonId,
    idZone: Zone.DrawPile,
    emptySlots: 0,
    poisoned: false,
  }))

// console.log(cards)
