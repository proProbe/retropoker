import React from "react";
import { Link } from "react-router-dom";

const FilterLink = ({ filter , children }: any) => (
  <Link
    to={filter === "MOBILE" ? "/mobile" : filter}
    style={{flex: 1, display: "flex"}}
  >
    {children}
  </Link>
);

export default FilterLink;
