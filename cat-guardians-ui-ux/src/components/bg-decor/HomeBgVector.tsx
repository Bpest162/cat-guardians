import React from "react";

import { IIcons } from "../icons/interfaces/interface";

const HomeBgVector: React.FC<IIcons> = ({ width, height, className, fill }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 1440 1336"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1890 1291.78C1832.01 1344.88 1751.95 1354.54 1643.77 1295.86C1402.52 1164.99 994.233 1216.29 608.185 1264.79C100.35 1328.59 -369 1387.55 -369 1020.67L-369 0C209.413 243.925 1709.67 253.946 1890 173.761V1291.78Z"
        fill={fill}
        fillOpacity="0.3"
      />
    </svg>
  );
};
export default HomeBgVector;
