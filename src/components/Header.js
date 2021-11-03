import React from "react";
import LoginButton from "./LoginButton";

const styles = {
  container: {
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    width: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  menu: {
    margin: "0 2rem",
    fontWeight: "600",
    display: "flex",
    flexDirection: "row",
  },
  menuItem: {
    padding: "1.5rem 1rem 1.5rem 1rem",
    width: "max-content",
    cursor: "pointer",
  },
  active: {
    borderBottom: "solid 2px #5032F6",
    color: "#5032F6",
  },
};

export default function Header() {
  return (
    <div style={styles.container}>
      <div style={{ ...styles.menuItem, marginRight: "auto" }} className="font">
        AppLogo
      </div>
      <div style={styles.menu}>
        <div style={{ ...styles.menuItem, ...styles.active }}>Home</div>
        <div style={styles.menuItem} className="item">
          My account
        </div>
        <div style={styles.menuItem} className="item">
          Services
        </div>
        <div style={styles.menuItem} className="item">
          Transactions
        </div>
        <div style={styles.menuItem} className="item">
          Statistics
        </div>
      </div>
      <LoginButton />
    </div>
  );
}
