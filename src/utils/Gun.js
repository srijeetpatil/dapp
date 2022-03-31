import Gun from "gun";

const gun = Gun({
  peers: [
    // "http://localhost:3000/gun",
    "https://supportmycause.herokuapp.com/gun",
    "15.206.186.170:3000/gun"
  ],
});

export default gun;
