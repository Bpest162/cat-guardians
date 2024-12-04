import React from "react";
import { colorTheme } from "src/theme/themeVariables";

import { IIcons } from "./interfaces/interface";

const HomeIcon: React.FC<IIcons> = ({
  width,
  height,
  color = colorTheme.color.base.background[600]
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 99 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.8013 81.735V51.5184H11.7287L49.5 16.2644L87.2709 51.5173H77.1988V81.7345H57.0542V59.072H41.9459V81.7345L21.8013 81.735Z"
        stroke={color}
        strokeWidth="6.125"
        strokeMiterlimit="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
