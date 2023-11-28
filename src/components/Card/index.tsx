import {useAppContext} from "../../context"
import {IState} from "../../context/state"
import {ICard} from "../../data/cards"
// import {getSpell} from "../data/spells"
import useCards from "../../hooks/useCards"
import useFlow from "../../hooks/useFlow"
import {FlexRow} from "./FlexRow"
import {StyledBox} from "./StyledBox"
import {StyledCard} from "./StyledCard"

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
