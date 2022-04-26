import Gun from "gun";

const gun = Gun({
  peers: [
    // "http://localhost:3000/gun",
    "http://15.206.186.170:3000/gun",
  ],
});

export default gun;
