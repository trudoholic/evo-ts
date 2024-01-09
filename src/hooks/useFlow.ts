import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {isEmpty, nSlots, Ability, TAbility} from "../data/abilities"
import {ICard} from "../data/cards"
import {Zone} from "../data/zones"
import useCards from "../hooks/useCards"

const nDraw = 8

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
    cardTarget2Id,
    curHand,
    curHandPhase,
    curSpell,
    curTurn,
    isLastHand,
    isReverse,
    nPlayers,
    players,
    tokens,
  } = state as IState

  const curPlayerId = players.at(curTurn)?.id ?? ""

  const {
    dice,
    findCard,
    getAbility,
    getPairId,
    getParent,
    getDropIds,
    getZone,
    hasTrait,
    isInPack,
    pairHasEmpty,
    slotIdsChecked,
    slotIdsEmpty,
    slotIdsEmpty2,
    slotIdsFatEmpty,
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
    const payload = {cardActiveId: "", cardTargetId: "", cardTarget2Id: ""}
    dispatch({type: Actions.UpdateState, payload})

    let nextTurn = nextIdx(curTurn)
    while (players.at(nextTurn).pass) {
      nextTurn = nextIdx(nextTurn)
    }
    dispatch({type: Actions.NextTurn, payload: nextTurn})
  }
  //-------------------------------------------------------

  const onBeginHandPhase = (phase: number, hand?: number) => {
    dispatch({type: Actions.NextHandPhase, payload: phase})
    console.group(`Phase: ${phase}`)
    dispatch({type: Actions.NextTurn, payload: phase? curHand: hand})
  }

  const onEndHandPhase = () => {
    // console.log('=== End Phase ===')
    dispatch({type: Actions.NextStep, payload: 0})
    console.groupEnd()
  }

  const handleNextHandPhase = (phase: number) => {
    onEndHandPhase()
    onBeginHandPhase(phase)
  }
  //-------------------------------------------------------

  const onBeginHand = (hand: number) => {
    console.group(`Hand: ${hand}`)
    dispatch({type: Actions.NextHand, payload: hand})

    const deck = getZone(Zone.DrawPile)
    if (!deck.length) {
      console.log('deck --->', deck.length)
      dispatch({type: Actions.LastHand})
    }

    onBeginHandPhase(0, hand)
  }

  const onEndHand = () => {
    // console.log('### End Hand ###')
    console.groupEnd()
  }

  const handleNextHand = () => {
    onEndHandPhase()
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
    onEndHandPhase()
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
          emptySlots: 1,
          // idPlayer: players.at(curTurn).id,
          idZone: Zone.Keep,
          idCard: "",
      } as ICard})
    }
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
  //-------------------------------------------------------

  const handlePlaySlot = (cardId: string) => {
    // console.log(`- Play Slot: ${cardId}`)
    let nTokens = tokens - 1, pairId = ""
    const parent = getParent(cardId)

    if (nTokens > 0 && hasTrait(parent.id, Ability.Communication)) {
      --nTokens
      pairId = getPairId(parent.id, Ability.Communication)
    }
    handleUpdateTokens(nTokens)

    let updCards = getToken(cards, cardId)
    if (pairId) {
      updCards = getExtraTokens(updCards, pairId, 1)
    }
    dispatch({type: Actions.UpdateCards, payload: updCards})

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
    playTrait(cardActiveId, cardTargetId, cardTarget2Id)

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
      const payload = {cardActiveId: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }

  const handleSetTarget = (id: string) => {
    if (0 === curHandPhase || !isEmpty(curSpell)) {
      const payload = {cardTargetId: id}
      dispatch({type: Actions.UpdateState, payload})
    }
  }

  const handleSetTarget2 = (id: string) => {
    if (0 === curHandPhase || !isEmpty(curSpell)) {
      const payload = {cardTarget2Id: id}
      dispatch({type: Actions.UpdateState, payload})
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

  const castSpellGrazing = (cardId: string) => {
    if (tokens) {
      handleUpdateTokens(tokens - 1)
    }

    const card = findCard(cardId)
    if (card) {
      dispatch({type: Actions.UpdateCard, payload: {
          ...card,
          abUsed: true,
        } as ICard})
    }
  }

  const castSpellHibernation = (cardId: string) => {
    const card = findCard(cardId)
    if (card) {
      const updCards = cards
        .map(c => isInPack(card.idCard, c)? {...c, emptySlots: 0}: c)
        .map(c => c.id === cardId? {...c, abCooldown: 2}: c)
      dispatch({type: Actions.UpdateCards, payload: updCards})
    }
    handleNextTurn()
  }

  const castSpellFat = (cardId: string) => {
    const emptyIds = slotIdsEmpty(cardId).slice(0, 1)
    const updCards = cards
      .map(c => emptyIds.includes(c.id)? {...c,
        emptySlots: c.emptySlots - 1,
      } as ICard: c)
      .map(c => c.id === cardId? {...c,
        emptySlots: c.emptySlots + 1,
      } as ICard: c)
      .map(c => c.idPlayer === curPlayerId && c.abId === Ability.Fat? {...c,
        abUsed: true
      } as ICard: c)

    dispatch({type: Actions.UpdateCards, payload: updCards})
    handleNextTurn()
  }

  const handleUncastSpell = () => {
    const payload = {cardActiveId: "", cardTargetId: "", cardTarget2Id: "", curSpell: Ability.Empty}
    dispatch({type: Actions.UpdateState, payload})
  }

  const handleCastSpell = (cardId: string, spellId: TAbility) => {
    switch (spellId) {
      case Ability.Carnivore: {
        const payload = {cardActiveId: cardId, curSpell: Ability.Carnivore}
        dispatch({type: Actions.UpdateState, payload})
        break
      }
      case Ability.Fat: {
        castSpellFat(cardId)
        break
      }
      case Ability.Grazing: {
        castSpellGrazing(cardId)
        break
      }
      case Ability.Hibernation: {
        castSpellHibernation(cardId)
        break
      }
      case Ability.Piracy: {
        const payload = {cardActiveId: cardId, curSpell: Ability.Piracy}
        dispatch({type: Actions.UpdateState, payload})
        break
      }
      default: {
        console.log("Cast Spell:", cardId, spellId)
      }
    }
  }

  const castSpellCarnivore = (cardId: string, targetId: string) => {
    let updCards = cards
      .map(c => c.id === cardId? {...c,
        abCooldown: 1,
      } as ICard: c)
      .map(c => c.idPlayer === curPlayerId && c.abId === Ability.Carnivore? {...c,
        abUsed: true
      } as ICard: c)

    if (hasTrait(targetId, Ability.Running)) {
      const diceRoll = dice(6)
      console.log("Runaway: [", diceRoll, "]", diceRoll > 3)
      if (diceRoll > 3) {
        dispatch({type: Actions.UpdateCards, payload: updCards})
        handleNextTurn()
        return
      }
    }

    const parent = getParent(cardId)

    if (hasTrait(targetId, Ability.TailLoss)) {

      const ability = hasTrait(targetId, Ability.Parasite) ? Ability.Parasite : Ability.TailLoss

      updCards = updCards
        .map(c => isInPack(targetId, c) && ability === c.abId ? { ...c,
          idZone: Zone.DiscardPile, idCard: "", idCard2: "",
        } as ICard: c)

      updCards = getExtraTokens(updCards, parent.id, 1)

    } else {

      updCards = updCards
        .map(c => isInPack(targetId, c) ? { ...c,
          idZone: Zone.DiscardPile, idCard: "", idCard2: "",
          emptySlots: nSlots(c.abId),
        } as ICard: c)

      updCards = getExtraTokens(updCards, parent.id, 2)

      if (hasTrait(targetId, Ability.Poisonous)) {
        updCards = updCards.map(c => c.id === parent.id? {...c, poisoned: true } as ICard: c)
      }

      let scvId = ""
      for (let i = 0; i < nPlayers; ++i) {
        const player = (curTurn + i) % nPlayers
        const playerId = players.at(player)?.id
        const scavengers = getAbility(Ability.Scavenger, playerId)
        if (scavengers.length) {
          scvId = scavengers[0]
          break
        }
      }
      if (scvId) {
        updCards = getExtraTokens(updCards, scvId, 1)
      }
    }

    dispatch({type: Actions.UpdateCards, payload: updCards})
    handleNextTurn()
  }

  const getExtraTokens = (prevCards: ICard[], cardId: string, n: number): ICard[] => {
    if (pairHasEmpty(cardId)) {
      console.log("--- Ability.Symbiosis ---")
      return prevCards
    }

    const ids = [...slotIdsEmpty(cardId), ...slotIdsEmpty2(cardId), ...slotIdsFatEmpty(cardId)]
    let updCards = prevCards
    for (let i = 0; i < n; ++i) {
      updCards = getExtraToken(updCards, cardId, ids, i)
    }
    return updCards
  }

  const getExtraToken = (prevCards: ICard[], cardId: string, ids: string[], idx: number): ICard[] => {
    let updCards = prevCards
      .map(c => c.id === ids.at(idx)? {...c,
        emptySlots: c.emptySlots - 1,
      } as ICard: c)
    updCards = handleCooperation(updCards, cardId)
    return updCards
  }

  const getToken = (prevCards: ICard[], cardId: string): ICard[] => {
    let updCards = prevCards
      .map(c => c.id === cardId? {...c, emptySlots: c.emptySlots - 1}: c)
    updCards = handleCooperation(updCards, cardId)
    return updCards
  }

  const handleCooperation = (prevCards: ICard[], cardId: string): ICard[] => {
    let updCards = prevCards, pairId = ""
    const parent = getParent(cardId)

    if (hasTrait(parent.id, Ability.Cooperation)) {
      const pairAbilityCard = updCards
        .filter(c => c.idCard === parent.id || c.idCard2 === parent.id)
        .find(c => c.abId === Ability.Cooperation)

      if (!pairAbilityCard.abUsed) {
        pairAbilityCard.abUsed = true
        pairId = getPairId(parent.id, Ability.Cooperation)
        if (pairId) {
          updCards = getExtraTokens(updCards, pairId, 1)
        }
      }
    }
    return updCards
  }

  const castSpellPiracy = (cardId: string, targetId: string) => {
    const checkedIds = slotIdsChecked(targetId).slice(0, 1)

    const updCards = getExtraTokens(cards, cardId, 1)
      .map(c => checkedIds.includes(c.id)? {...c,
        emptySlots: c.emptySlots + 1,
      } as ICard: c)
      .map(c => c.id === cardId? {...c,
        abCooldown: 1
      } as ICard: c)

    dispatch({type: Actions.UpdateCards, payload: updCards})
    handleNextTurn()
  }

  const handlePutSpellOn = (cardId: string, targetId: string, spellId: TAbility) => {
    // console.log("Target:", targetId)
    switch (spellId) {
      case Ability.Carnivore: {
        castSpellCarnivore(cardId, targetId)
        break
      }
      case Ability.Piracy: {
        castSpellPiracy(cardId, targetId)
        break
      }
    }
    handleUncastSpell()
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
    handlePutSpellOn,
    handleReverse,
    handleSetActive,
    handleSetTarget,
    handleSetTarget2,
    handleUncastSpell,
    handleUpdateTokens,
    nextIdx,
  }
}

export default useFlow
