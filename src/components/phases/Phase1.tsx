import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"

const Phase1 = () => {
  const { dispatch } = useAppContext()

  const handleNextHandPhase = () => {
    dispatch({type: Actions.NextHandPhase, payload: 0})
  }

  return (
    <>
      <button onClick={handleNextHandPhase}>
        # Next Phase
      </button>
    </>
  )
}

export default Phase1
