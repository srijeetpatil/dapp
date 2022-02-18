import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Downvote, Upvote } from "./Votes";

const styles = {
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    marginTop: "1rem",
    marginBottom: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
  },
  transactions: {
    width: "100%",
    height: "10rem",
    borderRadius: "15px",
    marginTop: "1rem",
    marginBottom: "1rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
    height: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginTop: "auto",
    alignItems: "center",
  }, 
};

export default function RequestCard(props) {
  const [vote, setVote] = useState(0);

  const addVote = (voteNumber) => {
    if (vote === voteNumber) setVote(0);
    else setVote(voteNumber);
  };

  return (
    <div className="shadow px-4 py-4 grid grid-cols-12 bg-white rounded mb-2">
      <div className="col-span-2">
        <img
          src={props.img}
          alt="Avatar"
          className="w-full object-contain rounded-xl"
        />
        <label className="text-sm">
          {props.username}
        </label>
      </div>
      <div className="col-span-10 ml-2">
        <label style={{ fontWeight: "600" }}>{props.title}</label>
        <div className="text-sm overflow-hidden">{props.content}</div>
        <div className="flex text-xs items-center my-2">
          <button            
            className="font px-2 py-2 bg-gray-300 rounded shadow mx-2"
            onClick={() =>
              props.sendEtherToRequest(
                "0x4103FBa0974b7cb5C813d795035ae478E45b2D7b"
              )
            }
          >
            Donate ether
          </button>
          <Link to="/request/id/fidjkj23">
            <button className="font px-2 py-2 rounded shadow mx-2">
              Read more
            </button>
          </Link>
          <label style={{ marginLeft: "1rem", color: "green" }}>
            {props.totalFunds}
          </label>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Upvote
              addVote={addVote}
              fill={vote === 1 ? "rgb(242,65,0)" : "#ccc"}
            />
            {props.upvotes - props.downvotes + vote}
            <Downvote
              addVote={addVote}
              fill={vote === -1 ? "#9696F2" : "#ccc"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
