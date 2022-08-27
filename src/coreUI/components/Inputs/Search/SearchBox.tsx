import * as React from "react";
import { ISearch } from "src/types/components/Inputs";
import IMAGES from "../../../../assets/img/Images";
import "./Search.css"

const Search: React.FC<ISearch> = ({ onChange, placeholder, value , size }) => {
  return (
    <div className="core-ui-search-wrapper">
      <img src={IMAGES.search} className="core-ui-search-icon"/>
      <input
        className={"core-ui-search" + " " + size}
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
