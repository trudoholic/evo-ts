import styled from "styled-components"
import {useAppContext} from "../context"
import {ICard} from "../data/cards"
import {IState} from "../context/state"
import useFlow from "../hooks/useFlow"

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
  cursor: ${({$disabled}) => $disabled ? "default" : "pointer"};
`

// const Card = ({disabled, id, idPlayer, idZone, tokens}: ICard) => {
const Card = ({disabled, id, idPlayer}: ICard) => {
  const { state } = useAppContext()
  const {
    curTurn,
    players,
  } = state as IState

  const cardDisabled = disabled
    || (players.at(curTurn).id !== idPlayer)
    || (players.at(curTurn).pass)

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
