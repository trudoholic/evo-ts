import { Actions } from "../context/actions"
import { useAppContext } from "../context"
import Player from "./Player"

const Game = () => {
  const { state, dispatch } = useAppContext()
  const { isGameOver, players } = state

  const foo = () => {
    console.log("Game", isGameOver, players)
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
      <h2>Game</h2>
      <button onClick={foo}>
        End Game
      </button>
      <div style={styles.flex}>
        {players.map((p, i) => <Player key={p.id} idx={i} />)}
      </div>
    </>
  )
}

export default Game
