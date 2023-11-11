import {ICard} from "./cards"

export interface IZone {
  id: number
  cards: ICard[]
  name: string
}

export const zones: IZone[] = [
  { id: 1, cards: [], name: 'Hand' },
  { id: 2, cards: [], name: 'Play area' },
  { id: 3, cards: [], name: 'Discard Pile' },
]

export const commonZones: IZone[] = [
  { id: 1, cards: [], name: 'Draw Pile' },
  // { id: 2, cards: [], name: 'Play area' },
  // { id: 3, cards: [], name: 'Discard Pile' },
]
