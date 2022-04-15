import { memo } from "react";
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
  const {
    current,
    setCurrent,
    user,
    sendMessage,
    chat,
    setChatDatabaseName,
    chatDatabaseName,
  } = props;

  // This method is explicitly described because, it does multiple things like
  // * Adding a profile picture on every first incoming message
  // * Mapping all the messages to an array
  // Usage of map function wouldn't have guaranteed this.
  function chatFeature() {
    let messageArray = [];

    if (current === -1) {
      return messageArray;
    }

    for (let message = 0; message < chat.length; message++) {
      let messageBody = chat[message];      

      if (messageBody?.reciever === user.id) {
        messageArray.push(
          <div
            className="px-4 py-6 mb-2 w-max bg-gray-100 rounded-b-3xl text-xs md:text-md rounded-tr-3xl"
            key={message}
          >
            {messageBody.message}
          </div>
        );
      } else {
        messageArray.push(
          <div
            className="px-4 py-6 mb-2 ml-auto w-max bg-indigo-900 text-white rounded-b-3xl rounded-tl-3xl text-xs md:text-md"
            key={message}
          >
            {messageBody?.message}
          </div>
        );
      }
    }

    return messageArray;
  }

  return (
    <div className="container grid grid-cols-12 mx-auto justify-between mt-8">
      <div className="col-span-12 md:col-span-4">
        <input
          type="text"
          placeholder="Search"
          style={styles.search}
          className="font px-4 py-4 bg-gray-100 rounded-3xl"
        ></input>
        <div style={styles.card} className="shadow-lg text-xs md:text-md">
          {user &&
            user?.chat?.map((contact, i) => (
              <div
                style={styles.contact}
                key={i}
                onClick={() => {
                  setCurrent(i);
                  if (contact.sender._id === user.id) {
                    setChatDatabaseName(user.id + contact.reciever._id);
                  } else {
                    setChatDatabaseName(contact.sender._id + user.id);
                  }
                }}
                className="item"
              >
                <img
                  src={
                    (contact.sender?._id === user.id
                      ? contact.reciever.picture
                      : contact.sender.picture) ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
                  }
                  alt="Avatar"                  
                  className="w-12 h-12 object-contain rounded-full object-cover"
                />
                <div style={styles.contactDetails}>
                  <div style={{ width: "100%" }}>
                    <label>
                      <b>
                        {contact.sender?.username === user.username
                          ? contact.reciever?.username
                          : contact.sender?.username}
                      </b>
                    </label>
                  </div>
                  <p>{contact.content}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="h-screen col-span-12 md:col-span-8 ml-0 md:ml-4 mt-4 md:mt-0">        
        <div className="h-2/3 shadow-lg rounded-3xl flex flex-col px-4 py-4 bg-white overflow-hidden">
          {current !== -1 && <div>{chatFeature()}</div>}
          {current === -1 ? (
            <div className="flex justify-center items-center h-full">
              <span className="text-2xl">Start chatting with people</span>
            </div>
          ) : (
            <div style={styles.chatBox}>
              <input
                type="text"
                style={styles.chatInput}
                placeholder="Type a message"
                className="font"
                id="message-edit"
                autoComplete="off"
              ></input>
              <div
                style={styles.sendButton}
                onClick={() => {
                  let id =
                    user.chat[current].sender.username === user.username
                      ? user.chat[current].reciever._id
                      : user.chat[current].sender._id;
                  sendMessage(id);
                }}
              >
                <SendButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Messages);
