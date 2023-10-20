import { Actions } from "./actions"
import { IState } from "./state"

export type TAction =
  // | { type: Actions.ADD_CONTACT, payload: IContact }
  // | { type: Actions.REMOVE_CONTACT, payload: IContact }
  | { type: Actions.BeginGame }
  | { type: Actions.EndGame }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    // case Actions.ADD_CONTACT:
    //   return { ...state, contacts: state.contacts.concat(action.payload)}
    // case Actions.REMOVE_CONTACT:
    //   return { ...state, contacts: state.contacts.filter(c => c.id === action.payload.id)}
    case Actions.BeginGame:
      return { ...state, isGameOver: false}
    case Actions.EndGame:
      return { ...state, isGameOver: true}
    default:
      return state
  }
}