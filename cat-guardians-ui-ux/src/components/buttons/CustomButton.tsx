import React from "react";

import { IButton } from "./interfaces/buttonProps";

const CustomButton: React.FC<IButton> = ({ type, title, className, handleClick }) => {
  return (
    <button type={type} className={className} onClick={handleClick}>
      {title}
    </button>
  );
};
export default CustomButton;
