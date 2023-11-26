// import {spellsData} from "./spells"

export interface ICard  {
  disabled: boolean
  id: string
  idCard: string
  idPlayer: string
  idZone: string
  slot: boolean
  slotEmpty: boolean
  // spell: string
}

export const cards: ICard[] = [...Array(16)]
  .map((_, i) => ({
    disabled: false,
    id: `${i + 1}`,
    idCard: "",
    idPlayer: "0",
    idZone: "1",
    slot: !!(i % 2),
    slotEmpty: true,
    // spell: (i % 2) ? spellsData.at(i).id : "",
  }))

// console.log(cards)
