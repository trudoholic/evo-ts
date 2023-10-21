import { Actions } from "./actions"
import { IState, data } from "./state"

export type TAction =
  // | { type: Actions.ADD_CONTACT, payload: IContact }
  // | { type: Actions.REMOVE_CONTACT, payload: IContact }
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.EndGame }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    // case Actions.ADD_CONTACT:
    //   return { ...state, contacts: state.contacts.concat(action.payload)}
    // case Actions.REMOVE_CONTACT:
    //   return { ...state, contacts: state.contacts.filter(c => c.id === action.payload.id)}
    case Actions.BeginGame:
      return { ...state,
        isGameOver: false,
        nPlayers: action.payload,
        players: data.slice(0, action.payload),
      }
    case Actions.EndGame:
      return { ...state, isGameOver: true}
    default:
      return state
  }
}