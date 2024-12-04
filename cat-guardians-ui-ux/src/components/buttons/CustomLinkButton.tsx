import React from "react";
import { NavLink } from "react-router-dom";

import { IButton } from "./interfaces/buttonProps";

const CustomLinkButton: React.FC<IButton> = ({ className, title, to, handleClick }) => {
  return (
    <NavLink className={className} to={to} onClick={handleClick}>
      {title}
    </NavLink>
  );
};
export default CustomLinkButton;
