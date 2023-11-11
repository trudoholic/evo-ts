import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"
import {commonId} from "../../data/players"
import {Zone} from "../../data/zones"

const Phase0 = () => {
  const { state, dispatch } = useAppContext()

  const {
    cards,
    curTurn,
    players,
  } = state

  const {
    handleNextHandPhase,
    nextIdx,
  } = useFlow()

  const phaseEnd = players.every(p => p.value >= 100)

  const handleNextTurn = () => {
    const drawPile = cards.filter(card => card.idPlayer === commonId && card.idZone === Zone.DrawPile)
    if (drawPile.length) {
      const card = {...drawPile[0]}
      card.idPlayer = players.at(curTurn).id
      card.idZone = Zone.Hand
      dispatch({type: Actions.DrawCard, payload: card})
    }

    const rnd = Math.floor(Math.random() * 25 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    const  nextTurn = nextIdx(curTurn)
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }

  return (
    <>
      <h2>
        {` [Turn: ${curTurn}] Phase End: [${phaseEnd?"Gotcha!":""}]`}
      </h2>
      <button onClick={handleNextTurn}>
        Next Turn
      </button>
      <button onClick={() => handleNextHandPhase(1)}>
        Next Phase
      </button>
    </>
  )
}

export default Phase0
