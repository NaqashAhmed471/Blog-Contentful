import React from "react";

const SearchBox = ({ placeholder, handleChange, value }) => {
  return (
    <div className="search__box">
      <input
        type="search"
        className="search__input"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchBox;
