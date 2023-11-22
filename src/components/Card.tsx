import styled from "styled-components"
import {useAppContext} from "../context"
import useCards from "../hooks/useCards"
import useFlow from "../hooks/useFlow"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {getSpell} from "../data/spells"
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

const Card = ({disabled, id, idPlayer, idZone, spells}: ICard) => {
  const { state } = useAppContext()
  const {
    cardActiveId,
    cardTargetId,
  } = state as IState

  const cardActive = id === cardActiveId
  const cardTarget = id === cardTargetId

  const spell = getSpell(spells?.at(0))

  const {
    isValid,
  } = useCards()

  const cardDisabled = disabled || !isValid(idPlayer, idZone)

  const {
    getTraits,
    handleSetActive,
    handleSetTarget,
  } = useFlow()
  const traits = getTraits(id)
  // const b = !!tokens
  // const b = traits.length > 0

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
        {spell ? <StyledBox onClick={spell.cb} /> : null}
      </FlexRow>
    </StyledCard>
  )
}

export default Card
