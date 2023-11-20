import styled from "styled-components"
import {useAppContext} from "../context"
import useFlow from "../hooks/useFlow"
import {ICard} from "../data/cards"
import {IState} from "../context/state"
import {ZoneList} from "../data/zones"
import {grey, lime} from "../styles/colors"

export const CardContainer = styled.div`
  //background: olive;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

interface ICardProps {
  $active: boolean;
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  border: ${({$active}) => $active ? `${2}px solid ${lime[300]}`: `${1}px solid ${grey[500]}`};
  box-sizing: border-box;
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
    cardActiveId,
    // cardTargetId,
    curHandPhase,
    curTurn,
    players,
  } = state as IState

  const cardActive = id === cardActiveId

  const cardDisabled = disabled
    || (players.at(curTurn).id !== idPlayer)
    || (players.at(curTurn).pass)
    || ZoneList[curHandPhase] !== idZone

  const {
    getPerks,
    handleSetActive,
    // handleSetTarget,
  } = useFlow()
  const perks = getPerks(id)
  // const b = !!tokens
  // const b = perks.length > 0

  const handleClick = (id: string) => {
    console.log("Click!", id)
    handleSetActive(id)
  }

  return (
    <StyledCard
      $active={cardActive}
      $disabled={cardDisabled}
      {...(!cardDisabled && { onClick: () => handleClick(id) })}
    >
      {`${id}:${perks.length}`}
    </StyledCard>
  )
}

export default Card
