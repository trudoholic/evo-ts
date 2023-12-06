import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {ICard} from "../data/cards"
import {Spell, TSpell} from "../data/spells"
import {Zone} from "../data/zones"
import useCards from "../hooks/useCards"

const nDraw = 10

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
    curHand,
    curHandPhase,
    curTurn,
    isLastHand,
    isReverse,
    nPlayers,
    players,
    tokens,
  } = state as IState

  const {
    findCard,
    getDropIds,
    getZone,
    isInPack,
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
    dispatch({type: Actions.DrawRound, payload: {hand: eldestHand, nDraw}})
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
    const card = findCard(activeId)
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
    const card = findCard(activeId)
    if (card) {
      const targetCard = findCard(targetId)
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
  //-------------------------------------------------------

  const handleEverySlotChecked = (cardList: ICard[], cardId: string) => {
    const isEmpty = (card: ICard) => (card.idCard === "" || card.slot) && card.slotEmpty
    const slots = cardList
      .filter(c => c.idPlayer === players.at(curTurn).id && c.idZone === Zone.Keep)
      .map(c => c.id === cardId ? false : isEmpty(c))
    // console.log(`---> ${slots}`)
    if (slots.every(s => !s)) {
      dispatch({type: Actions.Pass, payload: curTurn})
    }
  }

  const handlePlaySlot = (cardId: string) => {
    // console.log(`- Play Slot: ${cardId}`)
    const updCards = cards
      .map(c => c.id === cardId ? {...c, slotEmpty: false}: c)
    dispatch({type: Actions.UpdateCards, payload: updCards})

    handleEverySlotChecked(updCards, cardId)
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
    dispatch({type: Actions.DrawRound, payload: {hand: curHand, nDraw}})
    dispatch({type: Actions.NextStep, payload: 2})
  }

  const handleDropStep = () => {
    dispatch({type: Actions.DropCards, payload: getDropIds()})
    handleUpdateTokens(0)
    dispatch({type: Actions.NextStep, payload: isLastHand? 2: 1})
  }
  //-------------------------------------------------------

  const handleSpellCarnivore = (cardId: string, spellId: TSpell) => {
    const curPlayerId = players.at(curTurn).id
    const updCards = cards
      .map(c => c.idPlayer === curPlayerId && c.spellId === spellId? {...c, spellUsed: true}: c)
      .map(c => c.id === cardId? {...c, slotEmpty: false, spellCooldown: 1}: c)
    dispatch({type: Actions.UpdateCards, payload: updCards})

    handleNextTurn()
  }

  const castSpellGrazing = (cardId: string) => {
    if (tokens) {
      handleUpdateTokens(tokens - 1)
    }

    const card = findCard(cardId)
    if (card) {
      dispatch({type: Actions.UpdateCard, payload: {
          ...card,
          spellUsed: true,
        } as ICard})
    }
  }

  const castSpellHibernation = (cardId: string) => {
    const card = findCard(cardId)
    if (card) {
      const updCards = cards
        .map(c => isInPack(card.idCard, c)? {...c, slotEmpty: false}: c)
        .map(c => c.id === cardId? {...c, spellCooldown: 2}: c)
      dispatch({type: Actions.UpdateCards, payload: updCards})
      handleEverySlotChecked(updCards, card.idCard)
    }
    handleNextTurn()
  }

  const handleCastSpell = (cardId: string, spellId: TSpell) => {
    switch (spellId) {
      case Spell.Carnivore: {
        handleSpellCarnivore(cardId, spellId)
        break
      }
      case Spell.Grazing: {
        castSpellGrazing(cardId)
        break
      }
      case Spell.Hibernation: {
        castSpellHibernation(cardId)
        break
      }
      case Spell.Piracy: {
        break
      }
    }
  }
  //-------------------------------------------------------

  return {
    handleBeginGame,
    handleCastSpell,
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
    handleUpdateTokens,
    nextIdx,
  }
}

export default useFlow
