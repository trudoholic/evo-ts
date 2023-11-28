import styled from "styled-components"
import {green, grey, red} from "../../styles/colors"

interface IBoxProps {
  $disabled: boolean;
  $empty: boolean;
}

export const StyledBox = styled.div<IBoxProps>`
  background: ${({$empty}) => $empty ? red[900] : green[900]};
  border: ${({$disabled}) => $disabled ? `2px solid ${grey[500]}` : `2px solid ${grey[50]}`};
  box-sizing: border-box;
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
  height: 16px;
  width: 16px;
`
