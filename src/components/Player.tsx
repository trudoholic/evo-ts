import {useAppContext} from "../context"
import {IPlayer} from "../context/state"

interface IProps {
  idx: number
}

const Player = ({idx}: IProps) => {
  const { state } = useAppContext()
  const { players } = state
  const player: IPlayer = players[idx]

  const styles = {
    box: {
      border: (idx? "1px solid #369": "1px solid #fff"),
      color: (idx? "#369": "#fff"),
      fontSize: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px",
      // padding: "20px",
      width: "250px",
      height: "50px",
    }
  };

  return (
    <>
      <div style={styles.box}>
        {`Player ${player.name}: ${player.value}`}
      </div>
    </>
  )
}

export default Player
