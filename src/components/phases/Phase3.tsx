import useFlow from "../../hooks/useFlow"

const Phase3 = () => {
  const {
    handleNextHandPhase,
    handleNextHand,
    handleEndGame,
  } = useFlow()

  return (
    <>
      <button onClick={() => handleNextHandPhase(0)}>
        Next Phase
      </button>
      <button onClick={handleNextHand}>
        Next Hand
      </button>
      <button onClick={handleEndGame}>
        End Game
      </button>
    </>
  )
}

export default Phase3
