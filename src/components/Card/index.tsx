import {useAppContext} from "../../context"
import {IState} from "../../context/state"
import {ICard} from "../../data/cards"
import {Zone} from "../../data/zones"
import useCards from "../../hooks/useCards"
import useFlow from "../../hooks/useFlow"
import {FlexRow} from "../FlexRow"
import {StyledBox} from "./StyledBox"
import {StyledCard} from "./StyledCard"
import {StyledOrb} from "./StyledOrb"

const Card = (card: ICard) => {
  const {
    id,
    emptySlots,
    poisoned,
    abId,
    abCooldown,
    idZone,
  } = card

  const { state } = useAppContext()
  const {
    cardActiveId,
    cardTargetId,
    cardTarget2Id,
    tokens,
  } = state as IState

  const cardActive = id === cardActiveId
  const cardTarget = id === cardTargetId || id === cardTarget2Id

  const {
    getTraits,
    hasAbility,
    hasSlots,
    isAbilityEnabled,
    isCardDisabled,
    isHost,
    isValidSlot,
  } = useCards()

  const host = isHost(id)
  const traits = getTraits(id)
  const slotDisabled = !tokens || !emptySlots || !isValidSlot(card)
  const cardAbility = hasAbility(card)
  const cardDisabled = isCardDisabled(card)
  const abilityEnabled = isAbilityEnabled(card)

  const {
    handleCastSpell,
    handlePlaySlot,
    handleSetActive,
    handleSetTarget,
    handleSetTarget2,
  } = useFlow()

  const handleClick = (id: string) => {
    // console.log("Click:", id)
    if (cardTargetId) {
      handleSetTarget2(id)
    } else if (cardActiveId) {
      handleSetTarget(id)
    } else {
      handleSetActive(id)
    }
  }

  const handleSlotClick = (cardId: string) => {
    // console.log("Slot:", cardId)
    handlePlaySlot(cardId)
  }

  return (
    <StyledCard
      $active={cardActive}
      $target={cardTarget}
      $disabled={cardDisabled}
      {...(!cardDisabled && { "onClick": () => handleClick(id) })}
    >
      <FlexRow $paddingX={Zone.Keep === idZone ? 16: 0}>
        {cardAbility ? (
          <FlexRow $paddingX={0}>
            <StyledOrb
              $disabled={!abilityEnabled}
              $ready={!abCooldown}
              {...(abilityEnabled && { "onClick": () => handleCastSpell(id, abId) })}
            />
            &nbsp;{abCooldown? `${abCooldown}`: null}
          </FlexRow>
        ) : null}

        {traits.length ? <span>{`[${traits.length}] `}</span> : null}
        <span>{`${host? "#": ""}${abId}:${id}${poisoned? " *": ""}`}</span>

        {hasSlots(card) ? (
          <FlexRow $paddingX={0}>
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
