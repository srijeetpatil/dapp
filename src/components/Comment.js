import React, { useState } from "react";
import { Downvote, Upvote } from "./Votes";

const styles = {
  image: {
    height: "3.5rem",
    width: "3.5rem",
    borderRadius: "50%",
    objectFit: "cover",
  },
  row: { display: "flex", flexDirection: "row" },
  col: { display: "flex", flexDirection: "column", width: "100%" },
  tags: { width: "100%", marginTop: "0.5rem" },
  votes: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "max-content",
  },
};

export default function Comment(props) {
  return (
    <div style={styles.col} className="mb-8">
      <div style={styles.row}>
        <img style={styles.image} src={props.img}></img>
        <div style={{ ...styles.col, marginLeft: "1rem" }}>
          <label>
            <b>{props.username}</b>
          </label>
          <p className="text-sm">{props.content}</p>
        </div>
      </div>
    </div>
  );
}
