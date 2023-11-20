import {Tokens} from "./tokens"

export interface ICard  {
  disabled: boolean,
  id: string
  idPlayer: string
  idZone: string
  tokens: Tokens
}

export const cards: ICard[] = [...Array(16)]
  .map((_, i) => ({
    disabled: false,
    id: `${i + 1}`,
    idPlayer: "0",
    idZone: "1",
    tokens: null,
  }))

// console.log(cards)
