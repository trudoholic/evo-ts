import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"

const Phase0 = () => {
  const { state, dispatch } = useAppContext()
  const {
    players,
  } = state

  const phaseEnd = players.every(p => p.value >= 100)

  const handleNextHandPhase = () => {
    dispatch({type: Actions.NextHandPhase, payload: 1})
  }

  return (
    <>
      <h2>
        {`# Phase End: [${phaseEnd?"Gotcha!":""}]`}
      </h2>
      <button onClick={handleNextHandPhase}>
        # Next Phase
      </button>
    </>
  )
}

export default Phase0
