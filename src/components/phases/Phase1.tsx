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
    const d2 = Math.floor(Math.random() * 6 + 1)
    console.log("RND", d1, d2)
    handleUpdateTokens(d1 + d2)
  }

  return (
    <>
      <h2>{`Tokens: [${tokens}]`}</h2>
      {
        tokens?
          <>
            <button onClick={() => handleNextHandPhase(2)}>
              Next Phase
            </button>
          </>:<>
            <button onClick={getTokens}>
              Get Tokens
            </button>
            {/*<p>{JSON.stringify(cards)}</p>*/}
          </>
      }
    </>
  )
}

export default Phase1
