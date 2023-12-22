import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {isEmpty, nSlots, Ability, TAbility} from "../data/abilities"
import {ICard} from "../data/cards"
import {Zone} from "../data/zones"
import useCards from "../hooks/useCards"

const nDraw = 3

const useFlow = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    cardActiveId,
    cardTargetId,
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
    getParent,
    getDropIds,
    getZone,
    hasTrait,
    isInPack,
    slotIdsChecked,
    slotIdsEmpty,
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
    dispatch({type: Actions.SetActive, payload: ""})
    dispatch({type: Actions.SetTarget, payload: ""})

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

  const playTrait = (activeId: string, targetId: string) => {
    const card = findCard(activeId)
    if (card) {
      const targetCard = findCard(targetId)
      if (targetCard) {
        dispatch({type: Actions.UpdateCard, payload: {
          ...card,
            emptySlots: nSlots(card.spellId),
            idPlayer: targetCard.idPlayer,
            idZone: targetCard.idZone,
            idCard: targetCard.id,
        } as ICard})
      }
    }
  }
  //-------------------------------------------------------

  const handlePlaySlot = (cardId: string) => {
    // console.log(`- Play Slot: ${cardId}`)
    const updCards = cards
      .map(c => c.id === cardId ? {...c, emptySlots: c.emptySlots - 1}: c)
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
    if (0 === curHandPhase || !isEmpty(curSpell)) {
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
        .map(c => isInPack(card.idCard, c)? {...c, emptySlots: 0}: c)
        .map(c => c.id === cardId? {...c, spellCooldown: 2}: c)
      dispatch({type: Actions.UpdateCards, payload: updCards})
    }
    handleNextTurn()
  }

  const handleUncastSpell = () => {
    dispatch({type: Actions.CastSpell, payload: Ability.Empty})
    dispatch({type: Actions.SetActive, payload: ""})
    dispatch({type: Actions.SetTarget, payload: ""})
  }

  const handleCastSpell = (cardId: string, spellId: TAbility) => {
    switch (spellId) {
      case Ability.Carnivore: {
        dispatch({type: Actions.CastSpell, payload: Ability.Carnivore})
        dispatch({type: Actions.SetActive, payload: cardId})
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
        dispatch({type: Actions.CastSpell, payload: Ability.Piracy})
        dispatch({type: Actions.SetActive, payload: cardId})
        break
      }
      default: {
        console.log("Cast Spell:", cardId, spellId)
      }
    }
  }

  const castSpellCarnivore = (cardId: string, targetId: string) => {
    const parent = getParent(cardId)
    const d = dice(6)
    const runAway: boolean = hasTrait(targetId, Ability.Running)? (d > 3): false
    console.log("Runaway:", runAway, '(', d, ')')

    const dropId = runAway? "": targetId
    const fedSlots = hasTrait(targetId, Ability.TailLoss)? 1: 2
    const ids = runAway? []: slotIdsEmpty(cardId).slice(0, fedSlots)

    const scavengers = getAbility(Ability.Scavenger, curPlayerId)
    const scvId: string = scavengers[0] || ""
    if (scvId) ids.push(scvId)

    const dropped = (c: ICard) => isInPack(dropId, c)
      && (!hasTrait(targetId, Ability.TailLoss) || Ability.TailLoss === c.spellId)

    const updCards = cards
      .map(c => c.id === cardId? {...c,
        spellCooldown: 1,
      }: c)
      .map(c => c.id === parent.id? {...c,
        poisoned: !runAway && !hasTrait(targetId, Ability.TailLoss) && hasTrait(targetId, Ability.Poisonous),
      }: c)
      .map(c => c.idPlayer === curPlayerId && c.spellId === Ability.Carnivore? {...c,
        spellUsed: true
      }: c)
      .map(c => ids.includes(c.id)? {...c,
        emptySlots: c.emptySlots - 1,
      }: c)
      .map(c => dropped(c) ? { ...c,
        idZone: Zone.DiscardPile,
        idCard: "",
        emptySlots: nSlots(c.spellId),
      }: c)

    dispatch({type: Actions.UpdateCards, payload: updCards})
    handleNextTurn()
  }

  const castSpellPiracy = (cardId: string, targetId: string) => {
    const emptyIds = slotIdsEmpty(cardId).slice(0, 1)
    const checkedIds = slotIdsChecked(targetId).slice(0, 1)

    const updCards = cards
      .map(c => emptyIds.includes(c.id)? {...c,
        emptySlots: c.emptySlots - 1,
      }: c)
      .map(c => checkedIds.includes(c.id)? {...c,
        emptySlots: c.emptySlots + 1,
      }: c)
      .map(c => c.id === cardId? {...c,
        spellCooldown: 1
      }: c)

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
    handleUncastSpell,
    handleUpdateTokens,
    nextIdx,
  }
}

export default useFlow
