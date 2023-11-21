import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase0 = () => {
  const { state } = useAppContext()
  const {
    // cards,
    cardActiveId,
    cardTargetId,
    curTurn,
    players,
  } = state as IState

  const {
    // getHand,
    // getKeep,
    handleNextHandPhase,
    handlePass,
    handlePlayCard,
    handlePlayPerk,
  } = useFlow()

  const phaseEnd = players.every(p => p.pass)

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
              cardActiveId ?
              // getHand().length ?
                <>
                  <button onClick={handlePlayCard}>
                    Play Card
                  </button>
                  {
                    cardTargetId ?
                    // getKeep().length ?
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
