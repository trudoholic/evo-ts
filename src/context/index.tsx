import { createContext, Dispatch, ReducerState, useContext, useReducer } from "react"
import { IState, defaultState } from "./state"
import { reducer, TAction } from "./reducer"

const AppContext = createContext<{
  state: IState
  dispatch?: Dispatch<TAction>
}>({ state: defaultState })

export const useAppContext = () => useContext(AppContext)

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState as ReducerState<IState>)
  return <AppContext.Provider value={{ state, dispatch }} children={ children } />
}
