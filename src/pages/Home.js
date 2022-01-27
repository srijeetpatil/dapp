import React from "react";
import { Link } from "react-router-dom";
import RequestCard from "../components/RequestCard";
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
  return (
    <div style={styles.homeGrid}>
      <div style={styles.left}>
        <label style={styles.infoLabel}>My Profile</label>
        <div style={{ ...styles.card, ...styles.myCard }}>
          {props.accounts.length > 0 ? (
            <>
              <label>
                <b>Account:</b> {props.accountAddress}
              </label>
              <label>
                <b>Balance:</b>{" "}
                {props.eth_balance
                  ? parseFloat(props.eth_balance).toFixed(6)
                  : ""}{" "}
                ETH
              </label>
            </>
          ) : (
            <button
              style={styles.enableEthereumButton}
              className="font"
              onClick={props.connectMetamask}
            >
              Enable ethereum
            </button>
          )}
        </div>
        <label style={styles.infoLabel}>Trending</label>
        <div style={{ ...styles.card, ...styles.trending }}>
          <div style={styles.chip}>#agrofunding</div>
          <div style={styles.chip}>#education</div>
          <div style={styles.chip}>#pmcares</div>
          <div style={styles.chip}>#animalwelfare</div>
        </div>
      </div>
      <div style={styles.right}>
        <label style={styles.infoLabel}>Requests</label>
        <div
          style={{ marginTop: "1rem", display: "flex", flexDirection: "row" }}
        >
          <Link to={"/request/create"}>
            <button style={styles.createRequestButton} className="font">
              Create a request +
            </button>
          </Link>
        </div>
        {data.map((post, i) => (
          <RequestCard
            sendEtherToRequest={props.sendEtherToRequest}
            key={i}
            username={post.username}
            img={post.img}
            title={post.title}
            content={post.content}
            totalFunds={post.totalFunds}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
          />
        ))}
        <label style={styles.infoLabel}>All expenses</label>
        <div style={styles.expenses}>
          <div style={{ ...styles.lastMonth, ...styles.card }}></div>
          <div style={{ ...styles.lastSixMonths, ...styles.card }}></div>
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
