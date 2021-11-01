import React from "react";
import RequestCard from "../components/RequestCard";
import MetamaskIcon from "../components/MetamaskIcon";
//import PropTypes from "prop-types";
import NavbarLayout from "../layouts/NavbarLayout";

/* You can either create a css file,
 module.css file or JavaScript object for style like this*/
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
    wordWrap: "break-word",
  },
  expenses: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastMonth: { width: "38%", height: "10rem" },
  lastSixMonths: { width: "60%", height: "10rem" },
  enableEthereumButton: {
    padding: "1rem",
    border: "none",
    outline: "none",
    backgroundColor: "#037DD6",
    color: "white",
  },
};

export default function Home(props) {
  return (
    <NavbarLayout>
      {/* This part is called as conditional rendering, read here https://reactjs.org/docs/conditional-rendering.html */}
      {typeof window.ethereum.isMetaMask === "undefined" && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4
            style={{
              textAlign: "center",
              color: "#EE811A",
              marginRight: "1rem",
            }}
          >
            Please install Metamask
          </h4>
          <MetamaskIcon />
        </div>
      )}
      <div style={styles.homeGrid}>
        <div style={styles.left}>
          <label style={styles.infoLabel}>My Profile</label>
          <div style={{ ...styles.card, ...styles.myCard }}>
            {props.accountAddress && props.eth_balance ? (
              <>
                <label>
                  <b>Account:</b> {props.accountAddress}
                </label>
                <label>
                  <b>Balance:</b> {props.eth_balance} eth
                </label>
              </>
            ) : (
              <button
                style={styles.enableEthereumButton}
                className="font"
                onClick={props.enableEthereum}
              >
                Enable ethereum
              </button>
            )}
          </div>
          <label style={styles.infoLabel}>Quick transaction</label>
          <div style={{ ...styles.card, ...styles.quickTransaction }}></div>
        </div>
        <div style={styles.right}>
          <label style={styles.infoLabel}>Requests</label>
          <RequestCard sendEtherToRequest={props.sendEtherToRequest} />
          <label style={styles.infoLabel}>All expenses</label>
          <div style={styles.expenses}>
            <div style={{ ...styles.lastMonth, ...styles.card }}></div>
            <div style={{ ...styles.lastSixMonths, ...styles.card }}></div>
          </div>
        </div>
      </div>
    </NavbarLayout>
  );
}
