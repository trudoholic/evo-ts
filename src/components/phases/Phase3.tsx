import {useAppContext} from "../../context"
import {IState} from "../../context/state"
import useFlow from "../../hooks/useFlow"

/* Drop */
const Phase3 = () => {
  const { state } = useAppContext()
  const {
    curStep,
    isLastHand,
  } = state as IState

  const {
    handleDrawStep,
    handleDropStep,
    handleNextHand,
    handleEndGame,
  } = useFlow()

  return (
    <>
      {
        0 === curStep? <>
            <button onClick={handleDropStep}>
              Drop Step
            </button>
          </>:
        1 === curStep? <>
            <button onClick={handleDrawStep}>
              Draw Step
            </button>
          </>:
        2 === curStep? <>
          {
            isLastHand?
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
          </>:<h2>Error</h2>
      }
    </>
  )
}

export default Phase3
