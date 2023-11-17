export enum Token {
  R = 'R',
  // G = 'G',
  // B = 'B',
}

export type Tokens = Partial<Record<Token, number>> | null

// const test: Tokens = { [Token.R]: 42 }

// export const foo = () => {
//   console.log(test)
//   test[Token.B] = 128
//   console.log(test)
//   delete test[Token.R]
//   console.log(test)
// }
