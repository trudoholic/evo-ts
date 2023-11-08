import {IZone} from "../data/zones"
import Card, {CardRow} from "./Card";

const Zone = ({cards, name}: IZone) => {
  const styles = {
    box: {
      border: "1px solid #369",
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
            <CardRow>
              {cards.map((card) => (<Card {...card} key={card.id}/>))}
            </CardRow>
          </details>
          : <div style={styles.box0}>{`${name}`}</div>
        }
      </div>
    </>
  )
}

export default Zone
