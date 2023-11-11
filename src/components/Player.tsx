import styled from "styled-components"
import {useAppContext} from "../context"
import {IPlayer} from "../data/players"
import {zones} from "../data/zones"
import Zone from "./Zone"

export const PlayerContainer = styled.div`
  //background: olive;
  border: 1px solid #ff0;
  display: flex;
  flex-direction: row;
  //width: 100%;
`

interface IPlayerInfoProps {
  $hand: boolean;
  $turn: boolean;
}

const StyledPlayerInfo = styled.div<IPlayerInfoProps>`
  //background: olive;
  border: ${({$hand}) => $hand ? "1px solid #fff": "1px solid #369"};
  color: ${({$turn}) => $turn ? "#fff": "#369"};
  font-size: 2.4rem;
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
  border: 1px solid #f0f;
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
  const { curHand, curTurn, cards, players } = state

  const player: IPlayer = players[idx]
  const playerCards = cards.filter(card => card.idPlayer === player.id)

  return (
    <StyledPlayer>
      <StyledPlayerInfo $hand={idx === curHand} $turn={idx === curTurn}>
        {`${player.name}: ${player.value}`}
      </StyledPlayerInfo>
      {
        zones.map((zone) =>
          <Zone {...zone} key={zone.id}
                cards={playerCards.filter(card => card.idZone === zone.id)}
          />)
      }
    </StyledPlayer>
  )
}

export default Player
