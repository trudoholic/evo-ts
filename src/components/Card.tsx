import styled from "styled-components"
import {useAppContext} from "../context"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
// import {getSpell} from "../data/spells"
import useCards from "../hooks/useCards"
import useFlow from "../hooks/useFlow"
import {green, grey, lime, orange, red} from "../styles/colors"

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
  const {
    disabled,
    id,
    idPlayer,
    idZone,
    idCard,
    slot,
    slotEmpty,
  } = card

  const { state } = useAppContext()
  const {
    cardActiveId,
    cardTargetId,
    tokens,
  } = state as IState

  const cardActive = id === cardActiveId
  const cardTarget = id === cardTargetId

  // const cardSpell = getSpell(spell)

  const {
    getTraits,
    isKeeper,
    isValidCard,
    isValidSlot,
  } = useCards()

  const traits = getTraits(id)
  const cardSlot = (slot && idCard) || isKeeper(idZone, idCard)
  const cardDisabled = disabled || !isValidCard(idPlayer, idZone, idCard)
  const slotDisabled = !tokens || !slotEmpty || !isValidSlot(idPlayer, idZone)

  const {
    handlePlaySlot,
    handleSetActive,
    handleSetTarget,
    handleUpdateTokens,
  } = useFlow()

  const handleClick = (id: string) => {
    // console.log("Click:", id)
    if (cardActiveId) {
      handleSetTarget(id)
    } else {
      handleSetActive(id)
    }
  }

  const handleSlotClick = (cardId: string) => {
    // console.log("Slot:", cardId)
    handleUpdateTokens(tokens - 1)
    handlePlaySlot(cardId)
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
        {cardSlot ? (
          <StyledBox
            $disabled={slotDisabled}
            $empty={slotEmpty}
            {...(!slotDisabled && { "onClick": () => handleSlotClick(id) })}
          />
        ) : null}
      </FlexRow>
    </StyledCard>
  )
}
// onClick={cardSpell.cb}

export default Card
