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
  $b: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  border: 1px solid #369;
  font-size: 1.8rem;
  min-width: 5rem;
  margin: 0.2rem;
  padding: 0.3rem 0.5rem;
  background: ${({open}) => open ? "blue" : "green"};
`

const Card = ({id}: ICard) => {
  const {
    getPerks,
  } = useFlow()

  const perks = getPerks(id)

  return (
    <StyledCard $b={perks.length > 0}>
      {`${id}:${perks.length}`}
    </StyledCard>
  )
}

export default Card
