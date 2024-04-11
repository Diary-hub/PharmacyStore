import React from "react";

const Image = ({ imgSrc, className, func }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

export default Image;
