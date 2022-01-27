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
  const [vote, setVote] = useState(0);

  const addVote = (voteNumber) => {
    if (vote === voteNumber) setVote(0);
    else setVote(voteNumber);
  };
  return (
    <div style={styles.col}>
      <div style={styles.row}>
        <img style={styles.image} src={props.img}></img>
        <div style={{ ...styles.col, marginLeft: "1rem" }}>
          <label>
            <b>{props.username}</b>
          </label>
          <p>{props.content}</p>
          <div style={styles.tags}>
            <div style={styles.votes}>
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
      <div style={{ marginLeft: "2rem" }}>
        {props.replies &&
          props.replies.map((comment, i) => (
            <Comment
              key={i}
              img={comment.img}
              username={comment.username}
              content={comment.content}
              upvotes={comment.upvotes}
              downvotes={comment.downvotes}
              replies={comment.replies}
            />
          ))}
      </div>
    </div>
  );
}
