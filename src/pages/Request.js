import React, { useEffect, useState } from "react";
import { Downvote, Upvote } from "../components/Votes";
import SendButton from "../components/Send";
import Comment from "../components/Comment";
import { getAllComments, addComment } from "../api/main";
import { upvotePost, downvotePost } from "../api/main";
import CircularProgress from "@mui/material/CircularProgress";

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
    type,
    upvotes,
    downvotes,
    status,
    id,
    shortId,
    files,
  } = props;
  const [vote, setVote] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const addVote = async (voteValue) => {
    if (voteValue === 1) {
      if (vote === 1) {
        setVote(0);
        setTotalVotes(totalVotes - 1);
      } else if (vote === -1) {
        setVote(1);
        setTotalVotes(totalVotes + 2);
      } else {
        setVote(1);
        setTotalVotes(totalVotes + 1);
      }
      await upvotePost(props.match.params.shortId);
    } else {
      if (vote === -1) {
        setVote(0);
        setTotalVotes(totalVotes + 1);
      } else if (vote === 1) {
        setVote(-1);
        setTotalVotes(totalVotes - 2);
      } else {
        setVote(-1);
        setTotalVotes(totalVotes - 1);
      }
      await downvotePost(props.match.params.shortId);
    }
  };

  useEffect(() => {
    const main = async () => {
      if (upvotes && downvotes) {
        let comments = await getAllComments(id);
        setComments(comments);

        if (user) {
          if (upvotes.indexOf(user.id) !== -1) setVote(1);
          else if (downvotes.indexOf(user.id) !== -1) setVote(-1);
        }

        setTotalVotes(upvotes.length - downvotes.length);
      }
    };
    main();
  }, [id, downvotes, upvotes, user]);

  useEffect(() => {
    const main = async () => {
      getRequest(props.match.params.shortId);
    };
    main();
    setLoading(false);
  }, [props.match.params.shortId]);

  return (
    <div className="container mx-auto mt-8">
      {!loading ? (
        <div className="w-1/2 mx-auto">
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
              {type === 1 ? "Donation" : type === 2 ? "Fundraiser" : "Personal"}
            </label>
            <div style={styles.votes}>
              <Upvote
                addVote={addVote}
                fill={vote === 1 ? "rgb(242,65,0)" : "#ccc"}
              />
              {totalVotes}
              <Downvote
                addVote={addVote}
                fill={vote === -1 ? "#9696F2" : "#ccc"}
              />
            </div>
          </div>
          {files?.length > 0 && (
            <img
              alt="File uploaded by user"
              className="w-full mt-4 mx-auto rounded"
              src={files[0]}
            ></img>
          )}
          <div
            className="flex mt-8 shadow-lg rounded-full"
            onChange={(e) => setComment(e.target.value)}
          >
            <input
              type="text"
              style={styles.chatInput}
              placeholder="Write a comment"
              className="font"
              id="comment-textarea"
              autoComplete="off"
            ></input>
            <div style={styles.sendButton} className="my-1">
              <SendButton
                addComment={addComment}
                comment={comment}
                id={id}
                setComments={setComments}
                comments={comments}
              />
            </div>
          </div>
          <div className="my-12">
            {comments.map((comment, i) => (
              <Comment
                key={i}
                img={"https://mdbootstrap.com/img/Photos/Avatars/img(20).jpg"}
                username={comment.author.username}
                content={comment.content}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex">
          <CircularProgress className="mx-auto mt-48" color="secondary" />
        </div>
      )}
    </div>
  );
}
