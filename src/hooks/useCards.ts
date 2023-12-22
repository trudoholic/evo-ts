import {useAppContext} from "../context"
// import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {commonId} from "../data/players"
import {nSlots, isEmpty, Ability, TAbility} from "../data/abilities"
import {Zone} from "../data/zones"

const useCards = () => {
  const { state } = useAppContext()
  // const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
    curHandPhase,
    // curHand,
    curTurn,
    curSpell,
    // isReverse,
    // nPlayers,
    players,
  } = state as IState

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
    return cards.filter(c => c.idCard === cardId)
  }
  //-------------------------------------------------------

  const getZone = (zoneId: string, playerId: string = commonId) => (
    cards.filter(({idPlayer, idZone, idCard}) => idPlayer === playerId && idZone === zoneId && idCard === "")
  )
  //-------------------------------------------------------

  const hasTrait = (cardId: string, spellId: TAbility) => {
    return cards
      .filter(c => c.idCard === cardId)
      .some(c => c.spellId === spellId)
  }
  //-------------------------------------------------------

  const isInPack = (cardId: string, card: ICard): boolean => {
    if (!cardId) return false
    return card.id === cardId || card.idCard === cardId
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
    else if (!hasTrait(id, Ability.Swimming) && hasTrait(activeParent.id, Ability.Swimming)
    ) {
      return false
    }
    return true
  }

  const isValidCard = (card: ICard): boolean => {
    const {id, idPlayer, idZone, idCard} = card

    if (!isEmpty(curSpell)) {

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

    const curPlayer = players.at(curTurn)
    if (curPlayer.id !== idPlayer || curPlayer.pass) {
      return false
    }

    switch (curHandPhase) {
      case 0: {
        return (
          cardActiveId ? (
            !cardTargetId && isKeeper(idZone, idCard) && !hasTrait(id, activeCard.spellId)
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

  const isValidSlot = (card: ICard): boolean => {
    const {idPlayer, idZone} = card
    return (
      curHandPhase === 2
      && curPlayerId === idPlayer
      // && players.at(curTurn)?.id === idPlayer
      && idZone === Zone.Keep
      && !cardActiveId
    )
  }
  //-------------------------------------------------------

  const getParent = (cardId: string) => {
    const card = findCard(cardId)
    return ("" === card.idCard) ? card : findCard(card.idCard)
  }

  const hasSlots = (c: ICard) => Zone.Keep === c.idZone && (!c.idCard || nSlots(c.spellId) > 0)

  const slotIdsChecked = (cardId: string) => {
    const card = getParent(cardId)
    const ids = getTraits(card.id)
      .filter(c => hasSlots(c) > 0 && c.emptySlots < nSlots(c.spellId))
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

  //-------------------------------------------------------

  const isEverySlotChecked = () => {
    const keepers = cards
      .filter(c => c.idPlayer === curPlayerId && isKeeper(c.idZone, c.idCard))
    // console.log(`---> ${slots}`)
    return (keepers.every(c => !slotIdsEmpty(c.id).length))
  }
  //-------------------------------------------------------

  return {
    dice,
    findCard,
    getAbility,
    getParent,
    getDropIds,
    getTraits,
    getZone,
    hasChecked,
    hasEmpty,
    hasTrait,
    hasSlots,
    isEverySlotChecked,
    isInPack,
    isKeeper,
    isValidCard,
    isValidSlot,
    slotIdsChecked,
    slotIdsEmpty,
  }
}

export default useCards
