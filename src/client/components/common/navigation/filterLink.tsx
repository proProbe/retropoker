import React from "react";
import { Link } from "react-router-dom";

const FilterLink = ({ filter , children }: any) => (
  <Link
    to={filter === "MOBILE" ? "/mobile" : filter}
  >
    {children}
  </Link>
);

export default FilterLink;
