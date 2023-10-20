export interface IPlayer {
  name: string
  id: number
  status: boolean
  value: number
}

export interface IState {
  isGameOver: boolean
  players: IPlayer[]
}

const data: IPlayer[] = [
  { id: 1, name: 'A', value: 0, status: true },
  { id: 2, name: 'B', value: 0, status: false },
  { id: 3, name: 'C', value: 0, status: false },
];

export const defaultState: IState = {
  isGameOver: true,
  players: data,
}