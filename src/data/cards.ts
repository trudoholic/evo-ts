import {abilityList, TAbility} from "./abilities"
import {commonId} from "./players"
import {Zone} from "./zones"

export interface ICard  {
  id: string
  abId: TAbility
  abCooldown: number
  abUsed: boolean
  disabled: boolean
  idCard: string
  idCard2: string
  idPlayer: string
  idZone: string
  emptySlots: number
  poisoned: boolean
}

const rawList = abilityList.reduce((list: TAbility[], a) =>
  [...list, ...Array(4).fill(a)], []
)
console.log(rawList)

const shuffle = (n: number, debug = false) => {
  const src = [...Array(n).keys()]
  if (debug) return src

  const result: number[] = []
  while (src.length) {
    const rnd = Math.floor(Math.random() * src.length)
    const item = src.splice(rnd, 1)[0]
    result.push(item)
  }
  return result
}

const rndList = shuffle(rawList.length)
// const rndList = shuffle(rawList.length, true)
console.log(rndList)

const getId = (n: number) => `${('0' + n).slice(-2)}`

const getCard = (i: number): ICard => ({
  id: getId(i + 1),
  abId: rawList[i],
  abCooldown: 0,
  abUsed: false,
  disabled: false,
  idCard: "",
  idCard2: "",
  idPlayer: commonId,
  idZone: Zone.DrawPile,
  emptySlots: 0,
  poisoned: false,
})

export const cards: ICard[] = rndList.map((i) => getCard(i))
// console.log(cards)
