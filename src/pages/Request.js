import React, { useEffect, useState } from "react";
import { Downvote, Upvote } from "../components/Votes";
import SendButton from "../components/Send";
import Comment from "../components/Comment";
import { getAllComments, addComment } from "../api/main";

const styles = {
  row: { display: "flex", flexDirection: "row" },
  col: { display: "flex", flexDirection: "column" },
  tags: { width: "100%", marginTop: "2rem" },
  votes: {
    marginLeft: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "max-content",
  },
  chatBox: {
    display: "flex",
    flexDirection: "row",
    marginTop: "2rem",
  },
  chatInput: {
    backgroundColor: "AppWorkspace",
    outline: "none",
    border: "none",
    width: "90%",
    padding: "1.3rem",
    borderRadius: "25px",
  },
  sendButton: {
    backgroundColor: "#3BA58B",
    height: "4rem",
    width: "4rem",
    marginLeft: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  comments: {
    width: "100%",
    backgroundColor: "AppWorkspace",
    marginTop: "2rem",
    padding: "2rem",
    borderRadius: "5px",
  },
};

export default function Request(props) {
  const {
    user,
    getRequest,
    title,
    content,
    username,
    type,
    upvotes,
    downvotes,
    status,
    id,
  } = props;
  const [vote, setVote] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const main = async () => {
      if (!id) getRequest(props.match.params.shortId);
      else {
        let comments = await getAllComments(id);
        setComments(comments);
      }
    };
    main();
  }, [id]);

  const addVote = (voteNumber) => {
    if (vote === voteNumber) setVote(0);
    else setVote(voteNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <label className="text-xs">6 min ago</label>
      <h1 className="text-xl mb-2">{title}</h1>
      <p>{content}</p>
      <div className="flex my-2 text-sm">
        {status ? (
          <label className="px-2 py-1 bg-green-100 mx-1 rounded-xl">
            Verified
          </label>
        ) : (
          <label className="px-2 py-1 bg-red-100 mx-1 rounded-xl">
            Unverified
          </label>
        )}
        <label className="px-2 py-1 border border-gray-200 mx-1 rounded-xl">
          {type == 1 ? "Donation" : type == 2 ? "Fundraiser" : "Personal"}
        </label>
        <div style={styles.votes}>
          <Upvote
            addVote={addVote}
            fill={vote === 1 ? "rgb(242,65,0)" : "#ccc"}
          />
          {data.upvotes - data.downvotes + vote}
          <Downvote addVote={addVote} fill={vote === -1 ? "#9696F2" : "#ccc"} />
        </div>
      </div>
      <div style={styles.chatBox} onChange={(e) => setComment(e.target.value)}>
        <input
          type="text"
          style={styles.chatInput}
          placeholder="Write a comment"
          className="font"
          id="comment-textarea"
        ></input>
        <div style={styles.sendButton}>
          <SendButton
            addComment={addComment}
            comment={comment}
            id={id}
            setComments={setComments}
            comments={comments}
          />
        </div>
      </div>
      <div style={styles.comments}>
        {comments.map((comment, i) => (
          <Comment
            key={i}
            img={"https://mdbootstrap.com/img/Photos/Avatars/img(20).jpg"}
            username={comment.author.username}
            content={comment.content}
          />
        ))}
      </div>{" "}
    </div>
  );
}

const data = {
  img: "https://mdbootstrap.com/img/Photos/Avatars/img(20).jpg",
  username: "Elia Martell",
  title: "Charity for Animal Welfare, Navi Mumbai",
  content:
    "The BSPCA is a charitable organization in existence since 1874. Its purpose is to prevent cruelty to animals and provide help and relief to all animals in Mumbai city. The animal hospital works 24 hours a day and treats an average of about 400 different species of animals.",
  totalFunds: "2.7143 eth",
  upvotes: 15,
  downvotes: 0,
};
