import {spellsData} from "./spells"
import {Tokens} from "./tokens"

export interface ICard  {
  disabled: boolean
  id: string
  idPlayer: string
  idZone: string
  spells?: string[]
  tokens: Tokens
}

export const cards: ICard[] = [...Array(16)]
  .map((_, i) => {
    const card: ICard = {
      disabled: false,
      id: `${i + 1}`,
      idPlayer: "0",
      idZone: "1",
      tokens: null,
    }
    if (i % 2) {
      card.spells = [spellsData.at(i).id]
    }
    return card
  })

// console.log(cards)
