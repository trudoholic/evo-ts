import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {commonId} from "../data/players"
import {Ability, getKind, isHex, isKind, nSlots, TAbility} from "../data/abilities"
import {Zone} from "../data/zones"
import useFlow from "./useFlow"

const useCards = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
    cardTarget2Id,
    curHandPhase,
    curTurn,
    curSpell,
    players,
  } = state as IState

  const {
    handleNextTurn,
  } = useFlow()

  const curPlayerId = players.at(curTurn)?.id ?? ""
  //-------------------------------------------------------

  const findCard = (cardId: string) => {
    return cards.find(({id}) => id === cardId)
  }

  const activeCard = findCard(cardActiveId)
  //-------------------------------------------------------

  const dice = (n: number) => Math.floor(Math.random() * n + 1)
  //-------------------------------------------------------

  const getAbility = (ability: TAbility, playerId: string = commonId) => (
    getZone(Zone.Keep, playerId)
      .filter(c => hasTrait(c.id, ability))
      .filter(c => hasEmpty(c.id))
      .map(c => c.id)
  )
  //-------------------------------------------------------

  const getDropIds = () => {
    return cards
      .filter(c => isKeeper(c.idZone, c.idCard))
      .filter(c => hasEmpty(c.id) || c.poisoned)
      .map(c => c.id)
  }
  //-------------------------------------------------------

  const getTraits = (cardId: string) => {
    return cards.filter(c => c.idCard === cardId || c.idCard2 === cardId)
  }
  //-------------------------------------------------------

  const getZone = (zoneId: string, playerId: string = commonId) => (
    cards.filter(({idPlayer, idZone, idCard}) => idPlayer === playerId && idZone === zoneId && idCard === "")
  )
  //-------------------------------------------------------

  const isDeckEmpty = () => !getZone(Zone.DrawPile).length
  //-------------------------------------------------------

  const hasKind = (cardId: string, kind: string) => {
    return cards
      .filter(c => c.idCard === cardId)
      .some(c => isKind(c.abId, kind))
  }

  const hasTrait = (cardId: string, spellId: TAbility) => {
    return cards
      .filter(c => c.idCard === cardId || c.idCard2 === cardId)
      .some(c => c.abId === spellId)
  }

  const isHost = (cardId: string) => {
    return cards
      .filter(c => c.idCard2 === cardId)
      .some(c => c.abId === Ability.Symbiosis)
  }
  //-------------------------------------------------------

  const isInPack = (cardId: string, card: ICard): boolean => {
    if (!cardId) return false
    return card.id === cardId || card.idCard === cardId || card.idCard2 === cardId
  }
  //-------------------------------------------------------

  const isKeeper = (idZone: string, idCard: string): boolean => {
    return (
      Zone.Keep === idZone && "" === idCard
    )
  }
  //-------------------------------------------------------

  const isActiveParent = (cardId: string): boolean => {
    return activeCard?.idCard === cardId
  }
  //-------------------------------------------------------

  const isCardDisabled = (card: ICard): boolean => {
    return card.disabled || !isValidCard(card)
  }
  //-------------------------------------------------------

  const isValidAbility = (card: ICard): boolean => {
    if (!activeCard) return false
    const activeParent = ("" === activeCard.idCard) ? activeCard : findCard(activeCard.idCard)
    const {id} = card

    if (hasTrait(id, Ability.Burrowing) && !hasEmpty(id)) {
      return false
    }
    else if (hasTrait(id, Ability.Camouflage) && !hasTrait(activeParent.id, Ability.SharpVision)) {
      return false
    }
    else if (hasTrait(id, Ability.HighBodyWeight) && !hasTrait(activeParent.id, Ability.HighBodyWeight)) {
      return false
    }
    else if (hasTrait(id, Ability.Mimicry)) {
      const t = getZone(Zone.Keep, card.idPlayer)
        .filter(c => !hasTrait(c.id, Ability.Mimicry))
      if (t.length) return false
    }
    else if (hasTrait(id, Ability.Swimming) && !hasTrait(activeParent.id, Ability.Swimming)) {
      return false
    }
    else if (!hasTrait(id, Ability.Swimming) && hasTrait(activeParent.id, Ability.Swimming)) {
      return false
    }
    else if (isHost(id)) {
      return false
    }
    return true
  }

  const isValidCard = (card: ICard): boolean => {
    const {id, idCard, idPlayer, idZone} = card

    if (curSpell) {

      switch (curSpell) {
        case Ability.Carnivore: {
          return isKeeper(idZone, idCard) && !isActiveParent(id) && isValidAbility(card)
        }

        case Ability.Piracy: {
          return isKeeper(idZone, idCard) && !isActiveParent(id) && hasChecked(id) && hasEmpty(id)
        }

        default: {
          return false
        }
      }
    }

    const hex = !!cardActiveId && isHex(activeCard.abId)
    const curPlayer = players.at(curTurn)
    const isValidPlayer = hex === (curPlayer.id !== idPlayer)
    if (!isValidPlayer || curPlayer.pass) {
      return false
    }

    switch (curHandPhase) {
      case 0: {
        return (
          cardActiveId ? (
            cardTargetId ? (
              isKeeper(idZone, idCard)
            ) : (
              isKeeper(idZone, idCard)
              && (!hasTrait(id, activeCard.abId) || Ability.Fat === activeCard.abId)
              && !hasKind(id, getKind(activeCard.abId))
            )
          ) : (
            Zone.Hand === idZone
          )
        )
      }

      case 1: {
        return false
      }

      case 2: {
        return Zone.Keep === idZone
      }

      case 3: {
        return false
      }

      default: {
        return false
      }
    }
  }
  //-------------------------------------------------------

  const pairHasEmpty = (id: string): boolean => {
    const parent = getParent(id)
    if (isHost(parent.id)) {
      const pairId = getPairId(parent.id, Ability.Symbiosis)
      return hasEmpty(pairId)
    }
    return false
  }

  const isSlotExtra = (card: ICard): boolean => {
    const {abId, id} = card
    if (pairHasEmpty(id)) return false

    switch (abId) {
      case Ability.Fat: {
        return !card.idCard || !hasEmpty(id)
      }
      default: {
        return true
      }
    }
  }

  const isValidSlot = (card: ICard): boolean => {
    const {idPlayer, idZone} = card
    return (
      curHandPhase === 2
      && curPlayerId === idPlayer
      && idZone === Zone.Keep
      && !cardActiveId
      && isSlotExtra(card)
    )
  }
  //-------------------------------------------------------

  const getPairId = (cardId: string, ability: TAbility) => {
    const card = cards
      .filter(c => c.idCard === cardId || c.idCard2 === cardId)
      .find(c => c.abId === ability)
    if (!card) return ""
    return card.idCard === cardId? card.idCard2: card.idCard
  }

  const getParent = (cardId: string) => {
    const card = findCard(cardId)
    return ("" === card.idCard) ? card : findCard(card.idCard)
  }

  const hasSlots = (c: ICard) => Zone.Keep === c.idZone && (!c.idCard || nSlots(c.abId) > 0)

  const slotIdsChecked = (cardId: string) => {
    const card = getParent(cardId)
    const ids = getTraits(card.id)
      .filter(c => Ability.Fat !== c.abId)
      .filter(c => hasSlots(c) > 0 && c.emptySlots < nSlots(c.abId))
      .map(c => c.id)
    if (!card.emptySlots) {
      ids.unshift(card.id)
    }
    return ids
  }

  const hasChecked = (cardId: string) => {
    return slotIdsChecked(cardId).length > 0
  }

  const slotIdsEmpty = (cardId: string) => {
    const card = getParent(cardId)
    const ids = getTraits(card.id)
      .filter(c => Ability.Fat !== c.abId)
      .filter(c => hasSlots(c) > 0 && c.emptySlots > 0)
      .map(c => c.id)
    if (card.emptySlots > 0) {
      ids.unshift(card.id)
    }
    return ids
  }

  const hasEmpty = (cardId: string) => {
    return slotIdsEmpty(cardId).length > 0
  }

  const slotIdsEmpty2 = (cardId: string) => {
    const card = getParent(cardId)
    return getTraits(card.id)
      .filter(c => hasSlots(c) > 0 && c.emptySlots > 1)
      .map(c => c.id)
  }

  const slotIdsFatEmpty = (cardId: string) => {
    const card = getParent(cardId)
    return getTraits(card.id)
      .filter(c => Ability.Fat === c.abId)
      .filter(c => hasSlots(c) > 0 && c.emptySlots > 0)
      .map(c => c.id)
  }

  const hasFatEmpty = (cardId: string) => {
    return slotIdsFatEmpty(cardId).length > 0
  }

  //-------------------------------------------------------

  const isEverySlotChecked = () => {
    const keepers = cards
      .filter(c => c.idPlayer === curPlayerId && isKeeper(c.idZone, c.idCard))
    // console.log(`---> ${slots}`)
    return (keepers.every(c => !hasEmpty(c.id) && !hasFatEmpty(c.id)))
  }
  //-------------------------------------------------------

  const playCard = (activeId: string) => {
    const card = findCard(activeId)
    if (card) {
      dispatch({type: Actions.UpdateCard, payload: {
          ...card,
          emptySlots: 1,
          // idPlayer: players.at(curTurn).id,
          idZone: Zone.Keep,
          idCard: "",
        } as ICard})
    }
  }

  const handlePlayCard = () => {
    // console.log(`- Play Card: ${curTurn}`)
    playCard(cardActiveId)

    const rnd = Math.floor(Math.random() * 25 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    handleNextTurn()
  }

  const playTrait = (activeId: string, targetId: string, target2Id: string) => {
    const card = findCard(activeId)
    if (card) {
      const targetCard = findCard(targetId)
      const target2Card = findCard(target2Id)
      if (targetCard) {
        dispatch({type: Actions.UpdateCard, payload: {
            ...card,
            emptySlots: nSlots(card.abId),
            idPlayer: targetCard.idPlayer,
            idZone: targetCard.idZone,
            idCard: targetCard.id,
            idCard2: target2Card?.id ?? "",
          } as ICard})
      }
    }
  }

  const handlePlayTrait = () => {
    // console.log(`- Play Trait: ${curTurn}`)
    playTrait(cardActiveId, cardTargetId, cardTarget2Id)

    handleNextTurn()
  }
  //-------------------------------------------------------

  const handleSetActive = (id: string) => {
    if (0 === curHandPhase) {
      const payload = {cardActiveId: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }

  const handleSetTarget = (id: string) => {
    if (0 === curHandPhase || curSpell) {
      const payload = {cardTargetId: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }

  const handleSetTarget2 = (id: string) => {
    if (0 === curHandPhase || curSpell) {
      const payload = {cardTarget2Id: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }
  //-------------------------------------------------------

  return {
    dice,
    findCard,
    getAbility,
    getPairId,
    getParent,
    getDropIds,
    getTraits,
    getZone,
    handlePlayCard,
    handlePlayTrait,
    handleSetActive,
    handleSetTarget,
    handleSetTarget2,
    hasChecked,
    hasEmpty,
    hasFatEmpty,
    hasTrait,
    hasSlots,
    isCardDisabled,
    isDeckEmpty,
    isEverySlotChecked,
    isHost,
    isInPack,
    isKeeper,
    isValidCard,
    isValidSlot,
    pairHasEmpty,
    slotIdsChecked,
    slotIdsEmpty,
    slotIdsEmpty2,
    slotIdsFatEmpty,
  }
}

export default useCards
