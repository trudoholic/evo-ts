import styled from "styled-components"
import {useAppContext} from "../context"
import {IState} from "../context/state"
import {IPlayer} from "../data/players"
import {zones} from "../data/zones"
import useCards from "../hooks/useCards"
import Zone from "./Zone"
import {grey, lime} from "../styles/colors"

export const PlayerContainer = styled.div`
  //background: olive;
  //border: 1px solid #ff0;
  display: flex;
  flex-direction: row;
  margin: 1.6rem 0;
  //width: 100%;
`

interface IPlayerInfoProps {
  $hand: boolean;
  $turn: boolean;
  $pass: boolean;
}

const StyledPlayerInfo = styled.div<IPlayerInfoProps>`
  background: ${({$pass}) => $pass ? grey[700]: "var(--table-color)"};
  border: ${({$hand}) => $hand ? `${2}px solid ${lime[800]}`: `${1}px solid ${grey[500]}`};
  box-sizing: border-box;
  color: ${({$turn}) => $turn ? lime[300]: grey[500]};
  font-size: 2.4rem;
  font-weight: ${({$turn}) => $turn ? "bold": "normal"};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.6rem;
  padding: 0.8rem;
  //width: 25rem;
  height: 5rem;
`

export const StyledPlayer = styled.div`
  //background: olive;
  //border: 1px solid #f0f;
  flex: 1 0 0;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

interface IPlayerProps {
  idx: number
}

const Player = ({idx}: IPlayerProps) => {
  const { state } = useAppContext()
  const {
    curHand,
    curTurn,
    players,
  } = state as IState

  const player: IPlayer = players[idx]

  const {
    getZone,
  } = useCards()

  return (
    <StyledPlayer>
      <StyledPlayerInfo
        $hand={idx === curHand}
        $turn={idx === curTurn}
        $pass={player.pass}
      >
        {`${player.name}: ${player.value}`}
      </StyledPlayerInfo>
      {
        zones.map((zone) =>
          <Zone
            {...zone}
            key={zone.id}
            cards={getZone(zone.id, player.id)}
          />)
      }
    </StyledPlayer>
  )
}

export default Player
