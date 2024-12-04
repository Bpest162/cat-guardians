import React from "react";

interface IEllipse {
  className: string;
}

const Ellipse: React.FC<IEllipse> = ({ className }) => {
  return <span className={className}></span>;
};
export default Ellipse;
