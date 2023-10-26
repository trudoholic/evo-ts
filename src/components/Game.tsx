import { Actions } from "../context/actions"
import {useAppContext} from "../context"
import Player from "./Player"
import {phases} from "../context/state"
import useFlow from "../hooks/useFlow"

const Game = () => {
  const { state, dispatch } = useAppContext()
  const {
    curHand,
    curHandPhase,
    curTurn,
    isReverse,
    players,
  } = state
  const { nextIdx } = useFlow()

  const phaseEnd = players.every(p => p.value >= 100)

  const handleNextHand = () => {
    const  nextHand = nextIdx(curHand)
    dispatch({type: Actions.NextHand, payload: nextHand})
  }

  const handleNextHandPhase = () => {
    const  nextHandPhase = (curHandPhase + 1) % phases.length
    dispatch({type: Actions.NextHandPhase, payload: nextHandPhase})
  }

  const handleNextTurn = () => {
    const rnd = Math.floor(Math.random() * 10 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    const  nextTurn = nextIdx(curTurn)
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }

  const handleReverse = () => {
    dispatch({type: Actions.Reverse})
  }

  const handleEndGame = () => {
    dispatch({type: Actions.EndGame})
  }

  const styles = {
    flex: {
      display: "flex",
      // gap: "50px",
    }
  }

  return (
    <>
      <h2>
        {`[Hand: ${curHand}] [Turn: ${curTurn}] ${isReverse?"*":""} ${phaseEnd?"Gotcha!":""}`}
      </h2>
      <h2>
        {`[${phases[curHandPhase]}]`}
      </h2>
      <button onClick={handleNextHand}>
        Next Hand
      </button>
      <button onClick={handleNextHandPhase}>
        Next Phase
      </button>
      <button onClick={handleNextTurn}>
        Next Turn
      </button>
      <button onClick={handleReverse}>
        Reverse
      </button>
      <button onClick={handleEndGame}>
        End Game
      </button>
      <div style={styles.flex}>
        {players.map((p, i) => <Player key={p.id} idx={i} />)}
      </div>
    </>
  )
}

export default Game
