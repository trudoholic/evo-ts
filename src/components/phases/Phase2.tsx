import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useCards from "../../hooks/useCards"
import useFlow from "../../hooks/useFlow"
import {Zone} from "../../data/zones"

/* Feed */
const Phase2 = () => {
  const { state } = useAppContext()
  const {
    curTurn,
    players,
    tokens,
  } = state as IState

  const phaseEnd = players.every(p => p.pass)

  const {
    handleNextHandPhase,
    handlePass,
  } = useFlow()

  const {
    getZone,
    isEverySlotChecked,
  } = useCards()

  const noKeep = getZone(Zone.Keep, players.at(curTurn).id).length === 0

  return (
    <>
      {
        tokens && !phaseEnd ?
          <>
            <h2>{`Turn: ${players.at(curTurn).name} (${curTurn})`}</h2>
            <h2>{`Tokens: ${tokens}`}</h2>
            {
              noKeep || isEverySlotChecked() ?
                <button onClick={handlePass}>
                  Pass
                </button>
                : null
            }
          </>:<>
            {!tokens && <h2>No More Tokens</h2>}
            {phaseEnd && <h2>No More Slots</h2>}
            <button onClick={() => handleNextHandPhase(3)}>
              Next Phase
            </button>
          </>
      }
    </>
  )
}

export default Phase2
