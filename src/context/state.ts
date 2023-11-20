import {cards, ICard} from "../data/cards"
import {IPlayer} from "../data/players"

export interface IState {
  cardActiveId: string
  cardTargetId: string
  cards: ICard[]
  curHand: number
  curHandPhase: number
  curTurn: number
  isGameOver: boolean
  isReverse: boolean
  nPlayers: number
  players: IPlayer[]
  tokens: number
}

export const defaultState: IState = {
  cardActiveId: "",
  cardTargetId: "",
  cards: cards,
  curHand: 0,
  curHandPhase: 0,
  curTurn: 0,
  isGameOver: true,
  isReverse: false,
  nPlayers: 0,
  players: [],
  tokens: 0
}
