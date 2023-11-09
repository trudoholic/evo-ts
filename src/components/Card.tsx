import styled from "styled-components"
import {ICard} from "../data/cards"

export const CardContainer = styled.div`
  //background: olive;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //justify-content: center;
`

interface ICardProps {
  open: boolean;
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
  return (
    <StyledCard open={7 === id}>
      {id}
    </StyledCard>
  )
}

export default Card
