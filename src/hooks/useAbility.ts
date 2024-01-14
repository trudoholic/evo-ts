import {useAppContext} from "../context"
import {Actions} from "../context/reducer"
import {IState} from "../context/state"
import {nSlots, Ability, TAbility} from "../data/abilities"
import {ICard} from "../data/cards"
import {Zone} from "../data/zones"
import useCards from "./useCards"
import useFlow from "./useFlow"

const useAbility = () => {
  const { state, dispatch } = useAppContext()
  const {
    cards,
    curTurn,
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
    hasTrait,
    isInPack,
    pairHasEmpty,
    slotIdsChecked,
    slotIdsEmpty,
    slotIdsEmpty2,
    slotIdsFatEmpty,
  } = useCards()

  const {
    handleNextTurn,
  } = useFlow()

  const nextIdx = (idx: number) => {
    return isReverse?
      (idx + nPlayers - 1) % nPlayers:
      (idx + 1) % nPlayers
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

  const handleUpdateTokens = (n: number) => {
    dispatch({type: Actions.UpdateTokens, payload: n})
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
    handleCastSpell,
    handlePlaySlot,
    handlePutSpellOn,
    handleUncastSpell,
    handleUpdateTokens,
    nextIdx,
  }
}

export default useAbility
