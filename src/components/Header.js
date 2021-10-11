import React from "react";

const styles = {
  container: {
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
};

export default function Header() {
  return (
    <div style={styles.container}>
      <div style={{ margin: "0 2rem", padding: "1.5rem 0", fontWeight: "600" }}>
        Chuck Norris
      </div>
    </div>
  );
}
