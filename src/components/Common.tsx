import styled from "styled-components"
import {commonZones} from "../data/zones"
import useCards from "../hooks/useCards"
import Zone from "./Zone"
import {green} from "../styles/colors"

export const StyledCommon = styled.div`
  //background: olive;
  border: 1px solid ${green[700]};
  flex: 1 0 0;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

const Common = () => {
  const {
    getZone,
  } = useCards()

  return (
    <StyledCommon>
      {
        commonZones.map((zone) =>
          <Zone
            {...zone}
            key={zone.id}
            cards={getZone(zone.id)}
          />)
      }
    </StyledCommon>
  )
}

export default Common
