import {Actions} from "../context/actions"
import {useAppContext} from "../context"
import Common from "./Common"
import Player, {PlayerContainer} from "./Player"
import Phases from "./phases"
import useFlow from "../hooks/useFlow"

const Game = () => {
  const { state, dispatch } = useAppContext()
  const {
    curHand,
    isReverse,
    players,
  } = state
  const { nextIdx } = useFlow()

  const handleNextHand = () => {
    const  nextHand = nextIdx(curHand)
    dispatch({type: Actions.NextHand, payload: nextHand})
  }

  const handleReverse = () => {
    dispatch({type: Actions.Reverse})
  }

  const handleEndGame = () => {
    dispatch({type: Actions.EndGame})
  }

  return (
    <>
      <Phases/>
      <h2>
        {`Game: [Hand: ${curHand}] ${isReverse?"*":""}`}
      </h2>
      <button onClick={handleNextHand}>
        Next Hand
      </button>
      <button onClick={handleReverse}>
        Reverse
      </button>
      <button onClick={handleEndGame}>
        End Game
      </button>
      {/*<Common/>*/}
      <PlayerContainer>
        <Common/>
        {players.map((p, i) => <Player key={p.id} idx={i} />)}
      </PlayerContainer>
    </>
  )
}

export default Game
