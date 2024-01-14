import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useAbility from "../../hooks/useAbility"

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
  } = useAbility()

  return (
    <>
      <button onClick={handleUncastSpell}>
        Undo
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
