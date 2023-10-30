import useFlow from "../../hooks/useFlow"

const Phase2 = () => {
  const {
    handleNextHandPhase,
  } = useFlow()

  return (
    <>
      <button onClick={() => handleNextHandPhase(3)}>
        Next Phase
      </button>
    </>
  )
}

export default Phase2
