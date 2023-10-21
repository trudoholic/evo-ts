import { Actions } from "../context/actions"
import { useAppContext } from "../context"
import Player from "./Player"

const Game = () => {
  const { state, dispatch } = useAppContext()
  const { curHand, curTurn, nPlayers, players } = state

  const handleEndGame = () => {
    dispatch({type: Actions.EndGame})
  }

  const handleNextHand = () => {
    const  nextHand = (curHand + 1) % nPlayers
    dispatch({type: Actions.NextHand, payload: nextHand})
  }

  const handleNextTurn = () => {
    const  nextTurn = (curTurn + 1) % nPlayers
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }

  const styles = {
    flex: {
      display: "flex",
      // gap: "50px",
    }
  }

  return (
    <>
      <h2>Game</h2>
      <button onClick={handleNextHand}>
        Next Hand
      </button>
      <button onClick={handleNextTurn}>
        Next Turn
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
