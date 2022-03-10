import React from "react";

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
  return (
    <div className="container mx-auto">
      <div className="w-2/3 mx-auto my-12">
        <div className="flex items-center">
          <img
            className="w-1/5 rounded-full"
            src="https://mdbootstrap.com/img/Photos/Avatars/img(20).jpg"
            alt="Avatar"
          ></img>
          <div className="flex flex-col">
            <label className="ml-4 text-2xl font-bold">Mark Smith</label>
            <label className="ml-4">UI designer</label>
          </div>
        </div>
      </div>
    </div>
  );
}
