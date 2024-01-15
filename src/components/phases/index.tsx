import {useAppContext} from "../../context"
import Phase0 from "./Phase0"
import Phase1 from "./Phase1"
import Phase2 from "./Phase2"
import Phase3 from "./Phase3"
import TargetMode from "./TargetMode"
import GameActions from "./GameActions"

const phases = ["Play", "Dice", "Feed", "Drop"]

const Phases = () => {
  const { state } = useAppContext()
  const {
    curHandPhase,
    curSpell,
  } = state

  return (
    <>
      <h2>
        {!curSpell? `${phases[curHandPhase]} Phase`: "Target Mode"}
      </h2>
      {
        curSpell? <TargetMode/>:
        0 === curHandPhase? <Phase0/>:
        1 === curHandPhase? <Phase1/>:
        2 === curHandPhase? <Phase2/>:
        3 === curHandPhase? <Phase3/>:
          <h2>Error</h2>
      }
      <GameActions/>
    </>
  )
}

export default Phases
