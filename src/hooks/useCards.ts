import {useAppContext} from "../context"
// import {Actions} from "../context/reducer"
import {IState} from "../context/state"
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

  const getTraits = (cardId: string) => {
    return  cards.filter(c => c.idCard === cardId)
  }
  //-------------------------------------------------------

  const getZone = (zoneId: string, playerId: string = commonId) => (
    cards.filter(({idPlayer, idZone, idCard}) => idPlayer === playerId && idZone === zoneId && idCard === "")
  )
  //-------------------------------------------------------

  const isValid = (idPlayer: string, idZone: string, idCard: string): boolean => {
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

  return {
    getTraits,
    getZone,
    isValid,
  }
}

export default useCards
