import styled from "styled-components"
import {ICard} from "../data/cards"

export const CardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const StyledCard = styled.div`
  border: 1px solid #369;
  font-size: 1.8rem;
  min-width: 15rem;
  margin: 0.2rem;
  padding: 0.3rem 0.5rem;
`

const Card = ({id}: ICard) => {

  return (
    <StyledCard>
      {id}
    </StyledCard>
  )
}

export default Card
