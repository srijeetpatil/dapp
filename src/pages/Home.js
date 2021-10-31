import React, { useState, useEffect } from "react";
import RequestCard from "../components/RequestCard";
import MetamaskIcon from "../components/MetamaskIcon";
import Web3 from "web3";
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
};

export default function Home() {
  const [eth_balance, setEthBalance] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  let web3 = new Web3(window.ethereum);

  useEffect(() => {
    connectMetamask();
  }, []);

  /* Transfers ether to the requester's walled ID */
  const sendEtherToRequest = async (to) => {
    try {
      // Dev account main
      //0x227da402F13894d89F970804Fc791eb4c9b6f81D is my account ID, it would fail in other environments except mine.
      const transactionParameters = {
        nonce: "0x00",
        gas: "21000",
        to: to,
        from: "0x227da402F13894d89F970804Fc791eb4c9b6f81D",
        value: web3.utils.toWei("0.0001", "ether"),
        data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057",
        chainId: "3",
      };

      /* Send ether */
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log(txHash);
    } catch (e) {
      console.error(e.message);
    }
  };

  /* This function connects to Metamask wallet if it is installed, 
    and the data of the first account is projected in the app. */
  const connectMetamask = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setAccountAddress(account);

      let balance = await web3.eth.getBalance(account);
      balance = await web3.utils.fromWei(balance);
      setEthBalance(balance);
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
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
            <label>
              <b>Account:</b> {accountAddress}
            </label>
            <label>
              <b>Balance:</b> {eth_balance} eth
            </label>
          </div>
          <label style={styles.infoLabel}>Quick transaction</label>
          <div style={{ ...styles.card, ...styles.quickTransaction }}></div>
        </div>
        <div style={styles.right}>
          <label style={styles.infoLabel}>Requests</label>
          <RequestCard sendEtherToRequest={sendEtherToRequest} />
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
