import { useState } from "react";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";
import { Dialog } from "@mui/material";

const styles = {
  container: {
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    width: "100%",
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  menu: {
    margin: "0 2rem",
    fontWeight: "600",
    display: "flex",
    flexDirection: "row",
  },
  menuItem: {
    padding: "1.5rem 1rem 1.5rem 1rem",
    width: "max-content",
    cursor: "pointer",
  },
  active: {
    borderBottom: "solid 2px #5032F6",
    color: "#5032F6",
  },
};

export default function Header(props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row sticky block top-0 justify-center bg-white border-b border-gray-200 font text-sm z-10">
      <div className="font w-max px-4 py-4 mr-auto">AppLogo</div>
      <div className="flex">
        <Link style={styles.active} className="w-max px-4 py-4" to="/">
          Home
        </Link>
        <div className="w-max px-4 py-4">Profile</div>
        <Link className="w-max px-4 py-4" to="/messages">
          Messages
        </Link>
      </div>
      {props.user ? (
        <>
          <label
            className="w-max px-4 py-4 ml-auto cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {props.user.username}
          </label>
          <Dialog
            onClose={() => setOpen(false)}
            open={open}
            className="w-1/5 mx-auto"
          >
            <div className="shadow px-12 py-4 font flex flex-col items-center">
              <label>Hi, {props.user.username}</label>
              <button
                className="mt-4 text-white px-4 py-2 text-sm rounded"
                style={{ backgroundColor: "#5032F6" }}
                onClick={() => {
                  localStorage.removeItem("auth");
                  window.location.href = "/";
                }}
              >
                Sign out
              </button>
            </div>
          </Dialog>
        </>
      ) : (
        <Link
          to="/auth/signup"
          className="w-max px-4 py-4 ml-auto"
        >
          <button
            className="text-white px-4 py-2 text-sm rounded"
            style={{ backgroundColor: "#5032F6" }}
          >
            Sign up
          </button>
        </Link>
      )}
    </div>
  );
}
