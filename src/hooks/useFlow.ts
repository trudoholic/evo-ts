import { useAppContext } from "../context"

const useFlow = () => {
  const { state } = useAppContext()
  const { nPlayers, isReverse } = state

  const nextIdx = (idx: number) => {
    return isReverse?
      (idx + nPlayers - 1) % nPlayers:
      (idx + 1) % nPlayers
  }

  return {
    nextIdx,
  }
}

export default useFlow
