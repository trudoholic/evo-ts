import {useAppContext} from "../context"
import {IPlayer} from "../context/state"
import {zones} from "../data/zones"
import Zone from "./Zone"

interface IProps {
  idx: number
}

const Player = ({idx}: IProps) => {
  const { state } = useAppContext()
  const { curHand, curTurn, cards, players } = state

  const player: IPlayer = players[idx]
  const playerCards = cards.filter(card => card.idPlayer === player.id)

  const styles = {
    box: {
      border: (idx === curHand? "1px solid #fff": "1px solid #369"),
      color: (idx === curTurn? "#fff": "#369"),
      fontSize: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "16px",
      // padding: "8px",
      width: "250px",
      height: "50px",
    }
  }

  return (
    <>
      <div>
        <div style={styles.box}>
          {`Player ${player.name}: ${player.value}`}
        </div>
        {
          zones.map((zone) =>
          <Zone {...zone} key={zone.id}
                cards={playerCards.filter(card => card.idZone === zone.id)}
          />)
        }
      </div>
    </>
  )
}

export default Player
