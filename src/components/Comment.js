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
  const { picture, username, content } = props;
  return (
    <div className="mb-4 flex flex-col bg-gray-100 px-4 py-4 w-max rounded-2xl">
      <div className="flex">
        <img
          style={styles.image}
          src={
            picture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
          }
          alt="Profile"
        ></img>
        <div style={{ ...styles.col, marginLeft: "1rem" }}>
          <label>
            <b>{username}</b>
          </label>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
}
