export interface IPlayer {
  id: string
  name: string
  status: boolean
  value: number
}

export const players: IPlayer[] = [
  { id: "1", name: 'Anna', value: 0, status: true },
  { id: "2", name: 'Beth', value: 0, status: false },
  { id: "3", name: 'Ciri', value: 0, status: true },
  { id: "4", name: 'Dana', value: 0, status: false },
]
