export interface IPlayer {
  id: string
  name: string
  pass: boolean
  value: number
}

export const commonId = "_"

export const players: IPlayer[] = [
  { id: "1", name: 'Anna', value: 0, pass: false },
  { id: "2", name: 'Beth', value: 0, pass: false },
  { id: "3", name: 'Ciri', value: 0, pass: false },
  { id: "4", name: 'Dana', value: 0, pass: false },
]
