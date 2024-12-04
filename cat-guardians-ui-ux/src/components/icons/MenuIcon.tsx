import React from "react";

import { IIcons } from "./interfaces/interface";

const MenuIcon: React.FC<IIcons> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="8" fill="white" />
      <path d="M12 20H52" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 32H52" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 44H52" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
export default MenuIcon;
