import React from "react";

import { IIcons } from "./interfaces/interface";

const UserProfileIcon: React.FC<IIcons> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_545_801)">
        <path
          d="M21 22V20C21 18.9391 20.5786 17.9217 19.8284 17.1716C19.0783 16.4214 18.0609 16 17 16H9C7.93913 16 6.92172 16.4214 6.17157 17.1716C5.42143 17.9217 5 18.9391 5 20V22M17 8C17 10.2091 15.2091 12 13 12C10.7909 12 9 10.2091 9 8C9 5.79086 10.7909 4 13 4C15.2091 4 17 5.79086 17 8Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_545_801">
          <rect width="26" height="26" fill="white" transform="matrix(-1 0 0 1 26 0)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UserProfileIcon;
