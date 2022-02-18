import React, { useEffect, memo } from "react";
import SendButton from "../components/Send";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  search: {
    width: "100%",
    padding: "1.3rem",
    borderRadius: "25px",
    outline: "none",
    border: "none",
  },
  card: {
    width: "100%",
    backgroundColor: "AppWorkspace",
    display: "flex",
    flexDirection: "column",
    marginTop: "2rem",
    padding: "2rem",
    borderRadius: "25px",
  },
  button: {
    width: "max-content",
    padding: "1.3rem",
    borderRadius: "25px",
    outline: "none",
    border: "none",
    backgroundColor: "AppWorkspace",
  },
  contact: {
    height: "5rem",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: "2rem",
    cursor: "pointer",
  },
  contactDetails: {
    marginLeft: "1rem",
    borderBottom: "solid thin #ECEAE9",
    width: "100%",
    marginTop: "10px",
  },
  image: {
    height: "5rem",
    width: "5rem",
    borderRadius: "50%",
    objectFit: "cover",
  },
  messageOut: {
    padding: "1.4rem 1rem",
    backgroundColor: "#4D426D",
    borderRadius: "20px 0 20px 20px",
    width: "max-content",
    marginLeft: "auto",
    color: "white",
    marginBottom: "1rem",
  },
  messageIn: {
    padding: "1.4rem 1rem",
    backgroundColor: "#F6F8FA",
    borderRadius: "0 20px 20px 20px",
    width: "max-content",
    marginBottom: "1rem",
  },
  chatBox: { display: "flex", flexDirection: "row", marginTop: "auto" },
  chatInput: {
    backgroundColor: "#F6F8FA",
    outline: "none",
    border: "none",
    width: "80%",
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
};

function Messages(props) {
  useEffect(() => {}, [props]);

  // This method is explicitly described because, it does multiple things like
  // * Adding a profile picture on every first incoming message
  // * Mapping all the messages to an array
  // Usage of map function wouldn't have guaranteed this.
  function chatFeature() {
    let messageArray = [];

    for (
      let message = 0;
      message < chats[props.current].chat.length;
      message++
    ) {
      let messageBody = chats[props.current].chat[message];

      if (messageBody.incoming) {
        messageArray.push(
          <div style={styles.messageIn} key={message}>
            {messageBody.content}
          </div>
        );
      } else {
        messageArray.push(
          <div style={styles.messageOut} key={message}>
            {messageBody.content}
          </div>
        );
      }
    }

    return messageArray;
  }

  return (
    <div className="container flex mx-auto justify-between">
      <div style={{ width: "30%" }}>
        <input
          type="text"
          placeholder="Search"
          style={styles.search}
          className="font"
        ></input>
        <div style={styles.card}>
          {chats.map((contact, i) => (
            <div
              style={styles.contact}
              key={i}
              onClick={() => props.setCurrent(i)}
              className="item"
            >
              <img src={contact.picture} alt="Avatar" style={styles.image} />
              <div style={styles.contactDetails}>
                <div style={{ width: "100%" }}>
                  <label>
                    <b>{contact.name}</b>
                  </label>
                </div>
                <p>{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: "60%" }}>
        <button
          style={{ ...styles.button, marginLeft: "auto" }}
          className="font"
        >
          Clear chat
        </button>
        <button
          style={{ ...styles.button, marginLeft: "1rem" }}
          className="font"
        >
          More
        </button>
        <div style={{ ...styles.card, height: "60vh" }}>
          <div>{chatFeature()}</div>
          <div style={styles.chatBox}>
            <input
              type="text"
              style={styles.chatInput}
              placeholder="Type a message"
              className="font"
            ></input>
            <div style={styles.sendButton}>
              <SendButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Messages);

const chats = [
  {
    name: "John Doe",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDhVoqZVRdPWcuTCEHaphmign8QVLxGeyCXQ&usqp=CAU",
    lastMessage: "Great, just workin rn",
    chat: [
      {
        content: "Hi there, how are you",
        incoming: true,
      },
      {
        content: "Great, just workin rn",
        incoming: false,
      },
    ],
  },
  {
    name: "Nicholas Plum",
    picture:
      "https://www.socialsciencespace.com/wp-content/uploads/student-3500990_960_720_opt.jpg",
    lastMessage: "Great, just workin rn",
    chat: [
      {
        content: "Hey waiting for your reply as I have to go back soon!",
        incoming: true,
      },
      {
        content: "Wait, I am coming in a few!",
        incoming: false,
      },
      {
        content: "Come fast I'm waiting.",
        incoming: true,
      },
    ],
  },
];
