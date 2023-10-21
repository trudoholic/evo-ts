import { Actions } from "./actions"
import { IState, data } from "./state"

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.EndGame }
  | { type: Actions.NextHand, payload: number }
  | { type: Actions.NextTurn, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case Actions.BeginGame:
      return { ...state,
        isGameOver: false,
        nPlayers: action.payload,
        players: data.slice(0, action.payload),
      }
    case Actions.EndGame:
      return { ...state, isGameOver: true}
    case Actions.NextHand:
      return { ...state, curHand: action.payload}
    case Actions.NextTurn:
      return { ...state, curTurn: action.payload}
    default:
      return state
  }
}