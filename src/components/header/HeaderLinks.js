import React from "react";
import { Link } from "react-router-dom";

const HeaderLinks = ({ links }) => {
  const { id, title, titleUrl } = links;
  return (
    <li key={id}>
      <Link to={titleUrl}>{title}</Link>
    </li>
  );
};

export default HeaderLinks;
