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
    handleSetActive,
    handleSetTarget,
  } = useFlow()

  const handleUndo = () => {
    if (cardTargetId) {
      handleSetTarget("")
    } else {
      handleSetActive("")
    }
  }

  const phaseEnd = players.every(p => p.pass)

  return (
    <>
      <h2>{`Turn: ${players.at(curTurn).name} (${curTurn})`}</h2>
      <h2>{`${phaseEnd?"All Players Have Passed":"*"}`}</h2>
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
                  <button onClick={handleUndo}>
                    X
                  </button>
                  {
                    cardTargetId ?
                      <>
                        <button onClick={handlePlayTrait}>
                          Play Trait
                        </button>
                      </> : <>
                        <button onClick={handlePlayCard}>
                          Play Card
                        </button>
                      </>
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
