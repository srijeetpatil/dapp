import { useState } from "react";
import { addProfilePicture, addVerificationFile } from "../api/auth";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firebase";
import { async } from "@firebase/util";
var uniqueFilename = require("unique-filename");

/*<>
  <label>
    <b>Account:</b> {props.accountAddress}
  </label>
  <label>
    <b>Balance:</b>{" "}
    {props.eth_balance
      ? parseFloat(props.eth_balance).toFixed(6)
      : ""}{" "}
    ETH
  </label>
</> */

export default function Profile(props) {
  const { user } = props;
  const [activeCategory, setActiveCategory] = useState("Posts");
  const [verificationFile, setVerificationFile] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [verificationFileURL, setVerificationFileURL] = useState();
  const [profilePictureURL, setProfilePictureURL] = useState();

  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      return src;
    }
  }

  return (
    <div className="container md:mx-auto mx-2">
      <div className="w-full md:w-2/3 mx-auto my-12">
        <div className="flex items-center">
          <img
            className="w-16 h-16 md:w-48 md:h-48 rounded-full object-cover cursor-pointer"
            src={
              profilePictureURL ||
              user?.picture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
            }
            alt="Avatar"
            onClick={() => {
              document.getElementById("profile-picture").click();
            }}
          ></img>
          <div className="flex flex-col">
            <label className="ml-4 text-2xl font-bold">{user?.username}</label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                setProfilePicture(e.target.files[0]);
                let src = showPreview(e);
                setProfilePictureURL(src);
              }}
              style={{ display: "none" }}
            ></input>
            {profilePicture && (
              <button
                className="ml-4 px-2 py-2 shadow-lg rounded bg-indigo-500 mt-4 text-xs w-max text-white"
                onClick={async () => {
                  let filename = uniqueFilename("");

                  const storageRef = ref(
                    storage,
                    `users/${user.id}/profile/${filename}.jpeg`
                  );
                  await uploadBytes(storageRef, profilePicture).then(
                    async (snapshot) => {
                      try {
                        let url = await getDownloadURL(
                          ref(
                            storage,
                            `users/${user.id}/profile/${filename}.jpeg`
                          )
                        );

                        await addProfilePicture(url);
                        window.location.reload();
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  );
                }}
              >
                Change picture
              </button>
            )}
            {user?.verified ? (
              <label className="px-2 py-1 bg-green-100 mx-1 rounded-xl text-xs w-max ml-4 mt-4">
                Verified
              </label>
            ) : (
              <label className="px-2 py-1 bg-red-100 mx-1 rounded-xl text-xs w-max ml-4 mt-4">
                Unverified
              </label>
            )}
          </div>
        </div>
        <div className="mt-8 md:mt-24 flex text-gray-400 text-xs md:text-base">
          <label
            className={`mx-4 md:mx-8 cursor-pointer ${
              activeCategory === "Posts" &&
              "text-indigo-500 font-bold border-b border-indigo-500"
            }`}
            onClick={() => setActiveCategory("Posts")}
          >
            Posts
          </label>
          <label
            className={`mx-4 md:mx-8 cursor-pointer ${
              activeCategory === "Comments" &&
              "text-indigo-500 font-bold border-b border-indigo-500"
            }`}
            onClick={() => setActiveCategory("Comments")}
          >
            Comments
          </label>
          <label
            className={`mx-4 md:mx-8 cursor-pointer ${
              activeCategory === "Verification" &&
              "text-indigo-500 font-bold border-b border-indigo-500"
            }`}
            onClick={() => setActiveCategory("Verification")}
          >
            Verification
          </label>
        </div>
        <div className="mt-8 w-full flex justify-center text-xs md:text-base">
          {(activeCategory === "Posts" || activeCategory === "Comments") && (
            <label className="text-gray-400 text-sm">Nothing to show</label>
          )}
          {!user?.verified &&
            activeCategory === "Verification" &&
            !verificationFile && (
              <div className="flex flex-col items-center text-gray-400 text-sm">
                <label className="mx-auto w-max">
                  Upload any of the following documents: PAN, Aadhar, Driving
                  Licence. (JPEG)
                </label>
                <input
                  id="verification-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setVerificationFile(e.target.files[0]);
                    let src = showPreview(e);
                    setVerificationFileURL(src);
                  }}
                  style={{ display: "none" }}
                ></input>
                <button
                  className="shadow-lg w-max mt-8 px-2 py-2 rounded bg-indigo-500 text-white text-xs"
                  onClick={() => {
                    document.getElementById("verification-file").click();
                  }}
                >
                  Browse files
                </button>
              </div>
            )}
          {activeCategory === "Verification" && verificationFileURL && (
            <div className="flex flex-col">
              <img
                className="w-full md:w-1/2 mx-auto rounded-lg"
                src={verificationFileURL || user?.verificationFile}
                alt="Verification File"
              ></img>
              <div className="flex ml-auto mt-4">
                <button
                  className="w-max shadow-lg px-2 py-2 bg-indigo-500 text-white text-xs rounded"
                  onClick={async () => {
                    let filename = uniqueFilename("");

                    const storageRef = ref(
                      storage,
                      `users/${user.id}/verification/${filename}`
                    );
                    await uploadBytes(storageRef, verificationFile).then(
                      async (snapshot) => {
                        try {
                          let url = await getDownloadURL(
                            ref(
                              storage,
                              `users/${user.id}/verification/${filename}`
                            )
                          );

                          await addVerificationFile(url);
                          window.location.reload();
                        } catch (err) {
                          console.error(err);
                        }
                      }
                    );
                  }}
                >
                  Upload
                </button>
                <button
                  className="w-max shadow-lg px-2 py-2 text-xs rounded ml-4"
                  onClick={() => {
                    setVerificationFile(null);
                    setVerificationFileURL("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {activeCategory === "Verification" && user?.verified && (
            <div className="flex flex-col">
              <label className="mx-auto w-max text-xs my-4">
                This was uploaded by you
              </label>
              <img
                className="w-1/2 mx-auto rounded-lg"
                src={user?.verificationFile}
                alt="Verification File"
              ></img>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
