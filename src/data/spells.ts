export interface ISpell {
  cb: () => void
  disabled: boolean
  id: string
}

export const getSpellId =
  (idx: number) => `spell_${idx + 1}`

const getSpell =
  (idx: number) => ({
    cb: () => {console.log(`> cast: ${getSpellId(idx)}`)},
    disabled: false,
    id: getSpellId(idx),
  })

const spellsMap = [...Array(16)]
  .reduce((accumulator, _, idx) =>
      accumulator.set(getSpellId(idx), getSpell(idx)),
    new Map<string, ISpell>()
  )

// console.log(spellsMap)

export const castSpell =
  (spellId: string) => spellsMap.has(spellId)?
    spellsMap.get(spellId).cb():
    console.warn("Can not cast:", spellId)
