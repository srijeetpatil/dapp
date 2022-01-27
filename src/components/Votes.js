import React from "react";

export function Upvote(props) {
  return (
    <svg
      width="18px"
      height="30px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
      fill={props.fill}
      onClick={() => props.addVote(1)}
    >
      <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" />
    </svg>
  );
}

export function Downvote(props) {
  return (
    <svg
      width="18px"
      height="30px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(180deg)", cursor: "pointer" }}
      fill={props.fill}
      onClick={() => props.addVote(-1)}
    >
      <path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z" />
    </svg>
  );
}