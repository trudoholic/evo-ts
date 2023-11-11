import {Actions} from "../context/actions"
import {useAppContext} from "../context"
// import Phases from "./phases"
import useFlow from "../hooks/useFlow"
import Commands from "./Commands"
import Common from "./Common"
import Player, {PlayerContainer} from "./Player"

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
      {/*<Phases/>*/}
      <h2>
        {`Hand: [${curHand}] ${isReverse?"(R)":""}`}
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
        <Commands/>
      </PlayerContainer>
    </>
  )
}

export default Game
