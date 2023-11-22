import {spellsData} from "./spells"

export interface ICard  {
  disabled: boolean
  id: string
  idPlayer: string
  idZone: string
  spells?: string[]
}

export const cards: ICard[] = [...Array(16)]
  .map((_, i) => {
    const card: ICard = {
      disabled: false,
      id: `${i + 1}`,
      idPlayer: "0",
      idZone: "1",
    }
    if (i % 2) {
      card.spells = [spellsData.at(i).id]
    }
    return card
  })

// console.log(cards)
