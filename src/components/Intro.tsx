import useFlow from "../hooks/useFlow"

const Intro = () => {
  const {
    handleBeginGame,
  } = useFlow()

  return (
    <>
      <h2>Intro</h2>
      <button onClick={() => handleBeginGame(2)}>
        Begin Game [2]
      </button>
      <button onClick={() => handleBeginGame(3)}>
        Begin Game [3]
      </button>
      <button onClick={() => handleBeginGame(4)}>
        Begin Game [4]
      </button>
    </>
  )
}

export default Intro
