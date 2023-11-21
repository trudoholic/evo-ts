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
    handleNextHandPhase,
    handlePass,
    handlePlayCard,
    handlePlayTrait,
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
                <>
                  <button onClick={handlePlayCard}>
                    Play Card
                  </button>
                  {
                    cardTargetId ?
                      <>
                        <button onClick={handlePlayTrait}>
                          Play Trait
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
