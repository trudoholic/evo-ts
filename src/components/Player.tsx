import {useAppContext} from "../context"
import {IPlayer} from "../context/state"

interface IProps {
  idx: number
}

const Player = ({idx}: IProps) => {
  const { state } = useAppContext()
  const { curHand, curTurn, players } = state
  const player: IPlayer = players[idx]

  const styles = {
    box: {
      border: (idx === curHand? "1px solid #fff": "1px solid #369"),
      color: (idx === curTurn? "#fff": "#369"),
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
      <div>
        <div style={styles.box}>
          {`Player ${player.name}: ${player.value}`}
        </div>
        <details open>
          <summary>ZONE</summary>
          <div>[1]</div>
          <div>[2]</div>
          <div>[3]</div>
        </details>
      </div>
    </>
  )
}

export default Player
