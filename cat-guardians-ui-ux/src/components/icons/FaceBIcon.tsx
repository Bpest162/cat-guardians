import React from "react";

import { IIcons } from "./interfaces/interface";

const FaceBookIcon: React.FC<IIcons> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 32.8125C25.9569 32.8125 32.8125 25.9569 32.8125 17.5C32.8125 9.04314 25.9569 2.1875 17.5 2.1875C9.04314 2.1875 2.1875 9.04314 2.1875 17.5C2.1875 25.9569 9.04314 32.8125 17.5 32.8125Z"
        fill="url(#paint0_linear_8287_2653)"
      />
      <path
        d="M23.2025 22.183L23.8827 17.861H19.6276V15.0577C19.6276 13.875 20.2209 12.7215 22.1268 12.7215H24.0625V9.04202C24.0625 9.04202 22.3065 8.75 20.6285 8.75C17.1224 8.75 14.8331 10.8204 14.8331 14.567V17.861H10.9375V22.183H14.8331V32.6315C15.6151 32.7512 16.4152 32.8125 17.2303 32.8125C18.0453 32.8125 18.8455 32.7512 19.6276 32.6315V22.183H23.2025Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8287_2653"
          x1="17.5"
          y1="2.1875"
          x2="17.5"
          y2="32.7217"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#18ACFE" />
          <stop offset="1" stopColor="#0163E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default FaceBookIcon;
