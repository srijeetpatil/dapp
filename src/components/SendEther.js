import { useState } from "react";
import { CircularProgress } from "@mui/material";

export default function SendEther(props) {
  const {
    accountAddress,
    username,
    picture,
    sendEtherToRequest,
    eth_address,
    setSendEtherOpen,
  } = props;
  const [eth, setEth] = useState(0.01);
  const [sending, setSending] = useState(false);

  return (
    <div className="border border-gray-200 px-6 py-4 font flex flex-col bg-white rounded-3xl">
      <label className="text-xl my-2 font-bold text-gray-900">
        From wallet
      </label>
      <label className="text-sm font-thin my-2">{accountAddress}</label>
      <label className="text-xl my-2 font-bold text-gray-900">Recipient</label>
      <div className="my-2 flex items-center text-sm">
        <img
          alt="Avatar"
          className="w-8 h-8 object-contain rounded-full object-cover"
          src={
            picture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjq82Piozdldq5e2mAKKCmqJsC93gYQtUtHw&usqp=CAU"
          }
        ></img>
        <label className="ml-2">{username}</label>
      </div>
      <div className="flex items-center my-4">
        <svg
          width="2rem"
          height="2rem"
          version="1.1"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 784.37 1277.39"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <g id="_1421394342400">
              <g>
                <polygon
                  fill="#343434"
                  fill-rule="nonzero"
                  points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                />
                <polygon
                  fill="#8C8C8C"
                  fill-rule="nonzero"
                  points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                />
                <polygon
                  fill="#3C3C3B"
                  fill-rule="nonzero"
                  points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                />
                <polygon
                  fill="#8C8C8C"
                  fill-rule="nonzero"
                  points="392.07,1277.38 392.07,956.52 -0,724.89 "
                />
                <polygon
                  fill="#141414"
                  fill-rule="nonzero"
                  points="392.07,882.29 784.13,650.54 392.07,472.33 "
                />
                <polygon
                  fill="#393939"
                  fill-rule="nonzero"
                  points="0,650.54 392.07,882.29 392.07,472.33 "
                />
              </g>
            </g>
          </g>
        </svg>
        <input
          type={"number"}
          step=".01"
          defaultValue={0.01}
          className="px-4 py-4 shadow-lg outline-none rounded-2xl my-2 w-max ml-2"
          min={0.01}
          onChange={(e) => setEth(e.target.value)}
        ></input>
      </div>
      <button
        className="font rounded-2xl text-xs text-white px-2 py-4 mt-2 bg-indigo-500"
        onClick={async () => {
          try {
            setSending(true);
            await sendEtherToRequest(eth_address, eth);
          } catch (err) {}
          setSending(false);
          setSendEtherOpen(false);
        }}
      >
        {sending ? <CircularProgress color="inherit" size={15} /> : "Send"}
      </button>
    </div>
  );
}
