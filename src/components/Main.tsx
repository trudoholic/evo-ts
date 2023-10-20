import { useAppContext } from "../context"
import Intro from "./Intro";
import Game from "./Game";

const Main = () => {
  const { state } = useAppContext()
  const { isGameOver } = state

  return (
    <>
      <h1>Evolution Game</h1>
      { isGameOver? <Intro/>: <Game/> }
    </>
  )
}

export default Main
