import React from "react";
import "../App.css";
import Header from "../components/Header";
import MetamaskIcon from "../components/MetamaskIcon";

export default function NavbarLayout(props) {
  return (
    <>
      <Header user={props.user} />
      {typeof window.ethereum === "undefined" ||
      typeof window.ethereum.isMetaMask === "undefined" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EE811A",
          }}
        >
          <h4
            style={{
              textAlign: "center",              
              marginRight: "1rem",
            }}
            className="font px-2 py-2 text-white"
          >
            Please install Metamask
          </h4>
          <MetamaskIcon />
        </div>
      ) : null}
      <div className="App">{props.children}</div>
    </>
  );
}
