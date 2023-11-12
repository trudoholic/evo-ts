import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase3 = () => {
  const { state, dispatch } = useAppContext()
  const {
    curHand,
  } = state

  const {
    handleNextHandPhase,
    nextIdx,
  } = useFlow()

  const handleNextHand = () => {
    const  nextHand = nextIdx(curHand)
    dispatch({type: Actions.NextHand, payload: nextHand})
  }

  const handleEndGame = () => {
    dispatch({type: Actions.EndGame})
  }

  return (
    <>
      <button onClick={() => handleNextHandPhase(0)}>
        Next Phase
      </button>
      <button onClick={handleNextHand}>
        Next Hand
      </button>
      <button onClick={handleEndGame}>
        End Game
      </button>
    </>
  )
}

export default Phase3
