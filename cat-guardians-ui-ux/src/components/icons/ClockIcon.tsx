import React from "react";
import { colorTheme } from "src/theme/themeVariables";

import { IIcons } from "./interfaces/interface";

const ClockIcon: React.FC<IIcons> = ({
  width,
  height,
  color = colorTheme.color.base.typography[300]
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.53857V12.5386L16 14.5386M22 12.5386C22 18.0614 17.5228 22.5386 12 22.5386C6.47715 22.5386 2 18.0614 2 12.5386C2 7.01573 6.47715 2.53857 12 2.53857C17.5228 2.53857 22 7.01573 22 12.5386Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default ClockIcon;
