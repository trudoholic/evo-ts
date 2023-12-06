import { useAppContext } from "../context"
import {IState} from "../context/state"
import Intro from "./Intro"
import Game from "./Game"

const Main = () => {
  const { state } = useAppContext()
  const { isGameOver } = state as IState

  return (
    <>
      <h2>Evolution Game</h2>
      { isGameOver? <Intro/>: <Game/> }
    </>
  )
}

export default Main
