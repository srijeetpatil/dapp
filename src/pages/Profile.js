import { useState } from "react";

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

  function showPreview(event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      return src;
    }
  }

  return (
    <div className="container mx-auto">
      <div className="w-2/3 mx-auto my-12">
        <div className="flex items-center">
          <img
            className="w-48 h-48 rounded-full object-cover"
            src={
              profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
            }
            alt="Avatar"
          ></img>
          <div className="flex flex-col">
            <label className="ml-4 text-2xl font-bold">Mark Smith</label>
            <input
              id="profile-picture"
              type="file"
              accept="image/*"
              onChange={(e) => {
                let src = showPreview(e);
                setProfilePicture(src);
              }}
              style={{ display: "none" }}
            ></input>
            <button
              className="ml-4 px-2 py-2 shadow-lg rounded bg-indigo-500 mt-4 text-xs w-max text-white"
              onClick={() => {
                document.getElementById("profile-picture").click();
              }}
            >
              Change picture
            </button>
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
        <div className="mt-24 flex text-gray-400">
          <label
            className={`mx-8 cursor-pointer ${
              activeCategory === "Posts" && "text-black font-bold"
            }`}
            onClick={() => setActiveCategory("Posts")}
          >
            Posts
          </label>
          <label
            className={`mx-8 cursor-pointer ${
              activeCategory === "Comments" && "text-black font-bold"
            }`}
            onClick={() => setActiveCategory("Comments")}
          >
            Comments
          </label>
          <label
            className={`mx-8 cursor-pointer ${
              activeCategory === "Verification" && "text-black font-bold"
            }`}
            onClick={() => setActiveCategory("Verification")}
          >
            Verification
          </label>
        </div>
        <div className="mt-8 w-full flex justify-center">
          {(activeCategory === "Posts" || activeCategory === "Comments") && (
            <label className="text-gray-400 text-sm">Nothing to show</label>
          )}
          {user?.verified &&
            activeCategory === "Verification" &&
            !verificationFile && (
              <div className="flex flex-col items-center text-gray-400 text-sm">
                <label>
                  Upload any of the following documents: PAN, Aadhar, Driving
                  Licence. (JPEG)
                </label>
                <input
                  id="verification-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    let src = showPreview(e);
                    setVerificationFile(src);
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
          {user?.verified &&
            activeCategory === "Verification" &&
            verificationFile && (
              <div className="flex flex-col">
                <img
                  className="w-full rounded-lg"
                  src={verificationFile}
                  alt="Verification File"
                ></img>
                <div className="flex ml-auto mt-4">
                  <button className="w-max shadow-lg px-2 py-2 bg-indigo-500 text-white text-xs rounded">
                    Upload
                  </button>
                  <button
                    className="w-max shadow-lg px-2 py-2 text-xs rounded ml-4"
                    onClick={() => setVerificationFile(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
