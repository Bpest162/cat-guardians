import React from "react";

import { IIcons } from "./interfaces/interface";

const FemaleIcon: React.FC<IIcons> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.9852 10.6213C24.9852 15.4435 21.1378 19.4224 16.1664 20.0029C16.1681 20.027 16.1688 20.0514 16.1688 20.0758V22.4395H17.4283C18.1239 22.4395 18.6878 22.9686 18.6878 23.6213C18.6878 24.274 18.1239 24.8031 17.4283 24.8031H16.1688V25.9849C16.1688 26.6376 15.6049 27.1667 14.9093 27.1667C14.2137 27.1667 13.6499 26.6376 13.6499 25.9849V24.8031H12.3904C11.6948 24.8031 11.1309 24.274 11.1309 23.6213C11.1309 22.9686 11.6948 22.4395 12.3904 22.4395H13.6499V20.0758C13.6499 20.0514 13.6506 20.027 13.6522 20.0029C8.68078 19.4224 4.8335 15.4435 4.8335 10.6213C4.8335 5.39969 9.3446 1.16675 14.9093 1.16675C20.4741 1.16675 24.9852 5.39969 24.9852 10.6213ZM7.35705 10.6213C7.35705 14.5351 10.7383 17.7078 14.9093 17.7078C19.0804 17.7078 22.4616 14.5351 22.4616 10.6213C22.4616 6.70748 19.0804 3.5347 14.9093 3.5347C10.7383 3.5347 7.35705 6.70748 7.35705 10.6213Z"
        fill={color}
      />
    </svg>
  );
};
export default FemaleIcon;