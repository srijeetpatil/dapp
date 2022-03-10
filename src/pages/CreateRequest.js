import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Attach from "../components/AttachFiles";
import { createRequest } from "../api/main";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
var uniqueFilename = require("unique-filename");

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.7rem",
    border: "none",
    fontSize: "15px",
    outline: "none",
    marginTop: "1rem",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  formControl: {
    marginTop: "1rem",
    width: "30%",
  },
  select: {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  ethereumAddress: {
    width: "50%",
    marginLeft: "2rem",
  },
  submit: {
    padding: "1rem 1rem",
    width: "max-content",
    cursor: "pointer",
    marginTop: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    outline: "none",
    border: "none",
    backgroundColor: "#32776B",
    color: "white",
    marginLeft: "auto",
  },
  attach: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  tile: {
    padding: "10px",
    backgroundColor: "#ECEAE9",
    marginLeft: "10px",
    borderRadius: "5px",
  },
};

export default function CreateRequest(props) {
  const [type, setType] = useState("");  
  const [files, setFiles] = useState({});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { accountAddress, user } = props;

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleAttachClick = () => {
    document.getElementById("selectFiles").click();
  };

  return (
    <div className="container mx-auto flex flex-col mt-8">
      <h1 className="font-2xl font-semibold">Create your request</h1>
      <p>
        Start by adding a title for your request. This way it would be easier
        for people to search by title.
      </p>
      <input
        type="text"
        placeholder="Title"
        className="font shadow outline-none px-4 py-4 mt-4 resize-none"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        rows={12}
        className="font shadow outline-none px-4 py-4 mt-4 resize-none"
        placeholder="Describe your issue here"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <input
        id="selectFiles"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        style={{ display: "none" }}
      ></input>
      <div style={{ ...styles.attach, marginTop: "1rem" }}>
        <div style={styles.attach} onClick={handleAttachClick}>
          <Attach />
          <label className="cursor-pointer ml-2">Attach files</label>
        </div>
        {Object.keys(files).map((file, i) => {
          return (
            <div key={i} style={styles.tile}>
              {files[`${file}`].name}
            </div>
          );
        })}
      </div>
      <div className="flex">
        <FormControl className="w-1/3">
          <InputLabel id="demo-simple-select-label" className="mt-4">
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={handleChange}
            className="shadow bg-white mt-4"
          >
            <MenuItem value={1}>Donation</MenuItem>
            <MenuItem value={2}>Fundraiser</MenuItem>
            <MenuItem value={3}>Personal</MenuItem>
          </Select>
        </FormControl>
      </div>
      {accountAddress ? (
        <div className="flex items-center mt-8 text-sm">
          <input type="checkbox" id="use-address"></input>
          <span className="ml-2">
            Use <span className="font-semibold">{accountAddress}</span> as
            ethereum address for this request?
          </span>
        </div>
      ) : (
        <div className="mt-8 text-sm text-gray-500">
          Cannot see your ethereum address? Activate ethereum wallet by adding
          Metamask to your browser. If done, sign in to your Metamask account
          and refresh this page.
        </div>
      )}
      <button
        style={styles.submit}
        className="font"
        onClick={async () => {
          if (title && content && type) {
            let fileUrls = [];
            for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
              let file = files[fileIndex];
              let filename = uniqueFilename("");

              const storageRef = ref(storage, `posts/${user.id}/${filename}`);
              await uploadBytes(storageRef, file).then(async (snapshot) => {
                try {
                  let url = await getDownloadURL(
                    ref(storage, `posts/${user.id}/${filename}`)
                  );                  
                  fileUrls.push(url);
                } catch (err) {
                  console.error(err);
                }
              });
            }

            await createRequest(
              title,
              content,
              type,
              document.getElementById("use-address") &&
                document.getElementById("use-address").checked
                ? accountAddress
                : "",
              fileUrls
            );
            window.location.href = "/";
          }
        }}
      >
        Create request
      </button>
    </div>
  );
}
