import {useAppContext} from "../context"
// import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {commonId} from "../data/players"
import {isEmpty, Spell} from "../data/spells"
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
  //-------------------------------------------------------

  const findCard = (cardId: string) => {
    return cards.find(({id}) => id === cardId)
  }

  const activeCard = findCard(cardActiveId)
  //-------------------------------------------------------

  const getDropIds = () => {
    return  cards
      .filter(c => isKeeper(c.idZone, c.idCard))
      .filter(c => someEmpty(c))
      .map(c => c.id)
  }
  //-------------------------------------------------------

  const getTraits = (cardId: string) => {
    return  cards.filter(c => c.idCard === cardId)
  }
  //-------------------------------------------------------

  const getZone = (zoneId: string, playerId: string = commonId) => (
    cards.filter(({idPlayer, idZone, idCard}) => idPlayer === playerId && idZone === zoneId && idCard === "")
  )
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

  const isValidCard = (idPlayer: string, idZone: string, idCard: string, id: string): boolean => {
    if (!isEmpty(curSpell)) {

      switch (curSpell) {
        case Spell.Carnivore: {
          return isKeeper(idZone, idCard) && !isActiveParent(id)
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
            !cardTargetId && isKeeper(idZone, idCard)
          ) : (
            Zone.Hand === idZone
          )
        )
      }

      case 1: {
        return false
      }

      case 2: {
        // const ids = cards
        //   .filter(c => c.idPlayer === idPlayer && c.idZone === Zone.Keep && c.idCard === "")
        //   .map(c => c.id)
        return (
          Zone.Keep === idZone
          // || ids.includes(idZone)
        )
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

  const isValidSlot = (idPlayer: string, idZone: string): boolean => {
    return (
      curHandPhase === 2
      && players.at(curTurn)?.id === idPlayer
      && idZone === Zone.Keep
    )
  }
  //-------------------------------------------------------

  const someEmpty = (card: ICard): boolean => {
    if (card.slotEmpty) {
      return true
    } else {
      const slots = getTraits(card.id)
        .filter(c => c.slot)
      return slots.length > 0 && slots.some(s => s.slotEmpty)
    }
  }
  //-------------------------------------------------------

  const emptySlotIds = (cardId: string) => {
    const trait = findCard(cardId)
    const card = findCard(trait.idCard)
    const slotIds = getTraits(card.id)
      .filter(c => c.slot && c.slotEmpty)
      .map(c => c.id)
    if (card.slotEmpty) {
      slotIds.unshift(card.id)
    }
    return slotIds
  }
  //-------------------------------------------------------

  return {
    emptySlotIds,
    findCard,
    getDropIds,
    getTraits,
    getZone,
    isInPack,
    isKeeper,
    isValidCard,
    isValidSlot,
    someEmpty,
  }
}

export default useCards
