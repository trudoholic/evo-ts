import {useAppContext} from "../context"
import {Actions} from "../context/actions"

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    curHandPhase,
    isReverse,
    nPlayers,
  } = state

  const nextIdx = (idx: number) => {
    return isReverse?
      (idx + nPlayers - 1) % nPlayers:
      (idx + 1) % nPlayers
  }

  const handleNextHandPhase = (phase: number) => {
    console.log(`On End Phase: ${curHandPhase}`)
    dispatch({type: Actions.NextHandPhase, payload: phase})
    console.log(`> On Begin Phase: ${phase}`)
  }

  return {
    handleNextHandPhase,
    nextIdx,
  }
}

export default useFlow
