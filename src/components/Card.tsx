import styled from "styled-components"
import {useAppContext} from "../context"
import useFlow from "../hooks/useFlow"
import {ICard} from "../data/cards"
import {IState} from "../context/state"
import {ZoneList} from "../data/zones"

export const CardContainer = styled.div`
  //background: olive;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

interface ICardProps {
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  border: 1px solid #369;
  font-size: 1.8rem;
  min-width: 5rem;
  margin: 0.2rem;
  padding: 0.3rem 0.5rem;
  background: ${({$disabled}) => $disabled ? "grey" : "green"};
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
`

// const Card = ({disabled, id, idPlayer, idZone, tokens}: ICard) => {
const Card = ({disabled, id, idPlayer, idZone}: ICard) => {
  const { state } = useAppContext()
  const {
    curHandPhase,
    curTurn,
    players,
  } = state as IState

  const cardDisabled = disabled
    || (players.at(curTurn).id !== idPlayer)
    || (players.at(curTurn).pass)
    || ZoneList[curHandPhase] !== idZone

  const {
    getPerks,
  } = useFlow()
  const perks = getPerks(id)
  // const b = !!tokens
  // const b = perks.length > 0

  const foo = () => console.log("Click!")

  return (
    <StyledCard
      $disabled={cardDisabled}
      {...(!cardDisabled && { onClick: foo })}
    >
      {`${id}:${perks.length}`}
    </StyledCard>
  )
}

export default Card
