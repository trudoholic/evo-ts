import {useAppContext} from "../context"
import {Actions} from "../context/actions"

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    curHand,
    curHandPhase,
    isReverse,
    nPlayers,
  } = state

  const nextIdx = (idx: number) => {
    return isReverse?
      (idx + nPlayers - 1) % nPlayers:
      (idx + 1) % nPlayers
  }
  //-------------------------------------------------------

  const onBeginPhase = (phase: number) => {
    // console.group(`Phase: ${phase}`)
    console.log(`----> On Begin Phase: ${phase}`)
  }

  const onEndPhase = () => {
    console.log(`----x On End Phase: ${curHandPhase}`)
    // console.groupEnd()
  }

  const handleNextHandPhase = (phase: number) => {
    onEndPhase()
    dispatch({type: Actions.NextHandPhase, payload: phase})
    onBeginPhase(phase)
  }
  //-------------------------------------------------------

  const onBeginHand = (hand: number) => {
    // console.group(`Phase: ${phase}`)
    console.log(`==> On Begin Hand: ${hand}`)
  }

  const onEndHand = () => {
    console.log(`==x On End Hand: ${curHand}`)
    // console.groupEnd()
  }

  const handleNextHand = () => {
    onEndHand()
    const  nextHand = nextIdx(curHand)
    dispatch({type: Actions.NextHand, payload: nextHand})
    onBeginHand(nextHand)
  }
  //-------------------------------------------------------

  const handleBeginGame = (n: number) => {
    const result = "Begin Game [" + n + "]"
    console.log(`*** ${result} ***`)
    dispatch({type: Actions.BeginGame, payload: n})
  }

  const handleEndGame = () => {
    onEndPhase()
    onEndHand()
    dispatch({type: Actions.EndGame})
    const result = "End Game"
    console.log(`*** ${result} ***`)
  }
  //-------------------------------------------------------

  return {
    handleNextHandPhase,
    handleNextHand,
    handleBeginGame,
    handleEndGame,
    nextIdx,
  }
}

export default useFlow
