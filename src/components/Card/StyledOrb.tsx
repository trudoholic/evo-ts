import styled from "styled-components"
import {green, grey, red} from "../../styles/colors"

interface IOrbProps {
  $disabled: boolean;
  $empty: boolean;
}

export const StyledOrb = styled.div<IOrbProps>`
  background: ${({$empty}) => $empty ? red[900] : green[900]};
  border: ${({$disabled}) => $disabled ? `2px solid ${grey[500]}` : `2px solid ${grey[50]}`};
  border-radius: 12px;
  box-sizing: border-box;
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
  height: 24px;
  width: 24px;
`
