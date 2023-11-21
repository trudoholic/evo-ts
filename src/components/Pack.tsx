import styled from "styled-components"
import {useAppContext} from "../context"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import Card from "./Card"
import {green, grey, lime} from "../styles/colors"

export const PackContainer = styled.div`
  // background: ${lime[900]};
  // border: 1px solid ${grey[500]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  //padding: 0 8px;
`

export const StyledPack = styled.div`
  background: ${green[700]};
  border: 1px solid ${grey[500]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 8px;
  margin-top: 8px;
`

const Pack = (card: ICard) => {
  const { state } = useAppContext()
  const {
    cards,
  } = state as IState

  return (
    <StyledPack>
      <Card {...card}/>
      {
        cards.filter(c => c.idZone === card.id)
          .map((c) => (
            <Card {...c} key={c.id}/>
          ))
      }
    </StyledPack>
  )
}

export default Pack
