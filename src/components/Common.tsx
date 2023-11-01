import {useAppContext} from "../context"
import {commonZones} from "../data/zones"
import Zone from "./Zone"

const Common = () => {
  const { state } = useAppContext()
  const { cards } = state

  const commonCards = cards.filter(card => card.idPlayer === 0)

  return (
    <>
      {
        commonZones.map((z) =>
          <Zone key={z.id} id={z.id} name={z.name}
                cards={commonCards.filter(card => card.idZone === z.id)}
          />)
      }
    </>
  )
}

export default Common
