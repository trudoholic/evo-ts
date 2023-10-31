import {IZone} from "../data/zones"

const Zone = ({cards, name}: IZone) => {
  const styles = {
    box: {
      border: "1px solid #369",
      margin: "16px",
      padding: "8px 0",
    }
  };

  return (
    <>
      <div style={styles.box}>
        {
          cards.length ?
          <details open>
            <summary>{`${name} [${cards.length}]`}</summary>
            {cards.map((c) => (<div>{c.id}</div>))}
          </details>
          : <div>{`${name}`}</div>
        }
      </div>
    </>
  )
}

export default Zone
