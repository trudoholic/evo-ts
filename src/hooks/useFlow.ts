import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {isEmpty} from "../data/abilities"

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    curHand,
    curHandPhase,
    curSpell,
    curTurn,
    isLastHand,
    isReverse,
    nPlayers,
    players,
  } = state as IState

  const nextIdx = (idx: number) => {
    return isReverse?
      (idx + nPlayers - 1) % nPlayers:
      (idx + 1) % nPlayers
  }

  const handleReverse = () => {
    dispatch({type: Actions.Reverse})
  }
  //-------------------------------------------------------

  const handleNextTurn = () => {
    const payload = {cardActiveId: "", cardTargetId: "", cardTarget2Id: ""}
    dispatch({type: Actions.UpdateState, payload})

    let nextTurn = nextIdx(curTurn)
    while (players.at(nextTurn).pass) {
      nextTurn = nextIdx(nextTurn)
    }
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }
  //-------------------------------------------------------

  const onBeginHandPhase = (phase: number, hand?: number) => {
    dispatch({type: Actions.NextHandPhase, payload: phase})
    console.group(`Phase: ${phase}`)
    dispatch({type: Actions.NextTurn, payload: phase? curHand: hand})
  }

  const onEndHandPhase = () => {
    // console.log('=== End Phase ===')
    dispatch({type: Actions.NextStep, payload: 0})
    console.groupEnd()
  }

  const handleNextHandPhase = (phase: number) => {
    onEndHandPhase()
    onBeginHandPhase(phase)
  }
  //-------------------------------------------------------

  const onBeginHand = (hand: number) => {
    console.group(`Hand: ${hand}`)
    dispatch({type: Actions.NextHand, payload: hand})
    onBeginHandPhase(0, hand)
  }

  const onEndHand = () => {
    // console.log('### End Hand ###')
    console.groupEnd()
  }

  const handleNextHand = (isDeckEmpty: boolean) => {
    onEndHandPhase()
    onEndHand()
    const nextHand = nextIdx(curHand)
    onBeginHand(nextHand)

    if (isDeckEmpty) {
      dispatch({type: Actions.LastHand})
    }
  }
  //-------------------------------------------------------

  const handleBeginGame = (n: number) => {
    const result = "Begin Game [" + n + "]"
    console.log(`*** ${result} ***`)
    dispatch({type: Actions.BeginGame, payload: n})

    const  eldestHand = Math.floor(Math.random() * n)
    console.log(`* Eldest Hand: ${eldestHand} *`)
    dispatch({type: Actions.DrawRound, payload: eldestHand})
    onBeginHand(eldestHand)
  }

  const handleEndGame = () => {
    onEndHandPhase()
    onEndHand()
    dispatch({type: Actions.EndGame})
    const result = "End Game"
    console.log(`*** ${result} ***`)
    console.log()
  }
  //-------------------------------------------------------

  const handlePass = () => {
    // console.log(`--- Pass: ${curTurn}`)
    dispatch({type: Actions.Pass, payload: curTurn})
    handleNextTurn()
  }
  //-------------------------------------------------------

  const handleSetActive = (id: string) => {
    if (0 === curHandPhase) {
      const payload = {cardActiveId: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }

  const handleSetTarget = (id: string) => {
    if (0 === curHandPhase || !isEmpty(curSpell)) {
      const payload = {cardTargetId: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }

  const handleSetTarget2 = (id: string) => {
    if (0 === curHandPhase || !isEmpty(curSpell)) {
      const payload = {cardTarget2Id: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }
  //-------------------------------------------------------

  const handleDrawStep = () => {
    dispatch({type: Actions.DrawRound, payload: curHand})
    dispatch({type: Actions.NextStep, payload: 2})
  }

  const handleDropStep = (dropIds: string[]) => {
    dispatch({type: Actions.DropCards, payload: dropIds})
    dispatch({type: Actions.UpdateTokens, payload: 0})
    dispatch({type: Actions.NextStep, payload: isLastHand? 2: 1})
  }
  //-------------------------------------------------------

  return {
    handleBeginGame,
    handleDrawStep,
    handleDropStep,
    handleEndGame,
    handleNextHandPhase,
    handleNextHand,
    handleNextTurn,
    handlePass,
    handleReverse,
    handleSetActive,
    handleSetTarget,
    handleSetTarget2,
    nextIdx,
  }
}

export default useFlow
