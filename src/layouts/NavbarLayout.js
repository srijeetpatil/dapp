import React from "react";
import "../App.css";
import Header from "../components/Header";

export default function NavbarLayout(props) {
  return (
    <>
      <Header />
      <div className="App">{props.children}</div>
    </>
  );
}
