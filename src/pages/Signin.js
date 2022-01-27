import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { login } from "../api/auth";
import { CircularProgress } from "@mui/material";

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    width: "40%",
    margin: "auto",
    padding: "4rem",
  },
  infoText: { fontSize: "18px", color: "grey" },
  labelText: {
    fontSize: "18px",
    marginTop: "1rem",
    color: "#002868",
    marginBottom: "0.5rem",
  },
  inputBox: {
    padding: "0.7rem 1rem",
    borderRadius: "10px",
    outline: "none",
    border: "solid thin #D6D6D6",
    backgroundColor: "transparent",
  },
  createButton: {
    marginTop: "2rem",
    padding: "1rem",
    backgroundColor: "#0EAF52",
    color: "white",
    outline: "none",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  enableEthereumButton: {
    padding: "1rem",
    border: "none",
    outline: "none",
    backgroundColor: "#037DD6",
    color: "white",
    cursor: "pointer",
  },
  googleButton: {
    marginTop: "0.5rem",
    padding: "1rem",
    outline: "none",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  errorCode: {
    height: "1rem",
    color: "#FE4747",
    userSelect: "none",
    fontSize: "13px",
    marginTop: "5px",
  },
};

export default function Signin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logging, setLogging] = useState(false);

  const loginWithUsernameAndPassword = async (username, password) => {
    try {
      setLogging(true);
      let tokenObject = await login(username, password);
      localStorage.setItem("auth", tokenObject.data.token);
      setLogging(false);
      window.location.href = "/";
    } catch (e) {
      setLogging(false);
      console.error(e.message);
    }
  };

  return (
    <AuthLayout>
      <div style={styles.container}>
        <label style={styles.infoText} className="font">
          Hello User !
        </label>
        <h1 style={{ color: "#424242" }}>Sign in</h1>
        <label style={styles.labelText} className="font">
          Username
        </label>
        <input
          type="text"
          style={styles.inputBox}
          className="font"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label style={styles.errorCode}></label>
        <label style={styles.labelText} className="font">
          Password
        </label>
        <input
          type="password"
          style={styles.inputBox}
          className="font"
          placeholder="7+ Characters, 1 Capital"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label style={styles.errorCode}></label>
        <button
          style={styles.createButton}
          className="font"
          onClick={() => loginWithUsernameAndPassword(username, password)}
        >
          {!logging ? (
            <>Sign in</>
          ) : (
            <CircularProgress size={15} color="inherit" />
          )}
        </button>
        <div style={{ margin: "auto" }}>
          <label style={styles.errorCode}></label>
        </div>
      </div>
    </AuthLayout>
  );
}
