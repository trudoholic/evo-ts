import {useAppContext} from "../../context"
import {IState} from "../../context/state"
import {ICard} from "../../data/cards"
import {isActive} from "../../data/abilities"
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
    idCard,
    emptySlots,
    poisoned,
    abId,
    abCooldown,
    abUsed,
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
    hasEmpty,
    hasSlots,
    isValidCard,
    isValidSlot,
  } = useCards()

  const traits = getTraits(id)
  const cardSpell = isActive(abId) && !!idCard
  const cardDisabled = disabled || !isValidCard(card)
  const slotDisabled = !tokens || !emptySlots || !isValidSlot(card)
  const spellEnabled = !cardDisabled && cardSpell && !abCooldown && !abUsed && hasEmpty(id)

  const {
    handleCastSpell,
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
            $disabled={cardDisabled || abUsed || !hasEmpty(id)}
            $ready={!abCooldown}
            {...(spellEnabled && { "onClick": () => handleCastSpell(id, abId) })}
          />
        ) : null}

        <span>{`${abCooldown || ""}`}</span>
        {traits.length ? <span>{`Pack [${traits.length}] `}</span> : null}
        <span>{`${abId}: ${id}${poisoned? " *": ""}`}</span>

        {hasSlots(card) ? (
          <FlexRow>
            {emptySlots > 1? `[${emptySlots}]`: null}&nbsp;
            <StyledBox
              $disabled={slotDisabled}
              $empty={!!emptySlots}
              {...(!slotDisabled && { "onClick": () => handleSlotClick(id) })}
            />
          </FlexRow>
        ) : null}
      </FlexRow>
    </StyledCard>
  )
}

export default Card
