import styled from "styled-components"
import {ICard} from "../data/cards"
import useCards from "../hooks/useCards"
import Card from "./Card"
import {green, grey, lime, red} from "../styles/colors"

export const PackContainer = styled.div`
  // background: ${lime[900]};
  // border: 1px solid ${grey[500]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  //padding: 0 8px;
`

interface IPackProps {
  $someEmpty: boolean;
}

export const StyledPack = styled.div<IPackProps>`
  background: ${({$someEmpty}) => $someEmpty ? red[700] : green[700]};
  border: 1px solid ${grey[500]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8px;
  margin-top: 8px;
`

const Pack = (card: ICard) => {
  const {
    id,
  } = card

  const {
    emptySlotIds,
    getTraits,
    // someEmpty,
  } = useCards()

  const traits = getTraits(id)

  return (
    <StyledPack $someEmpty={emptySlotIds(id).length > 0}>
      <Card {...card}/>
      {
        traits.map((c) => (
          <Card {...c} key={c.id}/>
        ))
      }
    </StyledPack>
  )
}

export default Pack
