import styled from "styled-components"
import {useAppContext} from "../context"
import {commonZones} from "../data/zones"
import Zone from "./Zone"

export const StyledCommon = styled.div`
  //background: olive;
  border: 1px solid #f0f;
  flex: 1 0 0;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

const Common = () => {
  const { state } = useAppContext()
  const { cards } = state

  const commonCards = cards.filter(card => card.idPlayer === "0") // <--- XXX

  return (
    <StyledCommon>
      {
        commonZones.map((zone) =>
          <Zone {...zone} key={zone.id}
                cards={commonCards.filter(card => card.idZone === zone.id)}
          />)
      }
    </StyledCommon>
  )
}

export default Common
