import styled from "styled-components"
import Phases from "./phases"

export const StyledCommands = styled.div`
  //background: olive;
  border: 1px solid #f0f;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  justify-content: start;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

const Commands = () => {
  return (
    <StyledCommands>
      <Phases/>
    </StyledCommands>
  )
}

export default Commands
