export interface IPlayer {
  name: string
  id: number
  status: boolean
  value: number
}

export interface IState {
  isGameOver: boolean
  curHand: number
  curTurn: number
  nPlayers: number
  players: IPlayer[]
}

export const data: IPlayer[] = [
  { id: 1, name: 'Anna', value: 0, status: true },
  { id: 2, name: 'Beth', value: 0, status: false },
  { id: 3, name: 'Ciri', value: 0, status: true },
  { id: 4, name: 'Dana', value: 0, status: false },
];

export const defaultState: IState = {
  isGameOver: true,
  curHand: 0,
  curTurn: 0,
  nPlayers: 0,
  players: [],
}