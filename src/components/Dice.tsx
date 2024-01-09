import styled from "styled-components"

const StyledDice = styled.div`
  font-size: 3.6rem;
`

interface IDiceProps {
  diceRoll: number
}

const Dice = ({diceRoll}: IDiceProps) => {
  return (
    <StyledDice>
      {[<></>, <>&#9856;</>, <>&#9857;</>, <>&#9858;</>, <>&#9859;</>, <>&#9860;</>, <>&#9861;</>][diceRoll % 7]}
    </StyledDice>
  )
}

export default Dice
