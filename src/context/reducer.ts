import { Actions } from "./actions"
import { IState, data } from "./state"

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.IncValue, payload: { idx: number, value: number } }
  | { type: Actions.NextHand, payload: number }
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
        players: data.slice(0, action.payload),
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