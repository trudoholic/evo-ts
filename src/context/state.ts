import {cards, ICard} from "../data/cards"
import {IPlayer} from "../data/players"
import {Ability, TAbility} from "../data/abilities"

export interface IState {
  cardActiveId: string
  cardTargetId: string
  cardTarget2Id: string
  cards: ICard[]
  curHand: number
  curHandPhase: number
  curSpell: TAbility
  curStep: number
  curTurn: number
  isGameOver: boolean
  isLastHand: boolean
  isReverse: boolean
  nPlayers: number
  players: IPlayer[]
  tokens: number
}

export const defaultState: IState = {
  cardActiveId: "",
  cardTargetId: "",
  cardTarget2Id: "",
  cards: cards,
  curHand: 0,
  curHandPhase: 0,
  curSpell: Ability.Empty,
  curStep: 0,
  curTurn: 0,
  isGameOver: true,
  isLastHand: true,
  isReverse: false,
  nPlayers: 0,
  players: [],
  tokens: 0
}
