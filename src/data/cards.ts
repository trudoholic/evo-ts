export interface ICard  {
  id: number
  idPlayer: number
  idZone: number
}

export const cards: ICard[] = [
  { id: 1, idPlayer: 1, idZone: 1 },
  { id: 2, idPlayer: 1, idZone: 1 },
  { id: 3, idPlayer: 1, idZone: 1 },

  { id: 4, idPlayer: 1, idZone: 2 },
  { id: 5, idPlayer: 1, idZone: 2 },
  { id: 6, idPlayer: 1, idZone: 2 },

  { id: 7, idPlayer: 2, idZone: 1 },
  { id: 8, idPlayer: 2, idZone: 1 },
  { id: 9, idPlayer: 2, idZone: 1 },

  { id: 10, idPlayer: 2, idZone: 2 },
  { id: 11, idPlayer: 2, idZone: 2 },
  { id: 12, idPlayer: 2, idZone: 2 },
]
