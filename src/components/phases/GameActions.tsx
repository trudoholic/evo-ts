import useFlow from "../../hooks/useFlow"

const GameActions = () => {
  const {
    handleReverse,
  } = useFlow()

  return (
    <>
      <button onClick={handleReverse}>
        Reverse
      </button>
    </>
  )
}

export default GameActions
