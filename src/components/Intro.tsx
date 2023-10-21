import { Actions } from "../context/actions"
import { useAppContext } from "../context"

const Intro = () => {
  const { dispatch } = useAppContext()
  // const { state, dispatch } = useAppContext()
  // const { isGameOver, players } = state

  const foo = (n: number) => {
    // console.log("Intro", isGameOver, players)
    console.log("Intro", n)
    dispatch({type: Actions.BeginGame, payload: n})
  }

  return (
    <>
      <h2>Intro</h2>
      <button onClick={() => foo(2)}>
        Begin Game [2]
      </button>
      <button onClick={() => foo(3)}>
        Begin Game [3]
      </button>
      <button onClick={() => foo(4)}>
        Begin Game [4]
      </button>
    </>
  )
}

export default Intro
