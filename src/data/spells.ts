export interface ISpell {
  cb: () => void
  disabled: boolean
  id: string
}

export const spellsData: ISpell[] = [...Array(16)]
  .map((_, i) => ({
    cb: () => {console.log(`* cast spell: ${i + 1}`)},
    disabled: false,
    id: `spell_${i + 1}`,
  }))

// console.log(spellsData)

export const spellsLib = spellsData
  .reduce((accumulator, value) => ({
    ...accumulator, [value.id]: value
  }), {})

// console.log(spellsLib)

export const castSpell = (spellId) => spellId in spellsLib?
  spellsLib[spellId].cb():
  console.warn("Can not cast:", spellId)
