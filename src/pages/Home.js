import { useState } from "react";
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard";
import { TextareaAutosize } from "@mui/material";
import Attach from "../components/AttachFiles";
//import PropTypes from "prop-types";

/* You can either create a css file,
 module.css file or JavaScript object for style like this*/
const styles = {
  homeGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    width: "28%",
  },
  right: { width: "70%" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    marginTop: "1rem",
    marginBottom: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
  },
  infoLabel: {
    fontSize: "25px",
    fontWeight: "600",
  },
  trending: {
    padding: "1rem",
    display: "flex",
    flexDirection: "row",
    flexFlow: "wrap",
  },
  myCard: {
    height: "15rem",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    wordWrap: "break-word",
  },
  expenses: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastMonth: { width: "38%", height: "10rem" },
  lastSixMonths: { width: "60%", height: "10rem" },
  enableEthereumButton: {
    padding: "1rem",
    border: "none",
    outline: "none",
    backgroundColor: "#037DD6",
    color: "white",
    cursor: "pointer",
  },
  createRequestButton: {
    outline: "none",
    border: "none",
    padding: "0.6rem 1rem",
    backgroundColor: "#FFFFFF",
    color: "#5D2EF0",
    borderRadius: "5px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    cursor: "pointer",
  },
  chip: {
    backgroundColor: "#FAFAFA",
    width: "max-content",
    padding: "5px 7px",
    fontSize: "12px",
    borderRadius: "5px",
    marginBottom: "10px",
    marginRight: "10px",
  },
};

export default function Home(props) {
  const { user, requests, accountAddress } = props;
  const [files, setFiles] = useState({});

  const handleAttachClick = () => {
    document.getElementById("selectFiles-crowdfunding").click();
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          {user && (
            <div className="sticky block top-16">
              <div className="shadow bg-white px-4 py-4 rounded-2xl">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      user?.picture ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
                    }
                    alt="Avatar"
                    className="w-24 h-24 object-contain rounded-full object-cover"
                  ></img>
                  <label className="mt-4 text-xl">{user?.username}</label>
                  <div className="my-2 flex items-center border-t border-b py-2 border-gray-200 justify-around w-full">
                    <div className="flex flex-col items-center">
                      <label className="text-xl">{user?.karma}</label>
                      <label className="text-xs text-gray-400">Karma</label>
                    </div>
                    <span className="border border-gray-200 h-4"></span>
                    {user?.verified ? (
                      <label className="mt-2 text-xs px-2 py-1 bg-green-100 rounded-xl">
                        Verified
                      </label>
                    ) : (
                      <label className="mt-2 text-xs px-2 py-1 bg-red-100 rounded-xl">
                        Unverified
                      </label>
                    )}
                  </div>
                </div>
                <div className="mt-4 text-xs border-b border-gray-200 w-full py-2 min-h-16">
                  Posts
                </div>
                <div className="text-xs my-2 text-gray-500">
                  Nothing to show!
                </div>
                <div className="mt-4 text-xs border-b border-gray-200 w-full py-2">
                  Comments
                </div>
                <div className="text-xs my-2 text-gray-500">
                  Nothing to show!
                </div>
              </div>
              <div className="shadow bg-white px-4 py-4 mt-4 flex flex-wrap rounded-2xl">
                <div style={styles.chip}>#agrofunding</div>
                <div style={styles.chip}>#education</div>
                <div style={styles.chip}>#pmcares</div>
                <div style={styles.chip}>#animalwelfare</div>
              </div>
              <Link to={"/request/create"}>
                <button
                  style={styles.createRequestButton}
                  className="font text-sm my-4"
                >
                  Create a request +
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-6 mx-2 mt-2">
          {requests.map((post, i) => (
            <RequestCard
              sendEtherToRequest={props.sendEtherToRequest}
              key={i}
              username={post.created_by.username}
              title={post.title}
              content={post.content}
              totalFunds={post.totalFunds}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              status={post.verified}
              type={post.type}
              shortId={post.shortId}
              _id={post.created_by._id}
              eth_address={post.eth_address}
              files={post.files}
              picture={post.created_by.picture}
              user={user}
            />
          ))}
          <div className="text-center py-32 text-gray-500">
            Oops reached the end!
          </div>
        </div>
        <div className="col-span-3">
          <div className="sticky block top-16">
            <div className="flex flex-col shadow bg-white rounded-2xl text-sm px-4 py-4">
              <label className="mx-auto py-4">Start crowdfunding</label>
              <input
                type="text"
                className="px-4 bg-transparent border-b border-gray-100 py-2 outline-none my-2"
                placeholder="Title"
              ></input>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Write something about it"
                className="bg-transparent outline-none px-4 py-2 border-b border-gray-100"
              />
              <input
                id="selectFiles-crowdfunding"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                style={{ display: "none" }}
              ></input>
              <div className="flex flex-wrap items-center mt-4 px-2">
                <div className="flex items-center" onClick={handleAttachClick}>
                  <Attach />
                  <label className="cursor-pointer ml-2">Attach files</label>
                </div>
                {Object.keys(files).map((file, i) => {
                  return (
                    <div key={i} className="px-1 py-1 bg-green-100 ml-1 rounded">
                      {files[`${file}`].name}
                    </div>
                  );
                })}
              </div>
              {accountAddress ? (
                <div className="flex mt-4 px-2 text-xs">
                  <input type="checkbox" id="use-address-crowdfunding"></input>
                  <span className="ml-2">
                    Use{" "}
                    <span className="font-semibold">
                      {accountAddress.substring(0, 20)}...
                    </span>{" "}
                    as ethereum address for this request?
                  </span>
                </div>
              ) : (
                <div className="mt-4 text-sm text-gray-500">
                  Cannot see your ethereum address? Activate ethereum wallet by
                  adding Metamask to your browser. If done, sign in to your
                  Metamask account and refresh this page.
                </div>
              )}
              <button className="text-white bg-indigo-500 px-2 py-4 mt-4 rounded-2xl text-xs">Create request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* This is dummy data */
const data = [
  {
    img: "https://mdbootstrap.com/img/Photos/Avatars/img(20).jpg",
    username: "Elia Martell",
    title: "Charity for Animal Welfare, Navi Mumbai",
    content:
      "The BSPCA is a charitable organization in existence since 1874. Its purpose is to prevent cruelty to animals and provide help and relief to all animals in Mumbai city. The animal hospital works 24 hours a day and treats an average of about 400 different species of animals.",
    totalFunds: "2.7143 eth",
    upvotes: 15,
    downvotes: 0,
  },
  {
    img: "https://www.socialsciencespace.com/wp-content/uploads/student-3500990_960_720_opt.jpg",
    username: "Gordon Ramsay",
    title: "Funding for my masters program at UC Berkeley",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    totalFunds: "2.7143 eth",
    upvotes: 5,
    downvotes: 0,
  },
  {
    img: "https://d2xsikgwxkxyoe.cloudfront.net/media/60274/farmer-1.jpg",
    username: "Dilip Jadhav",
    title: "Heavy Duty Manual Cono Weeder For Agricultural Purpose",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    totalFunds: "2.7143 eth",
    upvotes: 29,
    downvotes: 0,
  },
];
