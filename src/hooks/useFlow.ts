import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {Zone} from "../data/zones"
import useCards from "../hooks/useCards"

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
    curHand,
    curHandPhase,
    curTurn,
    isLastTurn,
    isReverse,
    nPlayers,
    players,
  } = state as IState

  const {
    getDropIds,
    getZone,
  } = useCards()

  const nextIdx = (idx: number) => {
    return isReverse?
      (idx + nPlayers - 1) % nPlayers:
      (idx + 1) % nPlayers
  }

  const handleReverse = () => {
    dispatch({type: Actions.Reverse})
  }
  //-------------------------------------------------------

  const handleNextTurn = () => {
    handleSetActive("")
    handleSetTarget("")

    const deck = getZone(Zone.DrawPile)
    if (!deck.length) {
      dispatch({type: Actions.LastTurn})
    }

    let nextTurn = nextIdx(curTurn)
    while (players.at(nextTurn).pass) {
      nextTurn = nextIdx(nextTurn)
    }
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }
  //-------------------------------------------------------

  const onBeginPhase = (phase: number) => {
    dispatch({type: Actions.NextHandPhase, payload: phase})
    console.group(`Phase: ${phase}`)
    dispatch({type: Actions.NextTurn, payload: curHand})
  }

  const onEndPhase = () => {
    dispatch({type: Actions.NextStep, payload: 0})
    console.groupEnd()
  }

  const handleNextHandPhase = (phase: number) => {
    onEndPhase()
    onBeginPhase(phase)
  }
  //-------------------------------------------------------

  const onBeginHand = (hand: number) => {
    console.group(`Hand: ${hand}`)
    dispatch({type: Actions.NextHand, payload: hand})

    onBeginPhase(0)
    dispatch({type: Actions.NextTurn, payload: hand})
  }

  const onEndHand = () => {
    console.groupEnd()
  }

  const handleNextHand = () => {
    onEndHand()
    const nextHand = nextIdx(curHand)
    onBeginHand(nextHand)
  }
  //-------------------------------------------------------

  const handleBeginGame = (n: number) => {
    const result = "Begin Game [" + n + "]"
    console.log(`*** ${result} ***`)
    dispatch({type: Actions.BeginGame, payload: n})

    const  eldestHand = Math.floor(Math.random() * n)
    console.log(`* Eldest Hand: ${eldestHand} *`)
    dispatch({type: Actions.DrawRound, payload: {hand: eldestHand, nDraw: 3}})
    onBeginHand(eldestHand)
  }

  const handleEndGame = () => {
    onEndPhase()
    onEndHand()
    dispatch({type: Actions.EndGame})
    const result = "End Game"
    console.log(`*** ${result} ***`)
    console.log()
  }
  //-------------------------------------------------------

  const playCard = (activeId: string) => {
    const card = cards.find(({id}) => id === activeId)
    if (card) {
      dispatch({type: Actions.UpdateCard, payload: {
        ...card,
          // idPlayer: players.at(curTurn).id,
          idZone: Zone.Keep,
          idCard: "",
      } as ICard})
    }
  }

  const playTrait = (activeId: string, targetId: string) => {
    const card = cards.find(({id}) => id === activeId)
    if (card) {
      const targetCard = cards.find(({id}) => id === targetId)
      if (targetCard) {
        dispatch({type: Actions.UpdateCard, payload: {
          ...card,
            idPlayer: targetCard.idPlayer,
            idZone: targetCard.idZone,
            idCard: targetCard.id,
        } as ICard})
      }
    }
  }

  const playSlot = (cardId: string) => {
    const card = cards.find(({id}) => id === cardId)
    if (card) {
      dispatch({type: Actions.UpdateCard, payload: {
          ...card,
          slotEmpty: false,
        } as ICard})
    }
  }
  //-------------------------------------------------------

  const handlePlaySlot = (cardId: string) => {
    // console.log(`- Play Slot: ${cardId}`)
    playSlot(cardId)

    const isEmpty = (card: ICard) => (card.idCard === "" || card.slot) && card.slotEmpty
    const slots = cards
      .filter(c => c.idPlayer === players.at(curTurn).id && c.idZone === Zone.Keep)
      .map(c => c.id === cardId ? false : isEmpty(c))
    // console.log(`---> ${slots}`)
    if (slots.every(s => !s)) {
      dispatch({type: Actions.Pass, payload: curTurn})
    }

    handleNextTurn()
  }

  const handlePlayCard = () => {
    // console.log(`- Play Card: ${curTurn}`)
    playCard(cardActiveId)

    const rnd = Math.floor(Math.random() * 25 + 1)
    dispatch({type: Actions.IncValue, payload: {idx: curTurn, value: rnd}})

    handleNextTurn()
  }

  const handlePlayTrait = () => {
    // console.log(`- Play Trait: ${curTurn}`)
    playTrait(cardActiveId, cardTargetId)

    handleNextTurn()
  }

  const handlePass = () => {
    // console.log(`--- Pass: ${curTurn}`)
    dispatch({type: Actions.Pass, payload: curTurn})
    handleNextTurn()
  }

  const handleUpdateTokens = (n: number) => {
    dispatch({type: Actions.UpdateTokens, payload: n})
  }

  const handleSpellUsed = (cardId: string) => {
    dispatch({type: Actions.IncCooldown, payload: {id: cardId, value: 1}})

    // handleNextTurn()
  }
  //-------------------------------------------------------

  const handleSetActive = (id: string) => {
    if (0 === curHandPhase) {
      dispatch({type: Actions.SetActive, payload: id})
    }
  }

  const handleSetTarget = (id: string) => {
    if (0 === curHandPhase) {
      dispatch({type: Actions.SetTarget, payload: id})
    }
  }
  //-------------------------------------------------------

  const handleDrawStep = () => {
    dispatch({type: Actions.DrawRound, payload: {hand: curHand, nDraw: 3}})
    dispatch({type: Actions.NextStep, payload: 2})
  }

  const handleDropStep = () => {
    dispatch({type: Actions.DropCards, payload: getDropIds()})
    handleUpdateTokens(0)
    dispatch({type: Actions.NextStep, payload: isLastTurn? 2: 1})
  }
  //-------------------------------------------------------

  return {
    handleBeginGame,
    handleDrawStep,
    handleDropStep,
    handleEndGame,
    handleNextHandPhase,
    handleNextHand,
    handleNextTurn,
    handlePass,
    handlePlayCard,
    handlePlaySlot,
    handlePlayTrait,
    handleReverse,
    handleSetActive,
    handleSetTarget,
    handleSpellUsed,
    handleUpdateTokens,
    nextIdx,
  }
}

export default useFlow
