import styled from "styled-components"
import {ICard} from "../data/cards"
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
`

const Card = ({disabled, id, idPlayer, idZone, tokens}: ICard) => {
  console.log(disabled, id, idPlayer, idZone, tokens)
  const {
    getPerks,
  } = useFlow()
  const perks = getPerks(id)
  // const b = !!tokens
  // const b = perks.length > 0

  return (
    <StyledCard $disabled={disabled}>
      {`${id}:${perks.length}`}
    </StyledCard>
  )
}

export default Card
