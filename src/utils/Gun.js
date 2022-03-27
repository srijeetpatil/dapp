import Gun from "gun";

const gun = Gun({
  peers: [
    // "http://localhost:3000/gun",
    "https://supportmycause.herokuapp.com/gun",
  ],
});

export default gun;
