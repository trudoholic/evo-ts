import {spellsData} from "./spells"

export interface ICard  {
  disabled: boolean
  id: string
  idPlayer: string
  idZone: string
  spell: string
}

export const cards: ICard[] = [...Array(16)]
  .map((_, i) => ({
    disabled: false,
    id: `${i + 1}`,
    idPlayer: "0",
    idZone: "1",
    spell: (i % 2) ? spellsData.at(i).id : "",
  }))

// console.log(cards)
