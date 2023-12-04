import {useAppContext} from "../../context"
import {IState} from "../../context/state"
import {ICard} from "../../data/cards"
import {castSpell, isEmpty} from "../../data/spells"
import useCards from "../../hooks/useCards"
import useFlow from "../../hooks/useFlow"
import {FlexRow} from "./FlexRow"
import {StyledBox} from "./StyledBox"
import {StyledCard} from "./StyledCard"
import {StyledOrb} from "./StyledOrb"

const Card = (card: ICard) => {
  const {
    disabled,
    id,
    idPlayer,
    idZone,
    idCard,
    slot,
    slotEmpty,
    spellId,
  } = card

  const { state } = useAppContext()
  const {
    cardActiveId,
    cardTargetId,
    tokens,
  } = state as IState

  const cardActive = id === cardActiveId
  const cardTarget = id === cardTargetId

  const {
    getTraits,
    isKeeper,
    isValidCard,
    isValidSlot,
  } = useCards()

  const traits = getTraits(id)
  const cardSlot = !!(slot && idCard) || isKeeper(idZone, idCard)
  const cardSpell = !isEmpty(spellId) && !!idCard
  const cardDisabled = disabled || !isValidCard(idPlayer, idZone, idCard)
  const slotDisabled = !tokens || !slotEmpty || !isValidSlot(idPlayer, idZone)
  const spellEnabled = !cardDisabled && cardSpell

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
        {cardSpell ? (
          <StyledOrb
            $disabled={cardDisabled}
            $empty={slotEmpty}
            {...(spellEnabled && { "onClick": () => castSpell(spellId) })}
          />
        ) : null}

        {traits.length ? <span>{`Pack [${traits.length}] `}</span> : null}
        <span>{`${isEmpty(spellId)? "": `${spellId}: `}${id}`}</span>

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

export default Card
