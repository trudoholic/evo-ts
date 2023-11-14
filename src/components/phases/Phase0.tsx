import {Actions} from "../../context/actions"
import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase0 = () => {
  const { state, dispatch } = useAppContext()
  const {
    // cards,
    curTurn,
    players,
  } = state as IState

  const {
    getHand,
    getKeep,
    handleNextTurn,
    handleNextHandPhase,
    playCard,
    playPerk,
  } = useFlow()

  const phaseEnd = players.every(p => p.pass)

  const handlePlayCard = () => {
    console.log(`- Play Card: ${curTurn}`)
    playCard(0)

    const rnd = Math.floor(Math.random() * 25 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    handleNextTurn()
  }

  const handlePlayPerk = () => {
    console.log(`- Play Perk: ${curTurn}`)
    playPerk(0, -1)

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
                <>
                  <button onClick={handlePlayCard}>
                    Play Card
                  </button>
                  {
                    getKeep().length ?
                      <>
                        <button onClick={handlePlayPerk}>
                          Play Perk
                        </button>
                      </>
                      : null
                  }
                </>
                : null
            }
            <button onClick={handlePass}>
              Pass
            </button>
            {/*<p>{JSON.stringify(cards)}</p>*/}
          </>
      }
    </>
  )
}

export default Phase0
