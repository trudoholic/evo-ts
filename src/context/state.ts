import {cards, ICard} from "../data/cards"
import {IPlayer} from "../data/players"

export interface IState {
  isGameOver: boolean
  isReverse: boolean
  curHand: number
  curHandPhase: number
  curTurn: number
  nPlayers: number
  players: IPlayer[]
  cards: ICard[]
}

export const defaultState: IState = {
  curHand: 0,
  curHandPhase: 0,
  curTurn: 0,
  isGameOver: true,
  isReverse: false,
  nPlayers: 0,
  players: [],
  cards: cards,
}
