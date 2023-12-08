import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import {isEmpty} from "../../data/spells"
import useFlow from "../../hooks/useFlow"

const TargetMode = () => {
  const { state } = useAppContext()
  const {
    curSpell,
  } = state as IState

  const {
    handleUncastSpell,
  } = useFlow()

  return (
    <>
      {
        isEmpty(curSpell)?
          <>
            <button onClick={() => {}}>
              Empty
            </button>
          </>:<>
            <button onClick={handleUncastSpell}>
              Not Empty
            </button>
          </>
      }
    </>
  )
}

export default TargetMode
