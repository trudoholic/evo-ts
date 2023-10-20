import { Actions } from "../context/actions"
import { useAppContext } from "../context"

const Game = () => {
  const { state, dispatch } = useAppContext()
  const { isGameOver, players } = state

  const foo = () => {
    console.log("Game", isGameOver, players)
    dispatch({type: Actions.EndGame})
  }

  return (
    <>
      <h2>Game</h2>
      <button onClick={foo}>
        End Game
      </button>
    </>
  )
}

export default Game
