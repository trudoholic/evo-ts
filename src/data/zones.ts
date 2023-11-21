import {ICard} from "./cards"

export interface IZone {
  id: string
  cards: ICard[]
  name: string
}

export const Zone = {
  Hand: "Hand",
  Keep: "Keep",
  DiscardPile: "Discard Pile",
  DrawPile: "Draw Pile",
} as const

export const zones: IZone[] = [
  { id: Zone.Hand, cards: [], name: 'Hand' },
  { id: Zone.Keep, cards: [], name: 'Play Area' },
  { id: Zone.DiscardPile, cards: [], name: 'Discard Pile' },
]

export const commonZones: IZone[] = [
  { id: Zone.DrawPile, cards: [], name: 'Draw Pile' },
]
