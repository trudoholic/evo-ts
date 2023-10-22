import { Actions } from "./actions"
import { IState, data } from "./state"

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.NextHand, payload: number }
  | { type: Actions.NextTurn, payload: number }
  | { type: Actions.Reverse }
  | { type: Actions.EndGame }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case Actions.BeginGame:
      return { ...state,
        isGameOver: false,
        nPlayers: action.payload,
        players: data.slice(0, action.payload),
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