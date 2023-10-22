import { Actions } from "../context/actions"
import { useAppContext } from "../context"

const Intro = () => {
  const { dispatch } = useAppContext()

  const handleBeginGame = (n: number) => {
    dispatch({type: Actions.BeginGame, payload: n})
  }

  return (
    <>
      <h2>Intro</h2>
      <button onClick={() => handleBeginGame(2)}>
        Begin Game [2]
      </button>
      <button onClick={() => handleBeginGame(3)}>
        Begin Game [3]
      </button>
      <button onClick={() => handleBeginGame(4)}>
        Begin Game [4]
      </button>
    </>
  )
}

export default Intro
