import {Actions} from "./actions"
import {IState} from "./state"
import {ICard} from "../data/cards"
import {players} from "../data/players"

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.DrawCard, payload: ICard }
  | { type: Actions.IncValue, payload: { idx: number, value: number } }
  | { type: Actions.NextHand, payload: number }
  | { type: Actions.NextHandPhase, payload: number }
  | { type: Actions.NextTurn, payload: number }
  | { type: Actions.Reverse }
  | { type: Actions.EndGame }

export const reducer = (state: IState, action: TAction): IState => {
  let rnd = 0
  switch (action.type) {

    case Actions.BeginGame:
      rnd = Math.floor(Math.random() * action.payload)
      return { ...state,
        isGameOver: false,
        curHand: rnd,
        curTurn: rnd,
        nPlayers: action.payload,
        cards: state.cards.map(card => ({...card, idPlayer: 0})),
        players: players.slice(0, action.payload),
      }

    case Actions.DrawCard:
      return { ...state,
        cards: state.cards.map(card => card.id === action.payload.id ? action.payload: card)
      }

    case Actions.IncValue:
      return { ...state,
        players: state.players.map(
          (p, i) => i === action.payload.idx?
            {...p, value: p.value + action.payload.value}: p
        )
      }

    case Actions.NextHand:
      return { ...state, curHand: action.payload}

    case Actions.NextHandPhase:
      return { ...state, curHandPhase: action.payload}

    case Actions.NextTurn:
      return { ...state, curTurn: action.payload}

    case Actions.Reverse:
      return { ...state, isReverse: !state.isReverse}

    case Actions.EndGame:
      return { ...state, isGameOver: true}

    default:
      return state
  }
}