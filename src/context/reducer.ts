import {IState} from "./state"
import {ICard} from "../data/cards"
import {commonId, players} from "../data/players"
import {TSpell} from "../data/spells"
import {Zone} from "../data/zones"

export enum Actions {
  BeginGame,
  CastSpell,
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
  SetActive,
  SetTarget,
  UpdateCard,
  UpdateCards,
  UpdateTokens,
}

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.CastSpell, payload: TSpell }
  | { type: Actions.DrawRound, payload: { hand: number, nDraw: number } }
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
  | { type: Actions.SetActive, payload: string }
  | { type: Actions.SetTarget, payload: string }
  | { type: Actions.UpdateCard, payload: ICard }
  | { type: Actions.UpdateCards, payload: ICard[] }
  | { type: Actions.UpdateTokens, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.BeginGame: {
      return { ...state,
        isGameOver: false,
        isLastHand: false,
        nPlayers: action.payload,
        cards: state.cards.map(card => ({...card, idPlayer: commonId, idZone: Zone.DrawPile, idCard: ""})),
        players: players.slice(0, action.payload),
      }
    }

    case Actions.CastSpell: {
      return { ...state, curSpell: action.payload }
    }

    case Actions.DrawRound: {
      const nDraw = action.payload.nDraw
      const getIdx = (i: number) => (action.payload.hand + Math.floor(i / nDraw)) % state.nPlayers
      const isDeck = (c: ICard) => c.idPlayer === commonId && c.idZone === Zone.DrawPile && c.idCard === ""
      const deck = state.cards.filter(card => isDeck(card))
      const rest = state.cards.filter(card => !isDeck(card))

      const newDeck = deck.map(
        (card, i) => i < nDraw * state.nPlayers ?
          {
            ...card,
            idPlayer: state.players.at(getIdx(i)).id,
            idZone: Zone.Hand,
            idCard: "",
            slotEmpty: true,
          }
          : card
      )

      return { ...state, cards: [...rest, ...newDeck] }
    }

    case Actions.DropCards: {
      const dropIds = action.payload
      const dropped = (c: ICard) => dropIds.includes(c.id) || dropIds.includes(c.idCard)
      return { ...state,
        cards: state.cards.map(
          c => dropped(c) ? { ...c,
            idZone: Zone.DiscardPile,
            idCard: "",
            slotEmpty: true,
          }: {...c, slotEmpty: !state.isLastHand}
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
          spellCooldown: (c.spellCooldown > 0 ? c.spellCooldown - 1 : 0)
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
        cards: state.cards.map(c => ({...c, spellUsed: false}))
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

    case Actions.SetActive: {
      return { ...state, cardActiveId: action.payload}
    }

    case Actions.SetTarget: {
      return { ...state, cardTargetId: action.payload}
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