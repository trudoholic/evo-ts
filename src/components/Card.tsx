import styled from "styled-components"
import {useAppContext} from "../context"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {getSpell} from "../data/spells"
import useCards from "../hooks/useCards"
import useFlow from "../hooks/useFlow"
import {grey, lime, orange} from "../styles/colors"

export const CardContainer = styled.div`
  //background: olive;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const FlexRow = styled.div`
  align-items: center;
  //align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

export const StyledBox = styled.div`
  background: ${lime[300]};
  border: ${2}px solid ${grey[500]};
  box-sizing: border-box;
  cursor: pointer;
  height: 16px;
  width: 16px;
`

interface ICardProps {
  $active: boolean;
  $target: boolean;
  $disabled: boolean;
}

export const StyledCard = styled.div<ICardProps>`
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
  font-size: 1.8rem;
  min-width: 5rem;
  margin: 0.2rem;
  padding: 0.3rem 0.5rem;
  background: ${({$disabled}) => $disabled ? "grey" : "green"};
  cursor: ${({$disabled}) => $disabled ? "not-allowed" : "pointer"};
`

const Card = (card: ICard) => {
  const {disabled, id, idPlayer, idZone, idCard, spell} = card

  const { state } = useAppContext()
  const {
    cardActiveId,
    cardTargetId,
  } = state as IState

  const cardActive = id === cardActiveId
  const cardTarget = id === cardTargetId

  const cardSpell = getSpell(spell)

  const {
    getTraits,
    isValid,
  } = useCards()

  const traits = getTraits(id)
  const cardDisabled = disabled || !isValid(idPlayer, idZone, idCard)

  const {
    handleSetActive,
    handleSetTarget,
  } = useFlow()

  const handleClick = (id: string) => {
    // console.log("Click:", id)
    if (cardActiveId) {
      handleSetTarget(id)
    } else {
      handleSetActive(id)
    }
  }

  return (
    <StyledCard
      $active={cardActive}
      $target={cardTarget}
      $disabled={cardDisabled}
      {...(!cardDisabled && { "onClick": () => handleClick(id) })}
    >
      <FlexRow>
        {traits.length ? <span>{`Pack [${traits.length}] `}</span> : null}
        <span>{`_${id}_`}</span>
        {cardSpell ? <StyledBox onClick={cardSpell.cb} /> : null}
      </FlexRow>
    </StyledCard>
  )
}

export default Card
