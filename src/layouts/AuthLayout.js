import React from "react";
import "../App.css";

export default function AuthLayout(props) {
  return (
    <div style={{ backgroundColor: "AppWorkspace", height: "100vh" }}>
      <div
        className="authApp"
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
