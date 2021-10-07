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
    height: "30rem",
    borderRadius: "15px",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  infoLabel: {
    fontSize: "25px",
  },
  quickTransaction: {
    height: "25rem",
  },
  myCard: {
    height: "15rem",
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
      <h1>Homepage</h1>
      <div style={styles.homeGrid}>
        <div style={styles.left}>
          <label style={styles.infoLabel}>My card</label>
          <div style={{ ...styles.card, ...styles.myCard }}></div>
          <label style={styles.infoLabel}>Quick transaction</label>
          <div style={{ ...styles.card, ...styles.quickTransaction }}></div>
        </div>
        <div style={styles.right}>
          <label style={styles.infoLabel}>All transactions</label>
          <div style={{ ...styles.transactions, ...styles.card }}></div>
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
