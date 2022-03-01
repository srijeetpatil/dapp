import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Attach from "../components/AttachFiles";
import { createRequest } from "../api/main";

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

export default function CreateRequest() {
  const [type, setType] = useState("");
  const [files, setFiles] = useState({});
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

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
        className="font"
        style={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <textarea
        rows={12}
        className="font"
        style={{ ...styles.input, resize: "none" }}
        placeholder="Describe your issue here"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <input
        id="selectFiles"
        type="file"
        accept="image/*, video/*"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        style={{ display: "none" }}
      ></input>
      <div style={{ ...styles.attach, marginTop: "1rem" }}>
        <div style={styles.attach} onClick={handleAttachClick}>
          <Attach />
          <label style={{ cursor: "pointer", marginLeft: "10px" }}>
            Attach files
          </label>
        </div>
        {Object.keys(files).map((file, i) => {
          return (
            <div key={i} style={styles.tile}>
              {files[`${file}`].name}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FormControl style={styles.formControl}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={handleChange}
            style={{ ...styles.select, backgroundColor: "AppWorkspace" }}
          >
            <MenuItem value={1}>Donation</MenuItem>
            <MenuItem value={2}>Fundraiser</MenuItem>
            <MenuItem value={3}>Personal</MenuItem>
          </Select>
        </FormControl>
        {type === 2 && (
          <input
            type="text"
            placeholder="Ethereum address"
            className="font"
            style={{ ...styles.input, ...styles.ethereumAddress }}
          ></input>
        )}
      </div>
      <button
        style={styles.submit}
        className="font"
        onClick={async () => {
          if (title && content && type) {
            await createRequest(title, content, type);
            window.location.href = "/";
          }
        }}
      >
        Create request
      </button>
    </div>
  );
}
