import {IZone} from "../data/zones"

const Zone = ({name}: IZone) => {
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
        <details open>
          <summary>{name}</summary>
          <div>[1]</div>
          <div>[2]</div>
          <div>[3]</div>
        </details>
      </div>
    </>
  )
}

export default Zone
