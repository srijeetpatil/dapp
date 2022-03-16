import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers, verifyRequest, verifyUser } from "../api/admin";
import { FormControl, Select, MenuItem } from "@mui/material";

export default function Admin(props) {
  const { requests, user, setRequests } = props;
  const [type, setType] = useState(1);
  const [users, setUsers] = useState([]);

  const handleChange = async (event) => {
    setType(event.target.value);

    if (event.target.value === 2 && users.length === 0) {
      let responseFromApi = await getAllUsers();
      setUsers(responseFromApi.data);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <label className="text-3xl font-semibold">Admin</label>
      <div className="flex mt-8 text-sm items-center">
        <FormControl className="w-max mr-2 cursor-pointer" size="small">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type || 1}
            onChange={handleChange}
            className="shadow bg-white"
          >
            <MenuItem value={1}>
              <label className="text-sm font">Posts</label>
            </MenuItem>
            <MenuItem value={2}>
              <label className="text-sm font">Users</label>
            </MenuItem>
          </Select>
        </FormControl>
        <div className="border border-gray-200 rounded px-4 py-2 w-1/6 mx-2">
          <label>Verified posts</label>
          <label className="ml-2">120</label>
        </div>
        <div className="border border-gray-200 rounded px-4 py-2 w-1/6 mx-2">
          <label>Unverified posts</label>
          <label className="ml-2">12</label>
        </div>
      </div>
      {type === 1 && (
        <>
          <div className="grid grid-cols-12 mt-8 bg-gray-100 px-4 py-2">
            <label className="col-span-2">Created By</label>
            <label className="col-span-2">Title</label>
            <label className="col-span-2">Status</label>
            <label className="col-span-2">Type</label>
            <label className="col-span-2">Created At</label>
            <label className="col-span-2">Action</label>
          </div>

          {requests?.map((req, i) => (
            <div className="grid grid-cols-12 mt-2 px-4 py-2 text-sm" key={i}>
              <label className="col-span-2 font-semibold flex items-center">
                <img
                  src={
                    req.created_by.picture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
                  }
                  className="w-8 h-8 rounded-full mr-2"
                ></img>
                {req.created_by.username}
              </label>
              <Link className="col-span-2" to={`/request/id/${req.shortId}`}>
                {req.title.substring(0, 50)}...
              </Link>
              {req.verified ? (
                <label className="col-span-2 px-2 py-1 bg-green-100 rounded-xl w-max self-start">
                  Verified
                </label>
              ) : (
                <label className="col-span-2 px-2 py-1 bg-red-100 rounded-xl w-max self-start">
                  Unverified
                </label>
              )}
              <label className="col-span-2 text-yellow-900">
                {parseInt(req.type) === 1
                  ? "Donation"
                  : parseInt(req.type) === 2
                  ? "Fundraiser"
                  : "Personal"}
              </label>
              <label className="col-span-2">{req.created_at}</label>
              {req.verified && (
                <button
                  className="col-span-2 px-2 py-2 rounded-xl bg-red-500 w-max text-xs text-white self-start shadow-lg"
                  onClick={async () => {
                    await verifyRequest(req.shortId, false);
                    let arrayOfRequests = requests;
                    arrayOfRequests[i].verified = false;
                    setRequests([...arrayOfRequests]);
                  }}
                >
                  Set to Unverified
                </button>
              )}
              {!req.verified && (
                <button
                  className="col-span-2 px-2 py-2 rounded-xl bg-green-500 w-max text-xs text-white self-start shadow-lg"
                  onClick={async () => {
                    await verifyRequest(req.shortId, true);
                    let arrayOfRequests = requests;
                    arrayOfRequests[i].verified = true;
                    setRequests([...arrayOfRequests]);
                  }}
                >
                  Set to verified
                </button>
              )}
            </div>
          ))}
        </>
      )}
      {type === 2 && (
        <>
          <div className="grid grid-cols-12 mt-8 bg-gray-100 px-4 py-2">
            <label className="col-span-2">Username</label>
            <label className="col-span-2">Type</label>
            <label className="col-span-2">Karma</label>
            <label className="col-span-2">Verification</label>
            <label className="col-span-2">Verified</label>
            <label className="col-span-2">Action</label>
          </div>

          {users?.map((u, i) => (
            <div className="grid grid-cols-12 mt-2 px-4 py-2 text-sm" key={i}>
              <label className="col-span-2 font-semibold flex items-center">
                <img
                  src={
                    u.picture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
                  }
                  className="w-8 h-8 rounded-full mr-2"
                ></img>
                {u.username}
              </label>
              <label className="col-span-2">{u.type}</label>
              <label className="col-span-2">{u.karma}</label>
              {u.verificationFile ? (
                <a className="col-span-2" href={u.verificationFile}>
                  Link
                </a>
              ) : (
                <label className="col-span-2">Not available</label>
              )}
              {u.verified ? (
                <label className="col-span-2 px-2 py-1 bg-green-100 rounded-xl w-max self-start">
                  Verified
                </label>
              ) : (
                <label className="col-span-2 px-2 py-1 bg-red-100 rounded-xl w-max self-start">
                  Unverified
                </label>
              )}
              {u.verified && (
                <button
                  className="col-span-2 px-2 py-2 rounded-xl bg-red-500 w-max text-xs text-white self-start shadow-lg"
                  onClick={async () => {
                    await verifyUser(u._id, false);
                    let arrayOfRequests = users;
                    arrayOfRequests[i].verified = false;
                    setUsers([...arrayOfRequests]);
                  }}
                >
                  Set to Unverified
                </button>
              )}
              {!u.verified && (
                <button
                  className="col-span-2 px-2 py-2 rounded-xl bg-green-500 w-max text-xs text-white self-start shadow-lg"
                  onClick={async () => {
                    await verifyUser(u._id, true);
                    let arrayOfRequests = users;
                    arrayOfRequests[i].verified = true;
                    setUsers([...arrayOfRequests]);
                  }}
                >
                  Set to verified
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
