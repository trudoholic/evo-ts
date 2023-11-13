import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"
import {commonId} from "../../data/players"
import {Zone} from "../../data/zones"

const Phase3 = () => {
  const { state } = useAppContext()
  const {
    cards,
  } = state

  const deck = cards.filter(card => card.idPlayer === commonId && card.idZone === Zone.DrawPile)
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
