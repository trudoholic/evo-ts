import {useAppContext} from "../context"
// import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {commonId} from "../data/players"
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
    // isReverse,
    // nPlayers,
    players,
  } = state as IState
  //-------------------------------------------------------

  const findCard = (cardId: string) => {
    return cards.find(({id}) => id === cardId)
  }
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

  const isValidCard = (idPlayer: string, idZone: string, idCard: string): boolean => {
    const curPlayer = players.at(curTurn)
    if (curPlayer.id !== idPlayer || curPlayer.pass) {
      return false
    }

    switch (curHandPhase) {
      case 0: {
        return (
          cardActiveId ? (
            !cardTargetId && Zone.Keep === idZone && "" === idCard
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
        .filter(t => t.slot)
      return slots.length > 0 && slots.some(s => s.slotEmpty)
    }
  }
  //-------------------------------------------------------

  return {
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
