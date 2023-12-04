import styled from "styled-components"
import {green, grey} from "../../styles/colors"

interface IOrbProps {
  $disabled: boolean;
  $ready: boolean;
}

export const StyledOrb = styled.div<IOrbProps>`
  background: ${({$ready}) => $ready ? green[700] : grey[700]};
  border: ${({$disabled, $ready}) => $disabled || !$ready ? `1px solid ${grey[500]}` : `4px solid ${grey[50]}`};
  border-radius: 12px;
  box-sizing: border-box;
  cursor: ${({$disabled, $ready}) => $disabled || !$ready ? "not-allowed" : "pointer"};
  height: 24px;
  width: 24px;
`
