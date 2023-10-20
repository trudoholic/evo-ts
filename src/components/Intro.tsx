import { Actions } from "../context/actions"
import { useAppContext } from "../context"

const Intro = () => {
  const { state, dispatch } = useAppContext()
  const { isGameOver, players } = state

  const foo = () => {
    console.log("Intro", isGameOver, players)
    dispatch({type: Actions.BeginGame})
  }

  return (
    <>
      <h2>Intro</h2>
      <button onClick={foo}>
        Begin Game
      </button>
    </>
  )
}

export default Intro
