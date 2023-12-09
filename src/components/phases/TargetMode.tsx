import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const TargetMode = () => {
  const { state } = useAppContext()
  const {
    cardActiveId,
    cardTargetId,
    curSpell,
  } = state as IState

  const {
    handlePutSpellOn,
    handleUncastSpell,
  } = useFlow()

  return (
    <>
      <button onClick={handleUncastSpell}>
        X
      </button>
      {
        cardActiveId && cardTargetId?
          <>
            <button onClick={() => handlePutSpellOn(cardActiveId, cardTargetId, curSpell)}>
              Put Spell On Target
            </button>
          </>: null
      }
    </>
  )
}

export default TargetMode
