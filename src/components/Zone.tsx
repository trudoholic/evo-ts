import {IZone} from "../data/zones"

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
    card: {
      border: "1px solid #369",
      fontSize: "1.8rem",
      margin: "0.2rem",
      padding: "0.3rem 0.5rem",
    },
  };

  return (
    <>
      <div style={styles.box}>
        {
          cards.length ?
          <details open>
            <summary>{`${name} [${cards.length}]`}</summary>
            {cards.map((card) => (<span style={styles.card}>{card.id}</span>))}
            {/*{cards.map((card) => (<div style={styles.card}>{card.id}</div>))}*/}
          </details>
          : <div style={styles.box0}>{`${name}`}</div>
        }
      </div>
    </>
  )
}

export default Zone
