import React from "react";

import { IIcons } from "./interfaces/interface";

const GoogleIcon: React.FC<IIcons> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_7861_1007)">
        <path
          d="M39.6099 20.4607C39.6099 19.1011 39.4997 17.7342 39.2645 16.3967H20.3999V24.0984H31.2028C30.7545 26.5823 29.3141 28.7796 27.205 30.1759V35.1731H33.65C37.4347 31.6898 39.6099 26.5455 39.6099 20.4607Z"
          fill="#4285F4"
        />
        <path
          d="M20.3998 40.0013C25.7939 40.0013 30.3429 38.2302 33.6572 35.1731L27.2123 30.1758C25.4191 31.3957 23.1042 32.0865 20.4072 32.0865C15.1895 32.0865 10.7654 28.5664 9.17809 23.8337H2.52734V28.9853C5.92253 35.7389 12.8378 40.0013 20.3998 40.0013Z"
          fill="#34A853"
        />
        <path
          d="M9.1708 23.8338C8.33303 21.3498 8.33303 18.6602 9.1708 16.1762V11.0247H2.52741C-0.309265 16.676 -0.309265 23.334 2.52741 28.9853L9.1708 23.8338Z"
          fill="#FBBC04"
        />
        <path
          d="M20.3998 7.9161C23.2512 7.87201 26.007 8.94494 28.0721 10.9144L33.7822 5.20436C30.1665 1.80917 25.3677 -0.0574433 20.3998 0.00134778C12.8378 0.00134778 5.92253 4.2637 2.52734 11.0247L9.17074 16.1763C10.7507 11.4362 15.1821 7.9161 20.3998 7.9161Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_7861_1007">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default GoogleIcon;
