import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase0 = () => {
  const { state, dispatch } = useAppContext()

  const {
    curTurn,
    players,
  } = state

  const {
    handleNextHandPhase,
    nextIdx,
  } = useFlow()

  const phaseEnd = players.every(p => p.value >= 100)

  const handleNextTurn = () => {
    const rnd = Math.floor(Math.random() * 25 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    const  nextTurn = nextIdx(curTurn)
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }

  return (
    <>
      <h2>
        {` [Turn: ${curTurn}] Phase End: [${phaseEnd?"Gotcha!":""}]`}
      </h2>
      <button onClick={handleNextTurn}>
        Next Turn
      </button>
      <button onClick={() => handleNextHandPhase(1)}>
        Next Phase
      </button>
    </>
  )
}

export default Phase0
