import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"
// import {commonId} from "../../data/players"
// import {Zone} from "../../data/zones"

const Phase0 = () => {
  const { state, dispatch } = useAppContext()
  const {
    // cards,
    curTurn,
    players,
  } = state

  const {
    handleNextTurn,
    handleNextHandPhase,
  } = useFlow()

  const phaseEnd = players.every(p => p.pass)

  const handlePlay = () => {
    console.log(`- Play: ${curTurn}`)
    // const drawPile = cards.filter(card => card.idPlayer === commonId && card.idZone === Zone.DrawPile)
    // if (drawPile.length) {
    //   const card = {...drawPile[0]}
    //   card.idPlayer = players.at(curTurn).id
    //   card.idZone = Zone.Hand
    //   dispatch({type: Actions.DrawCard, payload: card})
    // }

    const rnd = Math.floor(Math.random() * 25 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    handleNextTurn()
  }

  const handlePass = () => {
    console.log(`--- Pass: ${curTurn}`)
    dispatch({type: Actions.Pass, payload: curTurn})
    handleNextTurn()
  }

  return (
    <>
      <h2>{`Turn: [${curTurn}]`}</h2>
      <h2>{`${phaseEnd?"Phase End":"*"}`}</h2>
      {
        phaseEnd?
          <>
            <button onClick={() => handleNextHandPhase(1)}>
              Next Phase
            </button>
          </>:<>
            <button onClick={handlePlay}>
              Play
            </button>
            <button onClick={handlePass}>
              Pass
            </button>
          </>
      }
    </>
  )
}

export default Phase0
