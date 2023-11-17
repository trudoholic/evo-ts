import {IState} from "./state"
import {ICard} from "../data/cards"
import {commonId, players} from "../data/players"
import {Zone} from "../data/zones"

export enum Actions {
  BeginGame,
  DrawRound,
  DropCards,
  EndGame,
  IncValue,
  NextHand,
  NextHandPhase,
  NextTurn,
  Pass,
  Reverse,
  UpdateCard,
  UpdateTokens,
}

export type TAction =
  | { type: Actions.BeginGame, payload: number }
  | { type: Actions.DrawRound, payload: { hand: number, nDraw: number } }
  | { type: Actions.DropCards }
  | { type: Actions.EndGame }
  | { type: Actions.IncValue, payload: { idx: number, value: number } }
  | { type: Actions.NextHand, payload: number }
  | { type: Actions.NextHandPhase, payload: number }
  | { type: Actions.NextTurn, payload: number }
  | { type: Actions.Pass, payload: number }
  | { type: Actions.Reverse }
  | { type: Actions.UpdateCard, payload: ICard }
  | { type: Actions.UpdateTokens, payload: number }

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {

    case Actions.BeginGame: {
      return { ...state,
        isGameOver: false,
        nPlayers: action.payload,
        cards: state.cards.map(card => ({...card, idPlayer: commonId, idZone: Zone.DrawPile})),
        players: players.slice(0, action.payload),
      }
    }

    case Actions.DrawRound: {
      const nDraw = action.payload.nDraw
      const getIdx = (i: number) => (action.payload.hand + Math.floor(i / nDraw)) % state.nPlayers
      const deck = state.cards.filter(c => c.idPlayer === commonId && c.idZone === Zone.DrawPile)
      const rest = state.cards.filter(c => c.idPlayer !== commonId || c.idZone !== Zone.DrawPile)

      const newDeck = deck.map(
        (card, i) => i < nDraw * state.nPlayers ?
          {
            ...card,
            idPlayer: state.players.at(getIdx(i)).id,
            idZone: Zone.Hand
          }
          : card
      )

      return { ...state, cards: [...rest, ...newDeck] }
    }

    case Actions.DropCards: {
      const dropIds = state.cards
        .filter(c => c.idZone === Zone.Keep)
        .map(c => c.id)
      const dropped = (c: ICard) => c.idZone === Zone.Keep || dropIds.includes(c.idZone)
      return { ...state,
        cards: state.cards.map(
          c => dropped(c) ? { ...c,
            idZone: Zone.DiscardPile,
            tokens: null,
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

    case Actions.NextHand: {
      return { ...state, curHand: action.payload}
    }

    case Actions.NextHandPhase: {
      return { ...state,
        curHandPhase: action.payload,
        players: state.players.map(
          p => ({...p, pass: false})
        )
      }
    }

    case Actions.NextTurn: {
      return { ...state, curTurn: action.payload}
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
        cards: state.cards.map(card => card.id === action.payload.id ? action.payload: card)
      }
    }

    case Actions.UpdateTokens: {
      return { ...state, tokens: action.payload}
    }

    default: {
      return state
    }

  }
}