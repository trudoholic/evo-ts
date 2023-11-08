import styled from "styled-components"
import {ICard} from "../data/cards"

export const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

interface CardProps {
  open: boolean;
}

export const StyledCard = styled.div<CardProps>`
  border: 1px solid #369;
  font-size: 1.8rem;
  min-width: 15rem;
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
