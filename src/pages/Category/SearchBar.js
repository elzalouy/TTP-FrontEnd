import React from "react";
import searchicon from "./../../assets/img/search.png";
const SearchBar = () => {
  return (
    <form action="/" method="get">
      <div className="search-container" style={{ display: "flex" }}>
        <img
          src={searchicon}
          className="search-icon"
          width="24px"
          height="24px"
          alt="search-icon"
        />
        <input type="text" id="search-bar" placeholder="Search" name="search" />
      </div>
    </form>
  );
};
export default SearchBar;
