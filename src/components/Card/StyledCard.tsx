import styled from "styled-components"
import {green, grey, lime, orange} from "../../styles/colors"

interface ICardProps {
  $active: boolean;
  $target: boolean;
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
  background: ${({$disabled}) => $disabled ? grey[700] : green[900]};
  border: ${
    ({$active, $target}) => $active ? (
      `${2}px solid ${lime[300]}`
    ) : $target ? (
      `${2}px solid ${orange[300]}`
    ) : (
      `${1}px solid ${grey[500]}`
    )
  };
  box-sizing: border-box;
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
  font-size: 1.8rem;
  min-width: 5rem;
  margin: 0.2rem;
  padding: 0.3rem 0.5rem;
`
