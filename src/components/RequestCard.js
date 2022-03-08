import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Downvote, Upvote } from "./Votes";
import { Dialog } from "@mui/material";
import { initiateChat, upvotePost, downvotePost } from "../api/main";

export default function RequestCard(props) {
  const {
    username,
    title,
    content,
    type,
    status,
    sendEtherToRequest,
    upvotes,
    downvotes,
    shortId,
    _id,
    user,
    eth_address,
  } = props;

  const [vote, setVote] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

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
      await upvotePost(shortId);
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
      await downvotePost(shortId);
    }
  };

  useEffect(() => {
    if (user) {
      if (upvotes.indexOf(user.id) !== -1) setVote(1);
      else if (downvotes.indexOf(user.id) !== -1) setVote(-1);

      setTotalVotes(upvotes.length - downvotes.length);
    }
  }, [user]);

  return (
    <div className="shadow px-4 py-4 grid grid-cols-12 bg-white rounded-2xl mb-2">
      <div className="flex flex-col col-span-2 items-center">
        <img
          src={"https://mdbootstrap.com/img/Photos/Avatars/img(20).jpg"}
          alt="Avatar"
          className="w-full object-contain rounded-full"
        />
        <label className="text-sm mt-2">{username}</label>
      </div>
      <div className="col-span-10 ml-2">
        <label style={{ fontWeight: "600" }}>{title}</label>
        <div className="text-sm overflow-hidden">{content}</div>
        <div className="flex text-xs mt-2">
          <label className="px-2 py-1 border border-gray-200 mx-1 rounded-xl">
            {type == 1 ? "Donation" : type == 2 ? "Fundraiser" : "Personal"}
          </label>
          {status ? (
            <label className="px-2 py-1 bg-green-100 mx-1 rounded-xl">
              Verified
            </label>
          ) : (
            <label className="px-2 py-1 bg-red-100 mx-1 rounded-xl">
              Unverified
            </label>
          )}
        </div>
        <div className="flex text-xs items-center my-2">
          {eth_address && (
            <button
              className="font px-2 py-2 bg-gray-300 rounded shadow mx-1"
              onClick={() =>
                sendEtherToRequest("0x4103FBa0974b7cb5C813d795035ae478E45b2D7b")
              }
            >
              Donate ether
            </button>
          )}
          {user && user.username !== username && (
            <>
              <button
                className="font px-2 py-2 rounded shadow mx-1"
                onClick={() => setChatDialogOpen(true)}
              >
                Chat
              </button>
              <Dialog
                onClose={() => setChatDialogOpen(false)}
                open={chatDialogOpen}
                className="w-1/3 mx-auto"
                fullWidth
                maxWidth="sm"
              >
                <div className="shadow px-4 py-4 font flex flex-col">
                  <label className="text-black text-sm">
                    Start a conversation with {username}?
                  </label>
                  <textarea
                    className="w-full border border-gray-200 outline-none my-2 px-1 py-1 text-sm"
                    placeholder="Start with a message"
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <div className="flex">
                    <button
                      className="mt-4 text-white px-4 py-2 text-xs rounded"
                      style={{ backgroundColor: "#5032F6" }}
                      onClick={() => {
                        if (message) {
                          initiateChat(_id, message);
                          setChatDialogOpen(false);
                          window.location.href = "/messages";
                        }
                      }}
                    >
                      Send
                    </button>
                    <button
                      className="ml-2 mt-4 px-4 py-2 text-xs rounded shadow"
                      onClick={() => {
                        setChatDialogOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog>
            </>
          )}
          <Link to={`/request/id/${shortId}`}>
            <button className="font px-2 py-2 rounded shadow mx-1">
              Read more
            </button>
          </Link>
          <div className="ml-auto flex items-center select-none">
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
      </div>
    </div>
  );
}
