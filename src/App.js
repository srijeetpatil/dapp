import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreateRequest from "./pages/CreateRequest";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Request from "./pages/Request";
import Messages from "./pages/Messages";
import Admin from "./pages/Admin";
import NavbarLayout from "./layouts/NavbarLayout";
import { getMyProfile } from "./api/auth";

function App() {
  // Main
  const [accounts, setAccounts] = useState([]);
  const [eth_balance, setEthBalance] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [user, setUser] = useState();

  // Messages
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      let object = await getMyProfile();
      setUser(object.data.result);
    };
    getUser();
  }, []);

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
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccounts([...accounts]);
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
    <Router>
      <Switch>
        <Route path="/auth/signin">
          <Signin
            accounts={accounts}
            connectMetamask={connectMetamask}
            accountAddress={accountAddress}
          />
        </Route>
        <Route path="/auth/signup">
          <Signup
            accounts={accounts}
            connectMetamask={connectMetamask}
            accountAddress={accountAddress}
          />
        </Route>
        <NavbarLayout user={user}>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/request/create">
            <CreateRequest />
          </Route>
          <Route path="/request/id/:shortid">
            <Request />
          </Route>
          <Route path="/messages">
            <Messages current={current} setCurrent={setCurrent} />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route exact path="/">
            <Home
              accountAddress={accountAddress}
              eth_balance={eth_balance}
              sendEtherToRequest={sendEtherToRequest}
              accounts={accounts}
              connectMetamask={connectMetamask}
            />
          </Route>
        </NavbarLayout>
      </Switch>
    </Router>
  );
}

export default App;
