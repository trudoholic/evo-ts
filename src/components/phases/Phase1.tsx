import {useState} from "react"
import {IState} from "../../context/state"
import {useAppContext} from "../../context"
import useCards from "../../hooks/useCards"
import useFlow from "../../hooks/useFlow"
import Dice from "../Dice"
import {FlexRow, FlexRowContainer} from "../FlexRow"

/* Dice */
const Phase1 = () => {
  const [diceRoll1, setDiceRoll1] = useState(0)
  const [diceRoll2, setDiceRoll2] = useState(0)

  const { state } = useAppContext()
  const {
    nPlayers,
    tokens,
  } = state as IState

  const {
    handleNextHandPhase,
    handleUpdateTokens,
  } = useFlow()

  const {
    dice,
  } = useCards()

  const getTokens = () => {
    const d1 = dice(6)
    const d2 = dice(6)
    setDiceRoll1(d1)
    setDiceRoll2(d2)
    const tokens = [0, 1, d1 + 2, d1 + d2, d1 + d2 + 2][nPlayers]
    console.log("RND:", d1, d2, tokens)
    handleUpdateTokens(tokens)
  }

  return (
    <>
      {
        tokens?
          <>
            <FlexRowContainer $widthPercentage={25}>
            {nPlayers < 3?
              <Dice diceRoll={diceRoll1}/>:
              <FlexRow $paddingX={0}>
                <Dice diceRoll={diceRoll1}/>
                <Dice diceRoll={diceRoll2}/>
              </FlexRow>
            }
            </FlexRowContainer>
            <h2>{`Tokens: ${tokens}`}</h2>
            <button onClick={() => handleNextHandPhase(2)}>
              Next Phase
            </button>
          </>:<>
            <button onClick={getTokens}>
              Get Tokens
            </button>
          </>
      }
    </>
  )
}

export default Phase1
