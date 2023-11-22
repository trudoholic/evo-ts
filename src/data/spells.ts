export interface ISpell {
  cb: () => void
  disabled: boolean
  id: string
}

export const spellsData: ISpell[] = [...Array(16)]
  .map((_, i) => ({
    cb: () => {console.log(`spell_${i + 1}`)},
    disabled: false,
    id: `spell_${i + 1}`,
  }))

// console.log(spells)

export const getSpell = (spellId = "") => {
  return spellsData.find(({id}) => id === spellId)
}
