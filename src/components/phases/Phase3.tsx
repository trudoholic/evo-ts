import useFlow from "../../hooks/useFlow"

const Phase3 = () => {
  const {
    handleNextHandPhase,
  } = useFlow()

  return (
    <>
      <button onClick={() => handleNextHandPhase(0)}>
        Next Phase
      </button>
    </>
  )
}

export default Phase3
