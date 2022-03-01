const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");

const main = async () => {
  // Create IPFS instance
  const ipfsOptions = { repo: "./ipfs" };
  const ipfs = await IPFS.create(ipfsOptions);

  // Create OrbitDB instance
  const orbitdb = await OrbitDB.createInstance(ipfs);

  // Create database instance
  const db = await orbitdb.keyvalue("database");

  return db;
};

const databaseInstance = main();

export default databaseInstance;
