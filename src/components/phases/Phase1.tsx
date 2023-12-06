import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useFlow from "../../hooks/useFlow"

const Phase1 = () => {
  const { state } = useAppContext()
  const {
    tokens,
  } = state as IState

  const {
    handleNextHandPhase,
    handleUpdateTokens,
  } = useFlow()

  const getTokens = () => {
    const d1 = Math.floor(Math.random() * 6 + 1)
    const d2 = 1//Math.floor(Math.random() * 6 + 1)
    console.log("RND", d1, d2)
    handleUpdateTokens(d1 + d2)
  }

  return (
    <>
      {
        tokens?
          <>
            <h2>{`[${tokens}]`}</h2>
            <button onClick={() => handleNextHandPhase(2)}>
              Next Phase
            </button>
          </>:<>
            <h2>&#9856;&#9857;&#9858;&#9859;&#9860;&#9861;</h2>
            <button onClick={getTokens}>
              Get Tokens
            </button>
          </>
      }
    </>
  )
}

export default Phase1
