import React from "react";

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
  donate: {
    outline: "none",
    padding: "0.6rem",
    border: "solid thin #5C84AD",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    color: "#5C84AD",
  },
  readMore: {
    outline: "none",
    padding: "0.6rem",
    border: "solid thin #29B1FF",
    backgroundColor: "#FFFFFF",
    marginLeft: "1rem",
    cursor: "pointer",
    color: "#29B1FF",
  },
};

export default function RequestCard(props) {
  return (
    <div style={{ ...styles.transactions, ...styles.card }}>
      <div style={styles.profile}>
        <img
          src={props.img}
          alt="Avatar"
          style={{
            height: "8rem",
            width: "8rem",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <label style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
          {props.username}
        </label>
      </div>
      <div style={styles.details}>
        <label style={{ fontWeight: "600" }}>{props.title}</label>
        <div>{props.content}</div>
        <div style={styles.buttons}>
          <button
            style={styles.donate}
            className="font"
            onClick={() =>
              props.sendEtherToRequest(
                "0x4103FBa0974b7cb5C813d795035ae478E45b2D7b"
              )
            }
          >
            Donate 0.1 ether
          </button>
          <button style={styles.readMore} className="font">
            Read more
          </button>
          <label style={{ marginLeft: "1rem", color: "green" }}>
            {props.totalFunds}
          </label>
        </div>
      </div>
    </div>
  );
}
