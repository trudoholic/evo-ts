import {ICard} from "./cards"

export interface IZone {
  id: string
  cards: ICard[]
  name: string
}

export const Zone = {
  Hand: "Hand",
  PlayArea: "Play Area",
  DiscardPile: "Discard Pile",
  DrawPile: "Draw Pile",
}

export const zones: IZone[] = [
  { id: Zone.Hand, cards: [], name: 'Hand' },
  { id: Zone.PlayArea, cards: [], name: 'Play Area' },
  { id: Zone.DiscardPile, cards: [], name: 'Discard Pile' },
]

export const commonZones: IZone[] = [
  { id: Zone.DrawPile, cards: [], name: 'Draw Pile' },
]
