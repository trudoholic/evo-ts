import {useAppContext} from "../context"
import Commands from "./Commands"
import Common from "./Common"
import Player, {PlayerContainer} from "./Player"

const Game = () => {
  const { state } = useAppContext()
  const {
    curHand,
    isReverse,
    players,
  } = state

  return (
    <>
      <h2>
        {`Hand: [${curHand}] ${isReverse?"(R)":""}`}
      </h2>
      <PlayerContainer>
        <Common/>
        {players.map((p, i) => <Player key={p.id} idx={i} />)}
        <Commands/>
      </PlayerContainer>
    </>
  )
}

export default Game
