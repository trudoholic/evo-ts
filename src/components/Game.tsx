import {useAppContext} from "../context"
import {IState} from "../context/state"
import Commands from "./Commands"
import Common from "./Common"
import Player, {PlayerContainer} from "./Player"

const Game = () => {
  const { state } = useAppContext()
  const {
    // cards,
    curHand,
    isLastHand,
    isReverse,
    players,
  } = state as IState

  // console.log(cards)

  return (
    <>
      <h2>
        {`Hand: ${players.at(curHand).name} (${curHand}) ${isLastHand?"Last!":""} ${isReverse?"(R)":""}`}
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
