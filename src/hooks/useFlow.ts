import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {Zone} from "../data/zones"

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
    curHand,
    curTurn,
    isReverse,
    nPlayers,
    players,
  } = state as IState

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
    dispatch({type: Actions.DrawRound, payload: {hand: hand, nDraw: 2}})

    onBeginPhase(0)

    dispatch({type: Actions.NextTurn, payload: hand})
  }

  const onEndHand = () => {
    dispatch({type: Actions.DropCards})
    handleUpdateTokens(0)
    console.groupEnd()
  }

  const handleNextHand = () => {
    onEndHand()
    const  nextHand = nextIdx(curHand)
    onBeginHand(nextHand)
  }
  //-------------------------------------------------------

  const handleBeginGame = (n: number) => {
    const result = "Begin Game [" + n + "]"
    console.log(`*** ${result} ***`)
    dispatch({type: Actions.BeginGame, payload: n})

    const  eldestHand = Math.floor(Math.random() * n)
    console.log(`* Eldest Hand: ${eldestHand} *`)
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

  const getHand = () => {
    return  cards.filter(c => c.idPlayer === players.at(curTurn).id && c.idZone === Zone.Hand)
  }

  const getKeep = () => {
    return  cards.filter(c => c.idPlayer === players.at(curTurn).id && c.idZone === Zone.Keep)
  }

  const getTraits = (cardId: string) => {
    return  cards.filter(c => c.idZone === cardId)
  }

  const playCard = (activeId: string) => {
    const card = cards.find(({id}) => id === activeId)
    if (card) {
      // card.idPlayer = players.at(curTurn).id
      card.idZone = Zone.Keep
      dispatch({type: Actions.UpdateCard, payload: card})
    }
  }

  const playTrait = (activeId: string, targetId: string) => {
    const card = cards.find(({id}) => id === activeId)
    if (card) {
      const targetCard = cards.find(({id}) => id === targetId)
      if (targetCard) {
        card.idPlayer = targetCard.idPlayer
        card.idZone = targetCard.id
        dispatch({type: Actions.UpdateCard, payload: card})
      }
    }
  }
  //-------------------------------------------------------

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
    console.log(`--- Pass: ${curTurn}`)
    dispatch({type: Actions.Pass, payload: curTurn})
    handleNextTurn()
  }

  const handleUpdateTokens = (n: number) => {
    dispatch({type: Actions.UpdateTokens, payload: n})
  }
  //-------------------------------------------------------

  const handleSetActive = (id: string) => {
    dispatch({type: Actions.SetActive, payload: id})
  }

  const handleSetTarget = (id: string) => {
    dispatch({type: Actions.SetTarget, payload: id})
  }
  //-------------------------------------------------------

  return {
    getHand,
    getKeep,
    getTraits,
    handleBeginGame,
    handleEndGame,
    handleNextHandPhase,
    handleNextHand,
    handleNextTurn,
    handlePass,
    handlePlayCard,
    handlePlayTrait,
    handleReverse,
    handleSetActive,
    handleSetTarget,
    handleUpdateTokens,
    nextIdx,
  }
}

export default useFlow
