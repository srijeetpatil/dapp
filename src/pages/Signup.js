import React, { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router-dom";
import { signup } from "../api/auth";
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

export default function Signup(props) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [creatingAccount, setCreatingAccount] = useState(false);

  const signupWithUsernamePassword = async (username, password1, password2) => {
    if (
      username.length > 0 &&
      password1.length > 7 &&
      password1 === password2
    ) {
      try {
        setCreatingAccount(true);
        let obj = await signup(username, password1);
        console.log(obj);
        setCreatingAccount(false);
        localStorage.setItem("auth", obj.data.token);
        window.location.href = "/";
      } catch (e) {
        setCreatingAccount(false);
        console.error(e.message);
      }
    }
  };

  return (
    <AuthLayout>
      <div style={styles.container}>
        <h1 style={{ color: "#424242" }}>Sign up</h1>
        <label style={styles.infoText} className="font">
          Already a member?{" "}
          <Link
            style={{ color: "#0364FF", textDecoration: "none" }}
            to="/auth/signin"
          >
            Sign in
          </Link>
        </label>
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
          onChange={(e) => setPassword1(e.target.value)}
        ></input>
        <label style={styles.errorCode}></label>
        <label style={styles.labelText} className="font">
          Confirm Password
        </label>
        <input
          type="password"
          style={styles.inputBox}
          className="font"
          placeholder="Confirm your password"
          onChange={(e) => setPassword2(e.target.value)}
        ></input>
        <label style={styles.errorCode}></label>
        <button
          style={styles.createButton}
          className="font"
          onClick={() =>
            signupWithUsernamePassword(username, password1, password2)
          }
        >
          {!creatingAccount ? (
            <>Create an account</>
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
