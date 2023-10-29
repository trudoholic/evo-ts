import {useAppContext} from "../../context"
import Phase0 from "./Phase0"
import Phase1 from "./Phase1"

const phases = ["Phase_0", "Phase_1", "Phase_2", "Phase_3"]

const Phases = () => {
  const { state } = useAppContext()
  const {
    curHandPhase,
  } = state

  return (
    <>
      <h2>
        {`# Phases: [${phases[curHandPhase]}]`}
      </h2>
      { 0 === curHandPhase? <Phase0/>:
        1 === curHandPhase? <Phase1/>:
          <h2>Error</h2>
      }
    </>
  )
}

export default Phases
