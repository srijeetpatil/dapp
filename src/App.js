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
import { getAllRequests } from "./api/main";
import { getRequestById } from "./api/main";
import { io } from "socket.io-client";

var os = require("os");

var uri = "/";

if (os.hostname().indexOf("local") > -1) {
  uri = "http://localhost:3000/";
}

var socket = io(uri);

function App() {
  // Main
  const [accounts, setAccounts] = useState([]);
  const [eth_balance, setEthBalance] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const [user, setUser] = useState();
  const [requests, setRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState({});

  // Messages
  const [current, setCurrent] = useState(-1);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const main = async () => {
      try {
        // Get user profile
        let object = await getMyProfile();
        setUser(object.data);
        // Configure a session with the server
        socket.emit("CONFIG", { uid: object.data.id });
      } catch (err) {
        console.error(err);
      }

      try {
        // Initialize metamask
        connectMetamask();
      } catch (err) {
        console.error(err);
      }
    };
    if (!user) main();
  }, [user]);

  // Socket io events and getAllrequests
  useEffect(() => {
    try {
      socket.on("NEW_MESSAGE", (data) => {
        setChat((oldArr) => [...oldArr, data]);
      });

      const getAllRequestsData = async () => {
        let { data } = await getAllRequests();
        setRequests([...data]);
      };
      getAllRequestsData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getRequest = async (shortId) => {
    let requestData = await getRequestById(shortId);
    setActiveRequest(requestData.data);
  };

  // Send a message over the socket io
  // and store it in orbitdb
  const sendMessage = async (id) => {
    let message = document.getElementById("message-edit").value;
    let sender = user.id;
    let reciever = id;
    if (message) {
      document.getElementById("message-edit").value = "";

      socket?.emit("MESSAGE", {
        message: message,
        reciever: reciever,
        sender: sender,
      });
    }
  };

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
            user={user}
          />
        </Route>
        <Route path="/auth/signup">
          <Signup
            accounts={accounts}
            connectMetamask={connectMetamask}
            accountAddress={accountAddress}
            user={user}
          />
        </Route>
        <NavbarLayout user={user}>
          <Route path="/profile">
            <Profile user={user} />
          </Route>
          <Route path="/request/create">
            <CreateRequest accountAddress={accountAddress} user={user} />
          </Route>
          <Route
            path="/request/id/:shortId"
            render={(props) => (
              <Request
                {...props}
                user={user}
                getRequest={getRequest}
                username={activeRequest?.created_by?.username}
                title={activeRequest?.title}
                content={activeRequest?.content}
                type={activeRequest?.type}
                created_at={activeRequest?.created_at}
                upvotes={activeRequest?.upvotes}
                downvotes={activeRequest?.downvotes}
                status={activeRequest?.verified}
                id={activeRequest?._id}
              />
            )}
          />
          <Route path="/messages">
            <Messages
              current={current}
              setCurrent={setCurrent}
              user={user}
              sendMessage={sendMessage}
              chat={chat}
            />
          </Route>
          <Route path="/admin">
            <Admin user={user} />
          </Route>
          <Route exact path="/">
            <Home
              user={user}
              accountAddress={accountAddress}
              eth_balance={eth_balance}
              sendEtherToRequest={sendEtherToRequest}
              accounts={accounts}
              connectMetamask={connectMetamask}
              requests={requests}
            />
          </Route>
        </NavbarLayout>
      </Switch>
    </Router>
  );
}

export default App;
