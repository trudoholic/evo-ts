import {Actions} from "../../context/actions"
import {useAppContext} from "../../context"

const GameActions = () => {
  const { dispatch } = useAppContext()

  const handleReverse = () => {
    dispatch({type: Actions.Reverse})
  }

  return (
    <>
      <button onClick={handleReverse}>
        Reverse
      </button>
    </>
  )
}

export default GameActions
