import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Downvote, Upvote } from "./Votes";
import { Dialog, Modal } from "@mui/material";
import { initiateChat, upvotePost, downvotePost } from "../api/main";
import SendEther from "./SendEther";
import gun from "../utils/Gun";
import { useHistory } from "react-router-dom";

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
    files,
    picture,
    accountAddress,
  } = props;

  const [vote, setVote] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sendEtherOpen, setSendEtherOpen] = useState(false);
  const history = useHistory();

  // Function to handle voting actions.
  // Both frontend and backend.
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
    } else {
      setTotalVotes(upvotes.length - downvotes.length);
    }
  }, [user, upvotes, downvotes]);

  // This function checks if user has already interacted with
  // the other user, if so, it navigates to messages directly 
  const checkUserInChat = () => {
    if (user) {
      let chat = user.chat;

      for (let chatIndex = 0; chatIndex < chat.length; chatIndex++) {
        let { reciever, sender } = chat[chatIndex];

        if (reciever._id === user.id || sender._id === user.id) {
          history.push("/messages");
          break;
        }
      }
    }
  };

  return (
    <div className="border border-gray-200 px-2 md:px-4 py-4 grid grid-cols-12 bg-white rounded-2xl mb-2">
      <div className="flex flex-col col-span-2 md:col-span-1 items-center">
        <img
          src={
            picture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
          }
          alt="Avatar"
          className="w-12 h-12 object-contain rounded-full object-cover"
        />
        <label className="text-xs mt-2">{username.substring(0, 7)}</label>
      </div>
      <div className="col-span-10 md:col-span-11 ml-2">
        <label style={{ fontWeight: "600" }}>{title}</label>
        {files.length > 0 && (
          <img
            src={files[0]}
            alt="Loading"
            className="w-full my-4 rounded"
          ></img>
        )}
        <div className="text-sm overflow-hidden">{content}</div>
        <div className="flex text-xs mt-2">
          <label className="px-2 py-1 border border-gray-200 mx-1 rounded-xl">
            {type === 1 ? "Donation" : type === 2 ? "Crowdfunding" : "Personal"}
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
            <>
              <button
                className="font px-2 py-2 bg-gray-300 rounded shadow mx-1"
                onClick={() => {
                  setSendEtherOpen(true);
                }}
              >
                Donate ether
              </button>
              <Modal
                onClose={() => setSendEtherOpen(false)}
                open={sendEtherOpen}
                className="w-1/4 mx-auto mt-64"
                fullWidth
                maxWidth="sm"
              >
                <SendEther
                  accountAddress={accountAddress}
                  username={username}
                  picture={picture}
                  sendEtherToRequest={sendEtherToRequest}
                  eth_address={eth_address}
                  setSendEtherOpen={setSendEtherOpen}
                />
              </Modal>
            </>
          )}
          {user && user.username !== username && (
            <>
              <button
                className="font px-2 py-2 rounded shadow mx-1"
                onClick={() => {
                  checkUserInChat();
                }}
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
                          initiateChat(_id);
                          gun.get(user.id + _id).set({
                            message: message,
                            sender: user.id,
                            reciever: _id,
                            created_at: Date.now(),
                          });
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
