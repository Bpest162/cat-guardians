import React from "react";

import { IIcons } from "./interfaces/interface";

const CloseMenuIcon: React.FC<IIcons> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="8" fill="white" />
      <path
        d="M42 22L22 42M22 22L42 42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default CloseMenuIcon;
