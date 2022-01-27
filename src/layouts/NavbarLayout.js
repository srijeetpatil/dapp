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
      ) : null}
      <div className="App">{props.children}</div>
    </>
  );
}
