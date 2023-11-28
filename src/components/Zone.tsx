import {IZone, Zone as ZoneM} from "../data/zones"
import Card from "./Card"
import {CardContainer} from "./Card/CardContainer"
import Pack, {PackContainer} from "./Pack"
import {grey} from "../styles/colors"

const Zone = ({id, cards, name}: IZone) => {
  const styles = {
    box: {
      border: `1px solid ${grey[500]}`,
      margin: "16px",
      padding: "8px 0",
    },
    box0: {
      color: "#ccc",
      fontSize: "1.8rem",
    },
  };

  return (
    <>
      <div style={styles.box}>
        {
          cards.length ?
          <details open>
            <summary>{`${name} [${cards.length}]`}</summary>
            {ZoneM.Keep === id ? (
              <PackContainer>
                {cards.map((card) => (
                  <Pack {...card} key={card.id}/>
                ))}
              </PackContainer>
            ) : (
              <CardContainer>
                {cards.map((card) => (
                  <Card {...card} key={card.id}/>
                ))}
              </CardContainer>
            )}
          </details>
          : <div style={styles.box0}>{`${name}`}</div>
        }
      </div>
    </>
  )
}

export default Zone
