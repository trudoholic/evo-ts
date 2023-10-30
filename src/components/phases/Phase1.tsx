import useFlow from "../../hooks/useFlow"

const Phase1 = () => {
  const {
    handleNextHandPhase,
  } = useFlow()

  return (
    <>
      <button onClick={() => handleNextHandPhase(2)}>
        Next Phase
      </button>
    </>
  )
}

export default Phase1
