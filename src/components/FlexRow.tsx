import styled from "styled-components"

interface IFlexRowProps {
  $paddingX: number;
}

export const FlexRow = styled.div<IFlexRowProps>`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({$paddingX}) => `0 ${$paddingX}px`};
`

interface IFlexRowContainerProps {
  $widthPercentage: number;
}

export const FlexRowContainer = styled.div<IFlexRowContainerProps>`
  margin: 0 auto;
  width: ${({$widthPercentage}) => `${$widthPercentage}%`};
`
