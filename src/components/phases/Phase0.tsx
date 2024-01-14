import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useCards from "../../hooks/useCards"
import useFlow from "../../hooks/useFlow"
import {isPair} from "../../data/abilities"
import {Zone} from "../../data/zones"

/* Play */
const Phase0 = () => {
  const { state } = useAppContext()
  const {
    // cards,
    cardActiveId,
    cardTargetId,
    cardTarget2Id,
    curTurn,
    players,
  } = state as IState

  const curPlayerId = players.at(curTurn)?.id ?? ""

  const {
    findCard,
    getZone,
    handlePlayCard,
    handlePlayTrait,
  } = useCards()

  const activeCard = findCard(cardActiveId)
  const pair = activeCard? isPair(activeCard.abId): false
  const keepLength = getZone(Zone.Keep, curPlayerId).length

  const {
    handleNextHandPhase,
    handlePass,
    handleSetActive,
    handleSetTarget,
    handleSetTarget2,
  } = useFlow()

  const handleUndo = () => {
    if (cardTarget2Id) {
      handleSetTarget2("")
    } else if (cardTargetId) {
      handleSetTarget("")
    } else {
      handleSetActive("")
    }
  }

  const phaseEnd = players.every(p => p.pass)

  return (
    <>
      <h2>{`Turn: ${players.at(curTurn).name} (${curTurn})`}</h2>
      {phaseEnd && <h2>All Players Have Passed</h2>}
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
                    Undo
                  </button>
                  {
                    cardTargetId ?
                      <>
                        {
                          pair ?
                            <>
                              {
                                cardTarget2Id ?
                                  <>
                                    <button onClick={handlePlayTrait}>
                                      Play Trait
                                    </button>
                                  </> : <>
                                    {keepLength > 1 && <h2>Select 2nd Target</h2>}
                                  </>
                              }
                            </> : <>
                              <button onClick={handlePlayTrait}>
                                Play Trait
                              </button>
                            </>
                        }
                      </> : <>
                        <button onClick={handlePlayCard}>
                          Play Card
                        </button>
                        {keepLength > 0 && <h2>Or Select Target</h2>}
                      </>
                  }
                </> : <>
                  <button onClick={handlePass}>
                    Pass
                  </button>
                  <h2>Or Select Card</h2>
                </>
            }
            {/*<p>{JSON.stringify(cards)}</p>*/}
          </>
      }
    </>
  )
}

export default Phase0
