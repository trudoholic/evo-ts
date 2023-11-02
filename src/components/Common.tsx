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
        commonZones.map((zone) =>
          <Zone {...zone} key={zone.id}
                cards={commonCards.filter(card => card.idZone === zone.id)}
          />)
      }
    </>
  )
}

export default Common
