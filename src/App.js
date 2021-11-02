import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";
/* Pages */
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  const [eth_balance, setEthBalance] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  useEffect(() => {
    if (!accountAddress || !eth_balance) {
      connectMetamask();
    }
  });

  // Initialize the Web3 object
  let web3 = new Web3(window.ethereum);

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

  /* This function is used to enable Metamask ethereum wallet. */
  const enableEthereum = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      /* Reload the app to fetch the ethereum wallet data */
      window.location.reload();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home
            accountAddress={accountAddress}
            eth_balance={eth_balance}
            enableEthereum={enableEthereum}
            sendEtherToRequest={sendEtherToRequest}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
