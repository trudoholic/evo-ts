import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase0 = () => {
  const { state, dispatch } = useAppContext()
  const {
    curTurn,
    players,
  } = state

  const {
    getHand,
    handleNextTurn,
    handleNextHandPhase,
    playCard,
  } = useFlow()

  const phaseEnd = players.every(p => p.pass)

  const handlePlay = () => {
    console.log(`- Play: ${curTurn}`)
    playCard(0)

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
            {
              getHand().length ?
                <button onClick={handlePlay}>
                  Play
                </button>
                : null
            }
            <button onClick={handlePass}>
              Pass
            </button>
          </>
      }
    </>
  )
}

export default Phase0
