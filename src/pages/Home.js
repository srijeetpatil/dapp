import React from "react";
//import PropTypes from "prop-types";

const styles = {
  homeGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    width: "28%",
  },
  right: { width: "70%" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    marginTop: "1rem",
    marginBottom: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
  },
  transactions: {
    width: "100%",
    height: "10rem",
    borderRadius: "15px",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  infoLabel: {
    fontSize: "25px",
    fontWeight: "600",
  },
  quickTransaction: {
    height: "25rem",
  },
  myCard: {
    height: "15rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  expenses: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastMonth: { width: "38%", height: "10rem" },
  lastSixMonths: { width: "60%", height: "10rem" },
};

export default function Home(props) {
  return (
    <>
      <div style={styles.homeGrid}>
        <div style={styles.left}>
          <label style={styles.infoLabel}>My Profile</label>
          <div style={{ ...styles.card, ...styles.myCard }}>
            <label style={{ marginBottom: "10px" }}>
              <b>My wallet address:</b> 4IJNG5213KNODKNOE2321
            </label>
            <label>
              <b>Karma:</b> +34
            </label>
          </div>
          <label style={styles.infoLabel}>Quick transaction</label>
          <div style={{ ...styles.card, ...styles.quickTransaction }}></div>
        </div>
        <div style={styles.right}>
          <label style={styles.infoLabel}>Requests</label>
          {Array.apply(0, Array(4)).map(function (x, i) {
            return (
              <div
                key={i}
                style={{ ...styles.transactions, ...styles.card }}
              ></div>
            );
          })}
          <label style={styles.infoLabel}>All expenses</label>
          <div style={styles.expenses}>
            <div style={{ ...styles.lastMonth, ...styles.card }}></div>
            <div style={{ ...styles.lastSixMonths, ...styles.card }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
