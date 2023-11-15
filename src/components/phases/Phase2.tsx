import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase2 = () => {
  const { state } = useAppContext()
  const {
    tokens,
  } = state as IState

  const {
    handleNextHandPhase,
    handleNextTurn,
    handleUpdateTokens,
  } = useFlow()

  const useToken = () => {
    handleUpdateTokens(tokens - 1)
    handleNextTurn()
  }

  return (
    <>
      <h2>{`Tokens: [${tokens}]`}</h2>
      {
        tokens?
          <>
            <button onClick={useToken}>
              Use Token
            </button>
          </>:<>
            <button onClick={() => handleNextHandPhase(3)}>
              Next Phase
            </button>
          </>
      }
    </>
  )
}

export default Phase2
