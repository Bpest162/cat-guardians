import React from "react";
import { colorTheme } from "src/theme/themeVariables";

import { IIcons } from "./interfaces/interface";

const ArrowLeft = ({
  width = "26.6",
  height = "26.6",
  color = `${colorTheme.color.base.typography[200]}`,
  onClick
}: IIcons) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 16L16 24M16 24L24 32M16 24L32 24M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default ArrowLeft;
