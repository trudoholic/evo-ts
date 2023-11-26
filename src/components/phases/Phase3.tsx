import {Zone} from "../../data/zones"
import useFlow from "../../hooks/useFlow"
import useCards from "../../hooks/useCards"

const Phase3 = () => {
  const {
    getZone,
  } = useCards()

  const deck = getZone(Zone.DrawPile)
  const gameEnd = !deck.length

  const {
    handleNextHand,
    handleEndGame,
  } = useFlow()

  return (
    <>
      <h2>{`${gameEnd?"Game End":"*"}`}</h2>
      {
        gameEnd?
          <>
            <button onClick={handleEndGame}>
              End Game
            </button>
          </>:<>
            <button onClick={handleNextHand}>
              Next Hand
            </button>
          </>
      }
    </>
  )
}

export default Phase3
