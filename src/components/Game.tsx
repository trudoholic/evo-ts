import { Actions } from "../context/actions"
import { useAppContext } from "../context"
import Player from "./Player"
import useFlow from "../hooks/useFlow"

const Game = () => {
  const { state, dispatch } = useAppContext()
  const { curHand, curTurn, isReverse, players } = state
  const { nextIdx } = useFlow()

  const handleNextHand = () => {
    const  nextHand = nextIdx(curHand)
    dispatch({type: Actions.NextHand, payload: nextHand})
  }

  const handleNextTurn = () => {
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
      <h2>{`[Hand: ${curHand}] [Turn: ${curTurn}] [${isReverse}]`}</h2>
      <button onClick={handleNextHand}>
        Next Hand
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
