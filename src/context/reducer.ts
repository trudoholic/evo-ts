import {IState} from "./state"
import {ICard} from "../data/cards"
import {commonId, players} from "../data/players"
import {Ability, nSlots} from "../data/abilities"
import {Zone} from "../data/zones"

export enum Actions {
  BeginGame,
  DrawRound,
  DropCards,
  EndGame,
  IncValue,
  LastHand,
  NextHand,
  NextHandPhase,
  NextStep,
  NextTurn,
  Pass,
  Reverse,
  UpdateCard,
  UpdateCards,
  UpdateTokens,
  UpdateState,
}

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.DrawRound, payload: number }
  | { type: Actions.DropCards, payload: string[] }
  | { type: Actions.EndGame }
  | { type: Actions.IncValue, payload: { idx: number, value: number } }
  | { type: Actions.LastHand }
  | { type: Actions.NextHand, payload: number }
  | { type: Actions.NextHandPhase, payload: number }
  | { type: Actions.NextStep, payload: number }
  | { type: Actions.NextTurn, payload: number }
  | { type: Actions.Pass, payload: number }
  | { type: Actions.Reverse }
  | { type: Actions.UpdateCard, payload: ICard }
  | { type: Actions.UpdateCards, payload: ICard[] }
  | { type: Actions.UpdateTokens, payload: number }
  | { type: Actions.UpdateState, payload: Partial<IState> }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.UpdateState: {
      return { ...state, ...action.payload }
    }

    case Actions.BeginGame: {
      return { ...state,
        isGameOver: false,
        isLastHand: false,
        nPlayers: action.payload,
        cards: state.cards.map(card => ({...card, idPlayer: commonId, idZone: Zone.DrawPile, idCard: ""})),
        players: players.slice(0, action.payload),
      }
    }

    case Actions.DrawRound: {
      const isDeck = (c: ICard) => c.idPlayer === commonId && c.idZone === Zone.DrawPile && c.idCard === ""
      const deck = state.cards.filter(card => isDeck(card))
      const rest = state.cards.filter(card => !isDeck(card))
      const playerIds = getPlayerIds(state, action.payload)

      const updDeck = deck.map(
        (card, i) => i < playerIds.length ?
          {
            ...card,
            idPlayer: playerIds[i],
            idZone: Zone.Hand,
            idCard: "",
            emptySlots: nSlots(card.abId),
          }
          : card
      )
      return { ...state, cards: [...rest, ...updDeck] }
    }

    case Actions.DropCards: {
      const dropIds = action.payload
      const dropped = (c: ICard) => dropIds.includes(c.id) || dropIds.includes(c.idCard) || dropIds.includes(c.idCard2)
      const hpSlot = (c: ICard) => "" === c.idCard || Ability.Fat !== c.abId
      const nEmptySlots = (c: ICard) => Zone.Keep !== c.idZone? 0: "" === c.idCard? 1: nSlots(c.abId)

      return { ...state,
        cards: state.cards.map(
          c => dropped(c) ? { ...c,
            idZone: Zone.DiscardPile,
            idCard: "",
            idCard2: "",
            poisoned: false,
            emptySlots: nEmptySlots(c),
          }: hpSlot(c) ? {...c,
            emptySlots: nEmptySlots(c),
          }: c
        )
      }
    }

    case Actions.EndGame: {
      return { ...state, isGameOver: true }
    }

    case Actions.IncValue: {
      return { ...state,
        players: state.players.map(
          (p, i) => i === action.payload.idx?
            {...p, value: p.value + action.payload.value}: p
        )
      }
    }

    case Actions.LastHand: {
      return { ...state, isLastHand: true }
    }

    case Actions.NextHand: {
      return { ...state,
        curHand: action.payload,
        cards: state.cards.map(c => ({...c,
          abCooldown: (c.abCooldown > 0 ? c.abCooldown - 1 : 0)
        }))
      }
    }

    case Actions.NextHandPhase: {
      return { ...state,
        curHandPhase: action.payload,
        players: state.players.map(
          p => ({...p, pass: false})
        )
      }
    }

    case Actions.NextStep: {
      return { ...state, curStep: action.payload }
    }

    case Actions.NextTurn: {
      return { ...state,
        curTurn: action.payload,
        cards: state.cards.map(c => ({...c, abUsed: false}))
      }
    }

    case Actions.Pass: {
      return { ...state,
        players: state.players.map(
          (p, i) => i === action.payload?
            {...p, pass: true}: p
        )
      }
    }

    case Actions.Reverse: {
      return { ...state, isReverse: !state.isReverse}
    }

    case Actions.UpdateCard: {
      return { ...state,
        cards: state.cards.map(c => c.id === action.payload.id ? action.payload: c)
      }
    }

    case Actions.UpdateCards: {
      return { ...state, cards: action.payload}
    }

    case Actions.UpdateTokens: {
      return { ...state, tokens: action.payload}
    }

    default: {
      return state
    }

  }
}

const getPlayerIds = (state: IState, hand: number) => {
  const isKeep = (c: ICard, id: string) => c.idPlayer === id && c.idZone === Zone.Keep && c.idCard === ""
  const nKeep = state.players.map(
    player => state.cards.filter(card => isKeep(card, player.id)).length
  )

  const isHand = (c: ICard, id: string) => c.idPlayer === id && c.idZone === Zone.Hand && c.idCard === ""
  const nHand = state.players.map(
    player => state.cards.filter(card => isHand(card, player.id)).length
  )

  const defaultDraw = 6
  const nDraw = nKeep.map(
    (n, i) => !n && !nHand[i] ? defaultDraw: n + 1
  )

  let playerIds: string[] = []
  const n = state.nPlayers
  for (let i = 0; i < n; ++i) {
    const idx = (hand + i) % n
    const playerId = state.players.at(idx).id
    playerIds = [...playerIds, ...Array(nDraw[idx]).fill(playerId)]
  }

  return playerIds
}