import {useAppContext} from "../../context"
import Phase0 from "./Phase0"
import Phase1 from "./Phase1"
import Phase2 from "./Phase2"
import Phase3 from "./Phase3"

const phases = ["Phase_0", "Phase_1", "Phase_2", "Phase_3"]

const Phases = () => {
  const { state } = useAppContext()
  const {
    curHandPhase,
  } = state

  return (
    <>
      <hr/>
      <h2>
        {`Phases: [${phases[curHandPhase]}]`}
      </h2>
      { 0 === curHandPhase? <Phase0/>:
        1 === curHandPhase? <Phase1/>:
        2 === curHandPhase? <Phase2/>:
        3 === curHandPhase? <Phase3/>:
          <h2>Error</h2>
      }
      <hr/>
    </>
  )
}

export default Phases
